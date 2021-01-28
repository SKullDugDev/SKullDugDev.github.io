"use strict";

const axios = require("axios");
const { PassThrough } = require("stream");
const aws = require("aws-sdk"),
  region = "us-east-1",
  secretName = "INSTANT_TOKEN_USER_SECRET";

aws.config.update({ region: region });

exports.instafeedCall = async function (req, res) {
  console.log("Instafeed: Trying Call to Action");
  try {
    console.log("Instafeed: Fetching Instagram Results");
    let gramResults = await getGramResults();
    if (gramResults === undefined) {
      console.log("Instafeed: Error...gramResults undefined");
      let gramResults = [];
      return gramResults;
    }
    console.log("Result payload being delivered...beginning existence check");
    existCheck(gramResults);
    return gramResults;
  } catch (error) {
    console.log("Instafeed: The API failed in fetching instagram results");
    console.log(error);
    let gramResults = [];
    return gramResults;
  }
};

async function getGramResults() {
  // fetchGramResults variables

  const igMediaTypes = "media_url, permalink, id, caption";
  const igReturnLimit = 3;

  // Get User Secret

  const INSTANT_TOKEN_USER_SECRET = await getUserSecret();
  console.log("Instafeed: User Secret Stored...");

  // try to

  try {
    // get instaToken

    let instaToken = await getInstaToken(INSTANT_TOKEN_USER_SECRET);

    try {
      let instaData = await getInstaData(
        instaToken,
        igMediaTypes,
        igReturnLimit
      );
      return instaData;
    } catch (error) {
      console.log("Instafeed: We failed in talking to Instagram");
      console.log(error);
      let instaData = [];
      return instaData;
    }
  } catch (error) {
    console.log("Instafeed: We failed in fetching the Token ");
    console.log(error);
    let instaData = [];
    return instaData;
  }
}

const getUserSecret = async () => {
  // Create a Secrets Manager client
  const client = new aws.SecretsManager({ region: region });
  console.log("Instafeed: Secrets Manager Client established...");

  try {
    const data = await client
      .getSecretValue({ SecretId: secretName })
      .promise();
    const secretJSON = JSON.parse(data.SecretString);
    const secret = secretJSON.USER_SECRET;
    console.log("Instafeed: User Secret received....");
    return secret;
  } catch (err) {
    if (err.code === "DecryptionFailureException") {
      console.log(
        "Secrets Manager can't decrypt the protected secret text using the provided KMS key."
      );
      throw err;
    } else if (err.code === "InternalServiceErrorException") {
      console.log("An error occurred on the server side.");
      throw err;
    } else if (err.code === "InvalidParameterException") {
      console.log("You provided an invalid value for a parameter.");

      throw err;
    } else if (err.code === "InvalidRequestException") {
      console.log(
        "You provided a parameter value that is not valid for the current state of the resource."
      );
      throw err;
    } else if (err.code === "ResourceNotFoundException") {
      console.log("We can't find the resource that you asked for.");
      // Deal with the exception here, and/or rethrow at your discretion.
      throw err;
    }
  }
};

const getInstaToken = async (INSTANT_TOKEN_USER_SECRET) => {
  console.log("Instafeed: Contacting Instant-Token...");

  // get instant token reponse promise with an await and store it
  const instantTokenResponse = await axios.get(
    `https://ig.instant-tokens.com/users/9c65c67c-26b6-4577-8cdf-ca00bb9e6fe8/instagram/17841401794723180/token?userSecret=${INSTANT_TOKEN_USER_SECRET}`
  );

  console.log("Instafeed: Token retrieved...");

  // save the token from the response
  let instaToken = instantTokenResponse.data.Token;
  return instaToken;
};

const getInstaData = async (instaToken, igMediaTypes, igReturnLimit) => {
  console.log("Instafeed: Fetching from Instagram...");
  const instagramResponse = await axios.get(
    `https://graph.instagram.com/me/media?fields=${igMediaTypes}&access_token=${instaToken}&limit=${igReturnLimit}`
  );
  console.log("Instafeed: Response recieved...saving data...");
  let instagramData = instagramResponse.data.data;
  console.log("Returning data...");
  return instagramData;
};

function existCheck(gramResults) {
  // initialize s3

  const s3 = new aws.S3({
    apiVersion: "2006-03-01",
  });

  // site variables

  const assetsRoot = "public/assets";
  const site = "williamedgarwright";
  let sitePath = `${assetsRoot}`;

  // upload parameters

  const igUploadParams = {
    ACL: "public-read",
    Bucket: site,
    Key: sitePath,
    Body: "",
  };

  Object.entries(gramResults).forEach(async ([key, Result]) => {
    const id = Result.id;
    const Url = Result.media_url;

    const newImagePath = `images/igresults/${id}.jpg`;
    let sitePath = `${assetsRoot}/${newImagePath}`;
    try {
      await s3
        .headObject({
          Bucket: site,
          Key: sitePath,
        })
        .promise();
      console.log(`indexModel: ${sitePath} already exists`);
    } catch (e) {
      await imageDL(sitePath, Url, igUploadParams);
    }
  });
}

const imageDL = async (sitePath, Url, igUploadParams) => {
  console.log(`indexModel: ${sitePath} doesn't exist...downloading...`);
  try {
    const originStream = await axios({
      method: "get",
      url: Url,
      responseType: "stream",
    });
    console.log("indexModel: Original stream retrieved...");
    try {
      const downloadStream = await (async (originStream) => {
        const pass = new PassThrough();
        return originStream.data.pipe(pass);
      })(originStream);
      console.log("indexModel: Passthrough succeeded");
      igUploadParams.Body = downloadStream;
      igUploadParams.Key = sitePath;
      try {
        const data = await s3.upload(igUploadParams).promise();
        console.log(`indexModel: File uploaded successfully. ${data.Location}`);
      } catch (e) {
        console.log(e, e.stack);
        console.log(`indexModel: Upload failed`);
      }
    } catch (e) {
      console.log("indexModel: Passthrough attempt failed");
      console.log(e, e.stack);
    }
  } catch (e) {
    console.log("indexModel: Original stream not retrieved...");
    console.log(e, e.stack);
  }
};

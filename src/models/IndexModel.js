"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");
const serverController = require("../controllers/serverCaptain");

exports.populateInstaDiv = async (req, res, instafeedResults) => {
  // return the info for the images
  const imageInfo = await Promise.all(
    Object.entries(instafeedResults).map(async ([key, apiResponseData]) => {
      // after making the API Call store the information from it
      const permalink = apiResponseData.permalink;
      const caption = apiResponseData.caption;
      const id = apiResponseData.id;
      const newImagePath = `/public/assets/images/igresults/${apiResponseData.id}.jpg`;
      //check to see if we already have the images locally
      function checkImageExistence() {
        // Asynchronously check the file's existence without opening it

        fs.access(
          path.resolve(__dirname, `../../${newImagePath}`),
          async (err) => {
            // if it doesn't exist
            if (err) {
              console.log("These files don't exist already");
              console.log("Let's fetch them");
              // fetch the image
              const mediaUrl = await axios({
                method: "get",
                url: apiResponseData.media_url,
                responseType: "stream",
              });
              console.log("Images fetched");
              // create a writable stream
              const imageStream = fs.createWriteStream(newImagePath);
              console.log("Creating a writable stream");
              //pipe the stream
              mediaUrl.data.pipe(imageStream);
              console.log("Stream downloaded locally");
              // return the array
              return [permalink, caption, newImagePath, id];
            }
            console.log("This file definitely already exists in the system");
            return [permalink, caption, newImagePath, id];
          }
        );
        return [permalink, caption, newImagePath, id];
      }
      return checkImageExistence();
    })
  );

  const newImageInfo = await Promise.all(
    imageInfo.map(function (infoSet) {
      const permalink = infoSet[0];
      const caption = infoSet[1];
      const newImagePath = infoSet[2];
      const id = infoSet[3];
      const imageInfoPacket = {
        permalink: permalink,
        newImagePath: newImagePath,
        caption: caption,
        id: id,
      };
      return imageInfoPacket;
    })
  );

  console.log(newImageInfo);
  return newImageInfo;
};

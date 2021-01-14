"use strict";

const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.populateInstaDiv = async (req, res, instafeedResults) => {
  // Promise.all() b/c it returns an array of promises and each asyn resolution will produce a promise

  const imageInfo = await Promise.all(
    // Object.entries because we can get each promise object by key, e.g [0]={}

    Object.entries(instafeedResults).map(async ([key, apiResponseData]) => {
      // for each key where we get apiResponseData, store the object properties as follows

      const permalink = apiResponseData.permalink;
      const caption = apiResponseData.caption;
      const id = apiResponseData.id;
      const newImagePath = `/assets/images/igresults/${apiResponseData.id}.jpg`;

      //check to see if we already have the images locally

      function checkImageExistence() {
        // Asynchronously check the file's existence without opening it
        fs.access(
          path.resolve(__dirname, `../../public/${newImagePath}`),
          async (err) => {
            // Start on error condition because if it fails it will error, else it won't

            if (err) {
              console.log(
                "indexModel: Images don't exist...prepare for download..."
              );

              // fetch the image

              const mediaUrl = await axios({
                method: "get",
                url: apiResponseData.media_url,
                responseType: "stream",
              });
              console.log("indexModel: Images ready for download...");

              // create a writable stream

              const imageStream = fs.createWriteStream(newImagePath);

              // pipe the stream

              mediaUrl.data.pipe(imageStream);

              // return the array

              return [permalink, caption, newImagePath, id];
            }
            console.log("indexModel: Images already exist");
            return [permalink, caption, newImagePath, id];
          }
        );
        return [permalink, caption, newImagePath, id];
      }
      // run the existence check and return the result

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

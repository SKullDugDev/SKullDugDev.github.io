"use strict";

exports.populateInstaDiv = async (req, res, instafeedResults) => {
  let infoPacket = [];
  Object.entries(instafeedResults).map(async ([key, apiResponseData]) => {
    // for each key where we get apiResponseData, store the object properties as follows
    console.log("indexModel: Capturing data...");
    const permalink = apiResponseData.permalink;
    const caption = apiResponseData.caption;
    const id = apiResponseData.id;
    const mediaUrl = apiResponseData.media_url;
    const newImagePath = `images/igresults/${id}.jpg`;
    const imageInfo = {
      permalink: permalink,
      caption: caption,
      newImagePath: newImagePath,
      id: id,
      mediaUrl: mediaUrl,
    };
    infoPacket.push(imageInfo);
  });
  console.log("indexModel: Data captured...");
  return infoPacket;
};

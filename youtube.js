"use strict";

const apiKey = require('./youtube.key.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey.key);

//youtube downloader
const ytdl = require('ytdl-core');
var toUpload;
//accesing files
const fs = require('file-system')
youtube.searchVideos('sandu ciorba', 4)
    .then(results => {
      let videoURL= 'https://www.youtube.com/watch?v=' + results[1].id;
        console.log('https://www.youtube.com/watch?v=' + results[1].id);
       toUpload = results[1].id + '.mp3';
       ytdl(videoURL)
            .pipe(fs.createWriteStream(results[1].id + '.mp3'));

    }).catch(console.log);

async function quickstart(
  projectId = 'hacktheburgh2019', // Your Google Cloud Platform project ID
  bucketName = 'hacktheburghfiles' // The name for the new bucket
) {
  // Imports the Google Cloud client library
  const {Storage} = require('@google-cloud/storage');

  // Creates a client
  const storage = new Storage({projectId});

  // Creates the new bucket
  // await storage.createBucket(bucketName);
  // console.log(`Bucket ${bucketName} created.`);
  await storage.bucket(bucketName).upload('A3g-lPWvXDI.mp3', {
  // Support for HTTP requests made with `Accept-Encoding: gzip`
  gzip: false,
  public: true,
  metadata: {
    // Enable long-lived HTTP caching headers
    // Use only if the contents of the file will never change
    // (If the contents will change, use cacheControl: 'no-cache')
    cacheControl: 'public, max-age=31536000',
  },
});
  console.log(`${'A3g-lPWvXDI.mp3'} uploaded to ${bucketName}.`);
	await storage.bucket(bucketName).file('A3g-lPWvXDI.mp3').makePublic();
	console.log(getPublicUrl('A3g-lPWvXDI.mp3'));
}

quickstart(toUpload);

function getPublicUrl (filename) {
  return `https://storage.googleapis.com/${'hacktheburghfiles'}/${filename}`;
}
"use strict";

const apiKey = require('./youtube.key.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey.key);

const {Storage} = require('@google-cloud/storage');

const storage = new Storage();
const results;


//youtube downloader
const ytdl = require('ytdl-core');

//accesing files
const fs = require('file-system')
youtube.searchVideos('sandu ciorba', 4)
    .then(results => {
      let videoURL= 'https://www.youtube.com/watch?v=' + results[1].id;
        console.log('https://www.youtube.com/watch?v=' + results[1].id);
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
  console.log(`Bucket ${bucketName} exists.`);

  await storage.bucket('hacktheburghfiles').upload(results[1].id + '.mp3', {
  gzip: false,
  metadata: {
    cacheControl: 'public, max-age=31536000',
  },
});
  console.log(`${filename} uploaded to ${bucketName}.`);
}

quickstart().catch();
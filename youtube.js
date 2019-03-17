"use strict";

const apiKey = require('./youtube.key.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey.key);

const {Storage} = require('@google-cloud/storage');

const storage = new Storage();


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

await storage.bucket(hacktheburghfiles).upload(results[1].id + '.mp3', {
  gzip: false,
  metadata: {
    cacheControl: 'public, max-age=31536000',
  },
});

console.log(`${filename} uploaded to ${bucketName}.`);
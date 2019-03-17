"use strict";

const apiKey = require('./youtube.key.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey.key);

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
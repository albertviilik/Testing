"use strict";

const apiKey = require('./youtube.key.js');

const YouTube = require('simple-youtube-api');
const youtube = new YouTube(apiKey.key);

async function quickstart(
  projectId = 'hacktheburgh2019', // Your Google Cloud Platform project ID
  bucketName = 'files' // The name for the new bucket
) {
	const {Storage} = require('@google-cloud/storage');

	// Creates a client
	const storage = new Storage();

	/**
	 * TODO(developer): Uncomment the following lines before running the sample.
	 */
	const bucketName = 'playbackfiles';

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

	 const filename = results[1].id + '.mp3';

	 // Makes the file public
	await storage
	  .bucket(bucketName)
	  .file(filename)
	  .makePublic();

	console.log(`gs://${bucketName}/${filename} is now public.`);
}

quickstart();
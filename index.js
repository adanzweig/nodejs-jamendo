// Importing necessary modules
const https = require('https');
const fs = require('fs');
require('dotenv').config();  // Including the dotenv package to load environment variables

// Function to retrieve JSON data from a given URL
async function getJSON(url){
    return new Promise((resolve,reject)=>{
        // HTTP GET request to the provided URL
        https.get(url,(response)=>{
            let data = '';
            // Concatenate chunks of data as they are received
            response.on('data',(chunks)=>{
                data += chunks
            });
            // Once all data is received, attempt to parse as JSON
            response.on('end',()=>{
                try{
                    resolve(JSON.parse(data));
                }catch(error){
                    console.error('Error:',error);
                }
            });
        // Handle potential errors from the GET request
        }).on('error',(error)=>{
            reject(error);
        });
    });
}

// Function to retrieve the download URL of a music track
async function getMusicUrl(key, type){
    try{
        // Request track details from the Jamendo API
        const request = await getJSON(`https://api.jamendo.com/v3.0/tracks/?client_id=${key}&format=json&limit=1&vocalinstrumental=instrumental&search=${type}`);
        // If no download URL is present, recursively attempt to get another URL
        if(!request.results[0].audiodownload){
            return await getMusicUrl(key,type);
        }
        return request.results[0].audiodownload;

    }catch(error){
        console.error('Error:',error);
    }
}

// Function to download a file from a given URL to a specified path
async function downloadFile(inputUrl,downloadPath){
    return new Promise((resolve,reject)=>{
        https.get(inputUrl,(response)=>{
            // Check if the GET request was successful
            if(response.statusCode != 200){
                console.error('Download Failed');
                response.resume();
                reject('Failed to connect');
                return;
            }
            // Create a writable stream to save the file
            const filestream = fs.createWriteStream(downloadPath);
            // Pipe the HTTP response into the file stream
            response.pipe(filestream);

            // Once the file is completely written, close the stream
            filestream.on('finish',()=>{
                filestream.close(()=>{
                    console.log('Download finshed');
                    resolve(downloadPath);
                });
            });
        // Handle potential errors during the download process
        }).on('error',(error)=>{
            console.error('Got an error: ',error);
            reject(error);
        });
    });
}

// Immediately Invoked Function Expression (IIFE) to run the download process
// (async()=>{
//     // Get the download URL for a jazz track
//     const audioToDownload = await getMusicUrl(process.env.JAMENDO_TOKEN,'jazz');
//     console.log(audioToDownload);
//     // Download the track to "output.mp3"
//     await downloadFile(audioToDownload,'output.mp3');
// })();
module.exports = {
    getMusicUrl,
    downloadFile
}
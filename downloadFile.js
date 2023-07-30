const https = require('https');
const fs = require('fs');
const path = require('path');

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    const fileStream = fs.createWriteStream(filePath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file. Status code: ${response.statusCode}`));
        return;
      }

      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });

      fileStream.on('error', (error) => {
        fs.unlinkSync(filePath);
        reject(error);
      });
    }).on('error', (error) => {
      fs.unlinkSync(filePath);
      reject(error);
    });
  });
}

(async () => {
  const url = '';
  const downloadDir = 'downloaded'; 
  const fileName = 'file.dmg';
  const filePath = path.join(__dirname, downloadDir, fileName); // Full path to the file

  try {
    if (!fs.existsSync(downloadDir)) {
      fs.mkdirSync(downloadDir);
    }

    await downloadFile(url, filePath);
    console.log('File downloaded successfully!');

    // Delete the downloaded file after processing
    fs.unlinkSync(filePath);
    console.log('File deleted successfully after processing!');
  } catch (error) {
    console.error('Error downloading or processing the file:', error);
  }
})();

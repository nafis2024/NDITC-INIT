// /workspaces/NDITC-INIT/server/utils/deleteFile.js
const fs = require('fs');

const deleteFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('File deleted successfully:', filePath);
    }
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};

module.exports = deleteFile;
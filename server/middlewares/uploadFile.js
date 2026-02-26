const multer = require('multer');
const { existsSync, mkdirSync } = require('fs');
const { resolve } = require('path');
const { BadRequestError } = require('../errors');

// Local storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const validFields = /participants|CA|banner|gallery|thumbnail|event|sponsor/;
    const isFieldValid = validFields.test(file.fieldname);
    
    if (!isFieldValid) {
      return cb(new Error(`Field name didn't match`));
    }
    
    // Create dynamic destination path based on fieldname
    let destName = resolve(__dirname, `../public/uploads/${file.fieldname}`);

    if (!existsSync(destName)) {
      try {
        mkdirSync(destName, { recursive: true });
      } catch (error) {
        console.error('Error creating directory:', error);
      }
    }
    
    cb(null, destName);
  },
  filename: (req, file, cb) => {
    const type = file.mimetype.split('/');
    const fileExt = type[type.length - 1];

    let fileName = '';
    
    if (file.fieldname === 'banner') {
      fileName = 'eventBanner' + `@${Date.now()}`;
    } else if (file.fieldname === 'participants' || file.fieldname === 'CA') {
      let { fullName, name } = req.body;

      if (fullName) {
        fullName = fullName.trim();
        fileName = fullName.split(' ')[0].toLowerCase() + `@${Date.now()}`;
        req.userName = fileName;
      } else if (name) {
        fileName = name;
      } else {
        return cb(new BadRequestError('fullName should be provided'));
      }
    } else if (file.fieldname === 'event') {
      fileName = req.body.name.split(' ').join('') + `@${Date.now()}`;
    } else {
      fileName = file.fieldname + `-${Date.now()}`;
    }
    
    // Sanitize filename
    fileName = fileName.replace(/[^a-zA-Z0-9@_-]/g, '');
    
    cb(null, fileName + '.' + fileExt);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Increased to 10MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif|webp/;
    const mimeType = fileTypes.test(file.mimetype);
    const validFields = /participants|CA|banner|gallery|thumbnail|event|sponsor/;
    const isFieldValid = validFields.test(file.fieldname);

    if (!isFieldValid) {
      return cb(new Error(`Field name didn't match`));
    }

    if (mimeType) {
      return cb(null, true);
    } else {
      return cb(new BadRequestError('Only jpg, png, jpeg, gif, webp images are allowed!'));
    }
  },
});

module.exports = upload;
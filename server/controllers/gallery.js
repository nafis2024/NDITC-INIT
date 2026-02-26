const { Gallery } = require('../models');
const { BadRequestError } = require('../errors');
const deleteFile = require('../utils/deleteFile');
const path = require('path');

const findTotal = async () => {
  return await Gallery.count();
};

const addGalleryImage = async (req, res) => {
  const { rows, cols, order } = req.body;
  
  // Store relative path in database
  const relativePath = `uploads/gallery/${req.file.filename}`;
  
  const data = {
    rows: rows ? parseInt(rows) : 1,
    cols: cols ? parseInt(cols) : 1,
    order: order ? parseInt(order) : (await findTotal()) + 1,
    BigImage: relativePath, // Store relative path
  };
  
  const createdResult = await Gallery.create(data);

  res.status(201).json({ succeed: true, result: createdResult });
};

const updateGalleryImg = async (req, res) => {
  const id = req.params.id;
  if (!id) throw new BadRequestError('you did not provide the id');
  
  const { rows, cols, order } = req.body;
  
  const dataToUpdate = {
    rows: rows ? parseInt(rows) : 1,
    cols: cols ? parseInt(cols) : 1,
    order: order ? parseInt(order) : (await findTotal()) + 1,
  };
  
  const [updatedCount] = await Gallery.update(dataToUpdate, { where: { id: id } });
  
  if (updatedCount < 1) {
    return res.json({ succeed: false, msg: 'wrong id entered' });
  }
  
  res.json({ succeed: true, msg: 'successfully updated' });
};

const deleteImg = async (req, res) => {
  const id = req.params.id;
  const targetImage = await Gallery.findByPk(id);

  if (targetImage) {
    const BigImageFile = targetImage.dataValues.BigImage;
    // Construct full path for deletion
    const fullPath = path.join(__dirname, '../public', BigImageFile);
    deleteFile(fullPath);
  }
  
  await Gallery.destroy({ where: { id: id } });
  res.json({ succeed: true, msg: 'delete succeed' });
};

const getGalleryImages = async (req, res) => {
  const images = await Gallery.findAll({ order: [['order', 'ASC']] });
  res.json({ succeed: true, result: images });
};

module.exports = {
  addGalleryImage,
  updateGalleryImg,
  getGalleryImages,
  deleteImg,
};
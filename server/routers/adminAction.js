const router = require('express').Router();
const {
  setPermits,
  getAllSetting,
  blockCA,
  downloadData,
} = require('../controllers/adminAction');
const { clearEventInfo } = require('../controllers/clientEvents');
const { updateEventInfo } = require('../controllers/qrScanner');
const adminValidate = require('../middlewares/adminTokenVerify');

// Settings
router.get('/setting', getAllSetting);
router.post('/downloadFile', adminValidate, downloadData);
router.patch('/setPermit/', adminValidate, setPermits);
router.patch('/updateEventInfo/:code', adminValidate, updateEventInfo);

// CA actions
router.patch('/blockCA', adminValidate, blockCA);

// Removed old caPointEdit endpoint
// router.patch('/updateCode', adminValidate, caPointEdit);

router.put('/deleteEventInfo', adminValidate, clearEventInfo);

module.exports = router;
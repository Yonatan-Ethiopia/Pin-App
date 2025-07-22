const express = require('express');
const router = express.Router()
const getImages = require('../controllers/http/getImages')
router.post('/api/get/Images', getImages)
module.exports = router

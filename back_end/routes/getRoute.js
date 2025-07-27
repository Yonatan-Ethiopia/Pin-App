const express = require('express');
const router = express.Router()
const {getImages, getURL} = require('../controllers/http/getImages')
router.get('/get/Images', getImages)
console.log("running")
router.get('/get/Images/:fileId', getURL)
module.exports = router

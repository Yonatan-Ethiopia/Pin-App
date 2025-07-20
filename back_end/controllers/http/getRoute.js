const express = require('express');
const router = express.Router()
const getImages = require('./controllers/getImages')
router.post('/api/get/Images', getImages)
module.export = router

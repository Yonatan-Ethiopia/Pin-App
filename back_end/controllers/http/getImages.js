const mongoose = require('mongoose')
const data = require('../../models/dataModel')
const getImages = async (req,res)=>{
	const filteredData = await data.find().sort({ createdAt: -1})
	res.status(200).json({ data: filteredData})
}
module.exports = getImages;

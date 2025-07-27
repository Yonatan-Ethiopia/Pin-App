const mongoose = require('mongoose')
const data = require('../../models/dataModel')
const bot = require('../../bot')
const { Readable } = require('stream');

const limit = 20
const getImages = async (req,res)=>{
	const skip = (req.query.page - 1) * limit
	const filteredData = await data.find().sort({ createdAt: -1}).skip(skip).limit(limit);
	res.status(200).json(filteredData)
	console.log("Data sent :", filteredData)
}
const getURL = async (req,res)=>{
	const fileId = req.params.fileId;
    const fileLink = await bot.getFileLink(fileId); // full Telegram URL

    const response = await fetch(fileLink);

    if (!response.ok) throw new Error("Failed to fetch image");

    const contentType = response.headers.get('content-type');
    res.set('Content-Type', contentType);

    // Convert Undici's ReadableStream to Node stream
    const readableStream = Readable.fromWeb(response.body);
    readableStream.pipe(res);
    console.log("link sent", response)
}
module.exports = { getImages, getURL};

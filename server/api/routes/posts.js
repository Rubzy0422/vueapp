const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();


const dbstring = process.env.DBSTING;
const dbname = process.env.DBNAME;

// Get Posts
router.get('/', async (req, res) => {
	const posts = await loadpostCollection();
	res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
	const posts = await loadpostCollection();
	await posts.insertOne({
		text: req.body.text,
		createdAt: new Date()
		});
		res.status(201).send();
	});
// Delete posts

router.delete('/:PostId', async (req, res) => {
		const posts = await loadpostCollection();
		await posts.deleteOne({_id: new mongodb.ObjectID(req.params.PostId)});
		res.status(200).send();
})
async function loadpostCollection() {
	const client = await mongodb.MongoClient.connect(dbstring, {
		useNewUrlParser: true,
		useUnifiedTopology: true 
	});

	return client.db(dbname).collection('posts');
}
module.exports = router;

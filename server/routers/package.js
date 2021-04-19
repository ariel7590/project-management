const express = require('express')
const router = new express.Router()
const validator = require('validator')
const { MongoClient } = require('mongodb')

router.post('/add-new-package', async (req, res) => {
	const pkg = req.body

	//Connect to mongodb
	MongoClient.connect(
		process.env.MONGODB_URL,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		async (error, client) => {
			if (error) {
				//return to print and break function
				return console.log('Unable to connect')
			}
			console.log('MongoDB is connected!')

			var db = client.db(process.env.DATABASE_NAME)

			try {
				//TODO: Add the addittional details here
				//
				//
				//

				//Check if url is valid
				if (!validator.isURL(pkg.url, { protocols: ['http', 'https'] })) {
					return res.status(500).send({ message: 'URL is not valid!' })
				}

				//Insert the package to the DB
				await db.collection('packages').insertOne(pkg)

				res.send({ message: `Package ${pkg.name} created successfully.` })
			} catch (e) {
				console.log(e)
				res.status(500).send({ message: "Can't add customer!" })
			}
		}
	)
})

module.exports = router
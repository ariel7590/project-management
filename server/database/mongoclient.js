// const { MongoClient } = require('mongodb')
// //'mongodb+srv://sage:vL2PPAcKN5cokJJe@database.rufn2.mongodb.net/database?retryWrites=true&w=majority'

// const url =
// 	'mongodb+srv://sage:vL2PPAcKN5cokJJe@database.rufn2.mongodb.net/database?retryWrites=true&w=majority'

// const dbName = 'database'

// var db

// MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
// 	if (error) {
// 		return console.log('Unable to connect')
// 	}
// 	console.log('MongoDB is connected!')

// 	db = client.db(dbName)

// 	db.collection('customers').insertOne({})
// })

// module.exports = { db: db }

// async function main() {
// 	const uri =
// 		'mongodb+srv://sage:vL2PPAcKN5cokJJe@database.rufn2.mongodb.net/database?retryWrites=true&w=majority'
// 	const client = new MongoClient(uri, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	})

// 	try {
// 		await client.connect()
// 		await listDatabases(client)
// 		console.log('MongoDB is connected!')
// 	} catch (e) {
// 		console.error(e)
// 	} finally {
// 		await client.close()
// 	}
// }
// if (require.main === module) {
// 	main().catch(console.error)
// }
// /**
//  * Print the names of all available databases
//  * @param {MongoClient} client A MongoClient that is connected to a cluster
//  */
// async function listDatabases(client) {
// 	const databasesList = await client.db().admin().listDatabases()

// 	console.log('Databases:')
// 	databasesList.databases.forEach((db) => console.log(` * ${db.name}`))
// }

// main()
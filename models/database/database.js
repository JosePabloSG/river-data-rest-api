import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_URI

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

async function connect () {
  try {
    await client.connect()
    const database = client.db('DB-River-date')
    return database.collection('Data')
  } catch (error) {
    console.error('Error connecting to the database')
    console.error(error)
    await client.close()
  }
}

export class DataModel {
  static async getAll ({ date, time, waterLevel, location }) {
    const db = await connect()
    if (date) {
      return db.find({
        date: { $eq: date }
      }).toArray()
    }
    if (time) {
      return db.find({
        time: {
          $regex: new RegExp(time, 'i')
        }
      }).toArray()
    }
    if (waterLevel) {
      return db.find({
        waterLevel: { $eq: parseInt(waterLevel) }
      }).toArray()
    }
    if (location) {
      return db.find({
        location: {
          $regex: new RegExp(location, 'i')
        }
      }).toArray()
    }
    // return db.find({}).toArray()
  }

  static async getById ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    return db.findOne({ _id: objectId })
  }

  static async delete ({ id }) {
    const db = await connect()
    const objectId = new ObjectId(id)
    const { deletedCount } = await db.deleteOne({ _id: objectId })
    return deletedCount > 0
  }

  static async update ({ id, input }) {
    const db = await connect()
    const objectId = new ObjectId(id)

    const { ok, value } = await db.findOneAndUpdate({ _id: objectId }, { $set: input }, { returnNewDocument: true })

    if (!ok) return false

    return value
  }
}

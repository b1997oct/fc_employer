/* This is a database connection function*/
import mongoose from 'mongoose'
const DB = process.env.DB
const connection = {} /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }
  /* connecting to our database */
  const db = await mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect

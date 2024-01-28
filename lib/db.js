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


export const dataTotal = (array) => [
  {
    $facet: {
      metadata: [{ $count: "total_count" }],
      data: array
    }
  },
  {
    $project: {
      data: "$data",
      total_count: { $arrayElemAt: ["$metadata.total_count", 0] }
    }
  }]

export function toOject(data) {
  return data[0] || { data: [], total_count: 0 }
}

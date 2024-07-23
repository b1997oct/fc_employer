/* This is a database connection function*/
import mongoose, { Types } from 'mongoose'
import { cookies } from 'next/headers'
import toSelect from './toSelect'
const DB = process.env.DB
const connection = {} /* creating connection object*/

export default async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return
  }
  /* connecting to our database */
  const db = await mongoose.connect(DB, {
    useUnifiedTopology: true,
  })
  connection.isConnected = db.connections[0].readyState
}


export const DataAndTotal = array => [
  {
    $facet: {
      metadata: [{ $count: "total" }],
      data: array
    }
  },
  {
    $project: {
      data: "$data",
      total: { $arrayElemAt: ["$metadata.total", 0] }
    }
  }]

export function ObjId(id) {
  return new Types.ObjectId(id)
}
export function toOject(data) {
  return data[0] || { data: [], total: 0 }
}

export function isFound(data) {
  data = data[0]
  if (!data) {
    throw Error('data not found')
  }
  return data
}

export function getSite() {
  return cookies().get('si_te')?.value
}

export function getRecruiter() {
  return cookies().get('_tok')?.value
}

export async function Create(Modal, { id, ...body }) {
  let data, site = getSite()
  if (id == 'new') {
    body.site = site
    data = await new Modal(body).save()
  } else {
    data = await Modal.findOneAndUpdate({ site, _id: id }, body, { new: true }).select(toSelect(body))
  }
  return data
}
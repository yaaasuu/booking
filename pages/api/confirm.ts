// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { dbQuery } from "./sql"
import { error } from "console";
type Data = {
  redirectTo:any
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = req.body


  console.log("book.ts",data)
  const room = data.room
  const guest = data.guests
  const arr = data.arrival
  const dep = data.departure
  const first = data.firstName
  const last = data.lastName
  const phone = data.phoneNumber
  let passport = data.passportNumber || null
  let remark = data.remarks|| null

  const arrival = `'${arr}'`
  const departure = `'${dep}'`
  const firstName = `'${first}'`
  const lastName = `'${last}'`
  const phoneNumber = `'${phone}'`
  let passportNumber = `'${passport}'` || null
  let remarks = `'${remark}'`|| null

  const query = "INSERT into books (room, first_name, last_name, phone_number, guests, arrival, departure, passport_number, remarks) value(" + room + "," + firstName + "," + lastName + "," + phoneNumber + "," +  guest + "," + arrival + "," + departure + "," + passportNumber + "," + remarks + ");"

  console.log(query)
  const result = await dbQuery(query)
  if(!result){
    throw error;
  }


  console.log("結果",result)
  res.status(200).json({ redirectTo: '/' });
}

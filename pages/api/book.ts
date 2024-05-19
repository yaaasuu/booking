// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { dbQuery } from "./sql"
import { error } from "console";
type Data = {
  roomList: string;
  arrival: Date
  departure: Date
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const data = req.body

  console.log("book.ts",data)
  const arr = data.arrival.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2")
  const dep = data.departure.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$1-$2")
  const arrival = `'${arr}'`
  const departure = `'${dep}'`
  const guest = data.guests
  console.log("arr",arrival)
  console.log("dep",departure)
  console.log("guest",guest)
  // const result = await dbQuery("select * from books")
  const query = "SELECT * FROM rooms WHERE room NOT IN (SELECT DISTINCT room FROM books WHERE arrival < "+ departure + " AND departure >= " + arrival + " ) AND max >= " + guest +";"
  console.log(query)
  const result = await dbQuery(query)
  if(!result){
    throw error;
  }
  console.log("結果",result)
  res.status(200).json({
    roomList : result,
    arrival: arr,
    departure: dep
  })
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { dbQuery } from "./sql"
import eventJs from "../../components/event.json"

// export const bookList = async() => {
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {


  const query = "SELECT room, book_id, first_name, last_name, arrival, departure FROM books"
  console.log("query",query)
  const result = await dbQuery(query)
  console.log("result:",result)
  const length = result.length
  console.log("length",length)
    for (let i=0,k=0; i <length; i++,k+=2){
      eventJs.events[k]= {
        "event_id": "...set at runtime...",
        "title": "...set at runtime...",
        "start": "...set at runtime...",
        "end": "...set at runtime...",
        "assignee": 1
        }
      eventJs.events[k+1]= {
        "event_id": "...set at runtime...",
        "title": "...set at runtime...",
        "start": "...set at runtime...",
        "end": "...set at runtime...",
        "assignee": 1
        }
      eventJs.events[k].event_id = result[i].book_id
      eventJs.events[k].title = result[i].first_name + result[i].last_name
      eventJs.events[k].assignee = result[i].room
      eventJs.events[k+1].event_id = result[i].book_id
      eventJs.events[k+1].title = result[i].first_name + result[i].last_name
      eventJs.events[k+1].assignee = result[i].room
      const arr = result[i].arrival
      const arrY = arr.getFullYear();
      const arrM = (arr.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるので+1し、2桁にゼロ埋め
      const arrD = arr.getDate().toString().padStart(2, '0'); // 日を2桁にゼロ埋め
      const arrival =`${arrY}/${arrM}/${arrD}`;
      eventJs.events[k].start = arrival
      eventJs.events[k].end = arrival
      const dep = result[i].departure
      const depY = dep.getFullYear();
      const depM = (dep.getMonth() + 1).toString().padStart(2, '0');
      const depD = dep.getDate().toString().padStart(2, '0');
      const departure =`${depY}/${depM}/${depD}`;
      eventJs.events[k+1].start = departure
      eventJs.events[k+1].end = departure
      // console.log("roop",eventJs)
    }


    console.log("#",eventJs)
    res.status(200).json({
      event:eventJs.events
    })
    // return EventList
}



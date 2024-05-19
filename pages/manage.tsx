import { Scheduler } from "@aldabil/react-scheduler";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import bookList from "./api/manage"
import axios from "axios";
import { ProcessedEvent } from "@aldabil/react-scheduler/types";
const BookList: NextPage = () => {


    type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    type DayHours =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24;
    interface WeekProps {
        weekDays: WeekDays[];
        weekStartOn: WeekDays;
        startHour: DayHours;
        endHour: DayHours;
        step: number;
    }
    interface DayProps {
        startHour: DayHours;
        endHour: DayHours;
        step: number;
    }

const Week:WeekProps ={
    weekDays: [0, 1, 2, 3, 4, 5],
    weekStartOn: 6,
    startHour: 9,
    endHour: 24,
    step: 60,
}
const Day:DayProps ={
    startHour: 9,
    endHour: 24,
    step: 60,
}

const [events, setEvents] = React.useState<ProcessedEvent[]>([])
const getEvents = async (): Promise<ProcessedEvent[]> => {
  const response = await axios.get("/api/manage", {
    headers: { "Access-Control-Allow-Origin": "*" },
  })
  return response.data.event
}
const processEvents = async () => {
      const eventList: ProcessedEvent[] = await getEvents();
      const length = eventList.length
      for (let i=0; i <length; i++){
        const start = eventList[i].start
        if(i % 2 === 0){
          eventList[i].start = new Date(`${start} 15:00`)
          eventList[i].end = new Date(`${start} 24:00`)
        }else{
          eventList[i].start = new Date(`${start} 09:00`)
          eventList[i].end = new Date(`${start} 11:00`)
        }
      }
      if(typeof eventList[0].start === 'object' &&eventList[0].start instanceof Date){
        console.log("date型")
      }
      setEvents(eventList);
};
useEffect(() => {
  processEvents()

// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

console.log(">>>",events)

const event =[
  {
    event_id: 1,
    title: 'Emily Cooper',
    start: new Date('2024/05/07 15:00'),
    end: new Date('2024/05/07 24:00'),
    assignee: 1
  },
  {
    event_id: 1,
    title: 'Emily Cooper',
    start: new Date('2024/05/12 09:00'),
    end: new Date('2024/05/12 11:00'),
    assignee: 1
  },
  {
    event_id: 4,
    title: 'Sylvie Grateau',
    start: new Date('2024/05/08 15:00'),
    end: new Date('2024/05/08 24:00'),
    assignee: 2
  },
  {
    event_id: 4,
    title: 'Sylvie Grateau',
    start: new Date('2024/05/09 09:00'),
    end: new Date('2024/05/09 11:00'),
    assignee: 2
  },
  {
    event_id: 5,
    title: 'Mindy Chen',
    start: new Date('2024/05/10 15:00'),
    end: new Date('2024/05/10 24:00'),
    assignee: 3
  },
  {
    event_id: 5,
    title: 'Mindy Chen',
    start: new Date('2024/05/13 09:00'),
    end: new Date('2024/05/13 11:00'),
    assignee: 3
  },
  {
    event_id: 7,
    title: 'AntoineLambert',
    start: new Date('2024/05/19 15:00'),
    end: new Date('2024/05/19 24:00'),
    assignee: 1
  },
  {
    event_id: 7,
    title: 'AntoineLambert',
    start: new Date('2024/05/24 09:00'),
    end: new Date('2024/05/24 11:00'),
    assignee: 1
  }
]

return (
<Scheduler
  view="week"
  height={500}
  week={Week}
  day={Day}
  events={event}
  resourceViewMode="tabs"
  resources={
    [
        {
        assignee: 1,
        text: "Room1", 
        subtext: "KING-SIZE BED", 
        avatar: "https://www.ghibli.jp/images/thumb-arietty1.jpg", 
        color: "#ab2d2d",
        },
        {
            assignee: 2,
            text: "Room2", 
            subtext: "KING-SIZE BED", 
            avatar: "https://www.ghibli.jp/images/thumb-arietty1.jpg", 
            color: "#ab2d2d",
            },
        {
            assignee: 3,
            text: "Room3", 
            subtext: "QUEEN-SIZE BED", 
            avatar: "https://www.ghibli.jp/gallery/marnie005.jpg", 
            color: "#ab2d2d",
        },
        {
            assignee: 4,
            text: "Room4", 
            subtext: "QUEEN-SIZE BED", 
            avatar: "https://www.ghibli.jp/gallery/marnie005.jpg", 
            color: "#ab2d2d",
        },
        {
          assignee: 5,
          text: "Room5", 
          subtext: "SINGLE-SIZE BED", 
          avatar: "https://www.ghibli.jp/images/thumb-arietty1.jpg", 
          color: "#ab2d2d",
      },
    ]
    }
/>

)
}

export default BookList;




//参考：https://codesandbox.io/p/sandbox/resources-7wlcy?file=%2Fsrc%2FApp.tsx%3A1%2C1-103%2C1

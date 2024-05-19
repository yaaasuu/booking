import { NextResponse } from 'next/server';
import * as mysql from 'promise-mysql';

export const config ={
  host: '127.0.0.1',
  database: 'booking',
  user: 'root',
  password: '398Konohana'
}

export let connection:any;

// export function select(){
//   mysql.createConnection(config).then(function(conn) {
//     // do stuff with conn
//     console.log('promise-mysql createConnection.');
//     connection = conn;
//     // select
//     const result = connection.query("SELECT * FROM books");
//     connection.end();
//     console.log("sql結果",result);
//     return result;
// }).catch(function(error) {
//     if (connection && connection.end){
//     connection.end();
//     }
//     console.log("catch error",error);
//     throw error
// });
// }

export async function dbQuery(sql: string) {
  const connection = await mysql.createConnection(config);
  const result = await connection.query(sql);
  connection.end();
  return result;
}
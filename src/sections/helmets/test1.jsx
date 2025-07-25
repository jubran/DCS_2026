import useSWR from "swr";
import axios from "axios";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import Test from "../product1/view/test";
import GetId from "./getId";



export const fetcher = async (...args) => fetch( ...args).then((res) => res.json())
export default function Test1() {
  const [id , setId] = useState(null)
  const { data, error } = useSWR(`/api/api.php?dateQuery=${id}`, fetcher
  );
  
  if (error) {
    return <p>  {error.message}</p>;
    
  }
  if (!data) {
    return <p>Loodings</p>;
  }
  return (
    <div>
     
      {/* <pre>{JSON.stringify(data,null , 2)}s</pre> */}
      {data.map((user) => (
      <h1 onClick={() => setId(user.id)}>{user.location}</h1>
      ))}
      <GetId id={id} />
      
    </div>
  );
}

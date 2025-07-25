import useSWR from "swr";
import { fetcher } from "./test1";


export default function GetId({ id }) { 
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
      <pre>{JSON.stringify(data,null , 2)}</pre>
   
    </div>
  );
}

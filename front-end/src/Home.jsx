import { useState, useEffect } from "react";
import axios from 'axios';
import Spinner from "./components/Spinner";
//import{link} from 'react-router';


export default function Home(){
    const[user ,getUser] = useState([]);
    
    useEffect(()=>{
        axios
        .get('http://localhost:3000/all')
        .then((res)=>{
            console.log(res.status)
            getUser(res.data);
        }).catch((e)=>{
            console.log(e);
        })
    },[]);
 
    return(
        <div>
            {user.map((u)=>(
                
                    <div key={u._id}>
                        <p>.</p>{u.username}
                    </div>
                
            ))}
           
        </div>
    )
}
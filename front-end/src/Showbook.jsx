import {useState, useEffect } from "react";
import axios from "axios";

export default function Showbook(){
    const[book,getBook] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:3000/showbook')
        .then((res)=>{
            getBook(res.data)
        }).catch((e)=>{
            console.log(e);
        })
    },[]);

    return(
        <>
        {book.map((b)=>{
            return( <div key={b._id} >
               <p> {b.title}</p>
            </div>)
           
        })}
        </>
    )
}
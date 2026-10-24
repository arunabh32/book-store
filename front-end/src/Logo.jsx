import * as React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function Logo() {
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
  return ( 
    <div>
        {user.map((u)=>{
          
          return(
             <ListItem alignItems="center">
       
        
        <ListItemText
          primary={u.username}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: 'text.primary', display: 'inline' }}
              >
               
              </Typography>
              {}
            </React.Fragment>
          }
        />
      </ListItem>
          )
          
        })}
  
   </div>
   
  );
}

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';


export default function Register() {
    const[username ,setusername] = useState('');
    const[password,setPassword] = useState('');
    const[message ,setMessage] = useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault()

        const res = await fetch(
            'http://localhost:3000/register',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body: JSON.stringify({username, password}),
            });
            const data = await res.json();
            setMessage(`registed : ${data.username}`);//who displays this?

    }


  return (
    <div>
      <p>LOG-In</p>

    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" value={username} onChange={(e)=>setusername(e.target.value)} placeholder='username' />
      <TextField id="filled-basic" type='password' value={password}  onChange={(e)=> setPassword(e.target.value)} placeholder='password'  />
          <Button variant="contained" onClick={handleSubmit} >Submit</Button>
      
    </Box>

    </div>
  );
}
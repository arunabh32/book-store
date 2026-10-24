import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState} from "react";

export default function AddBook(){
    const[title, setTitle] = useState('')

    const handleSubmit = async (e)=>{
      e.preventDefault();

      const res = await fetch(

        'http://localhost:3000/addBook',{
          method:'POST',
          headers :{'Content-Type' : 'application/json'},
          body:JSON.stringify({title})
        }
      );
      const data = await res.json();
      console.log(data)
    }
    return(
        <>
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <TextField id="1" value={title} placeholder='Add a Book'  variant="standard"
       onChange={(e)=> setTitle(e.target.value)} />
          <Button variant="contained" onClick={handleSubmit} >Submit</Button>
      
    </Box>

        </>

    )
}
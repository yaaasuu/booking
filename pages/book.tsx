import * as React from 'react';
import  { Select, Box, InputLabel, MenuItem, FormControl, Container,CssBaseline, Grid, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from '../components/Header';
import QuiltedImageList from '../components/ImageList';
import axios from "axios";

import {
  Tr,
  Td,
  Link,
} from "@chakra-ui/react";

  const today = new Date()
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);




  const getPlans = async (guests:any,arrival:any,departure:any) => {
    axios.post("/api/book",{
      guests,
      arrival,
      departure,
    }).then(function({data}){
      for (let i = 0; i < data.length; i++){
        const room = data[i].room
        const bed_size = data[i].bed_size
        return(
          <Tr key={i} textAlign="left">
            <Td>{i + 1}</Td>
            <Td>
              <Link
                color="teal.500"
                href="#"
                onClick={() => confirmBook(room)}
              >
                {room}
              </Link>
            </Td>
            <Td>{bed_size}</Td>{" "}
          </Tr>
        )
      }
      // const { roomList } = data.map((room: any, index:number) => {
      //   console.log("roomList", roomList)
      //   return (
      //     <Tr key={index} textAlign="left">
      //       <Td>{index + 1}</Td>
      //       <Td>
      //         <Link
      //           color="teal.500"
      //           href="#"
      //           onClick={() => confirmBook(room)}
      //         >
      //           {room.room}
      //         </Link>
      //       </Td>
      //       <Td>{room.bed_size}</Td>{" "}
      //     </Tr>
      //   );
      // })
      console.log("room",{data})
      // return roomList

    }).catch(function(error){
      console.log(error)
      return error
    })
  }


  const confirmBook = async (room:any) => {
    console.log("confirmBook", room);
  return(
<Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          disabled
          id="outlined-disabled"
          label="Disabled"
          defaultValue="Hello World"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <TextField
          id="outlined-read-only-input"
          label="Read Only"
          defaultValue="Hello World"
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField id="outlined-search" label="Search field" type="search" />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
      </div>
    </Box>
  )
  };

  export default function Book() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guests = data.get('guests')
    const arrival = data.get('arrival')
    const departure = data.get('departure')
    getPlans(guests,arrival,departure)
    // console.log({
    //   guests: data.get('guests'),
    //   arrival: data.get('arrival'),
    //   departure: data.get('departure'),
    // });
  };

  return (
    <Container component="main" maxWidth="lg">
    <CssBaseline />
    <Header title="Hotel Acorn" />

      <Box
        component="main"
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2} columns={13}>
            <Grid item xs={12} sm={13}>
              <FormControl fullWidth>
                <InputLabel id="how-many-guests-label">Guests</InputLabel>
                <Select
                  labelId="how-many-guests-label"
                  id="how-many-guests"
                  // value={guests}
                  label="guests"
                  name="guests"
                  // onChange={handleChangeGuests}
                  required
                  defaultValue={1}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Arrival Date"
                name="arrival"
                // value={arrival}
                defaultValue={tomorrow}
                // onChange={(Date) => setArrival(Date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}  md={5}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                label="Departure Date"
                name="departure"
                // value={departure}
                defaultValue={today}
                // onChange={(Date) => setDeparture(Date)}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                type="submit"
                fullWidth
                variant="outlined"
                sx={{ mt: 1, mb: 2 }}
                color="success"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box
          component="main"
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >

        <QuiltedImageList />
        </Box>
      </Box>
    </Container>
  );
}


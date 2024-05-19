import * as React from 'react';
import type { NextPage } from "next";
import  { Select, Box, InputLabel, MenuItem, FormControl, Container,CssBaseline, Grid, Button, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import Header from '../components/Header';
import QuiltedImageList from '../components/ImageList';
import axios from "axios";
import { RequestStatus } from "../types/status";

import {
  Tr,
  Td,
  Link,
  TableContainer,
  Table,
  Thead,
  Th,
  Tbody,
} from "@chakra-ui/react";



const Home: NextPage = () => {


  const today = new Date()
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [requestStatus, setRequestStatus] =
    React.useState<RequestStatus>("waiting");
  const [roomList, setRoomList] = React.useState<any>("")
  const [roomNumber, setRoomNumber] = React.useState<number>(0)
  const [guests, setGuests] = React.useState<any>(1)
  const [arrival, setArrival] = React.useState<Date>(today)
  const [departure, setDeparture] = React.useState<Date>(tomorrow)
  const [totalCost, setTotalCost] = React.useState<number>(111)
  const [stay, setStay] = React.useState<number>(1)


  const getPlans = async (guests:any,arrival:any,departure:any) => {
    axios.post("/api/book",{
      guests,
      arrival,
      departure,
    }).then(function({data}){
      setRoomList(data.roomList)
      setArrival(data.arrival)
      setDeparture(data.departure)
      setRequestStatus("requested")
      console.log("room",{data})
      // return roomList

    }).catch(function(error){
      console.log(error)
      return error
    })
  }

  const roomListTr = (roomList:any[]) => {
    console.log("Tr",roomList)
      const rows = roomList.map((room: any, index:number) => {
        console.log("roomList", roomList)

        return (
          <Tr key={index} textAlign="center">
            <Td>
            <Link
                color="teal.500"
                href="#"
                onClick={() => confirmBook(room)}
              >
              ROOM {index + 1}
              </Link>
            </Td>
            <Td>{room.price}</Td>
            <Td>{room.bed_size}</Td>
            <Td>{room.description}</Td>
          </Tr>
        );
      })

  return rows;
  }

  const confirmBook = async (room:any) => {
    setRequestStatus("confirmed");
    console.log("confirmBook", room);
    setRoomNumber(room.room)
    const price = room.price
    const daycost = parseFloat(price.replace(/[^\d.-]/g, ''));

    const arr = new Date(arrival)
    const dep = new Date(departure)
    // 日数を計算するために、ミリ秒単位での日付の差を計算
    const differenceInMilliseconds = dep.getTime() - arr.getTime();
    // ミリ秒を日数に変換
    const stay = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    setStay(stay)
    const sum = stay * daycost
    setTotalCost(sum)
    // console.log("合計",sum)
  };

  const bookNow = async (room:number,guests:any,arrival:any,departure:any,firstName:any,lastName:any,phoneNumber:any,passportNumber?:any,remarks?:any) => {
    axios.post("/api/confirm",{
      room,
      guests,
      arrival,
      departure,
      firstName,
      lastName,
      phoneNumber,
      passportNumber,
      remarks
    }).then(response =>{
      const redirectTo = response.data.redirectTo;
      window.location.href = redirectTo;
    }).catch(function(error){
      console.log(error)
      return error
    })
  }

  const handleSubmitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guests = data.get('guests')
    const arrival = data.get('arrival')
    const departure = data.get('departure')
    setGuests(guests)
    getPlans(guests,arrival,departure)

  };

  const handleSubmitBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const guests = data.get('guests')
    const arrival = data.get('arrival')
    const departure = data.get('departure')
    const firstName = data.get('firstName')
    const lastName = data.get('lastName')
    const phoneNumber = data.get('phoneNumber')
    const passportNumber = data.get('passportNumber')
    const remarks = data.get('remarks')
    console.log("dep",departure)
    bookNow(roomNumber,guests,arrival,departure,firstName,lastName,phoneNumber,passportNumber,remarks)
  };

  return (
    <Container component="main" maxWidth="xl">
    <CssBaseline />
    <Header title="Hotel Acorn" />
    {requestStatus == "waiting" && (
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
            <Box component="form" noValidate onSubmit={handleSubmitSearch} sx={{ mt: 3 }}>
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
                    defaultValue={today}
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
                    defaultValue={tomorrow}
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
    )}
    {requestStatus == "requested" && (
            <Box
            component="main"
            sx={{
              marginTop: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flexGrow: 1,
            }}
            height={1000}>
            <TableContainer>
              <Table variant="striped" colorScheme="green" size="lg" style={{ borderSpacing: '100rem' }}>
                <Thead>
                  <Tr bg="green.300">
                    <Th minW="200">Plan</Th>
                    <Th minW="200">Price</Th>
                    <Th minW="200">Bed Size</Th>
                    <Th minW="200">description</Th>
                  </Tr>
                </Thead>
                <Tbody>{roomListTr(roomList)}</Tbody>
              </Table>
            </TableContainer>
          </Box>
    )}
    {requestStatus == "confirmed" && (

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

<Box component="form" noValidate onSubmit={handleSubmitBook} sx={{ mt: 3 }} >
  <Grid container spacing={4} columns={13}>
    <Grid item xs={12} sm={13}>
      <FormControl fullWidth>
        <TextField
                required
                id="standard-required"
                label="First Name"
                name="firstName"
                defaultValue=""
          />
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={13}>
      <FormControl fullWidth>
        <TextField
                required
                id="standard-required"
                label="Last Name"
                name="lastName"
                defaultValue=""
          />
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={13}>
      <FormControl fullWidth>
        <TextField
          required
          id="standard-required"
          label="Phone Number  ex:xxx-xxxx-xxxx"
          name="phoneNumber"
          defaultValue=""
        />
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={13}>
      <FormControl fullWidth>
        <TextField
          id="standard"
          label="Passport Number"
          name="passportNumber"
          defaultValue=""
        />
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={13}>
      <FormControl fullWidth>
        <TextField
            id="standard-helperText"
            label="Remarks"
            name="remarks"
            defaultValue=""
            helperText="Shall you have special enquiry or shall you need futher information, please tell us. "
          />
      </FormControl>
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        id="standard-read-only-input"
        label="Guests"
        name="guests"
        defaultValue={guests}
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
          id="standard-read-only-input"
          label="Arrival"
          name="arrival"
          defaultValue={arrival}
          InputProps={{
            readOnly: true,
          }}
          variant="standard"
        />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        id="standard-read-only-input"
        label="Departure"
        name="departure"
        defaultValue={departure}
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
    </Grid>
    <Grid item xs={12} sm={3}>
      <TextField
        id="standard-read-only-input"
        label="Total Cost"
        name="TotalCost"
        defaultValue={totalCost}
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
    </Grid>
    <Grid item xs={12} sm={1}>
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 1, mb: 2 }}
        color="success"
      >
        Book
      </Button>
    </Grid>
  </Grid>
</Box>


</Box>

    )}
    </Container>
  );
}

export default Home;
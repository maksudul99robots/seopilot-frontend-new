"use client"
import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField,
  Card,
  Grid
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import { LoginRegistrationAPI } from "../services/API";
import { setAlert } from "../GlobalRedux/Features/Alert/alertSlice";
import jwt_decode from "jwt-decode";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ValidateEmail } from "../services/emailValidation";
import Logo from "../(DashboardLayout)/layout/shared/logo/Logo";


const ResetPassword = (props: any) => {
  const paramString = useSearchParams();
  const [email, setEmail] = useState('');
  const [param, setParam] = useState(paramString.get('token'));
  const [password, setPassword] = useState('');
  const [conPassword, setconPassword] = useState('');
  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (param) {
      try {
        let decoded: any = jwt_decode(param);
        setEmail(decoded.email)
      } catch (e) {
        Swal.fire({
          title: 'Error!',
          text: 'Invalid Token',
          icon: 'error',
          confirmButtonText: 'Close',
        }).then(res => {
          router.push('/')
        })

      }

    }


  }, [param])
  const submit = () => {
    if ((email && email.length > 1)) {

      if (ValidateEmail(email)) {
        if(password.length>6){
          if (password == conPassword) {
          setDisable(true);
          setLoading(true);
          LoginRegistrationAPI.resetPassword({ password: password, email: email }).then(response => {
            if (response.status == 202) {
              // dispatch(setAlert({ title: "Success", icon: 'success', text: "Password changed successfully" }))
              Swal.fire({
                title: 'success!',
                text: 'Password changed successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(res => {
                router.push('/login')
              })
            } else {
              dispatch(setAlert({ title: "Error", icon: 'error', text: "Error occured" }))
            }
            setDisable(false);
            setLoading(false);
          }).catch(e => {
            dispatch(setAlert({ title: "Error", icon: 'error', text: "Error occured" }));
            setDisable(false);
            setLoading(false);
          })
        }else{
          dispatch(setAlert({ title: "Error", icon: 'error', text: "Password should match." }));
        }
        }else{
          dispatch(setAlert({ title: "Error", icon: 'error', text: "Password should be longer than 6." }));
        }
        

      }
    }
  }

  return (


    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "#FCFCFC",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >

        <Box display="flex" alignItems="center" justifyContent="center" sx={{ paddingTop: "8vh" }}>
          <Logo />
        </Box>


        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "50vh" }}
        >

          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >


            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >

              <>

                {/* <Typography fontWeight="700" variant="h2" mb={1} display="flex" justifyContent="center">
                    Reset Password
                  </Typography> */}
                <Typography
                  variant="h3"
                  textAlign="center"
                  color="textSecondary"
                  mb={2}
                  sx={{ color: "#5A5A5A", fontWeight: "bold" }}
                >
                  Reset Password
                </Typography>



                <Stack>
                  <Box mt="25px">
                    <Box display='flex' justifyContent='space-between'>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="password"
                        mb="5px"
                      >
                        Password
                      </Typography>

                    </Box>

                    <TextField type="password" variant="outlined" fullWidth onChange={e => { setPassword(e.target.value) }} />
                  </Box>
                  <Box mt="25px">
                    <Box display='flex' justifyContent='space-between'>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        component="label"
                        htmlFor="password"
                        mb="5px"
                      >
                        Confirm Password
                      </Typography>

                    </Box>

                    <TextField type="password" variant="outlined" fullWidth onChange={e => { setconPassword(e.target.value) }} />
                  </Box>
                </Stack>
                <Box>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    style={{ color: disable ? "#595959" : "white", marginTop: "30px" }}
                    onClick={() => submit()}
                    disabled={disable}
                    loading={loading}
                    loadingPosition="end"

                  >
                    Save Password
                  </LoadingButton>
                </Box>
                {/* {subtitle} */}
              </>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>


  )


}




export default ResetPassword;

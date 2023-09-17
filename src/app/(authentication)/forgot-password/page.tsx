"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, Button, TextField } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { useEffect, useState } from "react";
import { setAlert } from "@/app/GlobalRedux/Features/Alert/alertSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ValidateEmail } from "@/app/services/emailValidation";
import { LoginRegistrationAPI } from "@/app/services/API";
import { useRouter,useSearchParams } from "next/navigation";
import LoadingButton from "@mui/lab/LoadingButton";
import jwt_decode from "jwt-decode";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";

const ForgotPassword = () => {
  const paramString = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  

  useEffect(() => {
    if (email.length > 1){
      if(ValidateEmail(email)){
         setIsEmailValid(true)
         setDisable(false)
      }else{
        setIsEmailValid(false)
        setDisable(true)
      }
     
    }
    

  }, [email])

  useEffect(() => {
    if (email.length > 1 && isEmailValid && password.length > 6) {
      setDisable(false);
    } else {
      setDisable(true)
    }
  }, [email, password])



  const submit = () => {
    if ((email && email.length > 1)) {

      if(isEmailValid){
        setLoading(true);
        setDisable(true)
        LoginRegistrationAPI.sendForgotPasswordEmail({email:email}).then(response=>{
          if(response.status==201){
            dispatch(setAlert({title:"Sent", icon:'success', text:"Please Check your email."}))
          }else {
            dispatch(setAlert({title:"Error", icon:'error', text:"Error occured"}))
          }
          setLoading(false);
          setDisable(false)
        }).catch(e=>{
          dispatch(setAlert({title:"Error", icon:'error', text:e.message}))
          setLoading(false);
          setDisable(false)
        })
      }
    }
  }

  return (
    <PageContainer title="Forgot Password">
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
                <Stack>
                <Typography
                      variant="h3"
                      textAlign="center"
                      color="textSecondary"
                      mb={2}
                      sx={{ color: "#5A5A5A", fontWeight: "bold" }}
                    >
                      Forgot Password
                    </Typography>
                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      component="label"
                      htmlFor="email"
                      mb="5px"
                    >
                      Email
                    </Typography>
                    <TextField variant="outlined" fullWidth onChange={e => { setEmail(e.target.value) }} error={!isEmailValid} />
                  </Box>
                </Stack>
                <Box>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    type="submit"
                    style={{ color: (!isEmailValid && disable) ? "#595959" : "white", marginTop: "30px" }}
                    onClick={() => submit()}
                    disabled={!isEmailValid && disable}
                    loading={loading}
                    loadingPosition="end"

                  >
                    Send Verification Code
                  </LoadingButton>
                </Box>
                {/* {subtitle} */}
              </>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default ForgotPassword;

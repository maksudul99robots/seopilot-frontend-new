"use client";
import Link from "next/link";
import { Grid, Box, Card, Stack, Typography, Button } from "@mui/material";
// components
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import AuthLogin from "../auth/AuthLogin";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { setAlert } from "@/app/GlobalRedux/Features/Alert/alertSlice";
import { useDispatch, useSelector } from 'react-redux';
import { ValidateEmail } from "@/app/services/emailValidation";
import { LoginRegistrationAPI } from "@/app/services/API";
import { setUserValue } from "@/app/services/UserService";
import { useRouter } from "next/navigation";

const Login2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("extension_id"))
      Swal.fire({
        title: 'Enter your Extension ID',
        input: 'text',
        inputLabel: 'Settings > Extensions > Copy SEOPilot Extension ID.',
        inputValue: "",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Enter your Extension ID!'

          }
        }
      }).then((res) => {
        if (res?.value?.length > 10) {
          localStorage.setItem("extension_id", res?.value);
        }
      })
  }, [])

  const sendTokenToExtension = (token: string) => {
    if (localStorage.getItem("extension_id")) {
      // console.log("sending!!")
      chrome.runtime.sendMessage(
        localStorage.getItem("extension_id"), // Extension ID
        { action: "storeToken", token: token },
        (response) => {
          console.log("response:",response)
          if (response && response.success) {
            console.log("Token stored in extension's local storage.",response);
          } else {
            console.error("Failed to store token in extension.");
          }
        }
      );
    }

  };
  useEffect(() => {
    if (email.length > 1)
      setIsEmailValid((ValidateEmail(email)))
    else
      setIsEmailValid(true)


  }, [email])

  useEffect(() => {
    if (email.length > 1 && isEmailValid && password.length > 6) {
      setDisable(false);
    } else {
      setDisable(true)
    }
  }, [email, password])



  const submit = () => {
    if (localStorage.getItem("extension_id")) {
      if ((email && email.length > 1)) {

        if (password && password.length < 7)
          dispatch(setAlert({ title: "Error", icon: 'error', text: "Password must be at least 6 characters long." }))
        else {
          setLoading(true)
          LoginRegistrationAPI.login({ email, password }).then((res) => {
            console.log("res:",res)
            if (res.status == 200) {
              setLoading(false)
              sendTokenToExtension(res.data.accessToken);
              localStorage.setItem("seo-pilot-token", res.data.accessToken);
              setUserValue(res.data.accessToken)
              router.push('/')
            }
          }).catch((error) => {
            console.log("error:", error)
            setLoading(false)
            dispatch(setAlert({ title: "Error", icon: 'error', text: error?.response?.data }))
          })

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

              <AuthLogin
                setEmail={setEmail}
                setPassword={setPassword}
                submit={submit}
                isEmailValid={isEmailValid}
                disable={disable}
                loading={loading}
                subtext={
                  <>
                    <Typography
                      variant="h3"
                      textAlign="center"
                      color="textSecondary"
                      mb={2}
                      sx={{ color: "#5A5A5A", fontWeight: "bold" }}
                    >
                      Sign In to SEOPilot
                    </Typography>
                    <Typography
                      variant="h6"
                      textAlign="center"
                      color="textSecondary"
                      mb={4}
                      sx={{ color: "#B5B5C3", fontWeight: "bold" }}
                    >
                      New Here?&nbsp;
                      <Link href="/register" style={{ textDecoration: "none" }}>

                        <span style={{ color: "#009EF7", fontWeight: "bold", }}>Create an Account to SEOPilot</span>

                      </Link>

                    </Typography>
                  </>

                }
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="500"
                    >
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",
                      }}
                    >
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login2;

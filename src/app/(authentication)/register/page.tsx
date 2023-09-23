"use client";
import { Grid, Box, Card, Typography, Stack } from "@mui/material";
import Link from "next/link";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthRegister from "../auth/AuthRegister";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { ValidateEmail } from "@/app/services/emailValidation";
import { LoginRegistrationAPI } from "@/app/services/API";
import { setAlert } from "@/app/GlobalRedux/Features/Alert/alertSlice";
import Logo from "@/app/(DashboardLayout)/layout/shared/logo/Logo";
import Swal from "sweetalert2";

const Register2 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [extensionId, setExtensionId] = useState<string|null|undefined>('')
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    if (window.location.hostname.includes("app.seopilot.io")) {
      setExtensionId(process.env.NEXT_PUBLIC_EXT_ID)
    } else {
      if (!localStorage.getItem("extension_id")){
        Swal.fire({
          html: '<h3>Enter your Extension ID</h3>',
          icon: "info",
          input: 'text',
          inputLabel: 'Settings > Extensions > Copy SEOPilot Extension ID.',
          inputValue: "",
          showCancelButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
          inputValidator: (value) => {
            if (!value) {
              return 'Enter your Extension ID!'

            }
          }
        }).then((res) => {
          if (res?.value?.length > 10) {
            localStorage.setItem("extension_id", res?.value);
            setExtensionId(res?.value);
          }
        })
      }else{
        setExtensionId(localStorage.getItem("extension_id"));
      }
        
    }

  }, [])
  
  const sendTokenToExtension = (token: string) => {
    if (extensionId && extensionId.length>1) {
      // console.log("sending!!")
      chrome.runtime.sendMessage(
        // localStorage.getItem("extension_id"), // Extension ID
        extensionId,
        { action: "storeToken", token: token },
        (response) => {
          // console.log("response:", response)
          if (response && response.success) {
            // console.log("Token stored in extension's local storage.", response);
          } else {
            console.error("Failed to store token in extension.");
          }
        }
      );
    }

  };

  const submit = () => {
    if (isEmailValid) {
      if (password.length > 6) {
        if (password == confirmPassword) {
          setLoading(true);
          LoginRegistrationAPI.register({ email, password, confirmPassword, firstName, lastName }).then((res) => {
            setLoading(false);
            // dispatch(setAlert({title:"Success", icon:'success', text:"A verification email is sent."}))
            Swal.fire(
              'Success',
              'A verification email is sent.',
              'success'
            ).then(()=>{
              sendTokenToExtension(res.data.accessToken);
              localStorage.setItem("seo-pilot-token", res.data.accessToken);
              router.push("/")
            })
          }).catch((e) => {
            console.log(e)
            setLoading(false);
            dispatch(setAlert({ title: "Error", icon: 'error', text: e.response.data }))
          })

        } else {
          dispatch(setAlert({ title: "Error", icon: 'error', text: "Password must be at least 7 characters long." }))
        }
      }
    } else {
      dispatch(setAlert({ title: "Error", icon: 'error', text: "Email is not valid" }))
    }
  }

  useEffect(() => {
    if (email.length > 1 && isEmailValid && password.length > 6 && password == confirmPassword) {
      setDisable(false);
    } else {
      setDisable(true)
    }
  }, [email, password, confirmPassword])

  useEffect(() => {
    if (email.length > 1)
      setIsEmailValid((ValidateEmail(email)))
    else
      setIsEmailValid(true)


  }, [email])


  return (
    <PageContainer title="Register" description="this is Register page">
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
              <AuthRegister
                subtext={
                  <Typography
                    variant="h3"
                    textAlign="center"
                    color="textSecondary"
                    mb={3}
                  >
                    Create an account
                  </Typography>
                }
                subtitle={
                  <Stack
                    direction="row"
                    justifyContent="center"
                    spacing={1}
                    mt={3}
                  >
                    <Typography
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                    >
                      Already have an Account?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/login"
                      fontWeight="500"
                      sx={{
                        textDecoration: "none",
                        color: "primary.main",

                      }}
                    >
                      Sign In
                    </Typography>
                  </Stack>
                }
                disable={disable}
                loading={loading}
                submit={submit}
                setFirstname={setFirstname}
                setLastname={setLastname}
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                isEmailValid={isEmailValid}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>

  )

}

export default Register2;

'use client';
import { useRouter, useSearchParams } from "next/navigation";
import { LoginRegistrationAPI } from "../services/API"
import { useEffect, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js';


const VerifyEmail = () => {
  const paramString = useSearchParams();
  const [param, setParam] = useState(paramString.get('token'));
  const router = useRouter();
  useEffect(() => {
    if (param) {
      if (param?.length > 8) {
        checkVerification(param);
      }
    }

  }, [param])


  const sendTokenToExtension = (token:string) => {
    if (localStorage.getItem("extension_id")) {
      // console.log("sending!!")
      chrome.runtime.sendMessage(
        localStorage.getItem("extension_id"), // Extension ID
        { action: "storeToken", token: token },
        (response) => {
          console.log("response:", response)
          if (response && response.success) {
            console.log("Token stored in extension's local storage.", response);
          } else {
            console.error("Failed to store token in extension.");
          }
        }
      );
    }

  };
  const delay = (ms:any) => new Promise(res => setTimeout(res, ms));

  const checkVerification = async(token:string) => {
    await delay(1000);
    console.log("inside checkVerification");
    LoginRegistrationAPI.checkVerification({ token }).then(res => {
      console.log(res)
      if (res.status == 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Registration completed',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
            sendTokenToExtension(res.data.accessToken);
            localStorage.setItem("seo-pilot-token", res.data.accessToken);
            router.push("/")
        })
      }
    }).catch(err => {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: 'Registration failed',
        icon: 'error',
        confirmButtonText: 'Close',
      }).then(res => {
        // router.push('/login')
      })
    })
  }
  return (
    <>
    
    </>
  )

}

export default VerifyEmail
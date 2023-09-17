'use client'
import { Grid, Box, Alert, AlertTitle } from '@mui/material';
import PageContainer from '@/app/(DashboardLayout)/components/container/PageContainer';
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import { LoginRegistrationAPI } from '../services/API';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const [isActive, setIsActive] = useState(true);
  const [email, setEmail] = useState('');
  useEffect(() => {
    let token = localStorage.getItem('seo-pilot-token');
    if (token) {
      let decoded: any = jwt_decode(token);
      if (decoded) {
        setIsActive(decoded.is_active)
        setEmail(decoded.email);
      }
    }else{
      
    }
  }, [])

  const resendEmail = ()=>{
    if(email.length > 4){
      LoginRegistrationAPI.resendVerificationEmail({email}).then((res)=>{
        if(res.status == 200){
          Swal.fire({
            title: 'Sent!',
            text: 'A Verification email is sent',
            icon: 'success',
            confirmButtonText: 'Ok',
          })
        }
      }).catch(e=>{
        Swal.fire({
          title: 'Failed!',
          text: 'Something went wrong',
          icon: 'error',
          confirmButtonText: 'Close',
        })
      })
    }
  }
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {
          !isActive &&
          <Alert severity="warning" sx={{ backgroundColor: "#FFF4E5", width: "1000px", height: "40px", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center", }}>
            Please verify your email to get full access! Didn't receive email? <span onClick={e=>resendEmail()} style={{cursor:"pointer", fontWeight:"bold"}}>Click here</span> to resend email.
          </Alert>

        }

      </div>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

        {/* <Publications/> */}

        <Alert severity="info" sx={{ backgroundColor: "#c8f0ff", width: "1000px", height: "100px", fontSize: "24px", display: "flex", justifyContent: "center", alignItems: "center", marginTop: "200px" }}>
          Close the extension and reopen it to get logged in.
        </Alert>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;

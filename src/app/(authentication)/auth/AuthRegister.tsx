import React from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import Link from 'next/link';

import CustomTextField from '@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';
import { LoadingButton } from '@mui/lab';
const AuthRegister = ({ title, subtitle, subtext, submit, setFirstname, setLastname, setEmail, setPassword, isEmailValid, setConfirmPassword, disable, loading }: any) => (
    <>
        {title ? (
            <Typography fontWeight="700" variant="h2" mb={1}>
                {title}
            </Typography>
        ) : null}

        {subtext}

        <Box>
            <Stack mb={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ mr: "5px" }}>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='name' mb="5px" >First Name</Typography>
                        <TextField id="name" variant="outlined" fullWidth onChange={e => setFirstname(e.target.value)} />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1"
                            fontWeight={600} component="label" htmlFor='name' mb="5px">Last Name</Typography>
                        <TextField id="name" variant="outlined" fullWidth onChange={e => setLastname(e.target.value)} />
                    </Box>

                </Box>


                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='email' mb="5px" mt="25px">Email Address</Typography>
                <TextField id="email" variant="outlined" fullWidth onChange={e => setEmail(e.target.value)} error={!isEmailValid} />

                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px" >Password</Typography>
                <TextField id="password" variant="outlined" fullWidth type={"password"} onChange={e => setPassword(e.target.value)} />
                <Typography variant="subtitle1"
                    fontWeight={600} component="label" htmlFor='password' mb="5px" mt="25px" >Confirm Password</Typography>
                <TextField id="password" variant="outlined" fullWidth type={"password"} onChange={e => setConfirmPassword(e.target.value)} />
            </Stack>
            <LoadingButton color="primary" variant="contained" size="large" style={{ color: disable ? "#595959" : "white" }} fullWidth onClick={() => submit()}
                disabled={disable}
                loading={loading}>
                Sign Up
            </LoadingButton>
        </Box>
        {subtitle}
    </>
);

export default AuthRegister;

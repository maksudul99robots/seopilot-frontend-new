import React from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  TextField
} from "@mui/material";
import { LoadingButton } from '@mui/lab';

import Link from "next/link";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
  submit?: any;
  setPassword?: any;
  setEmail?: any;
  isEmailValid?: boolean;
  disable?: boolean
  loading?: boolean
}

const AuthLogin = ({ title, subtitle, subtext, submit, setPassword, setEmail, isEmailValid, disable, loading }: loginType) => (


  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
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
          <Typography
            component={Link}
            href="/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: "none",
              color: "primary.main",
            }}
          >
            Forgot Password ?
          </Typography>
        </Box>

        <TextField type="password" variant="outlined" fullWidth onChange={e => { setPassword(e.target.value) }} />
      </Box>
      <Stack
        justifyContent="space-between"
        direction="row"
        alignItems="center"
        my={2}
      >
        {/* <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remeber this Device"
          />
        </FormGroup> */}

      </Stack>
    </Stack>
    <Box>
      <LoadingButton
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        style={{ color: disable ? "#595959" : "white" }}
        onClick={() => submit()}
        disabled={disable}
        loading={loading}
        loadingPosition="end"

      >
        Sign In
      </LoadingButton>
    </Box>
    {/* {subtitle} */}
  </>
);

export default AuthLogin;

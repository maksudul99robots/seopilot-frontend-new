import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { IconListCheck, IconMail, IconUser } from "@tabler/icons-react";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const router = useRouter();
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [email, setEmail] = useState('');
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  useEffect(()=>{
    let token = localStorage.getItem('seo-pilot-token');
    if (token) {
      let decoded: any = jwt_decode(token);
      if (decoded.email) {
        setEmail(decoded.email)
      }
    }
  },[])

  const logout = () => {
    localStorage.removeItem("seo-pilot-token");
    router.push("/login");

    chrome.runtime.sendMessage(
      localStorage.getItem("extension_id"), // Extension ID
      { action: "removeToken" },
      (response) => {
        console.log(response)
        if (response && response.success) {
          console.log("Token stored in extension's local storage.", response);
        } else {
          console.error("Failed to store token in extension.");
        }
      }
    );

  }

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            color: "primary.main",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src="/images/profile/user-2.jpg"
          alt="image"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "200px",
          },
        }}
      >
        {/* <MenuItem>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconMail width={20} />
          </ListItemIcon>
          <ListItemText>My Account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem> */}
        <Box mt={1} py={1} px={2}>
          <Typography
            variant="subtitle2"
            textAlign="center"
            color="textSecondary"
            mb={2}
            sx={{ color: "#5A5A5A", fontWeight: "bold" }}
          >
            {email}
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Menu >
    </Box >
  );
};

export default Profile;

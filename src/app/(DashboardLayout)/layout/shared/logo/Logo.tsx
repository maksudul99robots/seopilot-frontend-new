import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "180px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent:"center",
  textDecoration:"none",
  fontSize:"24px",
  color:"#000",
  fontWeight:"600"
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <div>
        <Image src="/images/logos/logo512.png" alt="logo" height={100} width={100} priority /> <br></br>
        <p style={{textDecoration:"none"}}>SEOPilot</p>
      </div>

    </LinkStyled>
  );
};

export default Logo;

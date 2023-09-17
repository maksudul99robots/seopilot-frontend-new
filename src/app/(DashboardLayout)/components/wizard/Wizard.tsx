import Link from "next/link";
import { Box, Card, styled } from "@mui/material";
import Steps from "./steps/Steps";
import Overview from "./Overview";
import { useState } from "react";
import AdPlacement from "./AdPlacements";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center"
}));

const Wizard = () => {
  const [activeTab, setActiveTab] = useState(2);
  return (
    // <LinkStyled href="/">
    <Card sx={{ padding: 0, height: '100%', width: "100%", m: "auto" }} elevation={9}>

      <Box sx={{ display: 'flex', justifyContent: "center", py: "48px" }}>
        <Steps />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: "center" }}>
        {
          activeTab==1?
        <Overview />
        : activeTab==2?
          <AdPlacement/>
        :
          null
        }
      </Box>

    </Card>
    // </LinkStyled>
  );
};

export default Wizard;

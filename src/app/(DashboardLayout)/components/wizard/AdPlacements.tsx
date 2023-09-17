import { Box, Button, Input, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react";
import EastIcon from '@mui/icons-material/East';
import { IOSSwitch } from "../dashboard/IosSwitch";
import DedicatedEmails from "./DedicatedEmails";
import WestIcon from '@mui/icons-material/West';
import SponsoredEmails from "./SponsoredEmails";
const AdPlacement = () => {

    const [dedicatedEmail, setDedicatedEmail] = useState(false); 
    const [sponsoredEmail, setSponsoredEmail] = useState(false); 
    const [seNumber, setSeNumber]= useState(0); 

    return (
        <Box sx={{ maxWidth: "500px", paddingBottom: "30px" }}>
            <Box sx={{ paddingBottom: "10px" }}>
                <h2>Sponsorship Formats</h2>
                <span>Select the sponsorship formats you'd like to offer.</span>
            </Box>
            <Box sx={{ paddingBottom: "10px", margin:"5px 5px 5px 0px" }} display={"flex"} justifyContent={"space-between"}>
                <Box>
                    <h4 style={{margin:"0px"}}>Dedicated Email</h4>
                    <span>An email that only contains advertorial content. Also called an e-blast.
                    </span>
                </Box>
                <Box>
                    <IOSSwitch onChange={e=>{setDedicatedEmail(!dedicatedEmail)}} checked={dedicatedEmail}/>
                </Box>

            </Box>
            <Box sx={{ paddingBottom: "10px", margin:"5px 5px 5px 0px" }} display={"flex"} justifyContent={"space-between"}>
                <Box>
                    <h4 style={{margin:"0px"}}>Sponsored Email</h4>
                    <span>Native ads that appear alongside your regular newsletter content.</span>
                </Box>
                <Box>
                    <IOSSwitch onChange={e=>{setSponsoredEmail(!sponsoredEmail)}} checked={sponsoredEmail}/>
                </Box>

            </Box>
            {
                dedicatedEmail &&
                <DedicatedEmails/>
            }
            {
                sponsoredEmail &&
                <SponsoredEmails/>
            }
            <Box sx={{ paddingBottom: "10px", paddingTop:"20px" }} display={"flex"} justifyContent={"space-between"}>
                <Button variant="contained" color="secondary" style={{ color: "#131313" }} startIcon={<WestIcon />}>Back</Button>
                <Button variant="contained" color="primary" style={{ color: "#fff" }} endIcon={<EastIcon />}>Continue</Button>
            </Box>
        </Box>

    )
}
export default AdPlacement;
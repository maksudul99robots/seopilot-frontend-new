import { Box, Button, Input, MenuItem, Select, TextField, TextareaAutosize, Typography } from "@mui/material"
import Image from "next/image";
import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import EastIcon from '@mui/icons-material/East';

const Review = () => {
    const [file, setFile] = useState<any>(undefined);
    const [category, setCategory] = useState<any>(10);

    const handleChange = (event: any) => {
        setFile(URL.createObjectURL(event.target.files[0]));
    }
    return (
        <Box sx={{ maxWidth: "500px", paddingBottom: "30px" }}>
            <Box sx={{ paddingBottom: "10px" }}>
                <h3>Newsletter Details</h3>
                <span>Give advertisers more information to get more sponsorships more often. Complete profiles are 2x more likely to get booked.</span>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    NewsLetter Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField variant="outlined" fullWidth onChange={e => { }} />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    URL <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField variant="outlined" fullWidth onChange={e => { }} />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    mb="205px"
                >
                    Upload Logo <span style={{ color: "red" }}>*</span>
                </Typography><br />

                <label htmlFor="raised-button-file"><EditIcon /></label><br />

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    onChange={handleChange}
                />
                <Image src={file ? file : "/images/products/placeholder.png"} alt={""} width={125} height={125} /><br />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    What's your newsletter about? <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Describe your audience to advertisers <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>

            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    What category best describes your newsletter? <span style={{ color: "red" }}>*</span>
                </Typography>
                <Select
                    fullWidth
                    value={category}
                    onChange={e => { setCategory(e.target.value) }}
                >
                    <MenuItem value={10}>Web</MenuItem>
                    <MenuItem value={20}>Marketing</MenuItem>
                    <MenuItem value={30}>Business</MenuItem>
                    <MenuItem value={40}>Sports</MenuItem>
                    <MenuItem value={50}>Gym</MenuItem>
                </Select>
            </Box>

            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Number of Subscribers <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <span>The number of active subscribers to your newsletter. It should not include bounces or people who have unsubscribed.</span>
            </Box>

            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Total Unique Opens Per Email <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <span>This is the number of subscribers who open each newsletter. It should be the unique count and shouldn't be a percentage. Use an average from your most recent sends.</span>
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Total Unique Clicks Per Email <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>
            <Box sx={{ paddingBottom: "10px" }}>
                <span>This is the number of subscribers who click on any link per newsletter. It should be the unique count and shouldn't be a percentage. Use an average from your most recent sends.
                </span>
            </Box>
            <Box sx={{ paddingBottom: "10px" }} display={"flex"} justifyContent={"end"}>
                <Button variant="contained" color="primary" style={{ color: "#fff" }} endIcon={<EastIcon />}>Continue</Button>
            </Box>

        </Box>
    )
}
export default Review;
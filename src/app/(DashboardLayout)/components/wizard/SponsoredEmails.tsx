
import { Box, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Radio, RadioGroup, TextField, Typography } from "@mui/material"
import { MuiFileInput } from "mui-file-input";
import { useState } from "react";

const SponsoredEmails = () => {
    const [file, setFile] = useState(null)
    // const [position, setPosition] = useState(null)
    const [top, setTop] = useState<any>(null)
    const [bottom, setBottom] = useState<any>(null)
    const [middle, setMiddle] = useState<any>(null)
    const [others, setOthers] = useState<any>(null)

    const handleChange = (newFile: any) => {
        setFile(newFile)
    }

    return (
        <Box sx={{ border: "#009EF7 2px dotted", padding: "20px" }}>
            <Box sx={{ marginBottom: "20px" }}>
                <h3>Sponsored Email</h3>
                <span>Subscribers & Opens</span>

            </Box>
            <Box>
                <h4>Sample Email <span style={{ fontSize: "16px", fontWeight: "400" }}>(optional)</span></h4>
                <MuiFileInput value={file} onChange={handleChange} />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
                <span>Upload a recent example of your newsletter. This should be an HTML or EML file. Accepted filetypes: HTML, EML files
                </span>
            </Box>
            <Box >
                <h3>Placement Details</h3>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Placement Name  <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={1}
                    variant="outlined"
                    fullWidth
                    onChange={e => { }}
                />
            </Box>
            <Box >
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={top}
                        onChange={e => {
                            setTop(e.target.value)
                            setMiddle(null)
                            setBottom(null)
                            setOthers(null)
                        }}
                    >
                        <FormControlLabel value="top" control={<Radio />} label="Top" />
                    </RadioGroup>
                </FormControl>
            </Box>

            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={middle}
                    onChange={e => {
                        setMiddle(e.target.value)
                        setTop(null)
                        setBottom(null)
                        setOthers(null)
                    }}
                >
                    <FormControlLabel value="middle" control={<Radio />} label="Middle" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={bottom}
                    onChange={e => {
                        setTop(null)
                        setMiddle(null)
                        setBottom(e.target.value)
                        setOthers(null)
                    }}
                >
                    <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={others}
                    onChange={e => {
                        setOthers(e.target.value)
                        setTop(null)
                        setBottom(null)
                        setMiddle(null)
                    }}
                >
                    <FormControlLabel value="others" control={<Radio />} label="Others" />
                </RadioGroup>
            </FormControl>
            <Box sx={{ marginBottom: "20px" }}>
                <span>Select where the placement is located within your newsletter
                </span>
            </Box>
            <Box>
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Price <span style={{ color: "red" }}>*</span>
                </Typography>

                <Box display={"flex"} justifyContent={"space-between"}>


                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-amount"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Amount"
                        />
                    </FormControl>
                </Box>
            </Box>




        </Box>
    )
}

export default SponsoredEmails;
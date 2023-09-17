import { CheckCircleOutlined } from "@mui/icons-material"
import { Box, Button, FormControl, Input, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material"
import { MuiFileInput } from 'mui-file-input'
import { useState } from "react"

const DedicatedEmails = () => {
    const [file, setFile] = useState(null)

    const handleChange = (newFile: any) => {
        setFile(newFile)
    }
    return (
        <Box>
            <Box sx={{ marginBottom: "20px" }}>
                <h3>Dedicated Email</h3>
                <span>Performance & Pricing</span>

            </Box>
            <Box>
                <h4>Sample Email <span style={{fontSize:"16px", fontWeight:"400"}}>(optional)</span></h4>
                <MuiFileInput value={file} onChange={handleChange} />
            </Box>
            <Box sx={{ marginBottom: "20px" }}>
                <span>Upload a recent example of your newsletter. This should be an HTML or EML file. Accepted filetypes: HTML, EML files
                </span>
            </Box>
            <Box >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="email"
                    mb="5px"
                    aria-required
                >
                    Details <span style={{ color: "red" }}>*</span>
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
            <Box sx={{ marginBottom: "20px" }}>
                <span>This is a short description of the sponsorship placement. You can keep it simple or use it as an opportunity to tell an advertiser why they should buy this placement. e.g.: This is our featured placement at the top of our email. It is seen by all of our subscribers as soon as they open our newsletter.</span>
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


                    <FormControl fullWidth sx={{ m:1}}>
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

export default DedicatedEmails;
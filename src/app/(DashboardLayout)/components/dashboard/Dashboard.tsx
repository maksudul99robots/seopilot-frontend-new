
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Chip,
    Button,
    MenuItem,
    Menu,
    ListItem,
    styled
} from '@mui/material';
import DashboardCard from '@/app/(DashboardLayout)//components/shared/DashboardCard';
import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Padding } from '@mui/icons-material';
import Link from 'next/link';
import React, { useEffect } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import { PublicationsApi } from '@/app/services/API';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/app/GlobalRedux/Features/Alert/alertSlice';

const Dashboard = () => {
    const [publications, setPublications] = React.useState<any>([]);
    const [tableRows, setTableRows] = React.useState<any>([]);
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 130 },
        { field: 'name', headerName: 'Name', width: 300 },
        {
            field: 'url', headerName: 'URL', width: 350,
            renderCell: (params: any) => (
                <a href={params.formattedValue} style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }} target='_blank'><LinkIcon /></a>
            )
        },
        {
            field: 'status',
            headerName: 'Status',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 250,
            renderCell: (params: any) =>
            (
                <>
                    <Chip label={params.formattedValue} size="small" style={{ backgroundColor: "#ECF8FF", color: "#009EF7" }} />

                </>
            )
        },
        {
            field: 'action',
            headerName: 'Action',
            sortable: false,
            width: 160,
            renderCell: (params: any) => (

                <div>
                    <Button

                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }}
                    >
                        Options
                    </Button>
                    <Menu

                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ fontSize: "14px" }}
                    >
                        <MenuItem onClick={handleClose}><Link href={"#"} style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }}>View Publication</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href={"#"} style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }}>Edit Publication</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href={"#"} style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }}>Configure Ad Network</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link href={"#"} style={{ textDecoration: "none", fontSize: "14px", color: "#424D5E" }}>Set Availability</Link></MenuItem>
                    </Menu>
                </div>
            ),
        },

    ];

    useEffect(()=>{
        PublicationsApi.getPublications().then((res)=>{
            // console.log(res);
            setPublications(res.publications)
        }).catch((error)=>{
            dispatch(setAlert({title:"Error", icon:'error', text:'Unable to login'}))
        })
    },[])

    useEffect(()=>{
        let rows:any[] = [];
        publications?.map((publication:any, index:number)=>{
            let entry = {
                id: publication.id,
                name: publication.name,
                url: publication.url,
                status:"Pending",
                action: { view: '', edit: '', ad: '', availability: '' }
            }
            rows.push(entry);
            
            if(index== publications.length-1){
                setTableRows(rows);
            }
        })
    },[publications])


    const rows = [
        { id: 1, name: 'Snow', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 2, name: 'Lannister', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 3, name: 'Lannister', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 4, name: 'Stark', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 5, name: 'Targaryen', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 6, name: 'Melisandre', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 7, name: 'Clifford', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 8, name: 'Frances', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
        { id: 9, name: 'Roxie', url: "", status: 'Pending', action: { view: '', edit: '', ad: '', availability: '' } },
    ];



    return (
            <DashboardCard title="Publications" isActionButton={true}>
                <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto', ".MuiDataGrid-columnHeader:focus": "outline:0" } }}>
                    <DataGrid
                        rows={tableRows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                            columns: {
                                columnVisibilityModel: {
                                    id: false
                                }
                            }
                        }}
                        pageSizeOptions={[5, 10, 20]}
                        checkboxSelection={false}
                        rowSelection={false}
                        style={{fontSize:"14px"}}

                    />
                </Box>
            </DashboardCard>
    );
};

export default Dashboard;

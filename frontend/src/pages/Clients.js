import React, { useEffect, useState  } from 'react'
import { getClients, destroyClient,searchClient } from '../helpers/resources/clients';
import { AdminLayout } from '../layouts/AdminLayout';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { blue,red} from '@material-ui/core/colors';
import SaveIcon from '@material-ui/icons/Save';
import moment from 'moment';
import 'moment/locale/es'; 
import { Card, Button, Typography, Grid, Snackbar, TextField  } from '@material-ui/core';
import {  Link } from "react-router-dom";
import Swal from 'sweetalert2'
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import InputAdornment from "@material-ui/core/InputAdornment";
import CancelRoundedIcon from '@material-ui/icons/CancelRounded'

export const Clients = () => {

    const [clients, setClients] = useState([]);
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
        sessionStorage.clear();
    };
 

    const allClients = async () => {
        let data = await getClients();
        setClients(data.clients);
    };

    const formik = useFormik({
        initialValues: {
            search : "",
        },
        onSubmit: async (formData) => {
            try {
                let data = await searchClient(formData);
                let res = data.clients;

                if (res.length === 0) {
                    allClients();
                }

                setClients(data.clients);
            } catch (error) {
                console.log(error);
            }
            
        }

    });

    const handleDelete = ((document)=>{
        Swal.fire({
            title: '¿Esta seguro que desea eliminar este cliente?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Si, eliminar`,
            cancelButtonText: `Cancelar`,
            cancelButtonColor: "#d33",
        }).then((result) => {
            if (result.isConfirmed) {
                let resp = destroyClient(document).then(res =>{
                    allClients().then(res =>{
                        Swal.fire(
                            'Eliminado!',
                            'El cliente ha sido eliminado.',
                            'success'
                          )
                    });
                });  

                

                
              }
        })
    })

    useEffect(() => {
        let isSubscripted = true;
        (async ()=>{
            let data = await getClients();
            if(isSubscripted){
                setClients(data.clients);
            }
            if(sessionStorage.getItem('create') || sessionStorage.getItem('update')){
                setOpen(true);
            }
        })()
        return () => {
            isSubscripted = false;
        }
    }, [])
    
    return (
        <AdminLayout>

            <div className="container p-5">
                <Grid className="mb-3" container spacing={6}>
                    <Grid item xs={12} sm={6} container direction="row" justify="flex-start" alignItems="center" >
                        <Typography style={{ color: blue[50] }} align="justify" variant="h4">Listado clientes</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6}  container direction="row" justify="flex-end" alignItems="center"> 

                        <Link className="text-decoration-none" to="/clients/create" >
                            <Button                                                                                      
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<SaveIcon />}
                            >
                                Nuevo cliente
                            </Button>
                        </Link>
                        
                    </Grid>

                </Grid>
                

                 <Card variant="outlined">
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={3} className="p-2">
                                        <Grid item xs={12} container direction="row" justify="center" alignItems="center">                
                                        
                                            <TextField onChange={formik.handleChange} 
                                            id="search" name="search" type="search" variant="outlined" 
                                            fullWidth 
                                            InputProps={{
                                                startAdornment: (
                                                  <InputAdornment position="start">
                                                    <IconButton type="submit">
                                                        <SearchIcon />                                          
                                                    </IconButton>
                                                  </InputAdornment>
                                                ),
                                              }}
                                            size="small"/>                              

                                        </Grid>  
                                    </Grid>

                                </form>                                                             
                     
                    {clients.map((client)=>{   
                        return(
                            <Card key={client.document} >
                                <Grid container spacing={3}>
                                   
                                    <Grid item xs={2} md={2} container direction="column" justify="center" alignItems="center">
                                        <span className=""><AccountCircleIcon style={{ fontSize: 40 }} /></span>                                
                                    </Grid>

                                    <Grid item xs={10} md={3} >
                                        <Typography variant="h5">{client.name}</Typography>
                                        <Typography variant="subtitle2">{client.email}</Typography>
                                    </Grid>

                                    <Grid item xs={3} md={3} >
                                    
                                    </Grid>

                                    <Grid item xs={12} md={4}  container direction="column" justify="center" alignItems="center">
                                        {moment(client.birthday).format('LL')} |  {moment(client.created_at).format('LL')} 
                                        
                                        <Grid container direction="row" justify="center" alignItems="center">
                                        <Link className="text-decoration-none" to={`/clients/edit/${client.document}`} >
                                            <IconButton aria-label="edit">
                                                <EditIcon  style={{ color: blue[500] }} />                                            
                                            </IconButton>
                                        </Link>
                                            
                                        <IconButton aria-label="delete" onClick={() =>{handleDelete(client.document) }}>
                                            <DeleteIcon style={{ color: red[500] }}/>                                            
                                        </IconButton>
                                           
                                        </Grid>
                                        
                                        
                                    </Grid>
                                </Grid>
                            
                            </Card>
                        );
                    })}

                </Card>
            </div>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {sessionStorage.getItem('create') ? "Creado con exito":""}
                    {sessionStorage.getItem('update') ? "Actualizado con exito":""}
                </Alert>
            </Snackbar>
            
            
        </AdminLayout>
    )
}

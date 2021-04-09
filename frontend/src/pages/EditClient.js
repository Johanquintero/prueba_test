import React, { useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'; 
import { find } from '../helpers/resources/clients';
import { AdminLayout } from '../layouts/AdminLayout';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import {  Card, Button, Typography, Grid, CardActions, CardContent } from '@material-ui/core';
import {  Link , useParams, useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import { updateClient } from '../helpers/resources/clients';
import * as Yup from "yup";


export const EditClient = () => {

    const { document } = useParams();

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            name : "",
            document : "",
            birthday : "",
            email : "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("El campo nombre completo es obligatorio"),
            document: Yup.number().required("El campo numero de documento es obligatorio"),
            birthday: Yup.date().required("La fecha de naciemiento es obligatoria"),
            email: Yup.string().email("debe ser un correo valido").required("El campo correo electronico es obligatorio")
        }),
        onSubmit: async (formData) => {
            try {
                const res = await updateClient(document,formData);
                if(res.message){
                    sessionStorage.setItem('update', 'ok');
                     history.push("/clients/");
                }
            } catch (error) {
                console.log(error);
            }
            
        }

    });

    useEffect(() => {
        let isSubscripted = true;
        (async ()=>{
            let data = await find(document);
            if(isSubscripted){  
                formik.setValues(data.client);             
            }
        })()
        return () => {
            isSubscripted = false;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <AdminLayout>

            <div className="container p-5">
                <Grid className="mb-3" container spacing={6}>
                    <Grid item xs={6} container direction="rows" justify="flex-start" alignItems="center" >
                        <Typography style={{ color: blue[50] }} align="justify" variant="h4">Editar cliente</Typography>
                    </Grid>

                    <Grid>
                        <Card className="p-5">
                        <form onSubmit={formik.handleSubmit}>
                            <CardContent>

                               
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="name"
                                                type="text"
                                                name="name"
                                                label="Nombre completo"
                                                variant="outlined"
                                                onChange={formik.handleChange}                                              
                                                value={formik.values.name}                                              
                                                fullWidth
                                                autoComplete="family-name"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                type="number"
                                                id=""
                                                name="document"
                                                label="Numero de documento"
                                                variant="outlined"
                                                value={formik.values.document} 
                                                onChange={formik.handleChange}
                                                fullWidth
                                                autoComplete="shipping document"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                required
                                                type="date"
                                                id="birthday"
                                                name="birthday"
                                                label="Fecha de nacimiento"
                                                style={{ margin: 8 }}
                                                placeholder=""
                                                variant="outlined"
                                                onChange={formik.handleChange}
                                                value={moment(formik.values.birthday).format('YYYY-MM-DD')}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} container direction="row" justify="flex-end" alignItems="center">
                                            <TextField
                                                required
                                                type="email"
                                                id="email"
                                                name="email"
                                                label="Correo electronico"
                                                variant="outlined"
                                                value={formik.values.email} 
                                                onChange={formik.handleChange}
                                                fullWidth
                                                autoComplete="shipping email"
                                                error={formik.errors.email  ? true : false}
                                                helperText={formik.errors.email ? formik.errors.email : ""}
                                            />
                                        </Grid>

                                    </Grid>
                              

                            </CardContent>

                            <CardActions>
                                <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                                    <Link className="text-decoration-none" to="/clients/" >
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            size="small"
                                        >
                                            Cancelar
                                        </Button>
                                    </Link>
                                </Grid>

                                <Link className="text-decoration-none" to="#" >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={formik.handleSubmit}
                                    >
                                        Guardar
                                    </Button>
                                </Link>
                            </CardActions>
                        </form>
                        </Card>
                    </Grid>

                </Grid>



            </div>


        </AdminLayout>
    )
}

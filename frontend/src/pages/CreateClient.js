import React from 'react'
import { storeClient } from '../helpers/resources/clients';
import { AdminLayout } from '../layouts/AdminLayout';
import { blue } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import { Card, Button, Typography, Grid, CardActions, CardContent } from '@material-ui/core';
import {  Link, useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from "yup";
// import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom";

export const CreateClient = () => {

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
                const res = await storeClient(formData);
                if(res.message){
                     sessionStorage.setItem('create', 'ok');
                     history.push("/clients/");
                }
            } catch (error) {
                console.log(error);
            }
            
        }

    });

    return (
        <AdminLayout>

            <div className="container p-5">
                <Grid className="mb-3" container spacing={6}>
                    <Grid item xs={6} container direction="row" justify="flex-start" alignItems="center" >
                        <Typography style={{ color: blue[50] }} align="justify" variant="h4">Nuevo cliente</Typography>
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
                                                error={formik.errors.name && formik.touched.name ? true : false}
                                                helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <TextField
                                                required
                                                type="number"
                                                id="document"
                                                name="document"
                                                label="Numero de documento"
                                                variant="outlined"
                                                onChange={formik.handleChange}
                                                value={formik.values.document}
                                                fullWidth
                                                autoComplete="shipping document"
                                                error={formik.errors.document && formik.touched.document ? true : false}
                                                helperText={formik.errors.document && formik.touched.document ? formik.errors.document : ""}
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
                                                value={formik.values.birthday}
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                error={formik.errors.birthday && formik.touched.birthday ? true : false}
                                                helperText={formik.errors.birthday && formik.touched.birthday ? formik.errors.birthday : ""}
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
                                                onChange={formik.handleChange}
                                                value={formik.values.email}
                                                fullWidth
                                                autoComplete="shipping email"
                                                error={formik.errors.email && formik.touched.email ? true : false}
                                                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
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
                          
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    type="submit"
                                >
                                    Guardar
                                </Button>
                            


                            </CardActions>
                        </form>

                        </Card>
                    </Grid>

                </Grid>



            </div>


        </AdminLayout>
    )
}

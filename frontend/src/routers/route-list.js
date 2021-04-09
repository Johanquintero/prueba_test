import { Clients } from "../pages/Clients";
import { CreateClient } from "../pages/CreateClient";
import { EditClient } from "../pages/EditClient";
// import { Home } from "../pages/Home";

export const routers= [
    // {
    //     path:'/',
    //     component: Home,
    //     exact: true
    // },
    {
        path:'/clients',
        component: Clients,
        exact: true
    },
    {
        path:'/clients/create',
        component: CreateClient,
        exact: true
    },
    {
        path:'/clients/edit/:document',
        component: EditClient,
        exact: true
    },
]
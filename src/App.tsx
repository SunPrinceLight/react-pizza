// @ts-ignore
import React from 'react';
import {RouterProvider} from "react-router-dom";

import './scss/app.scss';

import routers from "./router.tsx";


function App() {
    return (
        <RouterProvider router={routers}/>
    );
}

export default App;

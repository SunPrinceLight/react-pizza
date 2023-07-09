import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
//import Cart from "./pages/Cart";
import React, { Suspense } from "react";

//import FullPizza from "./pages/FullPizza";

const Cart = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza"));

const routers = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Header/>} errorElement={<NotFound/>} >
        <Route index element={<Home />} />
        <Route path="cart" element={
            <Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
            </Suspense>
        } />
        <Route path="pizza/:id" element={
            <Suspense fallback={<div>Загрузка...</div>}>
                <FullPizza />
            </Suspense>
        } />
    </Route>
));

export default routers;
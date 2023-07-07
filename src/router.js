import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import React from "react";
import FullPizza from "./pages/FullPizza";

const routers = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Header/>} errorElement={<NotFound/>} >
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
    </Route>
));

export default routers;
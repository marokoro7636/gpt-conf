import React from 'react';
import TopAppBar from "./TopAppBar";
import {Outlet} from "react-router-dom";

const Root = () => {
    return (
        <div>
            <TopAppBar />
            <Outlet />
        </div>
    );
};

export default Root;
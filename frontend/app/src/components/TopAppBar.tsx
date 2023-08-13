import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const TopAppBar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            GPT-CONF
                        </Typography>
                        <Button color="inherit" component={Link} to={"/"}>生成</Button>
                        <Button color="inherit" component={Link} to={"/consult"}>診断</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default TopAppBar;
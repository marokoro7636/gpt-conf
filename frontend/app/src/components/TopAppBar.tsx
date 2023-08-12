import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

const TopAppBar = () => {
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                            GPT-CONF
                        </Typography>
                        <Button color="inherit">設定ファイル生成</Button>
                        <Button color="inherit">設定ファイル診断</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
};

export default TopAppBar;
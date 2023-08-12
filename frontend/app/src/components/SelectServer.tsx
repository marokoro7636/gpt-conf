import React from 'react';
import {Control, Controller} from "react-hook-form";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select} from "@mui/material";
import {PostData} from "./PostForm";

type Props = {
    control: Control<PostData>
}

const SelectServer = ({control}: Props) => {
    const rule = {
        validate: (value:string | "") => value !== "" || "いずれかを選択してください"
    }

    return (
        <div>
            <Controller
                name="server"
                control={control}
                rules={rule}
                render={({field, fieldState}) => {
                    return (
                        <FormControl sx={{minWidth: 200}} error={fieldState.invalid}>
                            <InputLabel>サーバの種類</InputLabel>
                            <Select
                                label="サーバの種類"
                                {...field}
                            >
                                <MenuItem value="" sx={{color: 'gray'}}>未選択</MenuItem>
                                <MenuItem value="Webサーバ">Webサーバ</MenuItem>
                                <MenuItem value="メールサーバ">メールサーバ</MenuItem>
                                <MenuItem value="SSHサーバ">SSHサーバ</MenuItem>
                                <MenuItem value="DNSサーバ">DNSサーバ</MenuItem>
                            </Select>
                            <FormHelperText>{fieldState.error?.message}</FormHelperText>
                        </FormControl>
                    );
                }}
            />
        </div>
    );
};

export default SelectServer;
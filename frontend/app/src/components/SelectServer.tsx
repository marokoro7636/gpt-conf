import React from 'react';
import {Control, Controller, useWatch} from "react-hook-form";
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {Input, serverItem} from "./PostForm";

type Props = {
    control: Control<Input>,
}

const SelectServer = ({control}: Props) => {
    const rule = {
        validate: (value: number) => value !== 0 || "いずれかを選択してください"
    }

    const serverType = useWatch({
        control,
        name: "server"
    })

    return (
        <div>
            <Stack direction={"row"} spacing={2}>
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
                                    <MenuItem value={0} sx={{color: 'gray'}}>未選択</MenuItem>
                                    {serverItem.map((server, index) => (
                                        <MenuItem value={index+1} key={index+1}>{server}</MenuItem>
                                    ))}
                                    <MenuItem value={-1}>その他</MenuItem>
                                </Select>
                                <FormHelperText>{fieldState.error?.message}</FormHelperText>
                            </FormControl>
                        );
                    }}
                />
                {
                    serverType === -1 && (
                        <Controller
                            name="serverOption"
                            control={control}
                            rules={{required: "入力してください"}}
                            render={({field, formState: {errors}}) => {
                                return (
                                    <TextField
                                        label="サーバの種類"
                                        {...field}
                                        fullWidth
                                        error={!!errors.serverOption}
                                        helperText={errors.serverOption?.message as string}
                                    />
                                );
                            }}
                        />
                    )
                }
            </Stack>
        </div>
    );
};

export default SelectServer;
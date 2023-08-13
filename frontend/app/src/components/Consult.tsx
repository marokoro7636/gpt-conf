import React, {useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import axios from "axios";
import {Box, Button, CircularProgress, Container, Divider, Stack, TextField} from "@mui/material";
import {CONSULT_API_URL} from "../const";

interface Request {
    software: string,
    content: string
}

interface Response {
    result: string
}

const Consult = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Request>({
        defaultValues: {
            software: "",
            content: "",
        }
    });
    const [response, setResponse] = useState<Response>({
        result: "",
    });
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<Request> = async (request) => {
        setLoading(true);
        console.log(request);
        try {
            const res = await axios.post(CONSULT_API_URL, request, {headers: {"Content-Type": "application/json"}});
            setResponse(res.data);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Container maxWidth="md">
                <h1>設定ファイルの診断</h1>
                <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
                    <TextField
                        label="ソフトウェア名"
                        {...register("software", {required: "入力してください"})}
                        fullWidth
                        error={!!errors.software}
                        helperText={errors.software?.message as string}
                    />
                    <TextField
                        label="設定ファイルの内容"
                        {...register("content", {required: "入力してください"})}
                        fullWidth
                        multiline
                        rows={10}
                        error={!!errors.content}
                        helperText={errors.content?.message as string}
                    />
                    <Button type="submit" variant="contained">診断</Button>
                    <Divider/>
                    <h1>診断結果</h1>
                    {
                        loading ? (
                            <Box sx={{display:"flex", justifyContent: "center"}}><CircularProgress /></Box>
                        ) : (
                            <div>{response.result}</div>
                        )
                    }
                </Stack>
            </Container>
        </div>
    );
};

export default Consult;
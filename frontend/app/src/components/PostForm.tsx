import React, {useState} from 'react';
import axios from "axios";
import {useForm, useFieldArray, SubmitHandler} from "react-hook-form";
import {
    Button,
    Container,
    IconButton,
    Stack,
    TextField
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SelectServer from "./SelectServer";

export interface Input {
    server: number,
    serverOption: string,
    software: string,
    contents: ConfigContent[],
}

interface Request {
    server: string,
    software: string,
    contents: ConfigContent[],
}

interface ConfigContent {
    content: string
}

interface Response {
    result: string,
    detail: string
}

const API_URL = "http://localhost:5555/make";

export const serverItem = [
    "未選択",
    "Webサーバ",
    "メールサーバ",
    "SSHサーバ",
    "DNSサーバ",
]

const PostForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<Input>({
        defaultValues: {
            server: 0,
            serverOption: "",
            software: "",
            contents: [{content: ""}]
        }
    });
    const {fields, append, remove} = useFieldArray({
        control,
        name: "contents",
    });
    const [response, setResponse] = useState<Response>({
        result: "",
        detail: ""
    });
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<Input> = async (input) => {
        setLoading(true);
        const request: Request = {
            server: input.server !== -1 ? serverItem[input.server] : input.serverOption,
            software: input.software,
            contents: input.contents,
        }
        console.log(request);
        try {
            const response = await axios.post(API_URL, request, {headers: {"Content-Type": "application/json"}});
            const res: Response = await response.data;
            setResponse(res);
        } catch (e) {
            alert(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Container maxWidth="sm" sx={{pt: 5}}>
                <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
                    <SelectServer control={control}/>

                    <TextField
                        label="ソフトウェア名"
                        {...register("software", {required: "入力してください"})}
                        fullWidth
                        error={!!errors.software}
                        helperText={errors.software?.message as string}
                    />

                    {fields.map((field, index) => (
                        <Stack direction={"row"} spacing={3} key={field.id}>
                            <TextField
                                label="設定したい内容"
                                fullWidth
                                {...register(`contents.${index}.content` as const, {required: "入力してください"})}
                                error={!!errors.contents?.[index]?.content}
                                helperText={errors.contents?.[index]?.content?.message as string}
                            />
                            <IconButton onClick={() => remove(index)} color="error" disabled={index === 0}>
                                <DeleteIcon/>
                            </IconButton>
                        </Stack>
                    ))}
                    <Button
                        type="button"
                        onClick={() => append({content: ""})}
                        variant="contained"
                        color="secondary"
                    >
                        設定を1行追加
                    </Button>
                    <Button type="submit" variant="contained">送信</Button>
                </Stack>
                <br/>
                <hr/>
                <h1>生成結果</h1>
                {
                    loading ? (
                        <p>ロード中</p>
                    ) : (
                        <div>
                            {response["result"]}<br/>
                            {response["detail"]}
                        </div>
                    )
                }
            </Container>
        </div>
    )
        ;
};

export default PostForm;
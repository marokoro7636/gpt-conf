import React, {useState} from 'react';
import axios from "axios";
import {useForm, useFieldArray, SubmitHandler} from "react-hook-form";

interface PostData {
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

const API_URL = "http://localhost:5555";

const PostForm = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm<PostData>({
        defaultValues: {
            server: "",
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

    const onSubmit: SubmitHandler<PostData> = async (postData) => {
        setLoading(true);
        try {
            // const response = await axios.post(API_URL, postData, {headers: {"Content-Type": "application/json"}});
            // const json: Response = await response.data.json();
            // console.log(json);

            console.log(postData);
            await new Promise(s => setTimeout(s, 2000));
            const res: Response = {
                result: "設定ファイルの内容",
                detail: "設定ファイルの詳細"
            };
            setResponse(res);
        } catch (e) {
            alert("API通信エラー");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>サーバ名</label>
                <input id="server" type="text" {...register("server", {required: true})}/><br/>
                {errors.server && <div>入力してください</div>}
                <label>ソフトウェア名</label>
                <input id="software" type="text" {...register("software", {required: true})}/><br/>
                {errors.software && <div>入力してください</div>}
                <label>設定したい内容(箇条書き)</label><br/>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <div>
                            <input {...register(`contents.${index}.content` as const, {required: true})} />
                            <button type="button" onClick={() => remove(index)}>削除</button>
                            {errors.contents?.[index]?.content && <div>入力してください</div>}
                        </div>
                    </div>
                ))}
                <button type="button" onClick={() => append({content: ""})}>設定を1行追加</button>
                <button type="submit">送信</button>
            </form>
            <br/>
            {loading ? (
                <p>ロード中</p>
            ) : (
                <div>
                    {response["result"]}<br/>
                    {response["detail"]}
                </div>
            )}
        </div>
    );
};

export default PostForm;
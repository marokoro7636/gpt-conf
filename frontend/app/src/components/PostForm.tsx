import React, {useState} from 'react';
import axios from "axios";

interface PostData {
    server: string,
    software: string,
    content: string,
}

interface Response {
    result: string,
    detail: string
}

const API_URL = "http://localhost:5555"

const PostForm = () => {
    const [postData, setPostData] = useState<PostData>({
        server: "",
        software: "",
        content: "",
    });
    const [response, setResponse] = useState<Response>({
        result: "",
        detail: ""
    });
    const [loading, setLoading] = useState(false);


    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newData: PostData = {...postData};
        newData[e.target.id as keyof PostData] = e.target.value;
        setPostData(newData);
    };

    const submit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res: Response = await post(postData);
            setResponse(res);
        } catch (e) {
            alert("API通信エラー");
        } finally {
            setLoading(false);
        }
    };

    const post = async (postData: PostData) => {
        // const response = await axios.post(API_URL, postData, {headers: {"Content-Type": "application/json"}});
        // const json: Response = await response.data.json();
        // console.log(json);

        console.log(postData)
        await new Promise(s => setTimeout(s, 2000));
        return {
            result: "設定ファイルの内容",
            detail: "設定ファイルの詳細"
        };
    }

    return (
        <div>
            <form onSubmit={submit}>
                サーバ名
                <input onChange={handle} id="server" type="text"/><br/>
                ソフトウェア名
                <input onChange={handle} id="software" type="text"/><br/>
                設定したい内容<br/>
                <input onChange={handle} id="content" name="content"/><br/>
                <button>送信</button>
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
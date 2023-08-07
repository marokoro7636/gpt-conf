# Backend

- FrontendとREST APIでやり取りする
- Frontendのリクエストボディに記載の、サーバの種類やソフトウェアなどの情報からプロンプトを生成し、それをChat GPTに投げる
- Chat GPTからの返答をFrontendに返す

# HTTPレスポンス形式

```json
Response Header: Content-Type: application/json
Response Body:
{
    "result" : "<設定ファイルの内容>",
    "detail" : "<Chat GPTが出力した解説>"
}
```

- 設定ファイルとGPTの解説を分けることが難しかったら、まずはresultに全てまとめちゃってOK
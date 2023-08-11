# Frontend

- サーバの種類やソフトウェアを選択したり、ユーザの入力を受け取る
- ユーザの入力にしたがって、Backendで動作するREST APIへPOST
- 生成した設定ファイルの内容をBackendから受け取って表示

# HTTPリクエスト形式

Method: `POST`  
Request Header: `Content-Type: application/json`  
Request Body:

```json
{
  "server": "<サーバの種類>",
  "software": "<サーバのソフトウェア>",
  "contents": [
    {"content": "<箇条書きで設定の内容1>"},
    {"content": "<箇条書きで設定の内容2>"}
  ]
}
```
from flask import Flask, request
import openai
import os

app = Flask(__name__)

openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/make", methods=['POST'])
def make():
    server = request.json["server"]
    software = request.json["software"]

    prompt = f'''私の組織は{server}を運用しています。
    サーバ上で動作しているソフトウェアは{software}です。
    以下のルールに沿った設定を行いたいです。'''

    for item in request.json["contents"]:
        prompt += ('- ' + item["content"] + '\n')

    prompt += '''設定ファイルの内容を出力してください。
    解説をする必要はありません。'''

    response = {'result': ask(prompt)}
    return response


@app.route("/consult", methods=['POST'])
def consult():
    software = request.json["software"]
    content = request.json["content"]

    prompt = f'''以下は{software}の設定ファイルです．
{content}
このファイルの設定について解説してください．
提案があったらそれも一緒に教えてください．'''

    response = {'result': talk(prompt)}
    return response


def ask(message):
    completion = openai.ChatCompletion.create(
                 model    = "gpt-3.5-turbo",
                 messages = [{"role":"system", "content":message}],
                 max_tokens  = 1024,
                 n           = 1,
                 stop        = None,
                 temperature = 0.5,
    )
    response = completion.choices[0].message.content
    return response

def talk(messages):
    completion = openai.ChatCompletion.create(
                 model    = "gpt-3.5-turbo",
                 messages = messages,
                 max_tokens  = 1024,
                 n           = 1,
                 stop        = None,
                 temperature = 0.5,
    )
    response = completion.choices[0].message.content
    return response

if __name__  == "__main__":
    app.run(debug=False, host='0.0.0.0', port=5555)
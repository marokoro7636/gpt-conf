FROM python:3.11.4-bullseye

WORKDIR /app
COPY requirements.txt .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

ENV OPENAI_API_KEY xxx
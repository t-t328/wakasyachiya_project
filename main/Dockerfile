# 一応3.12にしておく
FROM python:3.13.1

WORKDIR /dir

COPY ./dir/requirements.txt ./

#言語設定
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

ENV FLASK_APP=main

# パッケージのインストール
RUN apt-get update && apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
    pip install --upgrade pip && \
    pip install --upgrade setuptools && \
    pip install -r requirements.txt

# ライブラリのインストール
# ここに必要なライブラリを追加していく

#サーバー起動コマンド記入

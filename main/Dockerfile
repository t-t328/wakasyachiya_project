# 一応3.12にしておく
FROM python:3.12

#言語設定
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm

# パッケージのインストール
RUN apt-get update && apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8 && \
    pip install --upgrade pip && \
    pip install --upgrade setuptools

# ライブラリのインストール
# ここに必要なライブラリを追加していく

#サーバー起動コマンド記入

WORKDIR /dir
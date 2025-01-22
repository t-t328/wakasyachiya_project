# 簡単なindexページの作成を行っています。
import os
from flask import Flask, render_template, request
from flask_migrate import Migrate

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/menu_page")
def menu_page():
    return render_template('menu_page.html')
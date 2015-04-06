from flask import Flask, render_template,request,url_for
import subprocess
from flask import send_file
import pickle


import os

app = Flask(__name__,static_folder='static', static_url_path='')


@app.route('/')
def home():	
	return render_template("test.html")
	

port = int(os.environ.get('PORT', 3000))

if __name__ == '__main__':
     app.run(debug=True,port=port)
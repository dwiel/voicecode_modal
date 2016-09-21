import json
import random
from flask import Flask, request

app = Flask(__name__)

BASE_DIRECTORY = '/Users/zdwiel/voicecode/commando/config/'

@app.route('/create_command', methods = ['POST'])
def create_command():
    script = request.form['script']
    filename = BASE_DIRECTORY + str(random.random()) + '.coffee'
    with open(filename, 'w') as f:
        f.write(script)

    return json.dumps({
        'status': 'OK',
    })

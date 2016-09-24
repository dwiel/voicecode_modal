#!/usr/bin/env python

import json
import random
from flask import Flask, request

app = Flask(__name__)
app.debug = True

BASE_DIRECTORY = '/Users/zdwiel/voicecode/commando/config/'

@app.route('/create_command', methods = ['POST'])
def extend_command():
    script = request.form['script']
    filename = BASE_DIRECTORY + str(random.random()) + '.coffee'
    with open(filename, 'w') as f:
        f.write(script)

    return json.dumps({
        'status': 'OK',
    })

if __name__ == '__main__':
    app.run(debug = True, port=8080)

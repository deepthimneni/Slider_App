#!/usr/bin/env python3.4

import cgi, cgitb
import create_db
import sys
import json

cgitb.enable()

def index():
        
    form = json.load(sys.stdin)

    update_values('bottom_slider', form.get('bottom_slider'))
    update_values('top_slider', form.get('top_slider'))

    print('Content-Type: application/json\n\n')
    print(json.dumps({'status': 'success'}))

def update_values(slider_type, slider_val):
    record = create_db.exec_query(None, "SELECT id FROM sliders WHERE slider_name = '{}'".format(slider_type), None)

    if record is not None:
        create_db.exec_query(None, """
                UPDATE sliders
                SET value = ?
                WHERE id = ?
        """, [slider_val, record[0][0]])
    else:
        print (json.dumps({'error': 'record not found'}))

if __name__ == "__main__":
    index()
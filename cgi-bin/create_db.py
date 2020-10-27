#!/usr/bin/env python3.4

import sqlite3
import os
import sys

def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn

def exec_many(conn, sql_script, values):
    try:
        if conn is None:
            conn = create_connection(get_db_name())

        c = conn.cursor()

        c.executemany(sql_script, values)
        
        conn.commit()
        conn.close()
    except:
        print(sys.exc_info())

def exec_query(conn, sql_script, values):
    try:
        if conn is None:
            conn = create_connection(get_db_name())

        c = conn.cursor()

        if values is None:
            c.execute(sql_script)
        else:    
            c.execute(sql_script, values)
        
        conn.commit()
        
        return c.fetchall()
    except:
        print(sys.exc_info())
    finally:
        conn.close()

# def exec_query_get_data(conn, sql_script):
#     try:
#         if conn is None:
#             conn = create_connection(get_db_name())

#         c = conn.cursor()
#         c.execute(sql_script)
        
#         return c.fetchall()
#     except:
#         print(sys.exc_info())
#     finally:
#         conn.close()


def get_db_name():
    return os.path.dirname(os.path.abspath(__file__)) + "\database.db"


def main():
    conn = create_connection(get_db_name())

    if conn is not None:

        sql_create_sliders_table = """ CREATE TABLE IF NOT EXISTS sliders (
                                        id integer PRIMARY KEY,
                                        slider_name text NOT NULL,
                                        value integer
                                    ); """

        exec_query(conn, sql_create_sliders_table, None)

        initial_data = [
            (1, 'top_slider', 0),
            (2, 'bottom_slider', 0)
        ]

        sql_sliders_data_feed = """INSERT INTO sliders VALUES(?, ?, ?)"""

        exec_many(None, sql_sliders_data_feed, initial_data)
    else:
        print("Error! cannot create the database connection.")

if __name__ == "__main__":
    main()
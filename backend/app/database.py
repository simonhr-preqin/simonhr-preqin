"""
Connects to a SQL Server database using pyodbc
"""
import os
from fastapi import HTTPException
import pyodbc
from dotenv import load_dotenv
load_dotenv()

default_db_name = os.getenv("APPLICATION_DB")

def init_connection(db_name):
    cnxn_str = ('Driver={ODBC Driver 17 for SQL Server};' +
        'Server=' + os.getenv("DATABASE_HOST") + ';' +
        f'Database={db_name};' +
        'Integrated Security=False;' +
        # 'Encrypt=False;' +
        'UID=' + os.getenv("DATABASE_USERNAME") + ';' +
        'PWD=' + os.getenv("DATABASE_PASSWORD") + ';')
    try:
        # Connect to the database
        connection = pyodbc.connect(cnxn_str)                    
        return connection.cursor()
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))

def to_dict(row):
    return dict(zip([t[0] for t in row.cursor_description], row))

def query_get(sql,param=None, db_name=default_db_name, cursor_func=to_dict):
    cursor = init_connection(db_name)
    if param is None:
        cursor.execute(sql)
    else:
        cursor.execute(sql, param)
    results = [cursor_func(row) for row in cursor.fetchall()]
    return results

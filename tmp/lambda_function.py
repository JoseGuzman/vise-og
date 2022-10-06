"""
lambda_function.py

To learn how to handle elements. See https://www.youtube.com/watch?v=uFsaiEhr1zs
"""

from dataclasses import dataclass 
import json

@dataclass
class Form:
    user: str
    mail: str
    
def lambda_handler(event, context):
    print(event, json.dumps(event))
    print("CloudWatch log stream name:", context.log_stream_name)
    # 1. Parse queryStringParameters
    #user = event['queryStringParameters']['user']
    #mail = event['queryStringParameters']['mail']
    #myform = Form(user, mail)
    #print(myform)
    
    # 2. Construct body of response
    body = {}
    body['user'] = 'foo'
    body['mail'] = 'sjm.guzman@gmail.com'
    
    # 3. HTTP response object
    responseObject = {}
    responseObject['StatusCode'] = 200
    responseObject['body'] = json.dumps(body)
    responseObject['headers'] = {}
    #responseObject['headers']['Content-Type'] = 'application/json'    responseOject['body'] = json.dumps(body) # dict to string
    
    # 4. Return response object implement
    return responseObject

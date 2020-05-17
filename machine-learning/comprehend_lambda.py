import os
import io
import boto3
import json
import csv
import tweepy
import numpy as np

# grab environment variables
ENDPOINT_NAME = os.environ['ENDPOINT_NAME']
runtime= boto3.client('runtime.sagemaker')
comprehend = boto3.client('comprehend', region_name='ap-southeast-1')
def lambda_handler(event, context):
    print("Received event: " + json.dumps(event, indent=2))
    
    # data = json.loads(json.dumps(event))
    data = json.loads(event['body'])
    payload_orig = data['data']
    print(payload_orig)
    
    payload_split = payload_orig.split(",")
    company_name = payload_split[0]
    
    api_key = os.environ['API_KEY']
    api_secret = os.environ['API_SECRET']
    access_token = os.environ['ACCESS_TOKEN']
    access_secret = os.environ['ACCESS_SECRET']
    auth = tweepy.OAuthHandler(api_key, api_secret)
    auth.set_access_token(access_token, access_secret)
    api = tweepy.API(auth)
    
    tag = '#{}'.format(company_name)
    tweets = api.search(q=tag, count = 50)
    positive = []
    
    for i in range(len(tweets)):
        d = tweets[i].text
        l = tweets[i].user.location
        
        if d != '':
            res = comprehend.detect_sentiment(Text=d, LanguageCode='en')
            p = res.get('SentimentScore')['Positive']
            
        positive.append(p)
    
    if len(positive) == 0: positive = [0.5]
    
    positive = np.mean(positive)
    payload_split.append(str(positive))
    payload = ",".join(payload_split[1:])
    
    print('payload is!!!!')
    print(payload)
    
    response = runtime.invoke_endpoint(EndpointName=ENDPOINT_NAME,
                                  ContentType='text/csv',
                                  Body=payload)
    print('res is !!!!')
    print(response)
    
    result = json.loads(response['Body'].read().decode())    
    pred = result['predictions'][0]['score']
    
    print("predicted_score:", pred)
    
    s3 = boto3.resource('s3')
    bucket = s3.Bucket('razer-aws')
    
    
    key = 'aws-razer/newscore.csv'
    local_file_name = '/tmp/test.csv'
    s3.Bucket('razer-aws').download_file(key,local_file_name)
    
    payload_split.append(str(pred))
    lists = payload_split
    print('lists:', lists)
    
    with open('/tmp/test.csv','r') as infile:
        reader = list(csv.reader(infile))
        reader = reader[::-1] # the date is ascending order in file
        reader.insert(0,lists)
    
    with open('/tmp/test.csv', 'w', newline='') as outfile:
        writer = csv.writer(outfile)
        for line in reversed(reader): # reverse order
            writer.writerow(line)
    
     # upload file from tmp to s3 key
    bucket.upload_file('/tmp/test.csv', key)
    
    return pred
    
    
    
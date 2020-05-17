import json

def lambda_handler(event, context):
    # TODO implement
    
    import boto3

    personalizeRt = boto3.client('personalize-runtime')
    
    data = json.loads(event['body'])['data']
    userId = str(data[0])
    exist = data[1:]
    
    response = personalizeRt.get_recommendations(
        campaignArn = 'arn:aws:personalize:ap-southeast-1:572549908234:campaign/interactions',
        userId = userId)
    print(response)
    print("Recommended items")
    lst = []
    for item in response['itemList']:
        if int(item['itemId']) not in exist:
            lst.append(int(item['itemId']))
        
    return lst

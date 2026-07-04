import json

def lambda_handler(event, context):
    # フロントエンド（TypeScriptなど）からのアクセスを許可する設定（CORS対策）
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    }

    # 画面に返したいデータ
    response_body = {
        "message": "Pythonサーバーレスの世界へようこそ！",
        "status": "success"
    }

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps(response_body, ensure_ascii=False)
    }

import boto3
from config import (
    B2_KEY_ID,
    B2_APPLICATION_KEY,
    B2_REGION
)

client = boto3.client(
    "s3",
    endpoint_url=f"https://s3.{B2_REGION}.backblazeb2.com",
    aws_access_key_id=B2_KEY_ID,
    aws_secret_access_key=B2_APPLICATION_KEY
)
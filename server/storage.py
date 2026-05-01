from b2 import client
from config import B2_BUCKET


def upload_pdf(local_path: str, key: str):
    client.upload_file(
        local_path,
        B2_BUCKET,
        key,
        ExtraArgs={
            "ContentType": "application/pdf"
        }
    )

    return f"https://f004.backblazeb2.com/file/{B2_BUCKET}/{key}"


def delete_pdf(key: str):
    try:
        objs = client.list_objects_v2(
            Bucket=B2_BUCKET,
            Prefix=key
        )

        if "Contents" in objs:
            for obj in objs["Contents"]:
                client.delete_object(
                    Bucket=B2_BUCKET,
                    Key=obj["Key"]
                )
    except:
        pass
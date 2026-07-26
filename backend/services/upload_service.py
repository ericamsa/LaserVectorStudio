from pathlib import Path


def save_uploaded_file(file_name: str, content: bytes, upload_dir: Path):
    """
    Save uploaded file to disk.
    """

    file_path = upload_dir / file_name

    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "filename": file_name,
        "size": len(content),
        "saved_to": str(file_path)
    }
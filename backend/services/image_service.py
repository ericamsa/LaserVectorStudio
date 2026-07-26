from PIL import Image


def get_image_info(image_path):
    """
    Read basic information from an image.
    """

    with Image.open(image_path) as img:
        return {
            "width": img.width,
            "height": img.height,
            "format": img.format,
            "mode": img.mode,
        }
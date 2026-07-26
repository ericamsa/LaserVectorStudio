"""
Image processing functions
"""
import cv2
import numpy as np



def convert_to_grayscale(image: np.ndarray):
    """
    Convert an image to grayscale.

    """

    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    return gray_image


def invert_image(image: np.ndarray):
    """
    Invert image colors.
    """
    inverted_image = cv2.bitwise_not(image)
    
    return inverted_image


def apply_binary_threshold(
    image: np.ndarray,
    threshold_value: int = 127,
) -> np.ndarray:
    """
    Apply a binary threshold to an image.
    """

    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    _, threshold_image = cv2.threshold(
        gray_image,
        threshold_value,
        255,
        cv2.THRESH_BINARY,
    )

    return threshold_image
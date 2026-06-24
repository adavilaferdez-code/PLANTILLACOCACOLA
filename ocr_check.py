import os
import sys

print("Python version:", sys.version)

try:
    from PIL import Image
    print("PIL is installed")
except ImportError:
    print("PIL is NOT installed")

try:
    import pytesseract
    print("pytesseract is installed")
except ImportError:
    print("pytesseract is NOT installed")

try:
    import easyocr
    print("easyocr is installed")
except ImportError:
    print("easyocr is NOT installed")

# Let's inspect the files in the brain folder
brain_dir = r"C:\Users\Adfgd\.gemini\antigravity\brain\aef82a9c-45f4-4a59-92da-4de7bf8b6550"
if os.path.exists(brain_dir):
    print("Brain dir exists")
    files = os.listdir(brain_dir)
    print("Files in brain dir:", files)
else:
    print("Brain dir does not exist")

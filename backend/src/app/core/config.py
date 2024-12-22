import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
AVATAR_UPLOAD_DIR = os.path.join(UPLOAD_DIR, "avatars")
COMPANIES = os.path.join(AVATAR_UPLOAD_DIR, "companies")
RESUME_UPLOAD_DIR = os.path.join(UPLOAD_DIR, "resumes")

# Убедитесь, что директории существуют
os.makedirs(AVATAR_UPLOAD_DIR, exist_ok=True)
os.makedirs(RESUME_UPLOAD_DIR, exist_ok=True)
os.makedirs(COMPANIES, exist_ok=True)

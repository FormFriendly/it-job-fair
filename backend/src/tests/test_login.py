import json
import pytest
from app.crud import candidates, companies

def test_login_success(test_app, monkeypatch):
    test_request_payload = {"username": "valid@example.com", "password": "validpassword"}
    test_response_payload = {
        "access_token": "mocked_token",
        "token_type": "bearer",
        "email": "valid@example.com",
        "role": "candidate",
        "candidate": None,
        "company": None
    }

    # Mock функции
    async def mock_get_user_by_email(email):
        return {"id": 1, "email": "valid@example.com", "password": "hashedpassword", "role": "candidate"}

    def mock_verify_password(input_password, stored_password):
        return input_password == "validpassword"

    def mock_create_access_token(data):
        return "mocked_token"

    # Monkeypatching
    monkeypatch.setattr("app.api.auth.get_user_by_email", mock_get_user_by_email)
    monkeypatch.setattr("app.api.auth.verify_password", mock_verify_password)
    monkeypatch.setattr("app.api.auth.create_access_token", mock_create_access_token)

    # Отправляем запрос
    response = test_app.post("api/login", data=test_request_payload)
    
    assert response.status_code == 200
    assert response.json() == test_response_payload


def test_login_invalid_credentials(test_app, monkeypatch):
    test_request_payload = {"username": "invalid@example.com", "password": "wrongpassword"}

    async def mock_get_user_by_email(email):
        return None  # Пользователь не найден

    monkeypatch.setattr("app.api.auth.get_user_by_email", mock_get_user_by_email)

    response = test_app.post("api/login", data=test_request_payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect email or password"

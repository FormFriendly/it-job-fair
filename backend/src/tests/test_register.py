import json
import pytest
from app.crud import candidates, companies

def test_register_candidate(test_app, monkeypatch):
    # Данные для запроса
    test_request_payload = {
        "email": "test_candidate@example.com",
        "password": "password123",
        "role": "candidate"
    }
    test_response_payload = {
        "access_token": "mocked_token",
        "token_type": "bearer",
        "email": "test_candidate@example.com",
        "role": "candidate",
        "candidate": {"id": 1},
        "company": None,
    }

    # Mock функции
    async def mock_get_user_by_email(email):
        return None  # Пользователь не существует

    async def mock_create_user(user_data):
        return {
            "id": 1,
            "email": "test_candidate@example.com",
            "role": "candidate",
            "created_at": "2023-01-01T00:00:00",
        }

    async def mock_create_candidate_profile(user_id):
        return {
            "id": 1,
            "name": "Aaa", "surname": "Bbb", "patronymic": None, "user_id": 1, "created_at": "2023-01-01T00:00:00","updated_at": "2023-01-01T00:00:00"
        }

    def mock_create_access_token(data):
        return "mocked_token"

    # Monkeypatching
    monkeypatch.setattr("app.api.auth.get_user_by_email", mock_get_user_by_email)
    monkeypatch.setattr("app.api.auth.create_user", mock_create_user)
    monkeypatch.setattr("app.api.auth.create_candidate_profile", mock_create_candidate_profile)
    monkeypatch.setattr("app.api.auth.create_access_token", mock_create_access_token)

    # Отправляем запрос
    response = test_app.post("api/register", data=json.dumps(test_request_payload))

    assert response.status_code == 201

    actual_response = response.json()

    assert actual_response["access_token"] == test_response_payload["access_token"]
    assert actual_response["token_type"] == test_response_payload["token_type"]
    assert actual_response["email"] == test_response_payload["email"]
    assert actual_response["role"] == test_response_payload["role"]
    assert actual_response["candidate"]["id"] == test_response_payload["candidate"]["id"]
    assert actual_response["company"] == test_response_payload["company"]   


def test_register_existing_user(test_app, monkeypatch):
    test_request_payload = {
        "email": "existing@example.com",
        "password": "password123",
        "role": "candidate"
    }

    async def mock_get_user_by_email(email):
        return {"email": email, "role": "candidate"}

    monkeypatch.setattr("app.api.auth.get_user_by_email", mock_get_user_by_email)

    response = test_app.post("api/register", data=json.dumps(test_request_payload))

    assert response.status_code == 400
    assert response.json()["detail"] == "Email already registered"

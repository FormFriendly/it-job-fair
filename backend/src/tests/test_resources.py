import json
import pytest

mock_events = [
    {"id": 1, "name": "Tech Conference", "description": "A big event", "img_path": None, 
     "starts_at": "2024-06-01T10:00:00", "ends_at": "2024-06-01T18:00:00", 
     "created_at": "2024-01-01T00:00:00", "updated_at": None, "img_url": "https://placehold.jp/1280x720.png"
    },
]

mock_skills = [
    {"id": 1, "skill": "Python"},
    {"id": 2, "skill": "Machine Learning"},
]

mock_specializations = [
    {"id": 1, "name": "Software Development"},
    {"id": 2, "name": "Data Science"},
]

# Тесты для маршрутов `events`
def test_get_events_list(test_app, monkeypatch):
    async def mock_get_all():
        return mock_events
    monkeypatch.setattr("app.api.events.get_all", mock_get_all)
    
    response = test_app.get("/api/events/")
    assert response.status_code == 200
    assert response.json() == mock_events

def test_get_event(test_app, monkeypatch):
    async def mock_get(event_id: int):
        for event in mock_events:
            if event["id"] == event_id:
                return event
        return None
    monkeypatch.setattr("app.api.events.get", mock_get)
    
    response = test_app.get("/api/events/1")
    assert response.status_code == 200
    assert response.json() == mock_events[0]

    response = test_app.get("/api/events/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Event not found"

# Тесты для маршрутов `skills`
def test_get_skills_list(test_app, monkeypatch):
    async def mock_get_all():
        return mock_skills
    monkeypatch.setattr("app.api.skills.get_all", mock_get_all)
    
    response = test_app.get("/api/skills/")
    assert response.status_code == 200
    assert response.json() == mock_skills

def test_get_skill(test_app, monkeypatch):
    async def mock_get(skill_id: int):
        for skill in mock_skills:
            if skill["id"] == skill_id:
                return skill
        return None
    monkeypatch.setattr("app.api.skills.get", mock_get)
    
    response = test_app.get("/api/skills/1")
    assert response.status_code == 200
    assert response.json() == mock_skills[0]

    response = test_app.get("/api/skills/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Skill not found"

# Тесты для маршрутов `specializations`
def test_get_specializations_list(test_app, monkeypatch):
    async def mock_get_all():
        return mock_specializations
    monkeypatch.setattr("app.api.specializations.get_all", mock_get_all)
    
    response = test_app.get("/api/specializations/")
    assert response.status_code == 200
    assert response.json() == mock_specializations

def test_get_specialization(test_app, monkeypatch):
    async def mock_get(specialization_id: int):
        for specialization in mock_specializations:
            if specialization["id"] == specialization_id:
                return specialization
        return None
    monkeypatch.setattr("app.api.specializations.get", mock_get)
    
    response = test_app.get("/api/specializations/1")
    assert response.status_code == 200
    assert response.json() == mock_specializations[0]

    response = test_app.get("/api/specializations/999")
    assert response.status_code == 404
    assert response.json()["detail"] == "Specialization not found"

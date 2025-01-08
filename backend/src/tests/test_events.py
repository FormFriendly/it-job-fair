import json
import pytest

mock_vacancies = [
   {
        "id": 1,
        "title": "Software Engineer",
        "description": "Develop software solutions",
        "salary": 100000.0,
        "salary_type": "from",
        "work_mode": "remote",  
        "employment_type": "full-time",  
        "experience": "1-2 years", 
        "specialization_id": 1, 
        "event_id": 1,  
        "company_id": 1, 
        "specialization": {"id": 1, "name": "Software Development"},
        "skills": [{"id": 1, "skill": "Python"}],
        "company": {
            "id": 1,
            "name": "TechCorp",
            "user_id": 10, 
            "created_at": "2024-01-01T00:00:00", 
            "updated_at": None, 
            "logo_url": None
        },
        "created_at": "2024-01-01T00:00:00",
        "updated_at": None,
    }
]

def test_get_event_vacancies(test_app, monkeypatch):
    
    async def mock(event_id):
        return mock_vacancies if event_id == 1 else []
    monkeypatch.setattr("app.api.events.get_by_event_id", mock)
    
    response = test_app.get("/api/events/1/vacancies")
    assert response.status_code == 200
    assert response.json()[0]['title'] == mock_vacancies[0]['title']

    response = test_app.get("/api/events/999/vacancies")
    assert response.status_code == 404
    assert response.json()["detail"] == "No vacancies found for this event"
from app.crud.candidates import post as create_candidate_profile
from app.crud.companies import post as create_company_profile
from app.crud.candidates import get as get_candidate_profile
from app.crud.companies import get as get_company_profile

from app.db import UserRole

from abc import ABC, abstractmethod

class UserManager(ABC):
    def __init__(self, user_data):
        self.user_data = user_data
    
    @abstractmethod
    async def create_profile(self):
        """Создать профиль пользователя"""
        pass
    
    @abstractmethod
    async def get_profile(self):
        """Получить профиль пользователя"""
        pass

class CandidateManager(UserManager):
    async def create_profile(self):
        return await create_candidate_profile(self.user_data["id"])
    
    async def get_profile(self):
        return await get_candidate_profile(self.user_data["id"])

class CompanyManager(UserManager):
    async def create_profile(self):
        return await create_company_profile(self.user_data["id"])
    
    async def get_profile(self):
        return await get_company_profile(self.user_data["id"])
    
class UserManagerFactory:
    @staticmethod
    def get_manager(user_data):
        if user_data["role"] == UserRole.candidate:
            return CandidateManager(user_data)
        elif user_data["role"] == UserRole.company:
            return CompanyManager(user_data)
        raise ValueError("Unsupported user role")

import os
from dotenv import load_dotenv

from sqlalchemy import (
    create_engine, MetaData, Table, Column, Integer, String, DateTime, ForeignKey,
    Boolean, Text, Float, Enum
)
from sqlalchemy.sql import func
from databases import Database

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Настройка БД с SQLAlchemy
engine = create_engine(DATABASE_URL)
metadata = MetaData()

# Определение перечислений (Enums)
from enum import Enum as PyEnum

class UserRole(str, PyEnum):
    company = "company"
    candidate = "candidate"

class ApplicationStatus(str, PyEnum):
    pending = "pending"
    viewed = "viewed"
    accepted = "accepted"
    rejected = "rejected"
    
class SalaryType(str, PyEnum):
    from_salary = "from"
    to_salary = "to"

class WorkMode(str, PyEnum):
    remote = "remote"
    hybrid = "hybrid"
    office = "office"

class EmploymentType(str, PyEnum):
    full_time = "full-time"
    part_time = "part-time"

class Experience(str, PyEnum):
    no_experience = "no experience"
    less_than_year = "less than year"
    one_two_years = "1-2 years"
    three_four_years = "3-4 years"
    five_plus_years = "5+ years"

class VacancyStatus(str, PyEnum):
    active = "active"
    closed = "closed"
    archived = "archived"
    draft = "draft"

# Таблица users
users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String(255), unique=True, nullable=False, index=True),
    Column("password", String(255), nullable=False),
    Column("role", Enum(UserRole), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица candidates
candidates = Table(
    "candidates",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False),
    Column("name", String(50), nullable=False),
    Column("surname", String(50), nullable=False),
    Column("patronymic", String(50)),
    Column("date_of_birth", DateTime),
    Column("tg_link", String(255)),
    Column("contact_phone", String(20)),
    Column("contact_email", String(255)),
    Column("avatar_path", String(255)),
    Column("resume_path", String(255)),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица companies
companies = Table(
    "companies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("user_id", Integer, ForeignKey('users.id', ondelete='CASCADE'), unique=True, nullable=False),
    Column("name", String(255), nullable=False),
    Column("description", Text),
    Column("website", String(255)),
    Column("location", String(255)),
    Column("contact_phone", String(20)),
    Column("contact_email", String(255)),
    Column("tg_link", String(255)),
    Column("logo_path", String(255)),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица events
events = Table(
    "events",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(255), nullable=False),
    Column("description", Text),
    Column("img_path", String(255)),
    Column("starts_at", DateTime(timezone=True), nullable=False),
    Column("ends_at", DateTime(timezone=True), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица specializations
specializations = Table(
    "specializations",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String(64), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица vacancies
vacancies = Table(
    "vacancies",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("company_id", Integer, ForeignKey('companies.id', ondelete='CASCADE'), nullable=False),
    Column("event_id", Integer, ForeignKey('events.id', ondelete='CASCADE'), nullable=False),
    Column("specialization_id", Integer, ForeignKey('specializations.id', ondelete='CASCADE'), nullable=False),
    Column("title", String(255), nullable=False),
    Column("description", Text),
    Column("salary", Float),
    Column("salary_type", Enum(SalaryType), nullable=False),
    Column("currency", String(10)),
    Column("location", String(255)),
    Column("work_mode", Enum(WorkMode), nullable=False),
    Column("employment_type", Enum(EmploymentType), nullable=False),
    Column("experience", Enum(Experience), nullable=False),
    Column("status", Enum(VacancyStatus), default=VacancyStatus.active, nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица skills
skills = Table(
    "skills",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("skill", String(64), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Таблица vacancies_skills
vacancies_skills = Table(
    "vacancies_skills",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("vacancy_id", Integer, ForeignKey('vacancies.id', ondelete='CASCADE'), nullable=False),
    Column("skill_id", Integer, ForeignKey('skills.id', ondelete='CASCADE'), nullable=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)


# Таблица applications
applications = Table(
    "applications",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("vacancy_id", Integer, ForeignKey('vacancies.id', ondelete='CASCADE'), nullable=False),
    Column("candidate_id", Integer, ForeignKey('candidates.id', ondelete='CASCADE'), nullable=False),
    Column("cover_letter", Text),
    Column("resume_path", String(255)),
    Column("status", Enum(ApplicationStatus), default=ApplicationStatus.pending, nullable=False),
    Column("is_favorited", Boolean, default=False),
    Column("is_withdrawn", Boolean, default=False),
    Column("created_at", DateTime(timezone=True), server_default=func.now(), nullable=False),
    Column("updated_at", DateTime(timezone=True), onupdate=func.now()),
)

# Объект для асинхронного взаимодействия с БД
database = Database(DATABASE_URL)
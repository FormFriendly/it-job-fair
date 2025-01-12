# it-job-fair

## Описание

Проект "IT ярмарка вакансий" представляет собой платформу для найма сотрудников, в основе которой лежит концепция ярмарки. На платформе периодически проводятся мероприятия, в рамках которых работодатели публикуют актуальные вакансии, а соискатели откликаются на них. Идею можно сравнивать с неделями карьеры, часто проводящимися на территориях вузов. Пользователи (users) могут зарегистрироваться как компания (companies) или как кандидат (candidates), настраивая свой профиль.

[Макеты в Figma >](https://www.figma.com/design/jiW1UfyL3h4mslTiSGxIUS/IT-BAZAR-%D1%87%D0%B8%D1%81%D1%82%D0%BE%D0%B2%D0%B8%D0%BA)

## Требования к проекту

### Agile, Scrum, Kanban

Проектные задачи фиксируются в [kanban-доске Github Projects](https://github.com/orgs/FormFriendly/projects/1).

### Git

Разработка ведется с использованием Git VCS в [монорепозитории, опубликованном на GitHub](https://github.com/FormFriendly/it-job-fair).

Помимо основной ветки (main) имеются ветки для разработки (backend-dev & frontent-dev), а также feature-ветки для отдельных функций.

[Подробнее о ветвлении >](https://github.com/FormFriendly/it-job-fair/network)

### Docker

Для подготовки и запуска окружения используются Docker-контейнеры. В директориях frontend и backend расположены Docker-файлы для управления отдельными контейнерами приложения. В Compose-файлах описаны инструкции для одновременного управления несколькими контейнерами, входящими в состав приложения.

### IDE и отладка

В качестве IDE командой используется VS Code с набором расширений для поддержки языков программирования, форматирования и автодополнения. Основные из них включают: Python (& Debugger), Pylance, Prettier, ESLint, Docker, Database Client, Remote Development (extenstion pack). Для отладки применяется инструментарий IDE, Docker Desktop и браузеров (Dev Tools).

### ООП

#### Наследование

Создан базовый класс `UserManager`, который определяет общую структуру для работы с различными типами пользователей. Подклассы `CandidateManager` и `CompanyManager` наследуют этот класс и реализуют свою уникальную логику.

```python
# /backend/src/app/managers/user.py
class UserManager(ABC):
    @abstractmethod
    async def create_profile(self):
        pass

class CandidateManager(UserManager):
    async def create_profile(self):
        # Логика создания профиля кандидата
        pass

class CompanyManager(UserManager):
    async def create_profile(self):
        # Логика создания профиля компании
        pass
```

#### Полиморфизм

Полиморфизм используется в обработке профилей пользователей. Код работает с абстракцией `UserManager`, вызывая методы `create_profile`, не зная заранее, какой тип пользователя (компания или кандидат) будет обрабатываться.

```python
# /backend/src/app/api/auth.py
@router.post("/register", response_model=UserAuth, status_code=201)
async def register(user: UserCreate):
    user_manager = UserManagerFactory.get_manager(user)
    profile = await user_manager.create_profile()
    return {"profile": profile}
```

#### Инкапсуляция

Инкапсуляция демонстрируется в том же примере с использованием `UserManager` и его дочерних классов. Само по себе использование класса — уже проявление инкапсуляции. У класса есть внутренняя реализация — она обеспечивает правильную работу класса — и публичный интерфейс, в котором собраны методы для внешнего использования.

```python
# /backend/src/app/managers/user.py
class CandidateManager(UserManager):
    # Инкапсуляция логики создания профиля
    async def create_profile(self):
        return await create_candidate_profile(self.user_data["id"])
    # Инкапсуляция логики получения профиля
    async def get_profile(self):
        return await get_candidate_profile(self.user_data["id"])
```

### Паттерны проектирования

#### Репозиторий (Repository)

CRUD-функции backend'а, такие как `get`, `get_all`, `post` и др. изолируют доступ к данным. Это приближает реализацию к паттерну Repository, обеспечивающему слой между бизнес-логикой и хранилищем данных.

```python
# /backend/src/app/crud/companies.py
async def get(company_id: int):
    query = select(companies).where(companies.c.id == company_id)
    return await database.fetch_one(query)

async def get_all():
    query = select(companies)
    return await database.fetch_all(query=query)

async def post(user_id: int):
    query = insert(companies).values(user_id=user_id)
    return await database.fetch_one(query)
```

#### Внедрение зависимостей (Dependency Injection)

В функцих контроллеров приложения используется Depends для внедрения зависимостей, таких как `get_current_user` для получения данных об авторизованном пользователе, реализуя паттерн DI.

```python
# /backend/src/app/api/users.py
@router.get("/me", response_model=User)
async def read_current_user(
    current_user: dict = Depends(get_current_user)
):
    user = await get_user_by_id(current_user["user_id"])
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

#### Строитель (Builder)

Использование Pydantic-моделей, таких как CompanyBase и ее наследников (CompanyCreate, CompanyUpdate) является упрощенным паттерном Builder, так как создаются различные представления одного и того же объекта для различных контекстов (создание, обновление, ответ клиенту и т.п.).

```python
# /backend/src/app/models/company.py
# Базовая модель
class CompanyBase(BaseModel):
    name: str = Field(...)
    #...

# Модель из БД
class CompanyInDBBase(CompanyBase):
    id: int
    #...

# Модель для ответа клиенту
class Company(CompanyInDBBase):
    logo_url: Optional[str] = None
    #...
```

#### Одиночка (Singleton)

При инициализации базы данных для нужд backend'а применяется паттерн Singleton, так как объект `database`, созданный с использованием библиотеки `databases` используется для взаимодействия с БД и существует в единственном экземпляре для всего приложения.

```python
# /backend/src/app/db.py
# Объект для асинхронного взаимодействия с БД
database = Database(DATABASE_URL)

# /backend/src/app/crud/users.py
# Импорт объекта для взаимодействия с БД
from app.db import database, users

async def get_user_by_id(user_id: int):
    query = users.select().where(users.c.id == user_id)
    return await database.fetch_one(query=query)
```

#### Декоратор (Decorator)

FastAPI применяет декораторы для определения маршрутов API. Таким образом, благодаря декораторам функции приобретают HTTP-метод, маршрут и его параметры, модель для ответа, код состояния HTTP-ответа, зависимости и др.

```python
# /backend/src/app/api/users.py
@router.get("/users/{id}",
    response_model=User,
    status_code=200,
    dependencies=[Depends(verify_token)]
)
async def read_user():
    #...
```

#### Фабрика (Factory)

В проекте реализован паттерн Factory для создания менеджеров пользователей в зависимости от их роли, упрощая добавление новых типов пользователей в будущем.

```python
# /backend/src/app/managers/user.py
class UserManagerFactory:
    @staticmethod
    def get_manager(user_data):
        if user_data["role"] == UserRole.candidate:
            return CandidateManager(user_data)
        elif user_data["role"] == UserRole.company:
            return CompanyManager(user_data)
        raise ValueError("Unsupported user role")
```

### Тестирование

Для ряда маршрутов API разработаны тесты, проверяющие работу системы на позитивных и негативных сценариях.

Типичный тест-кейс состоит из набора входных данных, подготовки предварительых условий (при необходимости используя Mock-объекты для изоляции), выполнения определенных действий и сравнения полученного результата с ожидаемым:

```python
# Попытка авторизации при неверных авторизационных данных
def test_login_invalid_credentials(test_app, monkeypatch):
    test_request_payload = {
        "username": "invalid@example.com",
        "password": "wrongpassword"
    }

    async def mock_get_user_by_email(email):
        return None  # Пользователь не найден

    monkeypatch.setattr("app.api.auth.get_user_by_email", mock_get_user_by_email)

    response = test_app.post("api/login", data=test_request_payload)

    assert response.status_code == 400
    assert response.json()["detail"] == "Incorrect email or password"
```

## Установка и запуск

### Frontend

@TODO

### Backend

Перед первым запуском проекта необходимо создать файл `.env` на основе `.env.example`.

#### Собрать контейнеры

```docker
docker-compose build
```

#### Запустить контейнеры

```docker
docker-compose up -d
```

#### Запустить тесты

```docker
docker-compose exec web pytest .
```

#### Войти в контейнер с БД

```docker
docker-compose exec db psql --username=username --dbname=dbname
```

#### Остановить контейнеры

```docker
docker-compose down
```

#### Очистить данные контейнеров, включая БД

```docker
docker-compose down --volumes
```

#### Полностью удалить контейнеры и данные

```docker
docker-compose down --rmi all --volumes --remove-orphans
```

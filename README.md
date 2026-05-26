# Project Description
A prototype social networking app with full-stack monolithic architecture with Google OAuth2, JWT, MSSQL, and real-time WebSocket notifications.

---

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | Angular 17, Angular Material, TailwindCSS     |
| Backend    | Java 21, Spring Boot 3, Spring Security       |
| Auth       | Google OAuth2 → JWT                           |
| Database   | MSSQL (SQL Server 2022)                       |
| Realtime   | WebSocket (STOMP over SockJS)                 |
| Container  | Docker + Docker Compose                       |

---

## Project Structure

```
project/
├── backend/
│   ├── src/main/java/com/app/
│   │   ├── AppApplication.java
│   │   ├── config/
│   │   │   ├── SecurityConfig.java        # Spring Security + CORS
│   │   │   └── WebSocketConfig.java       # STOMP + JWT channel interceptor
│   │   ├── controller/
│   │   │   └── UserController.java        # GET /api/user/me
│   │   ├── dto/
│   │   │   └── NotificationDto.java
│   │   ├── entity/
│   │   │   └── User.java                  # users table entity
│   │   ├── repository/
│   │   │   └── UserRepository.java
│   │   ├── security/
│   │   │   ├── jwt/
│   │   │   │   ├── JwtUtils.java          # token generate/validate
│   │   │   │   └── JwtAuthFilter.java     # per-request JWT filter
│   │   │   └── oauth2/
│   │   │       └── OAuth2SuccessHandler.java  # redirect with JWT after OAuth2
│   │   ├── service/
│   │   │   ├── UserService.java           # upsert user on login
│   │   │   └── NotificationService.java   # STOMP broadcast + scheduled demo
│   │   └── websocket/
│   │       └── NotificationWebSocketController.java
│   ├── src/main/resources/
│   │   └── application.yml
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/app/
│   │   ├── app.component.ts
│   │   ├── app.config.ts                  # providers: router, http, animations
│   │   ├── app.routes.ts                  # lazy-loaded routes
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts          # protect /dashboard
│   │   │   │   └── login.guard.ts         # redirect authed users from /login
│   │   │   ├── interceptors/
│   │   │   │   └── jwt.interceptor.ts     # attach Bearer token
│   │   │   └── services/
│   │   │       ├── auth.service.ts        # login, token, user signal
│   │   │       └── websocket.service.ts   # STOMP client, status signal
│   │   ├── features/
│   │   │   ├── login/
│   │   │   │   └── login.component.ts     # Google login button
│   │   │   ├── auth-callback/
│   │   │   │   └── auth-callback.component.ts  # captures ?token=
│   │   │   └── dashboard/
│   │   │       └── dashboard.component.ts # profile + notifications
│   │   └── shared/components/
│   │       └── notification-panel/
│   │           └── notification-panel.component.ts
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   ├── Dockerfile
│   ├── nginx.conf
│   └── proxy.conf.json
│
├── docker-compose.yml
├── .env.example
└── .gitignore
```

---

## Authentication Flow

```
Browser → /oauth2/authorization/google
       → Google consent screen
       → Backend callback → save/update user in DB
       → Generate JWT
       → Redirect to frontend /auth/callback?token=<jwt>
       → Angular stores token → navigate to /dashboard
       → WebSocket connects with JWT in STOMP headers
```

---

## Quick Start

### 1. Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → **APIs & Services** → **Credentials**
3. Create **OAuth 2.0 Client ID** (Web application)
4. Add authorized redirect URIs:
   - `http://localhost:8080/oauth2/callback/google`  ← for local dev
   - `http://localhost/oauth2/callback/google`       ← for Docker Compose

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your Google credentials and JWT secret
```

### 3. Run with Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:4200  
- Backend:  http://localhost:8080

### 4. Local Development (without Docker)

**Backend:**
```bash
cd backend
# Set env vars or edit application.yml directly
export GOOGLE_CLIENT_ID=...
export GOOGLE_CLIENT_SECRET=...
export JWT_SECRET=...
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm start     # uses proxy.conf.json to forward /api, /ws to localhost:8080
```

---

## Database

The application auto-creates the `users` table on startup via `spring.jpa.hibernate.ddl-auto=update`.

```sql
CREATE TABLE users (
    id            BIGINT IDENTITY(1,1) PRIMARY KEY,
    google_id     NVARCHAR(255) NOT NULL UNIQUE,
    name          NVARCHAR(255) NOT NULL,
    email         NVARCHAR(255) NOT NULL UNIQUE,
    profile_image NVARCHAR(500),
    created_at    DATETIME2     NOT NULL,
    last_login    DATETIME2
);
```

---

## WebSocket

- **Endpoint:** `/ws` (SockJS fallback)
- **Auth:** JWT in STOMP `Authorization` header
- **Channels:**
  - `/topic/notifications` — broadcast to all connected users
  - `/user/queue/notifications` — user-specific messages
- **Client → Server:** `/app/ping` → triggers a welcome notification
- **Auto-reconnect:** configured via `@stomp/rx-stomp` with 5-second delay

---

## API Endpoints

| Method | Path          | Auth | Description              |
|--------|---------------|------|--------------------------|
| GET    | /oauth2/authorization/google | ✗ | Start Google login |
| GET    | /api/user/me  | JWT  | Get current user profile |

---

## Environment Variables

| Variable                 | Description                        | Default                  |
|--------------------------|------------------------------------|--------------------------|
| `GOOGLE_CLIENT_ID`       | Google OAuth2 Client ID            | required                 |
| `GOOGLE_CLIENT_SECRET`   | Google OAuth2 Client Secret        | required                 |
| `JWT_SECRET`             | JWT signing secret (min 32 chars)  | required                 |
| `SPRING_DATASOURCE_URL`  | JDBC URL for MSSQL                 | localhost:1433/appdb     |
| `APP_BASE_URL`           | Frontend base URL for redirects    | http://localhost:4200    |

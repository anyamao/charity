from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import auth, articles  # ✅ This should work now

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(
    articles.router, prefix="/api/v1/articles", tags=["articles"]
)  # ✅ Add this


@app.get("/")
def root():
    return {"message": "Charity API", "docs": "/docs"}


@app.get("/api/health")
def health():
    return {"status": "ok"}

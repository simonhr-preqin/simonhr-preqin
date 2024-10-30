from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1 import router as api_router_v1

app = FastAPI()

origins = [
  "http://localhost:*",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=False,
  allow_methods=["GET"],
  allow_headers=["*"],
)

app.include_router(api_router_v1, prefix="/api/v1")

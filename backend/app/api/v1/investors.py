"""
REST API to query for investors and their commitments
"""
from typing import List
from fastapi import APIRouter

from app.models import CommitmentDTO, InvestorDTO
from app.queries import get_investor as get_investor_from_db, \
  get_investors as get_investors_from_db

router = APIRouter()

@router.get("/")
def get_investors() -> List[InvestorDTO]:
  return get_investors_from_db()

@router.get("/{investor_id}")
def get_investor(investor_id: int) -> List[CommitmentDTO]:
  return get_investor_from_db(investor_id)

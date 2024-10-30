from fastapi import APIRouter

from . import investors

router = APIRouter()
router.include_router(investors.router, prefix="/investors", tags=["investors"])

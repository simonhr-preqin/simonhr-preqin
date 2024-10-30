from datetime import datetime

from pydantic import BaseModel, PositiveInt

class InvestorDTO(BaseModel):
    id: PositiveInt
    name: str
    type: str
    country: str
    date_added: datetime
    total_amount: float

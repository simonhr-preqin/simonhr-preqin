from pydantic import BaseModel, PositiveInt

class CommitmentDTO(BaseModel):
    id: PositiveInt
    asset_class: str
    amount: float
    currency: str

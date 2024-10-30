from typing import List
from app.database import query_get
from app.models import InvestorDTO
from app.models import CommitmentDTO

def get_investors() -> List[InvestorDTO]:
    investors = query_get(
        'select investor_id, name, type, date_added, country, total_amount from dbo.investors i join dbo.commitments_total c on i.id = c.investor_id',
        cursor_func=lambda investor : InvestorDTO(
            id=investor.investor_id,
            name=investor.name,
            type=investor.type,
            country=investor.country,
            date_added=investor.date_added,
            total_amount=investor.total_amount
        ))
    return investors

def get_investor(investor_id: int) -> List[CommitmentDTO]:
    commitments = query_get(
        'select id, asset_class, amount, currency from commitments where investor_id = ?',
        investor_id,
        cursor_func=lambda commitment : CommitmentDTO(
            id=commitment.id,
            asset_class=commitment.asset_class,
            amount=commitment.amount,
            currency=commitment.currency
        ))
    return commitments

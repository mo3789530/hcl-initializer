from typing import Optional
from pydantic import BaseModel


class Option(BaseModel):
    service: Optional[list[str]]
    region: str
    name: str
    env: str

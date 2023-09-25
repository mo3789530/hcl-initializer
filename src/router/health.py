from fastapi import APIRouter

router: APIRouter = APIRouter(tags=["health"])


@router.get("/health")
async def health():
    return {"status": "up"}

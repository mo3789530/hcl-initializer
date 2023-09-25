from fastapi import APIRouter
from fastapi.responses import FileResponse
from src.service.hcl_service import HclService
from .dto.option import Option
import os

router = APIRouter(tags=["hcl"], prefix="/hcl")


# TODO return zip file
# @router.post("/generate", response_class=FileResponse)
@router.post("/generate")
async def hcl(option: Option):
    hclService: HclService = HclService(path="terraform", services=option.service)
    return hclService.genarate()


@router.get("/options")
async def options():
    options = os.environ.get("options", 'aurora,ecs,cloudfront')
    return {"options": options.split(",")}

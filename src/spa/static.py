from fastapi.staticfiles import StaticFiles
from starlette.responses import Response
from starlette.types import Scope
from fastapi import HTTPException


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope: Scope) -> Response:
        try:
            return await super().get_response(path=path, scope=scope)
        except HTTPException as ex:
            if ex.status_code == 404:
                return await super().get_response("index.html", scope=scope)
            else:
                raise ex

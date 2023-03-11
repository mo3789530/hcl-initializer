from logging import getLogger

logger = getLogger("src").getChild(__name__)


class HclParser:
    def __init__(self) -> None:
        pass

    def get_keys(self, data: dict) -> list:
        keys = data.keys()
        return list(keys)

    def parse(self, origin: dict, target: str):
        return origin.get(target, {})

    def merge(self, origin: dict, mergr_data: list) -> dict:
        if self.__check_locals(origin) == False:
            raise Exception("Formt error")
        for m in mergr_data:
            origin['locals']["pack"].update(m)
        return origin

    def __check_locals(self, origin: dict) -> bool:
        if origin.get('locals', None) == None:
            return False
        return True

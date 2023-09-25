import json
from logging import getLogger
from ctypes import CDLL, c_char_p

logger = getLogger("src").getChild(__name__)


class HclParser:
    def __init__(self) -> None:
        # load native binary written by golan
        self._lib = CDLL("./json2hcl/main.so")
        self._hcl2json = self._lib.hcl2json
        self._json2hcl = self._lib.json2hcl
        self._hcl2json.restype = c_char_p
        self._json2hcl.restype = c_char_p

    def get_keys(self, data: dict) -> list:
        keys = data[0].keys()
        return list(keys)

    def parse(self, origin: dict, target: str):
        return origin.get(target, {})

    def merge(self, origin: dict, mergr_data: list) -> dict:
        if not self.__check_locals(origin):
            raise Exception("Formt error")
        for m in mergr_data:
            origin['locals'][0]["pack"][-1].update(m)
        return origin

    # hcl2json
    def loads(self, hcl: str) -> dict:
        json_data = self._hcl2json(bytes(hcl, "utf-8")).decode("utf-8")
        return json.loads(json_data)

    # json2hcl
    def dumps(self, json_data: dict) -> str:
        json_data = json.dumps(json_data)
        hcl_data = self._json2hcl(bytes(json_data, "utf-8")).decode("utf-8")
        return self.pretty(hcl=hcl_data)

    def __check_locals(self, origin: dict) -> bool:
        if origin.get('locals', None) is None:
            return False
        return True

    # remove ["] in hcl str because terraform cannot recognition block if included " in block
    def pretty(self, hcl: str) -> str:
        logger.debug(hcl)
        pretty = []
        for l in hcl.split("\n"):
            # print(l)
            if '"locals" = {' in l:
                pretty.append("locals { \n")
                continue
            elif "= {" in l:
                print(l)
                l = l.replace('"', '')
            elif "=" in l:
                split = l.split("=")
                split[0] = split[0].replace('"', '')
                split.insert(1, "=")
                l = "".join(split)
            pretty.append(l + "\n")

        logger.debug("".join(pretty))

        return "".join(pretty)

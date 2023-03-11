from src.hcl.hcl import HclParser
from src.utils.file import File


class HclService:
    def __init__(self, services: list, path: str) -> None:
        self.services = services
        self.fileUtils = File(path=path)
        self.hcl = HclParser()

    def genarate(self) -> dict:
        origin = self.fileUtils.open_hcl("common")
        hcl_list = []
        for s in self.services:
            hcl = self.fileUtils.open_hcl(s)
            hcl_list.append(hcl)
        return self.hcl.merge(origin=origin, mergr_data=hcl_list)

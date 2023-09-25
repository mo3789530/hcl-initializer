from logging import getLogger

logger = getLogger("src").getChild(__name__)


class File:
    def __init__(self, path) -> None:
        self.path = path

    def open_hcl(self, filename) -> str:
        path = self.path + '/' + filename + '.tf'
        with open(file=path, mode='r') as f:
            data = f.read()
            f.close()
            return data

    def write_hcl(self, filepath: object = "./test.tf", data: object = "") -> object:
        with open(file="./test.tf", mode='w') as f:
            f.write(data)
            f.close()

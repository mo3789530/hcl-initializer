from logging import getLogger
import hcl

logger = getLogger("src").getChild(__name__)

class File():
    def __init__(self, path) -> None:
        self.path = path

    def open_hcl(self,filename):
        path = self.path + '/' + filename + '.tf'
        with open(file=path, mode='r') as f:
            return hcl.load(f)

    def write_hcl():
        pass


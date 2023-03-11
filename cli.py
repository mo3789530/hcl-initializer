from src.utils.file import File
from src.myhcl.hcl import HclParser
import hcl


def main():
    file = File('terraform')
    common = file.open_hcl('common')
    print(common)
    myhcl = HclParser()
    # print(hcl.get_keys(common['locals']))
    aurora = file.open_hcl('aurora')
    myhcl.merge(common, [aurora])
    print(hcl.dumps(common))
    print(hcl.loads(common))


if __name__ == "__main__":
    main()

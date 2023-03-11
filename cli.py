from src.utils.file import File
from src.hcl.hcl import HclParser


def main():
    file = File('terraform')
    common = file.open_hcl('ecs')
    print(common)
    hcl = HclParser()
    # print(hcl.get_keys(common['locals']))
    aurora = file.open_hcl('aurora')
    hcl.merge(common, [aurora])


if __name__ == "__main__":
    main()

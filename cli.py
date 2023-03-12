from src.utils.file import File
from src.myhcl.hcl import HclParser


def main():
    file = File('terraform')
    common = file.open_hcl('common')
    print(common)
    myhcl = HclParser()
    print(myhcl.loads(common))
    common = myhcl.loads(common)
    print(type(common))

    print(common["locals"])
    print(myhcl.get_keys(common['locals']))
    aurora = file.open_hcl('aurora')
    aurora = myhcl.loads(aurora)

    myhcl.merge(common, [aurora])

    print(myhcl.dumps(common))

    print("aaaa")
    print(myhcl.pretty(myhcl.dumps(common)))
    file.write_hcl(data=myhcl.pretty(myhcl.dumps(common)))


if __name__ == "__main__":
    main()

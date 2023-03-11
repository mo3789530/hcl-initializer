from src.utils.file import File
from src.myhcl.hcl import HclParser
import json
import hcl


from ctypes import CDLL, c_char_p


def main():
    file = File('terraform')
    common = file.open_hcl('common')
    print(common)
    myhcl = HclParser()
    # print(hcl.get_keys(common['locals']))
    aurora = file.open_hcl('aurora')
    myhcl.merge(common, [aurora])
    print(hcl.dumps(common))
    # print(hcl.loads(common))

    lib = CDLL("./json2hcl/main.so")
    json2hcl = lib.json2hcl
    hcl2json = lib.hcl2json
    hcl2json.restype = c_char_p
    json2hcl.restype = c_char_p

    print(type(common))

    data = hcl2json(b"""
        "locals" = {
            "env" = {
                "region" = "ap-northeast-1"
            }

            "ext" = {}

            "pack" = {
                "aurora" = {
                    "aaa" = "bbb"
                }
            }
        }
    """, "utf-8").decode("utf-8")

    print(json.loads(data))
    test = json.dumps(json.loads(data))

    print(json2hcl(bytes(test, "utf-8")).decode("utf-8"))
    print("aaaaaaaa")


if __name__ == "__main__":
    main()

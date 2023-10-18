package main

import (
	"C"

	myhcl "json2hcl/internal/hcl"
)

// https://github.com/kvz/json2hcl/blob/master/main.go

//export json2hcl
func json2hcl(json *C.char) *C.char {
	jsonString := C.GoString(json)

	return C.CString(myhcl.JsonToHcl(jsonString))
}

//export hcl2json
func hcl2json(hcl *C.char) *C.char {
	hclString := C.GoString(hcl)

	return C.CString(myhcl.HclStringToJson(hclString))
}

func main() {
	// debug
	// 	jsonString := `{"locals": [{"env": [{"region": "ap-northeast-1"}], "ext": [{}], "pack": [{"aurora": [{"aaa": "bbb"}]}]}]}`

	// 	ast, err := hcl2json([]byte(jsonString))
	// 	if err != nil {
	// 		print("err")
	// 	}

	// // stdin := bytes.NewBufferString("")
	// // printer.Fprint(stdin, ast)
	// // print(stdin.String())
}

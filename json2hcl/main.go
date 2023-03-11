package main

import (
	"C"
	"bytes"
	"encoding/json"

	hclParser "github.com/hashicorp/hcl"
	"github.com/hashicorp/hcl/hcl/printer"
	jsonParser "github.com/hashicorp/hcl/json/parser"
)

// https://github.com/kvz/json2hcl/blob/master/main.go

//export json2hcl
func json2hcl(json *C.char) *C.char {
	jsonString := C.GoString(json)

	ast, err := jsonParser.Parse([]byte(jsonString))
	if err != nil {
		return C.CString(err.Error())
	}

	stdin := bytes.NewBufferString("")
	err = printer.Fprint(stdin, ast)

	if err != nil {
		return C.CString(err.Error())
	}

	return C.CString(stdin.String())
}

//export hcl2json
func hcl2json(hcl *C.char) *C.char {
	hclString := C.GoString(hcl)

	var v interface{}

	err := hclParser.Unmarshal([]byte(hclString), &v)
	if err != nil {
		return C.CString(err.Error())
	}

	json, err := json.MarshalIndent(v, "", " ")
	if err != nil {
		return C.CString(err.Error())
	}

	return C.CString(string(json))

}

func main() {
	// debug
	// jsonString := `{"locals": [{"env": [{"region": "ap-northeast-1"}], "ext": [{}], "pack": [{"aurora": [{"aaa": "bbb"}]}]}]}`

	// ast, err := jsonParser.Parse([]byte(jsonString))
	// if err != nil {
	// 	print("err")
	// }

	// stdin := bytes.NewBufferString("")
	// printer.Fprint(stdin, ast)
	// print(stdin.String())
}

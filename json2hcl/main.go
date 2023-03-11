package main

import (
	"C"
	"os"

	"github.com/hashicorp/hcl/hcl/printer"
	jsonParser "github.com/hashicorp/hcl/json/parser"
)

//export json2hcl
func json2hcl(json *C.char) *C.char {
	jsonString := C.GoString(json)

	ast, err := jsonParser.Parse([]byte(jsonString))
	if err != nil {
		return C.CString(err.Error())
	}

	printer.Fprint(os.Stdout, ast)

	return C.CString(jsonString)
}

func main() {}

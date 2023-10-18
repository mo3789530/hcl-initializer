package hcl

import (
	"encoding/json"
	"fmt"
	"os"
	"reflect"

	"github.com/hashicorp/hcl/v2/hclwrite"
	hcl2json "github.com/tmccombs/hcl2json/convert"
	"github.com/zclconf/go-cty/cty"
	"golang.org/x/exp/slog"
)

func HclBytesToJson(hclBytes []byte) string {

	res, err := hcl2json.Bytes(hclBytes, "", hcl2json.Options{})
	if err != nil {
		slog.Error(err.Error())
	}

	return string(res)
}

func HclStringToJson(hcl string) string {
	return HclBytesToJson([]byte(hcl))
}

func JsonByteToHcl(data []byte) string {
	return JsonToHcl(string(data))
}

func JsonToHcl(jsonStr string) string {
	var data map[string]interface{}
	if err := json.Unmarshal([]byte(jsonStr), &data); err != nil {
		slog.Error(err.Error())
		os.Exit(1)
	}

	f := hclwrite.NewEmptyFile()
	rootBody := f.Body()
	for k, v := range data {
		WriteBodyBodyHcl(rootBody, k, v)
		rootBody.AppendNewline()
	}

	hclwrite.Format(f.Bytes())

	return string(f.Bytes())
}

func FindMatchingBlocks(b *hclwrite.Body, name string, labels []string) []*hclwrite.Block {
	var matched []*hclwrite.Block
	for _, block := range b.Blocks() {
		if name == block.Type() {
			labelsName := block.Labels()
			if len(labels) == 0 && len(labelsName) == 0 {
				matched = append(matched, block)
				continue
			}
			if reflect.DeepEqual(labels, name) {
				matched = append(matched, block)
			}
		}
	}
	return matched
}

func MapToCtyValue(input interface{}) cty.Value {
	switch v := input.(type) {
	case map[string]interface{}:
		obj := make(map[string]cty.Value)
		for key, value := range v {
			obj[key] = MapToCtyValue(value)
		}
		return cty.ObjectVal(obj)
	case []interface{}:
		arr := make([]cty.Value, len(v))
		for i, item := range v {
			arr[i] = MapToCtyValue(item)
		}
		return cty.ListVal(arr)
	case string:
		return cty.StringVal(v)
	default:
		// Handle other types or log an error as needed
		fmt.Printf("Unsupported type: %T\n", v)
		return cty.NullVal(cty.DynamicPseudoType)
	}
}

func WriteAttribute(body *hclwrite.Body, key string, value interface{}) {
	switch v := value.(type) {
	case map[string]interface{}:
		for k, v := range v {
			body.SetAttributeValue(k, MapToCtyValue(v))
		}
	default:
		// Handle other types or log an error as needed
		// slog.Warn("Unsupported type for key: %T\n", v)
		body.SetAttributeValue(key, MapToCtyValue(v))
	}
}

func WriteAttributes(block *hclwrite.Block, value interface{}) {
	switch v := value.(type) {
	case map[string]interface{}:
		for k, v := range v {
			block.Body().SetAttributeValue(k, MapToCtyValue(v))
		}
	case []interface{}:
		// Handle the case of a slice of values
		for _, item := range v {
			if vt, ok := item.(map[string]interface{}); ok {
				for k, v := range vt {
					block := block.Body()
					WriteBodyBodyHcl(block, k, v)
				}
			}
		}
	default:
		// Handle other types or log an error as needed
		// slog.Warn("Unsupported type for key: %T\n", v)
	}
}

// WriteBodyBodyHcl write block
func WriteBodyBodyHcl(body *hclwrite.Body, key string, values interface{}) {

	switch v := values.(type) {
	case []interface{}:
		// for local
		block := body.AppendNewBlock(key, []string{})
		for _, item := range v {
			WriteAttributes(block, item)
			// block.Body().SetAttributeValue(key, MapToCtyValue(item))
		}
	case map[string]interface{}:
		// for resource
		for kk, vv := range v {
			if vt, ok := vv.(map[string]interface{}); ok {
				for kkk, vvv := range vt {
					block := body.AppendNewBlock(key, []string{kk, kkk})
					WriteAttributes(block, vvv)
				}
			} else {
				block := body.AppendNewBlock(key, []string{kk})
				WriteAttribute(block.Body(), kk, vv)
			}
		}

	default:
		body.SetAttributeValue(key, MapToCtyValue(v))
	}
	body.AppendNewline()
}

func P(t interface{}) {
	fmt.Println(reflect.TypeOf(t))
}

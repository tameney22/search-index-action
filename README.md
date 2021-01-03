# Search Index JSON Generator Action
This action parses xml documents and creates a search index for use in lunr.js.

## Inputs

### `xml-list`

**Required** A space separated string of xml filenames to be parsed.

### `xml-directory`

**Required** The directory where the xml files are located. Default `./`.

### `index-directory`

**Required** The directory where the output index.json file is placed. Default `./`.

## Outputs

### `time`

The time the action was ran. For use in logging.

## Example usage

```yaml
uses: tameney22/search-index-action@v1.0
      id: index
      with:
        xml-list: 'b.xml br.xml p.xml t.xml'
        xml-directory: './xmls'
        index-directory:  './output/inHere'
```

# Testing JS Hello World function
This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `xml-directory`

**Required** The directory where the xml files are located. Default `"./"`.

### `index-directory`

**Required** The directory where the output index.json file is placed. Default `"./"`.

## Outputs

### `time`

The time we greeted you.

### `index`

The search index to be saved in index.json

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'

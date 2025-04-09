# CNRTL Definition Finder

CNRTL Definition Finder is a command-line tool to search and display word definitions from the [CNRTL](https://cnrtl.fr/) website. It allows users to specify the number of definitions they want to display for a given word.

## Features

- Search for word definitions on CNRTL
- Specify the number of definitions to display
- Clean and colorful command-line output
- Easy to use with simple commands

## Installation

### Using npx (No Installation Required)

You can run the tool directly using npx without installing it:

```sh
npx cnrtl-definition-finder -w <word> -n <number_of_definitions>
```

### Local Installation

1. Install the package globally:

```sh
npm install -g cnrtl-definition-finder
```

2. You can now use the command anywhere:

```sh
cnrtl -w <word> -n <number_of_definitions>
```

### Manual Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```sh
npm install
```

4. Link the package locally:

```sh
npm link
```

## Usage

```sh
cnrtl -w <word> [-n <number_of_definitions>]
```

### Options

- `-w, --word <word>`: Word to search for (required)
- `-n, --number <number>`: Number of definitions to display (optional, defaults to 2)
- `-V, --version`: Output the version number
- `-h, --help`: Display help information

### Examples

Search for "amour" and display the default number of definitions (2):

```sh
cnrtl -w amour
```

Search for "philosophie" and display 5 definitions:

```sh
cnrtl -w philosophie -n 5
```

## Dependencies

- commander: Command-line interface
- axios: HTTP client for making requests
- cheerio: HTML parsing and manipulation
- chalk: Terminal string styling
- ora: Elegant terminal spinners

## License

This project is licensed under the MIT License - see the LICENSE file for details.
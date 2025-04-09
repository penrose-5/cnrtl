#!/usr/bin/env node

const { program } = require('commander');
const axios = require('axios');
const cheerio = require('cheerio');
const chalk = require('chalk');
const ora = require('ora');

program
  .name('cnrtl')
  .description('Search and display word definitions from the CNRTL website')
  .version('1.0.0')
  .requiredOption('-w, --word <word>', 'word to search for')
  .option('-n, --number <number>', 'number of definitions to display', '2')
  .parse(process.argv);

const options = program.opts();

const searchWord = async (word, numDefinitions) => {
  const spinner = ora(`Searching for "${word}"...`).start();

  try {
    // Fetch the definition page
    const url = `https://www.cnrtl.fr/definition/${encodeURIComponent(word)}`;
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      spinner.fail(`Failed to fetch definition for "${word}"`);
      return;
    }

    const $ = cheerio.load(response.data);
    
    // Find and extract definitions
    const definitions = [];
    $('.tlf_cdefinition').each((i, element) => {
      const definition = $(element).text().trim()
        .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
        .replace(/\n/g, ' '); // Remove newlines
      
      if (definition) {
        definitions.push(definition);
      }
    });

    spinner.succeed(`Found ${definitions.length} definitions for "${word}"`);

    // Display the requested number of definitions
    const numToShow = Math.min(parseInt(numDefinitions, 10), definitions.length);
    
    for (let i = 0; i < numToShow; i++) {
      console.log(chalk.bold(`\nDefinition ${i + 1}:`));
      console.log(chalk.cyan(definitions[i]));
    }

    if (definitions.length === 0) {
      console.log(chalk.yellow(`\nNo definitions found for "${word}"`));
      console.log(chalk.gray(`Check your spelling or try another word.`));
    } else if (definitions.length > numToShow) {
      console.log(chalk.gray(`\n... and ${definitions.length - numToShow} more definitions available at ${url}`));
    }
  } catch (error) {
    spinner.fail(`Error: ${error.message}`);
    console.error(chalk.red('Failed to fetch or parse the definition.'));
    console.error(chalk.gray('Make sure the word exists or check your internet connection.'));
  }
};

// Execute the search
searchWord(options.word, options.number);
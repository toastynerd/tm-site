#!/usr/bin/env node

/**
 * Markdown Linter for Blog Posts
 * 
 * This script validates that all blog posts have the required frontmatter fields:
 * - title
 * - date (in the format YYYY-MM-DD)
 * - description
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const chalk = require('chalk');

// Configuration
const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');
const REQUIRED_FIELDS = ['title', 'date', 'description'];
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

// We're using inline ANSI colors, so no need to check for chalk

/**
 * Validates a date string is in the format YYYY-MM-DD
 */
function isValidDateFormat(dateStr) {
  return DATE_REGEX.test(dateStr);
}

/**
 * Validates a single markdown file
 */
function validateMarkdownFile(filePath) {
  console.log(`Checking ${path.basename(filePath)}...`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  try {
    const { data } = matter(fileContent);
    const errors = [];
    
    // Check for required fields
    for (const field of REQUIRED_FIELDS) {
      if (!data[field]) {
        errors.push(`Missing required field: ${field}`);
      }
    }
    
    // Check date format if it exists
    if (data.date && !isValidDateFormat(data.date)) {
      errors.push(`Invalid date format: ${data.date}. Expected: YYYY-MM-DD`);
    }
    
    // Check for incorrect field names
    const knownFields = new Set([...REQUIRED_FIELDS, 'excerpt']);
    const usedFields = Object.keys(data);
    
    for (const field of usedFields) {
      if (!knownFields.has(field)) {
        errors.push(`Unknown field: ${field}. Did you mean one of: ${Array.from(knownFields).join(', ')}?`);
      }
    }
    
    // Report errors or success
    if (errors.length > 0) {
      console.log(chalk.red('✖ Failed'));
      errors.forEach(error => console.log(chalk.red(`  - ${error}`)));
      return { file: path.basename(filePath), errors };
    } else {
      console.log(chalk.green('✓ Passed'));
      return null;
    }
  } catch (error) {
    console.log(chalk.red(`✖ Error parsing frontmatter: ${error.message}`));
    return { file: path.basename(filePath), errors: [`Error parsing frontmatter: ${error.message}`] };
  }
}

/**
 * Main function to validate all markdown files
 */
function lintMarkdownFiles() {
  console.log(chalk.blue('Starting markdown linting...'));
  
  // Get all markdown files
  const files = fs.readdirSync(BLOG_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(BLOG_DIR, file));
  
  console.log(chalk.blue(`Found ${files.length} markdown files to check\n`));
  
  // Validate each file
  const results = files.map(validateMarkdownFile);
  const failures = results.filter(result => result !== null);
  
  // Summary
  console.log('\n' + chalk.blue('Linting Summary:'));
  console.log(chalk.blue(`Total files: ${files.length}`));
  console.log(chalk.green(`Passed: ${files.length - failures.length}`));
  
  if (failures.length > 0) {
    console.log(chalk.red(`Failed: ${failures.length}`));
    console.log('\n' + chalk.red('Failures:'));
    failures.forEach(failure => {
      console.log(chalk.red(`\n${failure.file}:`));
      failure.errors.forEach(error => console.log(chalk.red(`  - ${error}`)));
    });
    process.exit(1);
  } else {
    console.log(chalk.green('\nAll files passed validation!'));
  }
}

// Run the linter
lintMarkdownFiles();
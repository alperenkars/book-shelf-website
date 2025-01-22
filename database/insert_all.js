
const { exec } = require('child_process');
const path = require('path');

// Path to the insert_scripts directory
const scriptsDir = path.join(__dirname, 'insert_scripts');

// Array of insert scripts to execute in order
const scripts = [
  'create_database.js',
  'insert_users.js',
  'insert_books.js',
  'insert_libraries.js',
  'insert_book_copies.js',
  'insert_library_includes_book.js',
  'insert_follows.js',
  'insert_user_borrow_book.js',
];

// Function to execute a script
const runScript = (script) => {
  return new Promise((resolve, reject) => {
    console.log(`Running ${script}...`);
    exec(`node ${path.join(scriptsDir, script)}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing ${script}:`, stderr);
        reject(error);
      } else {
        console.log(`${script} completed successfully.`);
        resolve(stdout);
      }
    });
  });
};

// Function to execute all scripts sequentially
const runAllScripts = async () => {
  try {
    for (const script of scripts) {
      await runScript(script);
    }
    console.log('All insert scripts executed successfully.');
  } catch (error) {
    console.error('Error executing scripts:', error.message);
  }
};

// Run the scripts
runAllScripts();
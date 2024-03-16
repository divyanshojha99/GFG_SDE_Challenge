# Code Validator

Code Validator is a web application built with Node.js and Express.js that analyzes HTML, CSS, and JavaScript code based on user-defined criteria.

## Features

- Analyzes HTML, CSS, and JavaScript code against user-defined criteria.
- Provides feedback on whether the code meets the specified requirements.
- Supports custom criteria for each code type.

## KEY Points
- Change the Criteria Files for HTML, CSS and JS in the given Format
- Users Can Upload their HTML, CSS and JS Files.
- Output Will be provided on JS Console Not on Frontend, will resolve this

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/code-analyzer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd code-analyzer
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Start the server:

    ```bash
    node server.js
    ```

2. Open with live server and your web browser - go to `http://127.0.0.1:5500/index.html`.

3. Use the provided UI to input your HTML, CSS, and JavaScript code.

4. Define criteria for each code type using JSON format and Upload.

5. Click the "Run Test" button to initiate the analysis process.

6. View the feedback provided by the application can view in Console.

## API Endpoints

- **POST /saveData**: Accepts JSON data containing HTML, CSS, and JavaScript code. Initiates the analysis process and returns feedback.

## Example Usage

```javascript
const axios = require('axios');

const inputData = {
    html: '<html><body><h1>Hello, world!</h1></body></html>',
    css: 'body { background-color: #eee; }',
    js: 'console.log("Hello, world!");',
    htmlFile: '[{"description": "Check if h1 tag exists", "check": "$(\"h1\").length > 0"}]',
    cssFile: '[{"description": "Check if background color is set", "check": "(ast) => ast.stylesheet.rules.some(rule => rule.type === \'rule\' && rule.selectors.includes(\'body\') && rule.declarations.some(declaration => declaration.property === \'background-color\'))"}]',
    jsFile: '[{"description": "Check if console.log is used", "check": "(jsContent) => jsContent.includes(\'console.log\')"}]'
};

axios.post('http://localhost:3000/saveData', inputData)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
```

## Dependencies

- Express.js
- Cheerio
- CSS Tree
- Axios (for example usage)

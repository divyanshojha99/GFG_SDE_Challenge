const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;
const cheerio = require('cheerio');
const { analyze } = require('css');
app.use(cors());
app.use(express.json());
function analyzeHTML(htmlContent, htmlCriteriaString) {
    const $ = cheerio.load(htmlContent);
    const criteriaArray = JSON.parse(htmlCriteriaString);
    const feedback = criteriaArray.map(({ description, check }) => {
        const checkFunction = eval(`(${check})`);
        return {
            message: checkFunction($) ? 'Passed: ' + description : 'Failed: ' + description
        };
    });
    return feedback;
}

function analyzeCSS(cssContent, cssCriteriaString) {
    const $ = cheerio.load(cssContent);
    const criteriaArray = JSON.parse(cssCriteriaString);
    const feedback = criteriaArray.map(({ description, check }) => {
        const checkFunction = eval(`(${check})`);
        return {
            message: checkFunction($) ? 'Passed: ' + description : 'Failed: ' + description
        };
    });
    return feedback;
}

/*function analyzeJS(jsContent, jsCriteriaString) {
    const $ = cheerio.load(jsCriteriaString);
    const criteriaArray = JSON.parse(jsCriteriaString);
    const feedback = criteriaArray.map(({ description, check }) => {
        const checkFunction = eval(`(${check})`);
        return {
            message: checkFunction($) ? 'Passed: ' + description : 'Failed: ' + description
        };
    });
    return feedback;
}*/

app.post('/saveData', (req, res) => {
    const { html, css, js, htmlFile, cssFile, jsFile } = req.body;
    let feedback = [];

    fs.writeFile('example.html', html, (err) => {
        if (err) {
            console.error('Error saving HTML file:', err);
            return res.status(500).json({ error: 'Error saving HTML file' });
        }

        fs.readFile('example.html', 'utf8', (err, htmlContent) => {
            if (err) {
                console.error('Error reading HTML file:', err);
                return res.status(500).json({ error: 'Error reading HTML file' });
            }
            feedback = [...feedback, ...analyzeHTML(htmlContent, htmlFile)];

            fs.writeFile('example.css', css, (err) => {
                if (err) {
                    console.error('Error saving CSS file:', err);
                    return res.status(500).json({ error: 'Error saving CSS file' });
                }
                fs.readFile('example.css', 'utf8', (err, cssContent) => {
                    if (err) {
                        console.error('Error reading CSS file:', err);
                        return res.status(500).json({ error: 'Error reading CSS file' });
                    }
                    feedback = [...feedback, ...analyzeCSS(cssContent, cssFile)];
                    fs.writeFile('example.js', js, (err) => {
                        if (err) {
                            console.error('Error saving JavaScript file:', err);
                            return res.status(500).json({ error: 'Error saving JavaScript file' });
                        }
                        fs.readFile('example.js', 'utf8', (err, jsContent) => {
                            if (err) {
                                console.error('Error reading JavaScript file:', err);
                                return res.status(500).json({ error: 'Error reading JavaScript file' });
                            }
                            //feedback = [...feedback, ...analyzeJS(jsContent, jsFile)];
                            console.log(feedback);
                        });
                    });
                });
            });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

function readAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            resolve(event.target.result);
        };
        reader.onerror = function(error) {
            reject(error);
        };
        reader.readAsText(file);
    });
}
async function saveFile(event) {
        event.preventDefault();
        event.stopPropagation();
    try {

        const htmlCode = document.getElementById('htmlInput').value;
        const cssCode = document.getElementById('cssInput').value;
        const jsCode = document.getElementById('jsInput').value;

        const htmlFile = document.getElementById('htmlCriteria').files[0];
        const cssFile = document.getElementById('cssCriteria').files[0];
        const jsFile = document.getElementById('jsCriteria').files[0];

        
        const htmlContent = await readAsText(htmlFile);
        const cssContent = await readAsText(cssFile);
        const jsContent = await readAsText(jsFile);


        console.log(typeof(htmlFile));
        console.log(htmlContent);

        console.log(typeof(cssContent));
        console.log(cssContent);

    
        const postData = {
            html: htmlCode,
            css: cssCode,
            js: jsCode,
            htmlFile:htmlContent ,
            cssFile:cssContent,
            jsFile:jsContent
        };

        
    const response = await fetch('http://localhost:3000/saveData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // const responseData = await response.json();
    const responseData = await response.json();
    console.log(responseData);
    document.getElementById("response1").innerHTML=responseData;
    } catch (error) {
        console.error('Error:', error.message);
    }
}


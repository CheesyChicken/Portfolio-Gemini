const fs = require('fs');
const pdfModule = require('pdf-parse');

console.log('Type of pdfModule:', typeof pdfModule);
// console.log('Keys:', Object.keys(pdfModule)); 

let pdf = pdfModule;
if (typeof pdf !== 'function' && pdf.default) {
    pdf = pdf.default;
}

if (typeof pdf !== 'function') {
    console.error('pdf is not a function. It is:', pdf);
    // process.exit(1);
}

const dataBuffer = fs.readFileSync('Profile.pdf');

try {
    pdf(dataBuffer).then(function (data) {
        fs.writeFileSync('profile_content.json', JSON.stringify({
            text: data.text,
            info: data.info,
            metadata: data.metadata,
            version: data.version
        }, null, 2));
        console.log("PDF extracted to profile_content.json");
    }).catch(err => {
        console.error("Error extracting PDF:", err);
    });
} catch (e) {
    console.error("Error calling pdf function:", e);
}

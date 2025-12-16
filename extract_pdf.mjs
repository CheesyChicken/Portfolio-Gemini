import fs from 'fs';
import pdf from 'pdf-parse';

const dataBuffer = fs.readFileSync('Profile.pdf');

try {
    const data = await pdf(dataBuffer);
    fs.writeFileSync('profile_content.json', JSON.stringify({
        text: data.text,
        info: data.info,
        metadata: data.metadata,
        version: data.version
    }, null, 2));
    console.log("PDF extracted to profile_content.json");
} catch (err) {
    console.error("Error extracting PDF:", err);
}

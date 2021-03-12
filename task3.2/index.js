import path from 'path';
import fs from 'fs';
import csv from 'csvtojson';
import { pipeline } from 'stream';

const inputDir = path.resolve(__dirname, 'csv');
const outputDir = path.resolve(__dirname, 'converted');
const csvConfig = {
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
        price: 'number',
        amount: 'omit'
    },
    checkType: true
}

function logError(error, comment) {
    const message = comment || 'Error occured';
    console.error(`${message}: ${error}`);
}

function convert(inputPath) {
    const inputFileName = path.basename(inputPath);
    const outputFileName = inputFileName.replace(/.\w+$/i, '');
    const outputPath = path.join(outputDir, `${outputFileName}.txt`)

    pipeline(
        fs.createReadStream(inputPath),
        csv(csvConfig),
        fs.createWriteStream(outputPath),
        (error) => {
            if (error) {
                logError(error, `Error occured while processing ${inputFileName}`);
            } else {
                console.log(`${inputFileName} processed.`);
            }
        }
    );
}

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (error, files) => {
    if (error) {
        logError(error, 'Failed reading directory content');
    } else {
        files
            .filter((f) => path.extname(f) === '.csv')
            .forEach((f) => {
                const filePath = path.join(inputDir, f);
                convert(filePath);
            });
    }
});

'use strict';
const path = require('path');
const fs = require('fs');
const csv = require('csvtojson');

const inputDir = path.resolve(__dirname, 'csv');
const outputDir = path.resolve(__dirname, 'converted');
const csvConfig = {
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
        price: 'number',
        amount: 'omit'
    },
    checkType: true
};

function logError(error, comment) {
    const message = comment || 'Error occured';
    console.error(`${message}: ${error}`);
}

function convert(inputPath) {
    const inputFileName = path.basename(inputPath);
    const outputFileName = inputFileName.replace(/.\w+$/i, '');
    const outputPath = path.join(outputDir, `${outputFileName}.txt`);

    fs.readFile(inputPath, (error, data) => {
        if (error) {
            logError(error, `Error occured while reading file ${inputFileName}`);
        }

        let converted = '';

        csv(csvConfig)
            .fromString(data.toString())
            .subscribe(
                (line) => converted += `${JSON.stringify(line)}\n`,
                error => logError(error, `Error occured while converting`),
                () => fs.writeFile(outputPath, converted, (error) => {
                    if (error) {
                        logError(error, `Error occured while writing ${inputFileName}`);
                    } else {
                        console.log(`${inputFileName} processed.`);
                    }
                })
            );
    });
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

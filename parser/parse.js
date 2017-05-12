// Require
const fs = require('fs');
const deputiesTableParser = require('./deputiesTableParser');
const log = require('./log').withModule('parser');

// Functionality
log('parsing');
deputiesTableParser.parse((err, deputies) => {
    if(err) return process.exit(1);
    fs.writeFileSync('./deputies.json', JSON.stringify(deputies));
    log('parsing done');
});
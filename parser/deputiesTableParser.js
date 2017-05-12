// Require
const request = require('request');
const cheerio = require('cheerio')
const log = require('./log').withModule('deputiesTableParser');

// Consts
const DEPUTIES_TABLE_PAGE = "https://www.kremen.gov.ua/index.php/rozdil/miska_vlada/rada/grafik_rady";

// Utils

RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (var i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

// Helpers

const clearText = (text) => {
    if(!text) return text;
    text = text.replace(/[\r\n]+/g, ' ');
    text = text.replace(/\s+/g, ' ');
    text = text.trim();
    return text;
}

const nameToId = (text) => {
    let match = /[^\s]+/g.exec(text);
    if(!match) return "undefined";
    return transliterate(match[0]).toLowerCase();
}

const transliterate = (word) => {
    var answer = ""
    , a = {};

    a["Ё"]="YO";a["Й"]="I";a["Ц"]="TS";a["У"]="U";a["К"]="K";a["Е"]="E";a["Н"]="N";a["Г"]="G";a["Ш"]="SH";a["Щ"]="SCH";a["З"]="Z";a["Х"]="H";a["Ъ"]="'";
    a["ё"]="yo";a["й"]="i";a["ц"]="ts";a["у"]="u";a["к"]="k";a["е"]="e";a["н"]="n";a["г"]="g";a["ш"]="sh";a["щ"]="sch";a["з"]="z";a["х"]="h";a["ъ"]="'";
    a["Ф"]="F";a["Ы"]="I";a["В"]="V";a["А"]="a";a["П"]="P";a["Р"]="R";a["О"]="O";a["Л"]="L";a["Д"]="D";a["Ж"]="ZH";a["Э"]="E";
    a["ф"]="f";a["ы"]="i";a["в"]="v";a["а"]="a";a["п"]="p";a["р"]="r";a["о"]="o";a["л"]="l";a["д"]="d";a["ж"]="zh";a["э"]="e";
    a["Я"]="Ya";a["Ч"]="CH";a["С"]="S";a["М"]="M";a["И"]="I";a["Т"]="T";a["Ь"]="'";a["Б"]="B";a["Ю"]="YU";
    a["я"]="ya";a["ч"]="ch";a["с"]="s";a["м"]="m";a["и"]="i";a["т"]="t";a["ь"]="'";a["б"]="b";a["ю"]="yu";

    for (i in word){
        if (word.hasOwnProperty(i)) {
        if (a[word[i]] === undefined){
            answer += word[i];
        } else {
            answer += a[word[i]];
        }
        }
    }
    return answer;
}

const parsePollingStations = (text) => {
    if(!text) return [];
    let matches = /Виборча дільниця №(\d+)(.+?)Орієнтовна кількість виборців\s*(–|-)\s*(\d+)/g.execAll(text);
    let arr = [];
    matches.forEach((match, index) => {
        arr.push({
            id: parseInt(match[1]),
            addresses: match[2].trim(),
            numberOfVoters: parseInt(match[4]),
        });
    });
    return arr;
}

const parsePhones = (text) => {
    if(!text) return [];
    let phones = [];
    /\d+-\d+-\d+/g.execAll(text).forEach(match => phones.push(match[0]));
    /(066|067|068|097|098)\s(\d{3})\s(\d{2})\s(\d{2})/g.execAll(text).forEach(match => {
        phones.push("(" + match[1] + ") " + match[2] + "-" + match[3] + "-" + match[4]);
    });
    /(066|067|068|097|098)(\s\d{3}\s\d{4})/g.execAll(text).forEach(match => {
        phones.push("(" + match[1] + ") " + match[2] + "-" + match[3]);
    });
    return phones;
}

// Functionality

module.exports.parse = function(cb){
    log('getting page content');
    request(DEPUTIES_TABLE_PAGE, (err, res, body) => {
        if(err){
            log.err(err);
            return cb(err);
        }
        log('getting page content done');
        log('parsing html');
        const $ = cheerio.load(body);
        log('parsing html done');
        // Getting table
        let tables = $('#content table');
        log('founded tables count: ' + tables.length);
        if(tables.length == 0){
            log.err('table not fouond');
            return cb(new Error('table not found'));
        }
        let table = tables[0];
        // Getting rows
        let rows = $('tr', table);
        log('table rows count: ' + rows.length);
        if(rows.length == 0){
            log.err('rows not fouond');
            return cb(new Error('rows not found'));
        }
        // Parsing rows
        let items = [];
        rows.each(function (trIndex){
            if(trIndex == 0) return;
            let row = this;
            let item = {};
            $('td', row).each(function(tdIndex){
                let td = this;
                let text = clearText($(td).text());
                if(tdIndex == 0){
                    if(text){
                        item.locationId = parseInt(text);
                    }
                }
                if(tdIndex == 1){
                    item.name = text;
                    item.id = "kremen-" + nameToId(text);
                }
                if(tdIndex == 2){
                    item.schedule = text;
                }
                if(tdIndex == 3){
                    item.address = text;
                }
                if(tdIndex == 4){
                    item.phones = parsePhones(text);
                }
                if(tdIndex == 5){
                    item.pollingStations = parsePollingStations(text);
                }
            });
            items.push(item);
        });
        return cb(null, items);
    });
}
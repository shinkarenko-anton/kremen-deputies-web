$('#content table').each(function (tableIndex){

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

    let clearText = (text) => {
        if(!text) return text;
        text = text.replace(/[\r\n]+/g, ' ');
        text = text.replace(/\s+/g, ' ');
        text = text.trim();
        return text;
    } 

    let transliterate = (word) => {
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

    let nameToLocId = (text) => {
        let match = /[^\s]+/g.exec(text);
        if(!match) return "undefined";
        return transliterate(match[0]).toLowerCase();
    }

    let parsePollingStations = (text) => {
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

    let parsePhones = (text) => {
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

    let table = this;
    let items = [];
    $('tr', this).each(function (trIndex){
        if(trIndex == 0) return;
        let row = this;
        let item = {};
        $('td', row).each(function(tdIndex){
            let td = this;
            let text = clearText($(td).text());
            if(tdIndex == 0){
                if(text){
                    item.id = "kremen-loc-" + parseInt(text);
                    item.locationId = parseInt(text);
                }
            }
            if(tdIndex == 1){
                item.name = text;
                if(!item.id){
                    item.id = "kremen-" + nameToLocId(text);
                }
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
    let res = {};
    items.forEach(item => {
        let id = item.id;
        delete item.id;
        res[id] = item;
    });
    console.log(JSON.stringify(res));
});
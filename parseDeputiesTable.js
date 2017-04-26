$('#content table').each(function (tableIndex){

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
                    item.locationId = parseInt(text);
                }
            }
            if(tdIndex == 1){
                item.name = text;
                if(!item.locationId){
                    item.locationId = nameToLocId(text);
                }
            }
            if(tdIndex == 2){
                item.schedule = text;
            }
            if(tdIndex == 3){
                item.address = text;
            }
            if(tdIndex == 4){
                item.phone = text;
            }
            if(tdIndex == 5){
                item.pollingStations = text;
            }
        });
        console.log(JSON.stringify(item));
        items.push(item);
    });
});
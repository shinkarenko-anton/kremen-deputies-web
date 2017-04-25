// Objects

 function clone(obj){
    var self = this;
    if(obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj)
        return obj;
    var temp = obj.constructor(); // changed
    for(var key in obj) {
        if(Object.prototype.hasOwnProperty.call(obj, key)) {
            obj['isActiveClone'] = null;
            temp[key] = self.clone(obj[key]);
            delete obj['isActiveClone'];
        }
    }    
    return temp;
}

// ID

function genId(){
    return Math.random().toString(36).substr(2, 24);
}

// Strings

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Dates

const minSec = 60;
const hourSec = minSec * 60;
const daySec = hourSec * 24;
const dayMillisec = daySec * 1000;


// Export

export default {
    obj: {
        clone
    },
    id: {
        genId
    },
    str: {
        pad,
        capitalizeFirstLetter
    },
    date: {
        minSec,
        hourSec,
        daySec,
        dayMillisec
    }
}
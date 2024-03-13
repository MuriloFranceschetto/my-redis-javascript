const { encodeBulkedString } = require("../utils");

class Setting {

    #value;
    
    constructor(key, value, infoGroup) {
        this.key = key;
        this.#value = value;
        this.infoGroup = infoGroup;
    }

    get value() {
        return this.#value;
    }
    set value(newValue) {
        this.#value = newValue;
    }

    getBulkStringInfo() {
        let info = `${this.key}:${this.value}`
        return encodeBulkedString(info);
    }

}

module.exports = Setting;
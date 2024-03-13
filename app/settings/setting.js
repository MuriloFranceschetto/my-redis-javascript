const { encodeBulkedString } = require("../utils");

class Setting {

    constructor(key, value, infoGroup) {
        this.key = key;
        this.value = value;
        this.infoGroup = infoGroup;
    }

    getBulkStringInfo() {
        let info = `${this.key}:${this.value}`
        return encodeBulkedString(info);
    }

}

module.exports = Setting;
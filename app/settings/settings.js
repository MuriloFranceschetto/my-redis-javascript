const Setting = require("./setting");

class RedisSettings {

    #settings = [
        new Setting('port', 6379),
        new Setting('role', 'master', 'replication'),
    ];

    changeInfo(key, newValue) {
        this.#settings.find(sett => sett.key === key).value = newValue;
    }

    getInfo(key) {
        return this.#settings.find(sett => sett.key === key).value;
    }

    getInfoList(infoGroup) {
        let result = [];
        if (infoGroup) {
            result = this.#settings.filter(sett => sett.infoGroup === infoGroup);
        } else {
            result = this.#settings; 
        }
        return result.map(sett => sett.getBulkStringInfo()).join('');
    }

}

module.exports = new RedisSettings();
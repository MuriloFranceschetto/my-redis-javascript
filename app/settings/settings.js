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

    getInfoList(argument) {
        if (!argument) {
            return this.#settings.map(sett => sett.getBulkStringInfo()).join(''); 
        }
        return []
    }

}

module.exports = new RedisSettings();
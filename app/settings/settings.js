const Setting = require("./setting");

class RedisSettings {

    #settings = [
        new Setting('role', 'master', 'replication'),
    ];

    getInfo(argument) {
        if (!argument) {
            return this.#settings.map(sett => sett.getBulkStringInfo()).toString(); 
        }
        return []
    }

}

module.exports = new RedisSettings();
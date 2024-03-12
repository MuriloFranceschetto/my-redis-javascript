
class KeyValueInfo {
    
    constructor(key, value, timeToExpire) {
		this.key = key;
		this.value = value;
        this.timeToExpire = timeToExpire;
	}

    setExpireTimeout(timeoutMs) {
        this.timeToExpire = parseInt(new Date().valueOf()) + parseInt(timeoutMs);
    }

    getValue() {
        if (this.timeToExpire < new Date().valueOf()) {
            return undefined;
        }
        return this.value;
    }

    getJson() {
        return {
            key: this.key,
            value: this.value,
            timeToExpire: this.timeToExpire,
        }
    }

}

module.exports = KeyValueInfo;
const Model = require("@longanphuc/orm-mysql").Model
class dbhander extends Model {
    constructor(){
        super("dbhander")
        this.$primaryKey = ["subkey","datakey"]
		this.game=undefined;
		this.subkey=undefined;
		this.datakey=undefined;
		this.value=undefined;

    }
}

module.exports = dbhander
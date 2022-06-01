const Model = require("@longanphuc/orm-mysql").Model
class rank extends Model {
    constructor(){
        super("rank")
        this.$primaryKey = ["setName","key"]
		this.setName=undefined;
		this.key=undefined;
		this.value=undefined;

    }
}

module.exports = rank
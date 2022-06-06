const Schema = require('@longanphuc/orm-mysql').Schema
const Table = require("@longanphuc/orm-mysql").Table
const up = async()=>{
    await Schema.CreateTable(()=>{
        let rank = new Table("rank")
        rank.name("setName").type("VARCHAR",200)
        rank.name("key").type("VARCHAR",200)
        rank.name("value").type("INT")
        rank.primary = ["setName","key"]
        return rank
    },true)
}
const down = async()=>{
    Schema.DropTable("rank")    
}
module.exports = {
    up: up,
    down: down
}
const Schema = require('@longanphuc/orm-mysql').Schema
const Table = require("@longanphuc/orm-mysql").Table
const up = async()=>{
    await Schema.CreateTable(()=>{
        let rank = new Table("dbhander")
        rank.name("game").type("VARCHAR",200)
        rank.name("subkey").type("VARCHAR",200)
        rank.name("datakey").type("VARCHAR",200)
        rank.name("value").type("Text")
        rank.primary = ["game","subkey","datakey"]
        return rank
    },true)
}
const down = async()=>{
    Schema.DropTable("dbhander")    
}
module.exports = {
    up: up,
    down: down
}
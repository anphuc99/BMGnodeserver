const express = require("express")
const rank = require("./Model/rank")
const dbhandler = require("./Model/dbhander")
const context = require("@longanphuc/orm-mysql").Context

const app = express()
const port = process.port || 5000

app.use(express.json());

app.get('/api/v1/game/rank', async (req, res) => {
  console.log("GET RANK")
  let setName = req.query.key
  let key = req.query.member
  let rank_context = new context(rank)
  let data = await rank_context.where("setName", setName).where("key", key).first()
  if (data == null) {
    res.json({
      code: 1,
      message: "SUCCESS"
    })
  }
  else {
    let datas = await rank_context.where("setName", setName).orderBy("value", "desc").select()
    let i = 1
    for (let value of datas) {
      if (data.key == value.key) {
        break
      }
      i++
    }
    res.json({
      code: 1, data: {
        rank: i,
        score: data.value
      },
      message: "SUCCESS"
    })
  }
})
app.post('/api/v1/game/rank', async (req, res) => {
  console.log("SET RANK")
  for (let json of req.body) {
    let rank_context = new context(rank)
    let value = json.count
    let setName = json.key
    let key = json.member
    let checkRank = await rank_context.where("setName", setName).where("key", key).first()
    let Rank = new rank()
    Rank.key = key
    Rank.setName = setName
    if (json.add == true) {
      Rank.value = (checkRank === undefined ? 0 : checkRank.value) + value
    }
    else {
      Rank.value = value
    }
    if (checkRank === undefined) {
      await Rank.save()
    }
    else if (value == 0) {
      Rank.delete()
    }
    else {
      await Rank.update()
    }
  }
  res.json({
    status_code: 200
  })
})
app.get('/api/v1/game/rank/expire', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/v1/game/rank/list', async (req, res) => {
  console.log("GET LIST RANk")
  let key = req.query.key
  let start = req.query.start
  let end = req.query.end
  let rank_context = new context(rank)
  let datas = await rank_context.where("setName", key).orderBy("value", "desc").limit(start - 1, end).select()
  let data = []
  for (let d of datas) {
    data.push({
      member: d.key,
      score: d.value
    })
  }
  res.json({
    code: 1,
    data: data,
    message: "SUCCESS"
  })
})
app.get('/api/v1/game/rank/length', async (req, res) => {
  console.log("COUNT RANK")
  let setName = req.query.key
  let rank_context = new context(rank)
  let datas = await rank_context.where("setName", setName).select()
  req.json({
    code: 1,
    data: datas.length,
    message: "SUCCESS"
  })
})
app.get('/api/v1/game/rank/inc-counter', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/v1/game/rank/reset-counter', (req, res) => {
  res.send('Hello World!')
})
app.get('/api/v2/game/data', async (req, res) => {
  let context_db = new context(dbhandler)
  let query = req.query
  let data = await context_db.where("game", query.gameId).where("subkey", query.userId).where("datakey", query.key).first()
  if (data == undefined) {
    data = { value: null }
  }
  res.json({
    code: 1,
    data: data.value,
    message: "SUCCESS"
  })
})
app.post('/api/v2/game/data', async (req, res) => {
  let json = req.body
  console.log(json)
  for (let data of json.data) {
    let db = new dbhandler()
    db.game = json.game
    db.subkey = data.subKey + ""
    db.datakey = data.key
    db.value = data.data
    let context_db = new context(dbhandler)
    let ck = await context_db.where("game", json.game).where("subkey", data.subKey).where("datakey", data.key).first()
    if (ck == undefined)
      await db.save()
    else
      await db.update()
  }
  res.json({
    code: 1
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port 127.0.0.1:${port}`)
})
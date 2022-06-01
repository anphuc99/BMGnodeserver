const express = require("express")
const rank = require("./Model/rank")
const context = require("@longanphuc/orm-mysql").Context

const app = express()
const port = 5000

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
    res.json({
      code: 1, data: {
        rank: 1,
        score: data.value
      },
      message: "SUCCESS"
    })
  }
})
app.post('/api/v1/game/rank', async(req, res) => {
  console.log("SET RANK")
  for(let json of req.body){
    let value = json.count
    let setName = json.key
    let key = json.member 
    let Rank = new rank()
    Rank.key = key
    Rank.setName = setName
    Rank.value = value
    let rank_context = new context(rank)
    let checkRank = await rank_context.where("setName",setName).where("key",key).first()
    if (checkRank === undefined){
      await Rank.save()
    }
    else{
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
app.get('/api/v1/game/rank/list',async (req, res) => {
  console.log("GET LIST RANk")
  let key = req.query.key
  let start = req.query.start
  let end = req.query.end
  let rank_context = new context(rank)
  let datas = await rank_context.where("setName",key).orderBy("value","desc").limit(start-1,end).select()
  let data = []
  for(let d of datas){
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
app.get('/api/v1/game/rank/length',async (req, res) => {
  console.log("COUNT RANK")
  let setName = req.query.key
  let rank_context = new context(rank)
  let datas = await rank_context.where("setName",setName).select()
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
app.get('/api/v2/game/data', (req, res) => {
  res.send('Hello World!')
})
app.post('/api/v2/game/data', (req, res) => {
  console.log(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port 127.0.0.1:${port}`)
})
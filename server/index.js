const express = require('express')
const app = express()
const port = 1420



app.get('/',(req,res) =>{
    res.send('<h1 style="text-align:center">Hello Mawa!</h1>')
})


app.listen(port , () => {
    console.log(`server running at port ${port}`)
})
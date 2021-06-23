const express = require('express')
const app = express()


const port = process.env.PORT || 1420

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))


app.get('/',(req,res) =>{
    res.send('<h1 style="text-align:center">Hello from Scheduler!</h1>')
})

// require userRoutes
const userRoutes = require('./src/routes/user.routes')

// using as middleware

app.use('/api/v1/users',userRoutes)


app.listen(port , () => {
    console.log(`server running at port ${port}`)
})
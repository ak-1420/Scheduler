const express = require('express')
const app = express()
const cors = require('cors')


const port = process.env.PORT || 1420

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))


app.get('/',(req,res) => {
    res.send('Server ')
})


// require userRoutes
const userRoutes = require('./src/routes/user.routes')
// require batchroutes
const batchRoutes = require('./src/routes/batch.routes')
// require schedule routes
const scheduleRoutes = require('./src/routes/schedule.routes')

// using as middleware

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/batches',batchRoutes)
app.use('/api/v1/schedules',scheduleRoutes)


app.listen(port , () => {
    console.log(`server running at port ${port}`)
})
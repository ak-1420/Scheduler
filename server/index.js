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
    res.send('<center><h1>Classroom Scheduler Backend</h1><p> please visit <a href="https://classroom-scheduler.netlify.app/">Classroom Scheduler  app</a></p><h3>developed by Arun Kumar Kalakuntla</h3><a href="https://classroom-scheduler.netlify.app/"> </a><a href="mailto:arunkumarrkalakuntla2308@gmail.com">Mail me </a></center>')
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
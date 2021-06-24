const express = require('express')
const app = express()
const path = require('path')


const port = process.env.PORT || 1420

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))


// app.use(express.static(path.join(__dirname, '../client' , 'build')))




// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
// });

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
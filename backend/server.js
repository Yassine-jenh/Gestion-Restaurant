const express =require('express')
const app = express()
const db=require('./models')
const userRoute=require('./router/user-router')
const reservationRoute=require('./router/reservation-router')
const reclamationRoute=require('./router/reclamation-router')
const menuRoute=require('./router/menu-router')
const eventRoute=require('./router/event-router')
const cors = require('cors'); // Import the cors package

// Enable CORS
app.use(cors()); // Allows all origins by default
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',userRoute)
app.use('/',reservationRoute)
app.use('/',reclamationRoute)
app.use('/',menuRoute)
app.use('/',eventRoute)

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Request-Methods','*')
    res.setHeader('Access-Control-Allow-Header','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
});

db.sequelize.sync({ force: true }).then(() => {
    app.listen(3000, () => console.log('server listening on port 3000'))
})
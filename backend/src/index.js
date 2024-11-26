const path = require('path')
const express = require('express')
const cors = require('cors');
const methodOverride = require('method-override')
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const db = require('./config/db')






const app = express()
const port = 3000 

const route = require('./routers') 

app.use(cors()); 

app.use(express.static(path.join(__dirname,'public'))); 

app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

app.use(methodOverride('_method'))


// Cấu hình để phục vụ tệp tĩnh từ thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



//Template engine  
app.engine('hbs', handlebars.engine({
  extname: '.hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './src/resources/views')   

db.connect();
route(app);  


app.listen(port, () => {
  console.log(`App listening on port http:/c/localhost:${port}`) 
})


 

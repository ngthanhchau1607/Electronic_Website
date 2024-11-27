
const siteRouter = require('./site');
const userRouter = require('./user')
const categoryRouter = require('./category')
const productRouter = require('./product')

function route (app){

    app.use('/user',userRouter)


    app.use('/category',categoryRouter) 

    app.use('/product',productRouter) 

    app.use('/',siteRouter)
    
}

module.exports = route;
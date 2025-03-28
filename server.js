const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults()


// Custom middleware to disable caching
server.use((req, res, next) => {
 res.header('Cache-Control', 'no-store')
 res.header('Pragma', 'no-cache')
 next()
})


// Enable CORS
server.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', '*')
 next()
})


server.use(middlewares)
server.use(router)
server.listen(3001, () => {
 console.log('JSON Server is running on port 3001')
})


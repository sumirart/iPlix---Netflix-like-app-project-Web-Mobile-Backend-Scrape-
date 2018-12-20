'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Request = use('request')

// Route.on('/').render('welcome')

//auth_user
Route.group(() => {
    Route.post('/login','AuthController.login').as('login')
    Route.post('/logout','AuthController.logout').as('logout')
    Route.post('/register','UserController.store')
    Route.post('/subscribe','UserController.subscribe')
    Route.post('/unsubscribe','UserController.unsubscribe')
}).prefix('/user')

//movies
Route.group(() => {
    Route.get('/','MovieController.index')
    Route.get('/edit','MovieController.edit')
    Route.get('/popular','MovieController.popularMovie')
    Route.get('/trending','MovieController.trendingMovie')
    Route.get('/cached','MovieController.cached')
    Route.get('/play/:id','MovieController.play')
    Route.get('/:param','MovieController.index')
    Route.get('/:id/related','MovieController.related')
    Route.post('/store-cat','MovieController.storeCat')
    
    
}).prefix('/movies')

Route.group(() => {
    Route.get('/','ScrapController.index')
    Route.post('/', 'ScrapController.store')
}).prefix('/scrap')


import { GetMovies, Home, TvSeries } from 'controllers/getMovies'
import { Reigistration, emailVerification } from 'controllers/registrationUser'
import express from 'express'


const Route = express.Router()


Route.post('/verify',emailVerification)
Route.post('/register',Reigistration)
Route.get('/Movies', GetMovies)
Route.get('/Home', Home)
Route.get('/TvSeries' ,TvSeries)

export default Route
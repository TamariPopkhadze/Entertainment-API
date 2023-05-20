import { GetMovies, Home, TvSeries } from 'controllers/getMovies'
import { passwordRecovery, passwordRecoverySend } from 'controllers/password-recovery-controller'
import { Reigistration, emailVerification } from 'controllers/registrationUser'
import express from 'express'


const Route = express.Router()

Route.post('/password/recovery', passwordRecovery)
Route.post('/password/send-link',passwordRecoverySend)
Route.post('/verify',emailVerification)
Route.post('/register',Reigistration)
Route.get('/Movies', GetMovies)
Route.get('/Home', Home)
Route.get('/TvSeries' ,TvSeries)

export default Route
import { GetMovies, Home, TvSeries } from 'controllers/getMovies'
import express from 'express'


const movieRoute = express.Router()

movieRoute.get('/Movies', GetMovies)
movieRoute.get('/Home', Home)
movieRoute.get('/TvSeries' ,TvSeries)

export default movieRoute
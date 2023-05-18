import { Home } from 'controllers/getMovies'
import express from 'express'
// import { crew, destination, technology } from '../controlers/getData.js'

const movieRoute = express.Router()

movieRoute.get('/Movies')
movieRoute.get('/Home',Home)
movieRoute.get('/TvSeries')

export default movieRoute
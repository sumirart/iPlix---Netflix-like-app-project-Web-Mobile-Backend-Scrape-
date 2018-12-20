'use strict'
const Movie = use("App/Models/Cinema")
const Categories = use('App/Models/Categories')
var slugify = require('slugify')
const redis = require('redis')
const Redis = use('Redis')
const client = redis.createClient()
const bigQuery = ""

class MovieController {

    async index({ request, response, params }) {
        try {

            var search = request.input('search')
            const pages = request.input('page')
            const limits = request.input('limit')
            const param = params.param
            const category = params.category
            var page = 1

            var limit = 20
            var query = " "

            if (pages != null) {
                page = pages
            }
            if (limits != null) {
                limit = limits
            }

            if (search != null) {
                query = search
                var movies = await Movie.query().where('title', 'like', `%${query}%`).paginate(page, limit)
                var next = parseInt(page) + 1
                var prev = page - 1
                if (prev < 1) {
                    prev = 1
                }

                if (next > movies.pages.lastPage) {
                    next = movies.pages.lastPage
                }
                response.status(200).json(
                    {
                        nextUrl: 'http://192.168.0.62:3333/movies?search=' + query + '&page=' + next,
                        prevUrl: 'http://192.168.0.62:3333/movies?search=' + query + '&page=' + prev,
                        page: movies.pages.page,
                        total: movies.pages.total,
                        perPage: movies.pages.perPage,
                        lastPage: movies.pages.lastPage,
                        data: movies.rows
                    }
                )
            } else {
                page = page
                var movies = await Movie.query().orderBy('created_at', 'desc').paginate(page, limit)
                var next = parseInt(page) + 1
                var prev = page - 1
                if (prev < 1) {
                    prev = 1
                }

                if (next > movies.pages.lastPage) {
                    next = movies.pages.lastPage
                }
                response.status(200).json(
                    {
                        nextUrl: 'http://192.168.0.62:3333/movies?page=' + next,
                        prevUrl: 'http://192.168.0.62:3333/movies?page=' + prev,
                        page: movies.pages.page,
                        total: movies.pages.total,
                        perPage: movies.pages.perPage,
                        lastPage: movies.pages.lastPage,
                        data: movies.rows
                    }
                )
            }

            if (param != null) {
                if (await isNaN(param) == true) {
                    if (search != null) {
                        // if (param === 'animes') {
                        //     response.send('animes')
                        // } else {
                            query = search
                            page = page
                            const Cat = await Categories.findBy('title', param)
                            var movies = await Movie.query().where('title', 'like', `%${query}%`).where('categories_id', Cat.id).paginate(page, limit)
                            var next = parseInt(page) + 1
                            var prev = page - 1
                            if (prev < 1) {
                                prev = 1
                            }

                            if (next > movies.pages.lastPage) {
                                next = movies.pages.lastPage
                            }
                            response.status(200).json(
                                {
                                    nextUrl: 'http://192.168.0.62:3333/movies?search=' + query + '&page=' + next,
                                    prevUrl: 'http://192.168.0.62:3333/movies?search=' + query + '&page=' + prev,
                                    page: movies.pages.page,
                                    total: movies.pages.total,
                                    perPage: movies.pages.perPage,
                                    lastPage: movies.pages.lastPage,
                                    data: movies.rows
                                }
                            )
                        // }

                    } else {
                        // if (param == 'animes') {
                        //     response.send('animes')
                        // } else {
                            const Cat = await Categories.findBy('title', param)
                            page = page
                            var movies = await Movie.query().where('categories_id', Cat.id).paginate(page, limit)
                            var next = parseInt(page) + 1
                            var prev = page - 1
                            if (prev < 1) {
                                prev = 1
                            }

                            if (next > movies.pages.lastPage) {
                                next = movies.pages.lastPage
                            }
                            response.status(200).json(
                                {
                                    nextUrl: 'http://192.168.0.62:3333/movies?page=' + next,
                                    prevUrl: 'http://192.168.0.62:3333/movies?page=' + prev,
                                    page: movies.pages.page,
                                    total: movies.pages.total,
                                    perPage: movies.pages.perPage,
                                    lastPage: movies.pages.lastPage,
                                    data: movies.rows
                                }
                            )
                        }
                    // }

                } else {
                    const movies = await Movie.query().where('id', param).fetch()
                    if (movies == null) {
                        response.status(401).json({
                            messages: 'Data Not Found',
                        })
                    } else {
                        response.status(200).json({
                            movies
                        })
                    }
                }
            }


        } catch (error) {
            response.status(500).json({
                messages: 'Internal Server Error'
            })
        }
    }

    async play({ request, response, auth, params }) {
        try {
            const movie = await Movie.findBy('id', params.id)
            if (movie == null) {
                response.status(401).json({
                    messages: 'Data Not Found',
                })
            } else {
                if (movie.video_url != null) {
                    response.redirect(movie.video_url)
                } else {
                    response.redirect(movie.embed_url)
                }
            }
        } catch (error) {
            response.status(500).json({
                messages: 'Internal Server Error'
            })
        }

    }

    async popularMovie({ request, response }) {

        try {
            const pages = request.input('page')
            const limits = request.input('limit')

            var page = 1


            var limit = 20
            var query = " "

            if (pages != null) {
                page = pages
            }
            if (limits != null) {
                limit = limits
            }
            //const cache = await Redis.get('related', page)
            // if(cache){
            //     return JSON.parse(cache)
            // }else{              

            const movies = await Movie.query()
                .where('rating', 'like', '6,%')
                .orWhere('rating', 'like', '7,%')
                .orWhere('rating', 'like', '8,%')
                .orderBy('rating', 'DESC')
                .paginate(page, limit)
            //await Redis.set('related', page, related)
            response.status(200).json(movies)
            //}
        } catch (error) {
            response.status(500).json({
                messages: 'Internal Server Error'
            })
        }
    }

    async trendingMovie({ request, response }) {
        try {
            const pages = request.input('page')
            const limits = request.input('limit')

            var page = 1


            var limit = 20
            var query = " "

            if (pages != null) {
                page = pages
            }
            if (limits != null) {
                limit = limits
            }
            //const cache = await Redis.get('related', page)
            // if(cache){
            //     return JSON.parse(cache)
            // }else{              

            const movies = await Movie.query()
                .where('rating', 'like', '6,%')
                .orWhere('rating', 'like', '7,%')
                .orWhere('rating', 'like', '8,%')
                .orderBy('viewer', 'DESC')
                .orderByRaw('RAND()').paginate(page, limit)
            //await Redis.set('related', page, related)
            response.status(200).json(movies)
            //}

        } catch (error) {
            response.status(500).json({
                messages: 'Internal Server Error'
            })
        }
    }

    async edit({ request, response }) {
        try {
            const movie = await Movie.query().limit(10).fetch()
            var data = [];
            await movie.rows.map(async item => {
                const rating = await item.rating.split('/')
                data.push(rating)
            })

            return data
        } catch (error) {
            response.send(error)
        }
    }
    async related({ request, response, params }) {
        try {
            const pages = request.input('page')
            const limits = request.input('limit')

            var page = 1


            var limit = 20
            var query = " "

            if (pages != null) {
                page = pages
            }
            if (limits != null) {
                limit = limits
            }
            //const cache = await Redis.get('related', page)
            // if(cache){
            //     return JSON.parse(cache)
            // }else{              

            const id = params.id
            const movie = await Movie.findBy('id', id)
            const related = await Movie.query().where('categories_id', movie.categories_id).orderByRaw('RAND()').paginate(page, limit)
            //await Redis.set('related', page, related)
            response.status(200).json(related)
            //}

        } catch (error) {
            response.status(500).json({
                messages: 'Internal Server Error'
            })
        }
    }

    async storeMovies({ request, response }) {
        try {

            const { data } = request.all()
            await data.map((item) => {
                const newMoview = new Movie()
                newMoview.title = item.title
                newMoview.thumbnail = item.thumbnails
                newMoview.video_url = item.url
                newMoview.save()
            })

            response.status(200).json({
                messages: 'success'
            })

        } catch (error) {
            response.status(500).json({
                messages: error
            })
        }
    }

    async cached({ request, response, params }) {
        console.time('Query_Time')
        const pages = request.input('page')
        const limits = request.input('limit')
        var page = 1
        var limit = 20
        if (pages != null) {
            page = pages
        }
        if (limits != null) {
            limit = limits
        }
        const cache = await Redis.hmget('cinemas', page.toString() + limit.toString())
        if (cache[0] != null) {
            return JSON.parse(cache)
        } else {

            const movies = await Movie.query().paginate(page, limit)
            // set user
            const resmovies = JSON.stringify(movies)
            await Redis.hmset('cinemas', page.toString() + limit.toString(), resmovies)
            await Redis.expire('cinemas', 100)

            console.timeEnd('Query_Time')
            return movies
        }

    }

    async storeCat({ request, response }) {
        try {
            var input = request.all()
            const Cat = new Categories()
            Cat.title = input.title
            await Cat.save()
            response.send('succses Save Data')
        } catch (error) {
            response.send('Interval erver Error')
        }
    }


}

module.exports = MovieController

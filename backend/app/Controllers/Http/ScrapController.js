'use strict'

const Movie = use("App/Models/Movie")
const Cinema = use("App/Models/Cinema")
const Categories = use("App/Models/Categories")
const DB = use('Database')

var slugify = require('slugify')

class ScrapController {

    async index({ request, response, view }) {
        const cat = await Categories.all()
        console.log(cat)
        return view.render('welcome', { data: cat.toJSON() })
    }

    async store({ request, response, params }) {

        try {
            console.time('Query_Time')
            const movies = request.all()
            const slug = slugify(movies.title)
            var cekMovie = await Movie.query().where('slug',slug).getCount()
            if(cekMovie > 0){
                console.log('ada')
                response.status(203).json({
                    messages : 'Movies allready exist'
                })
            }else{
                var video = ""
                var embed = ""
                const cek1 = movies.video_url.split('.')
                const c = cek1.length -1
                if(cek1[c] == 'mp4'|| cek1[c] == 'mkv' || cek1[c] == 'flv'|| cek1[c] == 'mpeg'  ){
                    video = movies.video_url
                }else{
                    embed = movies.video_url
                } 
                              
                const newMovies = new Movie()
                newMovies.title = movies.title
                newMovies.slug = slug
                newMovies.category_id = movies.category_id
                newMovies.video_url = video
                newMovies.embed_url = embed
                newMovies.genre = await movies.genre.toString()
                newMovies.release = await movies.release.toString()
                newMovies.country = await movies.country.toString()
                newMovies.rating  = await movies.rating
                newMovies.description = movies.description
                newMovies.thumbnails = movies.thumbnails
                newMovies.actors = await movies.actors.toString()
                newMovies.directors = await movies.directors.toString()
                newMovies.duration = movies.duration             

                await newMovies.save()
                console.log('Success : ')
                console.timeEnd('Query_Time')
            }

            //return cekMovie

        } catch (error) {
            response.status(500).json({
                messages : 'Internal Server Error'
            })
        }


        //movie2

        // try {
        //     const movies = request.all()

        //     const slug = slugify(movies.title)
        //     const cekMovie = Cinema.query().where('slug', slug).getCount()
        //     if (cekMovie > 0) {
        //         console.log('movies already saved')
                
        //         // response.status(203).json({
        //         //     messages: 'Movies allready exist'
        //         // })
        //     } else {
        //         var video = ""
        //         var embed = ""
        //         const cek1 = movies.video_url.split('.')
        //         const c = cek1.length - 1
        //         if (cek1[c] == 'mp4' || cek1[c] == 'mkv' || cek1[c] == 'flv' || cek1[c] == 'mpeg') {
        //             video = movies.video_url
        //         } else {
        //             embed = movies.video_url
        //         }
        //         const genre = await movies.genre.toString()
        //         const newMovies = new Cinema()
        //         newMovies.category_id = movies.category_id
        //         newMovies.title = movies.title
        //         newMovies.slug = slug
        //         newMovies.thumbnails = movies.thumbnails
        //         newMovies.video_url = video
        //         newMovies.embed_url = embed
        //         newMovies.description = movies.description
        //         newMovies.director = movies.director
        //         newMovies.writers = movies.writers
        //         newMovies.genre = genre
        //         newMovies.rating = movies.rating

        //         await newMovies.save()

        //         console.log('save success')
        //         console.time()

        //         // response.status(200).json({
        //         //     messages: 'Save Success',

        //         // })

        //     }



        // } catch (error) {
        //     response.status(500).json({
        //         messages: 'Internal Server Error'
        //     })
        // }


    }
}

module.exports = ScrapController

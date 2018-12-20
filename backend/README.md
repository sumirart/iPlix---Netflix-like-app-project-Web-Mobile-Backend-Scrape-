# Adonis fullstack application

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup
install package nodejs,npm,mysqlserver and other package server

``sql
import movie.sql to your database
``

open conosle and run

``npm install``

install redis-server for run server redis
``sudo apt-get install redis-server``

insall adonis cli
``npm i -g @adonisjs/cli ``


## TESTING

open console run
``adonis serve --dev``

open url localhost:3333/movies on browser or postman

## Endpoint
/movies   ``for gett all movies data``
/movies/popular   ``for get movie popular``
/movies/trending  ``for get movies trending``
/movies/cached    ``for cached get movies``
/movies/:param  ``this enpoint for search, pagination, and get categories, show with id
          /movies/categories_movie  ==> have 3 categories it is box-office,tv-series,animes (string)
          /movies/id ==> this id for shwo movie where param id (integer)
          /movie?search=STRING ===> query search
          /movie?page=INT   ===> show page pagination
          /movie?limit=INT  ==> for limit pagination
          /movie?search=STRING&limit=INT&page=INT   => this for combine query search,page and limit
          ``
/movies/:id/related ``==> for show related movie from categories id movie``


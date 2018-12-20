'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MovieSchema extends Schema {
  up () {
    this.create('movies', (table) => {
      table.increments()
      table.string('title')
      table.string('slug')
      table.integer('category_id')
      table.string('genre')
      table.string('release',50)
      table.string('country')
      table.string('directors')
      table.string('actors')
      table.string('rating',10)
      table.string('duration',20)
      table.text('description')
      table.string('thumbnails')
      table.text('video_url')
      table.text('embed_url')
      table.timestamps()
    })
  }


  down () {
    this.drop('movies')
  }
}

module.exports = MovieSchema

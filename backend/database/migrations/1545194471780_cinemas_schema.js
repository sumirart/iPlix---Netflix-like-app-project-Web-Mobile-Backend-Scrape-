'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class Movie2Schema extends Schema {
  up () {
    this.create('cinemas', (table) => {
      table.increments()
      table.integer('category_id')
      table.string('title')
      table.string('slug')
      table.string('thumbnails')
      table.text('video_url')
      table.text('embed_url')
      table.string('rating')
      table.text('description')
      table.string('director')
      table.string('writers')
      table.string('genre')
      table.timestamps()
    })
  }

  down () {
    this.drop('movie_2_s')
  }
}

module.exports = Movie2Schema

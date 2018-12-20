'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SeriesSchema extends Schema {
  up () {
    this.create('series', (table) => {
      table.increments()
      table.string('title')
      table.timestamps()
    })
  }

  down () {
    this.drop('series')
  }
}

module.exports = SeriesSchema

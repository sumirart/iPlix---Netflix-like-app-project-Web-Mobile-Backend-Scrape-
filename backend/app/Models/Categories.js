'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categories extends Model {
    movies(){
        return this.hasOne('App/Models/Cinema','categories_id','id')
    }
}

module.exports = Categories

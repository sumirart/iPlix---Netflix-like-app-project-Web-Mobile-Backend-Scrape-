'use strict'
const Users = use('App/Models/User')
const { validate } = use('Validator')
const Redis = use('Redis')

class UserController {

    async index(){
      const cachedUsers = await Redis.get('users')
      if (cachedUsers) {
        return JSON.parse(cachedUsers)
      }
  
      const users = await Users.all()
      await Redis.set('users', JSON.stringify(users))
      return users
    
    }
    async checkUsername({request, response}){
     try {
        const {username} = request.all()
        if(await Users.findBy('username',username) !=null){
          response.status(406).json({
            messages : 'Username has beed used'
          })
        }else{
            response.status(200).json({
            messages : 'user valid'
          })
        }
     } catch (error) {
       response.status(500).json({
         messages : 'Internal Server Error'
       })
     }
    }

    async checkEmail({request,response}){
      const {email} = request.all()
      try {
        if(await Users.findBy('email',email) !=null){
          response.status(406).json({
            messages : 'Email has beed used'
          })
        }else{
          response.status(200).json({
            messages : 'user valid'
          })
        }       
          
        
      } catch (error) {
        response.status(500).json({
          messages : 'Internal Server Error'
          
        })
      }
    }

    async store({request, response, auth}){          
      try {
        const validation = await validate(request.all(), {
          username : 'required|min:3|max:255',
          email : 'required|min:5|max:255',
          name : 'required|min:3|max:255',
          password : 'required|min:6|max:255'
        })
        
        const input = request.all()        
        const checkUser = await Users.query().where('username',input.username).getCount()
        const checkEmail = await Users.query().where('email',input.email).getCount()
        if(checkUser > 0 | checkEmail > 0){
          response.status(400).json({
            messages : 'Your registered'
          })
        }else{
          if(validation.fails()){
            response.status(400).json({
              messages : 'Something error from input request !'
            })
          }else{
              const newUser = new Users()
              newUser.username = input.username
              newUser.email = input.email
              newUser.name = input.name
              newUser.password = input.password
              await newUser.save()
              if(!newUser){
                response.status(500).json({
                  messages : 'Internal Server Error .'
                })
              }
      
              const user = await Users.findBy('email', input.email) 
              const token = await auth.generate(user)
              response.status(200).json({
                user, token
              })
              
            }
        }

      } catch (error) {
        response.status(500).json({
          messages : 'Internal Server Error'
        })
      }
    
    }

    async update({request, response, auth}){
      try {
        
      } catch (error) {
        response.status(500).json({
          messages : 'Internal Server Error'
        })
      }
    }

    async subscribe({request, response}){
        try {
          const input = request.all()
          const user = await Users.findBy('email',input.email)
          await user.merge({
            subscribe : true
          })
          
          await user.save()

          response.status(200).json({
            messages : 'Subscribe Success'
          })
        } catch (error) {
          response.status(500).json({
            messages : 'Internal Server Error'
          })
        }
    }

    async unsubscribe({request, response}){
      try {
        const {email} = request.all()
        const user = await Users.findBy('email',email)
        await user.merge({
          subscribe : false
        })

        await user.save()

        response.status(200).json({
          messages : 'Unsubscribe Success'
          // user
        })
      } catch (error) {
        response.status(500).json({
          messages : error
        })
      }
  }

  async get({request, response, params}){
    const user = await Users.find(params.id)
    response.json(user)
  }
}

module.exports = UserController

'use strict'
const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
    async login ({ request,response, auth}) {
        try {
          const req = request.post()
          
          try {
            const user = await User.findBy('username', req.username)
            const passwordValid = await Hash.verify(req.password, user.password)        
        
            if (!passwordValid) {
              response.status(401).json({messages : 'Username or Password InValid'})
            }else{
              const token = await auth.generate(user)
              response.status(200).json({
                user, token
              })
            }
        
            
          } catch (error) {
              response.status(401).json({
                messages : 'User Not Found'
              })
          }
          
        } catch (error) {
          response.status(500).json({
            messages : 'Internal Server Error'
          })
        }
      }
    
    async logout ({ auth, response }) {
       
        response.status(200).json({
          messages : 'Your Logout'
        })
      }
}

module.exports = AuthController

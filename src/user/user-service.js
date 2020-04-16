const xss = require('xss')
const bcrypt = require('bcryptjs')


const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/

const UserService = {
    getAllUsers(db) {
        db.select('*').from('users')
    },
    getById(db, user_id) {
        return db
            .from('users')
            .select('*')
            .where('user_id', user_id)
            .first()

    },
    hasUserWithEmail(db, email) {
        return db('users')
            .where({ email })
            .first()
            // how does !!user work here?
            .then(user => !!user)
    },
    insertUser(db, newUser) {
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            // whats going on with all the brackets here?
            .then(([user]) => user)
    },
    validatePassword(password) {
        if (password.length < 8) {
          return 'Password must be longer than 8 characters'
        }
        if (password.length > 72) {
          return 'Password must be less than 72 characters'
        }
        if (password.startsWith(' ') || password.endsWith(' ')) {
            return 'Password must not start or end with empty spaces'
        }
        if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
                 return 'Password must contain 1 upper case, lower case, number and special character'
               }
               return null
          
    },
    hashPassword(password) {
        return bcrypt.hash(password, 12)
    },
    
    

    serializeUser(user) {
        return {
            
                user_id: user.user_id,
                user_type: xss(user.user_type),
                first_name: xss(user.first_name),
                last_name: xss(user.last_name),
                email: xss(user.email),
                dog_name: xss(user.dog_name),
                rating: user.rating,
                postal_short: xss(user.postal_short),
                profile_photo: xss(user.profile_photo),
                bio: xss(user.bio),
                date_created: new Date(user.date_created)
                }
            }

                
        
    

  }
  
  module.exports = UserService
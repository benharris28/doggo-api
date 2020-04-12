
const WalkerService = {

    getAllWalkers(db, user_type) {
        return db
        .from('users')
        .select('*')
        .where('user_type', user_type)
    
    },

}

module.exports = WalkerService
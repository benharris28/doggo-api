const xss = require('xss')

const WalkService = {
    getWalkById(db, walk_id) {
        return db
            .from('walks')
            .select('*')
            .where('walk_id', walk_id)
            .first()
    },
    getAllWalksForUserId(db, user_id) {
        return db
            .from('walks')
            .select('*')
            .where('user_id', user_id)

    }
}

module.exports = WalkService
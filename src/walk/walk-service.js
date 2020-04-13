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

    },
    getAllWalksForWalkerId(db, user_id) {
        return db
            .from('walks')
            .select('*')
            .where('walker_id', user_id)

    },
    createWalk(db, newWalk) {
        return db
            .insert(newWalk)
            .into('walks')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
            
    },
    updateWalk(db, walk_id, walkToUpdate) {
        return db('walks')
            .where({ walk_id })
            .update(walkToUpdate)

    },
    updateWalkFeedback(db, walk_id, walkToUpdate) {
        return db('walks')
            .where({ walk_id })
            .update(walkToUpdate)

    },
    getAllWalks(db) {
        return db
            .from('walks')
            .select('*')
            
},
    serializeWalk(walk) {
    return {
        walk_id: walk.walk_id,
        walker_id: walk.walker_id,
        user_id: walk.user_id,
        user_firstname: walk.user_firstname,
        dog_name: walk.dog_name,
        walker_firstname: walk.walker_firstname,
        request_time: walk.request_time,
        walk_date: walk.walk_date,
        pickup_address_street_number: walk.pickup_address_street_number,
        pickup_address_street_name: xss(walk.pickup_address_street_name),
        pickup_address_city: xss(walk.pickup_address_city),
        pickup_address_province: xss(walk.pickup_address_province),
        pickup_address_postal_code: xss(walk.pickup_address_postal_code),
        walk_status: xss(walk.walk_status)
    }
}
}

module.exports = WalkService
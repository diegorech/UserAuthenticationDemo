//Privete 


const router = require('express').Router()
const verify = require('./verifyToken')

router.get('/', verify, (req, res) => {
    res.json({
        posts: {
            title: 'my asdasdjasd',
            description: 'asdasdasdadasdsad'
        }
    })
})

module.exports = router
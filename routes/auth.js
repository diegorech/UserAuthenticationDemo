const router = require('express').Router()
const User = require('../model/User')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation')
const jwt = require('jsonwebtoken')




router.post('/register', async (req, res) => {

    //Validate data
    const { error } = registerValidation(req.body)
    if( error ) return res.status(400).send(error.details[0].message)



    //Checking if already exists

    const userExist = await User.findOne({
        $and: [
            { username : req.body.username},// If there's a username
            { email: req.body.email },      
        ] 
    })

    if ( userExist ) return res.status(400).send('Email already exists')


    //Hash passwords
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)


    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        console.log(` Usuário ${savedUser.name} criado com sucesso!!! `)
        res.send(savedUser)

    } catch (err) {
        res.status(400).send(err)
    }

})


//LOGIN 

router.post('/login', async (req, res) => {
    //Validate data
    const { error } = loginValidation(req.body)
    if( error ) return res.status(400).send(error.details[0].message)



    //Checking if the email exists

    const user = await User.findOne({ email: req.body.email })
    if ( !user ) return res.status(400).send('Email not found')

    //Password is correct?
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Email or password is wrong')

     //Create and assign JWT 
     const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
     res.header('auth-token', token).send(token)

})


module.exports = router
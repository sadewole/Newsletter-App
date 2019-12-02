const express = require('express')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')


const app = express()
// static folder
app.use(express.static(path.join(__dirname, 'public')))
// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

// signup route
app.post('/signup', (req, res) => {
    const {
        firstName,
        lastName,
        email
    } = req.body

    if (!firstName || !lastName || !email) {
        res.redirect('/fail.html')
        return;
    }

    const options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/fe48d46f3f',
        method: 'POST',
        headers: {
            Authorization: ''
        }
    }

    request(options, (err, response, body) => {

    })

})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${PORT}`))
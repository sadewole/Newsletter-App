const express = require('express')
const request = require('request')
const path = require('path')
const bodyParser = require('body-parser')
require('dotenv').config()

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

    const data = {
        members: [{
            email_address: email,
            status: 'subscribed',
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    const postData = JSON.stringify(data)

    const options = {
        url: 'https://us4.api.mailchimp.com/3.0/lists/fe48d46f3f',
        method: 'POST',
        headers: {
            Authorization: `auth ${process.env.mailChimp_API}`
        },
        body: postData
    }

    request(options, (err, response, body) => {
        console.log(response.statusCode)
        if (err) {
            res.redirect('/fail.html')
        } else {
            if (response.statusCode === 200) {
                res.redirect('/success.html')
            } else {
                res.redirect('/fail.html')
            }
        }
    })

})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on ${PORT}`))
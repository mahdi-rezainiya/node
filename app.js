const express = require('express');

// express app
const app = express();

// register view engine
app.set('view engine' , 'ejs');
// app.set('views' , 'mahdi');

// listen for request
app.listen(3000)

app.use((req , res , next) => {
    console.log("New Request was Made");
    console.log("Host:" , req.hostname);
    console.log("Path:" , req.path);
    console.log("Method:" , req.method);
    next()
})

app.get('/' , (req , res) => {
    const blogs = [
        {title : 'bahram in journey' , snippet : 'Lorem ipsum dolor sit amet consectetur.'},
        {title : 'how to fix bugs' , snippet : 'Lorem ipsum dolor sit amet consectetur.'},
        {title : 'nasa finds in planet' , snippet : 'Lorem ipsum dolor sit amet consectetur.'}
    ]

    res.render('index' , {title : 'Home' , blogs : blogs})
})

app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'})
})

app.use((req , res , next) => {
    console.log("---------------------- opencode ---------------------");
    next()
})

app.get('/blogs/create' , (req , res) => {
    res.render('create' , {title : 'Create a New Blog'})
})

//404 page

app.use((req , res) => {
    res.status(404).render('404' , {title : '404'})
})
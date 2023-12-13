const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// const { result } = require('lodash');
const Blog = require('./model/blog');

// express app
const app = express();

// register view engine
app.set('view engine' , 'ejs');
// app.set('views' , 'mahdi');

// listen for request
// app.listen(3000)

// connect to mongodb

const dbURL = 'mongodb+srv://mahdi:MInKJKrms3NU5ywn@cluster0.zj67veu.mongodb.net/cluster0?retryWrites=true&w=majority'

mongoose.connect(dbURL)
    .then((result) => {
        // console.log('connected');
        app.listen(3000)
    })
    .catch((err) => 
        console.log(err)
    );


app.use(express.static('public'))

app.use(express.urlencoded({extended : true}))

app.use(morgan('tiny'))

// adding blog
// app.get('/add-blog' , (req , res) => {
//     const blog = new Blog({
//         title : 'new blog 2',
//         snippet : 'about my new blog 2',
//         body :  'Lorem ipsum dolor sit amet consectetur adipisicing.'
//     }) ;

//     blog.save()
//         .then((result) => {res.send(result)})
//         .catch((err) => console.log(err))
// })

// getting all blogs
// app.get('/all-blog' , (req , res) => {
//     Blog.find()
//         .then((result) => res.send(result))
//         .catch((err) => {console.log(err);})
// })

// getting single blog
// app.get('/single-blog' , (req , res) => {
//     Blog.findById('6576b5c8cfa405bdec2839d1')
//         .then((result) => res.send(result))
//         .catch((err) => {console.log(err);})
// })

// deleting single blog
// app.get('/d-single-blog' , (req , res) => {
//     Blog.findByIdAndDelete('6576b9d35068b97ee154238f')
//         .then((result) =>{
//             if(result){
//                 res.send(`Document deleted : ${result}`)
//             }
//             else{
//                 res.send(`Document not found`)
//             }
//         })
//         .catch((err) => {console.log(err);})
// })

// deleting all blogs
// app.get('/d-all-blog' , (req , res) => {
//     Blog.deleteMany({})
//         .then((result) => res.send(result))
//         .catch((err) => {console.log(err);})
// })



app.get('/' , (req , res) => {
    // const blogs = [
    //     {title : 'bahram in journey' , snippet : 'Lorem ipsum dolor sit amet consectetur.'},
    //     {title : 'how to fix bugs' , snippet : 'Lorem ipsum dolor sit amet consectetur.'},
    //     {title : 'nasa finds in planet' , snippet : 'Lorem ipsum dolor sit amet consectetur.'}
    // ]
    // res.render('index' , {title : 'Home' , blogs : blogs})

    res.redirect('/blogs')
})

// blogs routes
app.get('/blogs' , (req , res) => {
    Blog.find().sort({createdAt : -1 })
        .then(blogs => {res.render('index' , {title : 'All Blogs' , blogs})})
        .catch((err) => {console.log(err)})
})

app.post('/blogs' , (req , res) => {
    // console.log(req.body);
    const blog = new Blog(req.body)
    
    blog.save()
        .then((result) => {res.redirect('/blogs')})
        .catch((err) => {console.log(err);})
})

app.get('/blogs/:id' , (req , res) => {
    const id = req.params.id ;

    // console.log(id); 
    Blog.findById(id)
        .then(result => {
            res.render('details' , {blog : result , title : 'Blog Details'})
        })
        .catch(err => console.log(err))
})



app.get('/about' , (req , res) => {
    res.render('about' , {title : 'About'})
})


app.get('/blogs/create' , (req , res) => {
    res.render('create' , {title : 'Create a New Blog'})
})

//404 page

app.use((req , res) => {
    res.status(404).render('404' , {title : '404'})
})
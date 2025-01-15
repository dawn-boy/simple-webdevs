const express = require('express'); const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/ellora')
const postSchema = new mongoose.Schema({
		id: {
				type: String,
				required: true
		},
		username: String,
		title: String,
		desc: String,
		time: String,
		date: String,
		replyCount: Number,
		replies: Array
})
const Post = mongoose.model('Post', postSchema)

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded( { extended: true} ));
app.use(methodOverride('_method'));

app.get('/' , ( req, res ) => {
		res.render('home');
})

// index route
app.get('/posts', ( req, res ) => {
		res.render('index', { posts });
})

//create route
app.get('/create', ( req, res ) => {
		res.render('post');
})
app.post('/posts', ( req, res ) => {
		const { title, desc } = req.body;
		const [ time, date ] = moment();
		Post.insertOne({id: uuid(), username: "user", title, desc, time, date, replyCount:0, replies:[] })
		res.redirect('/posts');
		Post.save();
})

//show route
app.get('/posts/:id', ( req, res ) => {
		const { id } = req.params;
		Post.find({ id: id })
				.then(data => 
						res.render('show', { ...data})
				)
})

//update route
app.get('/posts/:id/edit', ( req, res ) => {
		const { id } = req.params;
		Post.find( { id: id } )
				.then(data => 
						res.render('edit', { ...data})
				)
})
app.patch('/posts/:id', ( req, res ) => {
		const { id } = req.params;
		const { title, desc } = req.body;
		Post.find({ id: id })
				.then(data => {
						data.title = title;
						data.desc = desc;
				})

		res.redirect('/posts');
		Post.save();
})
//delete route
app.delete('/posts/:id', ( req,res ) => {
		const { id } = req.params;
		posts = posts.filter(c => c.id !== id);
		res.redirect('/posts');
		updateLocale(posts);
})
//reply route
app.get('/posts/:id/reply', ( req,res ) => {
		const { id } = req.params;
		const foundComment = posts.find(c => c.id === id);
		res.render('reply',{ ...foundComment });
})

app.post('/posts/:id/reply' , ( req, res ) => {
		const { id } = req.params;
		const { reply } = req.body; 
		const [ time, date ] = moment();
		const userReply = { username: "user", reply, time, date }
		
		const foundComment = posts.find(c => c.id == id)
		foundComment.replies.unshift(userReply);
		foundComment.replyCount++;
		updateLocale(posts);
		res.redirect(`/posts/${id}/reply`);
})

app.listen(8000, () => {
		console.log("Connection Requested");
		console.log(posts)
})

function moment(){
		const d = new Date();
		date = d.toDateString();
		time = d.toLocaleTimeString().split(" ");
		date = [date.split(' ').slice(1,-1).join(" "),date.split(' ').slice(-1).join(" ")];
		return [time, date];
}

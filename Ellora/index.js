const express = require('express'); const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded( { extended: true} ));
app.use(methodOverride('_method'));

let posts = fs.readFileSync(path.join(__dirname,'Database'), 'utf8');
try{ 
		posts = JSON.parse(posts);
} catch (err) {
		posts = [];
}

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
		posts.unshift({id: uuid(), username: "user", title, desc, time, date, replyCount:0, replies:[] })
		res.redirect('/posts');
		updateLocale(posts);
})

//show route
app.get('/posts/:id', ( req, res ) => {
		const { id } = req.params;
		const foundComment = posts.find(c => c.id === id );
		res.render('show', { ...foundComment });
})

//update route
app.get('/posts/:id/edit', ( req, res ) => {
		const { id } = req.params;
		const foundComment = posts.find(c => c.id === id);
		res.render('edit', { ...foundComment });
})
app.patch('/posts/:id', ( req, res ) => {
		const { id } = req.params;
		const { title, desc} = req.body;
		const foundComment = posts.find(c => c.id === id );
		foundComment.title = title;
		foundComment.desc = desc;
		res.redirect('/posts');
		updateLocale(posts);
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


function updateLocale(posts){
		fs.writeFile(path.join(__dirname,'Database'), JSON.stringify(posts),err => err);
}
function moment(){
		const d = new Date();
		date = d.toDateString();
		time = d.toLocaleTimeString().split(" ");
		date = [date.split(' ').slice(1,-1).join(" "),date.split(' ').slice(-1).join(" ")];
		return [time, date];
}

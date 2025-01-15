const mongoose = require('mongoose')

mongoose.connect('mongod://localhost:27017/ellora')
		.then(() => {
				console.log('Connection success');
		})
		.catch((err) => {
				console.log('Failed');
		})

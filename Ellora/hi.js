const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ellora')
		.then(() => {
				console.log("Done.");
		})
		.catch((err) => {
				console.log(err);
		})


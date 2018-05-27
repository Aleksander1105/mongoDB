const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/nodeappdatabase', {
	useMongoClient: true
});

const userSchema = new Schema({
	name: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	admind: Boolean
});

const User = mongoose.model('User', userSchema);

userSchema.methods.manify = function(next) {
	this.name = this.name + '-boy';

	return next(null, this.name);
};

userSchema.pre('save', function(next) {
	const currentDate = new Date();

	this.updated_at = currentDate;

	if (!this.created_at) {
		this.created_at = currentDate;
	}

	next();
}
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongodb = require('mongodb')
const hash = require('../helper/hash')

// mongoose.connect('mongodb://localhost:27017')

var userSchema = new Schema({
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return User.findOne({
                        email: value,
                        _id: {
                            $ne: this._id
                        }
                    })
                    .then(function (data) {
                        if (data) {
                            throw new Error(`Email already exist`)
                        }
                    })
                    .catch(function (err) {
                        throw new Error(err)
                    })
            }
        }
    },
    password: String,
    productList: [{
        type: Schema.Types.ObjectId,
        ref: 'Products'
    }]
});

userSchema.pre('save', function (next) {
    if (this.password) {
        this.password = hash(this.password)
    }
    next()
})







let User = mongoose.model('Users', userSchema)


module.exports = User
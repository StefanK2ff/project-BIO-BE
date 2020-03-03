const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {Type: String, required: true, unique: ture},
  password: String,
  username: String,
  collections: [{
    type: Schema.Types.ObjectId,
    ref: "Collection"
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
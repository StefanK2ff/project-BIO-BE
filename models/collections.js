const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
  name: {type: String, required: true},
  items: [String],
  default: {type: Boolean, required: true, default: false},
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
}
  , {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const Collection = mongoose.model('Collection', collectionSchema);

module.exports = Collection;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  category_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  parent_id: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema, 'category');
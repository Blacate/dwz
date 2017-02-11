var Schema = require('mongoose').Schema;

module.exports = new Schema({
    tinyurl: String,
    fullurl: String,
    intro: String,
    createAt: { type: Date, default: Date.now }
});
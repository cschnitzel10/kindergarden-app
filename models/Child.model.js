const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

const childSchema = new Schema({
    name: String,
    group: Number,
    test: [{
        type: Schema.Types.ObjectId,
        ref: "Test"
    }],
})

module.exports = model("Child", childSchema)
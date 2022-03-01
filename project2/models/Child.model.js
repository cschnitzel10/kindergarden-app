const mongoose = require('mongoose')
const { model, Schema } = require('mongoose')

const childSchema = new Schema({
    name: String,
    group: Number,
    parent: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    test: [{
        type: Schema.Types.ObjectId,
        ref: "Test"
    }],

})

module.exports = model("Child", childSchema)
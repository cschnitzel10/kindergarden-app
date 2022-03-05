const { model, Schema } = require("mongoose");

const testSchema = new Schema({
  diseaseName: {
      type: String,
      enum: ['COVID', 'OTHER DISEASES']
  },
  testName: String,
  dateTaken: Date,
  result: Boolean,
  testTaker: [
    {
      type: Schema.Types.ObjectId,
      ref: "Child",
    },
  ],
});

module.exports = model("Test", testSchema);

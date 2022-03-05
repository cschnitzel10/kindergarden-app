const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    headline: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    img:
    {
        data: Buffer,
        contentType: String,
    }
    },
  
  {
    timestamps: true,
  }
);

const News = model("News", newsSchema);

module.exports = News;
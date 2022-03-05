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
    imgUrl:
    {
        type: String,
    }
    },
  
  {
    timestamps: true,
  }
);

const News = model("News", newsSchema);

module.exports = News;
const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    group: {
        type: Number,
        min: 1,
        max: 10
    }  
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
import mongoose from "mongoose";

// Define schema for storing headlines
const headlineSchema = new mongoose.Schema(
{
  source: {type: String, required: true}, // website name
  headlines: {
    type: [String],
    validate: {
        validator: function (array) {
            return array.every(title => title && title.trim() !== '');
        },
        message: 'All headlines must be non-empty strings.',
    },
},
scrapedAt: { type: Date, default: Date.now },
}
);

const Headline = mongoose.model("Headline", headlineSchema);

export default Headline;

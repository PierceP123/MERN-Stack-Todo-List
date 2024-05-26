const mongoose = require('mongoose');

const ContentSchema = mongoose.Schema(
    {

        
        name: {
            type: String,
            required: [true, "Please enter contents name"],
        },

        description: {
            type: String,
            required: true,
            default: "", 
        },

        date: {
            type: Date,
            required: true,
            default: Date.now
        },
    },
    {
        timestamps: true  
    }
);

const Content = mongoose.model('Content', ContentSchema);

module.exports = Content;

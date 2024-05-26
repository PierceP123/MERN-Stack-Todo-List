const Content = require("../models/content.model");


const getAllContent = async (req, res) => {
    try {
        const content = await Content.find({});
        res.status(200).json(content);
    } catch (error) {
        console.error("Error fetching contents:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getContent = async (req, res) => {
    try {
        const contentId = req.params.id;
        const content = await Content.findById(contentId);
        if (content) {
            res.status(200).json(content);
        } else {
            res.status(404).json({ message: "Content not found" });
        }
    } catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ message: "Internal server error" });

    }
};

const createContent = async (req, res) => {
    try {
        const { name, description, date } = req.body;
        const newContent = new Content({ name, description, date });
        const savedContent = await newContent.save();
        res.status(201).json(savedContent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findByIdAndUpdate(id, req.body, { new: true });

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json(content);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteContent = async (req, res) => {
    try {
        const { id } = req.params;
        const content = await Content.findByIdAndDelete(id);

        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }

        res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getAllContent,
    getContent,
    createContent,
    updateContent,
    deleteContent
};
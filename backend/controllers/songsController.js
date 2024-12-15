const Song = require('../models/songs');

const songs = {
    createSong: async (req, res) => {
        const { title, artist } = req.body;

        try {
            const newSong = await Song.create({ title, artist });
            res.status(200).json(newSong);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: error.message || "An error occurred while creating the song." });
        }
    },

    getSong: async (req, res) => {
        const { id } = req.params;

        try {
            const song = await Song.findById(id);
            if(!song){
                return res.status(404).json({error: "song not found"});
            }
            res.status(200).json(song)
        } catch (error) {
            console.error(error)
            res.status(500).json({error: "An error occurred while retrieving the song."})
        }
    },

    getSongs: async (req, res) => {
        try {
            const songs = await Song.find();
            res.status(200).json(songs)
        } catch (error) {
            console.log(error);
            res.status(500).json({error: "An error occurred while retrieving the song."})
        }
    },

    deleteSong: async (req, res) => {
        const { id } = req.params;

        try {
            const deleteSong = await Song.findByIdAndDelete(id);
            if (!deleteSong){
                return res.status(404).json({error: "song not found" });
            }
            res.status(200).json({message: "song deleted successfuly"})
        } catch (error) {
            console.log(error);
            res.status(500).json({error: error.message || "An error occurred while retrieving the song."});
        }
    },

    updateSong: async (req, res) => {
        const {id} = req.params;
        const {title, artist} = req.body;

        try {
            const updatedSong = await Song.findByIdAndUpdate(
                id, 
                {title, artist},
                {new:true}
            );
            if (!updatedSong){
                res.status(400).json({error: "song not found"})
            }
            res.status(200).json(updatedSong)
        } catch (error) {
            
        }
    }
};

module.exports = songs;

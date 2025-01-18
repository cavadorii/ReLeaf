const Leaderboard = require("../models/leaderboard");

const leaderboardController = {
  // Create a new leaderboard entry
  createEntry: async (req, res) => {
    const { event_id, user_id, points } = req.body;

    try {
      if (!event_id || !user_id) {
        return res.status(400).json({ error: 'event_id and user_id required' });
      }

      const newEntry = { event_id, user_id, points };
      const createdEntry = await Leaderboard.create(newEntry);

      res.status(201).json({
        message: "Leaderboard entry created successfully",
        entry: createdEntry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getAllEntries: async (req, res) => {
    try {
      const entries = await Leaderboard.findAll();
      if (!entries) {
        return res.status(404).json({ error: "Leaderboard entries not found" });
      }
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a leaderboard entry by ID
  getEntryById: async (req, res) => {
    const { id } = req.params;

    try {
      const entry = await Leaderboard.findById(id);
      if (!entry) {
        return res.status(404).json({ error: "Leaderboard entry not found" });
      }

      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update a leaderboard entry by ID
  updateEntryById: async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
      const updatedEntry = await Leaderboard.updateById(id, updates);

      if (!updatedEntry.modifiedCount) {
        return res.status(404).json({ error: "Leaderboard entry not found" });
      }

      res.status(200).json({
        message: "Leaderboard entry updated successfully",
        updatedEntry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  calculateLeaderboard: async (req, res) => {
    try {
      const { eventId } = req.params;

      const entries = await Leaderboard.find({ event_id: eventId }).sort({
        points: -1,
      });
      for (let i = 0; i < entries.length; i++) {
        entries[i].rank = i + 1;
        await entries[i].save();
      }

      res
        .status(200)
        .json({ message: "Leaderboard updated", leaderboard: entries });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Delete a leaderboard entry by ID
  deleteEntryById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedEntry = await Leaderboard.deleteById(id);

      if (!deletedEntry.deletedCount) {
        return res.status(404).json({ error: "Leaderboard entry not found" });
      }

      res
        .status(200)
        .json({ message: "Leaderboard entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all leaderboard entries for a specific event
  getLeaderboardByEventId: async (req, res) => {
    const { eventId } = req.params;

    try {
      const leaderboard = await Leaderboard.findByEventId(eventId);

      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = leaderboardController;

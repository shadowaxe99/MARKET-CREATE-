const UserModel = require('../models/UserModel');
const AssetModel = require('../models/AssetModel');
const TransactionModel = require('../models/TransactionModel');
const { ElysiumApi } = require('../api/elysiumApi');

const elysiumController = {
  registerUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
      res.status(201).json({ message: 'UserRegistered', user: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Login failed' });
      }
      // Here you would normally generate a token or session
      res.status(200).json({ message: 'LoginSuccessful', user });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  logoutUser: (req, res) => {
    // Here you would normally clear the token or session
    res.status(200).json({ message: 'LogoutSuccessful' });
  },

  createAsset: async (req, res) => {
    try {
      const { name, description, creator } = req.body;
      const newAsset = new AssetModel({ name, description, creator });
      await newAsset.save();
      res.status(201).json({ message: 'AssetCreated', asset: newAsset });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  executeTransaction: async (req, res) => {
    try {
      const { assetId, buyerId, sellerId, price } = req.body;
      const newTransaction = new TransactionModel({ assetId, buyerId, sellerId, price });
      await newTransaction.save();
      res.status(201).json({ message: 'TransactionCompleted', transaction: newTransaction });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  fetchAnalytics: async (req, res) => {
    try {
      const analyticsData = await ElysiumApi.getAnalytics();
      res.status(200).json(analyticsData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  moderateContent: async (req, res) => {
    try {
      const { content } = req.body;
      const moderatedContent = await ElysiumApi.moderateContent(content);
      res.status(200).json({ moderatedContent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  personalizeContent: async (req, res) => {
    try {
      const { userId, content } = req.body;
      const personalizedContent = await ElysiumApi.personalizeContent(userId, content);
      res.status(200).json({ personalizedContent });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  convertVoiceToText: async (req, res) => {
    try {
      const { voiceData } = req.body;
      const text = await ElysiumApi.convertVoiceToText(voiceData);
      res.status(200).json({ text });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = elysiumController;
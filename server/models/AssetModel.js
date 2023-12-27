const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'ETH'
  },
  assetType: {
    type: String,
    required: true,
    enum: ['Image', 'Video', 'Audio', '3DModel', 'ARAsset', 'Other']
  },
  fileUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    required: false
  },
  tags: [{
    type: String,
    trim: true
  }],
  isLimitedEdition: {
    type: Boolean,
    default: false
  },
  editionSize: {
    type: Number,
    required: function() { return this.isLimitedEdition; }
  },
  royalties: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  blockchainDetails: {
    contractAddress: {
      type: String,
      required: true
    },
    tokenId: {
      type: String,
      required: true
    },
    transactionHash: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const AssetModel = mongoose.model('AssetModel', assetSchema);

module.exports = AssetModel;
const mongoose = require('mongoose');
const hash = require('object-hash');
const { MAX_BLOCK_CHARACTERS } = process.env;

const BlockSchema = mongoose.Schema({
    previousHash: {
        type: String,
        required: true
    },
    message: {
        type: String
    },
    nonce: {
        type: String
    },
    hash: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        default: Date.now
    }
});

const Block = module.exports.schema = new mongoose.model('Block', BlockSchema);

// Utility functions
const calculateHash = (block) => {
    const previousHash = block.previousHash;
    const message = block.message;
    const nonce = block.nonce;
    return hash({ previousHash, message, nonce });
}
const getLastBlock = module.exports.getLastBlock = async () => {
    return Block.findOne(
      {},
      {
          previousHash: 1,
          message: 1,
          nonce: 1,
          hash: 1,
          timestamp: 1,

      },
      {
          sort: {timestamp: -1}
      });
}

const getAllBlocks = module.exports.getAllBlocks = async () => {
    return Block.find({});
}

//TODO: implement this method
let verifyBlock = async (proposedBlock, previousBlock) => {
    // reject (throw error) if nonce + message character count is greater than 100 characters
    // reject if previousHash does not match the previous block's hash
    // calculate the hash of the proposed block, reject if it doesn't meet hash requirements, otherwise return the calculated hash
    const {previousHash, message, nonce} = proposedBlock;

    if (!message || typeof message !== 'string' || typeof nonce !== 'string') {
        throw Error('Nonce or message are invalid');
    }

    if ((nonce + message).length > 100) {
        throw Error('Nonce + message length is greater than 100!');
    }

    if (previousHash !== previousBlock.hash) {
        throw Error('Previous hash is not valid!');
    }

    const hash = calculateHash(proposedBlock);

    if (!/^\d.*[a-zA-Z]$/.test(hash)) {
        throw Error('Calculated hash is not valid!');
    }

    return hash;
}
module.exports.addBlock = async (proposedBlock) => {
    const lastBlock = await getLastBlock();
    let hash = await verifyBlock(proposedBlock, lastBlock);
    if (hash) {
        let newBlock = new Block({
            previousHash: proposedBlock.previousHash,
            message: proposedBlock.message,
            nonce: proposedBlock.nonce,
            hash: hash
        });
        await newBlock.save();
    }
}

//TODO: implement this method - return true if it's valid, otherwise false
module.exports.isBlockchainValid = async () => {
    /**
     * this implementation assumes that total amount is not too big
     * otherwise it should be queried from DB in bulks
     */

    /**
     * empty blockchain assumed to be valid
     */
    function validate(blocks) {
        for (let i = blocks.length - 1; i >= 0; i--) {
            if (i === 0) {
                return true;
            }

            const curr = blocks[i];
            const prev = blocks[i-1];
            if (curr.previousHash !== prev.hash) {
                return false
            }
        }
    }
    // is going to be array by definition.
    let allBlocks;
    try {
        allBlocks = await getAllBlocks();
    } catch (e) {
        throw Error('Server error occurred!');
    }
    return validate(allBlocks);
}

module.exports.initializeBlockchain = async () => {
    if (await Block.countDocuments() === 0) { //create the genesis block
        let genesisBlock = new Block({
            previousHash: '0',
            message: 'Life is really simple, but we insist on making it complicated',
            hash: '1'
        });
        await genesisBlock.save();
        console.log("Created the genesis block");
    }
}

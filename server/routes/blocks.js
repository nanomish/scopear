const express = require('express');
const router = express.Router();
const Block = require('../models/block');

router.post('/propose', async (req, res, next) => {
    try {
        await Block.addBlock({
            previousHash: req.body.previousHash,
            message: req.body.message,
            nonce: req.body.nonce })
        return res.status(200).send({success: true});
    }
    catch (error) {
        return res.status(500).send({message: error.message});
    }
});

router.get('/list', async (req, res) => {
    try {
        let blocks = await Block.getAllBlocks();
        return res.status(200).send(blocks);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get('/last-hash', async (req, res) => {
    try {
        let block = await Block.getLastBlock();
        return res.status(200).send({hash: block.hash});
    }
    catch (e) {
        return res.status(500).send({message: e.message});
    }
});

//TODO: implement
router.get('/is-blockchain-valid', async (req, res) => {
    try {
        const isValid = await Block.isBlockchainValid();
        return res.status(200).send(isValid);
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

module.exports = router;

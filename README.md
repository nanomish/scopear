# MessageBlockchain (Home Assignment)
A simplified, non-orthodox, blockchain based message system

## Prerequisites
* Node 10.19+
* MongoDB 4.2+

## Setup
* Modify the MONGODB_CONNECTION_STRING environment variable to connect to your local/remote db

## Run
* Server
```
cd server
npm i
npm start
```
* Client
```
cd client
npm i
npm start
```

## Functional requirements

* A block is comprised of a message, its creation timestamp, the previous-block's hash and its own hash.
* Each block's hash is calculated from the previous block's hash, its own message and a **nonce**.
* A nonce is a word that can be used to affect the resulting hash without modifying the message.
* Anyone can propose a new message block.
* A new message block should be added to the blockchain (mongodb block collection) if it meets the following terms:
1. Its calculated hash starts with a digit (0-9) and ends with a letter (a-z).
2. It holds the hash of the **current last block** in the chain, as its previous-block's hash.
3. The nonce and message combined length is less than or equal to 100 characters.
* Once a block is accepted and added to the chain, it should never be modified.
* Since the blockchain concept is based on new blocks storing their previous block's hash and all of the information required to generate their own hash- The integrity of the entire chain can be verified.
* Since the mechanism for approving a new block relies on the previous block's hash, there must be 1 block in the chain, initially. For this purpose,
a **Genesis block** is created if there are no blocks when the server starts. The genesis block contains hardcoded values yet should be considered legitimate.

## An example message blockchain containing 3 blocks
```
{ "_id" : ObjectId("60358b7ee7e012f2b59cdbde"), "previousHash" : "0", "message" : "Life is really simple, but we insist on making it complicated", "hash" : "1", "timestamp" : 1614121854584, "__v" : 0 }

{ "_id" : ObjectId("60358be6427886f426768342"), "previousHash" : "1", "message" : "This calculated hash will be ok", "nonce" : "lucky 1", "hash" : "3d162a4cdee27248500a2cab01886626d4ddd43c", "timestamp" : 1614121958575, "__v" : 0 }

{ "_id" : ObjectId("60358c19be8af7f4c86a22b9"), "previousHash" : "3d162a4cdee27248500a2cab01886626d4ddd43c", "message" : "Can we make it again?", "nonce" : "lucky 2", "hash" : "41cb04383b6ed97b9c8218c40bf24714c02124db", "timestamp" : 1614122009937, "__v" : 0 }
```


# Tasks (Server)
1. Implement the 'verifyBlock' function in server/models/block.js
2. Implement the 'isBlockchainValid' function in server/models/block.js.
3. Implement the 'is-blockchain-valid' route in server/routes/blocks.js.

# Tasks (Client)
1. Add the following static functions to client/src/ServerUtility.js:
* fetch 'POST' to localhost:5000/blocks/propose
* fetch 'GET' to localhost:5000/blocks/is-blockchain-valid
2. Create a button that will check if the blockchain is valid, display the result to the user.
3. Display the last block's hash on the top of the page. Refresh it every 5 seconds. Use '**ServerUtility**.getLastBlockHash'.
4. Create a React component that is able to display the blocks data as a vertical list of rectangles filled with the information as well as in a chat layout (multiline text showing only the block's message in a new line) and allow the user to toggle between these views.
5. Write a React component which will accept a new block's data and post it to localhost:5000/blocks/propose.
Inform the user if the block was accepted or rejected. if it was rejected, display a message with the specific reason.
6. Whenever there's an update to the blockchain, modify the list of blocks to reflect the change without exiting the page, in an efficient way.


import logo from './logo.svg';
import './App.css';
import ServerUtility from './ServerUtility';
import React, {useEffect, useState} from "react";
import BlockDataList from "./components/BlockDataList";
import CreateBlock from "./components/CreateBlock";
const validityAreaStyle = {display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'};
const checkValidityButtonStyle = {
  background: 'white',
  borderRadius: '5px',
  cursor: 'pointer',
  height: '3em',
  outline: 'none',
  width: '14em'
};

const CHECK_LAST_BLOCK_HASH_DELAY = 5000;

function App() {
  const [isBlockchainValid, setIsBlockchainValid] = useState(true);
  const [lastBlockHash, setLastBlockHash] = useState('');
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    checkBlockChainValidity();
    fetchAllBlocks();
  }, []);

  useEffect(() => {
    function getLastBlockHash() {
      ServerUtility.getLastBlockHash()
        .then(hash => {
          setLastBlockHash(hash)
        });
    }

    getLastBlockHash();
    let id = setInterval(getLastBlockHash, CHECK_LAST_BLOCK_HASH_DELAY);
    return () => clearInterval(id);
  }, []);

  async function fetchAllBlocks() {
    const blks = await ServerUtility.getBlocks();
    console.log('*** blks', blks)
    setBlocks(blks)
  }

  async function checkBlockChainValidity() {
    const isValid = await ServerUtility.isBlockchainValid();
    setIsBlockchainValid(isValid);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ color: "grey", marginTop: '1em'}} className='sep-section'>
          Last block hash: <b>{lastBlockHash}</b>
        </div>
        <CreateBlock onBlockCreated={fetchAllBlocks} previousHash={lastBlockHash}/>
        <div className='sep-section validity-section'>
          <button style={checkValidityButtonStyle} onClick={checkBlockChainValidity}>Check Blockchain Validity</button>
          <div style={{color: isBlockchainValid ? 'green' : 'red'}}>Blockchain is {isBlockchainValid ? 'valid' : 'invalid'}</div>
        </div>
        <div>
          <div style={{ color: "grey" }} >
            <BlockDataList blocks={blocks}/>
          </div>
          <div style={{ color: "green", marginTop: '10%'}} >
            Input new block
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import ServerUtility from './ServerUtility';
import React, {useEffect, useState, useCallback} from "react";
import BlockDataList from "./components/BlockDataList";
import CreateBlock from "./components/CreateBlock";

const CHECK_LAST_BLOCK_HASH_DELAY = 5000;

function App() {
  const [isBlockchainValid, setIsBlockchainValid] = useState(true);
  const [lastBlockHash, setLastBlockHash] = useState('');
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    checkBlockchainValidity();
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
    console.log('*** blks', blks);
    setBlocks(blks);
  }

  const checkBlockchainValidity = useCallback(async () => {
    const isValid = await ServerUtility.isBlockchainValid();
    setIsBlockchainValid(isValid);
    },[]);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ color: "grey", marginTop: '1em'}} className='sep-section'>
          Last block hash: <b>{lastBlockHash}</b>
        </div>
        <CreateBlock onBlockCreated={fetchAllBlocks} previousHash={lastBlockHash}/>
        <div className='sep-section validity-section'>
          <button className="check-validity-button-styling" onClick={checkBlockchainValidity}>Check Blockchain Validity</button>
          <div style={{color: isBlockchainValid ? 'green' : 'red', margin: '0 1em'}}>Blockchain is {isBlockchainValid ? 'valid' : 'invalid'}</div>
        </div>
        <div>
          <div style={{ color: "grey" }} >
            <BlockDataList blocks={blocks}/>
          </div>

        </div>
      </header>
    </div>
  );
}

export default App;

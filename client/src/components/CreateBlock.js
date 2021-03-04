import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import ServerUtility from '../ServerUtility';

export default function CreateBlock({onBlockCreated, previousHash}) {
  const [message, setMessage] = useState('');
  const [nonce, setNonce] = useState('');
  //const [previousHash, setPreviousHash] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('')

  const removeMessages = _.debounce(() => {
    setNotification('');
    setError('');
  }, 4000);

  function invokeBlockProposal() {

    if (!message || !previousHash) {
      return;
    }

    ServerUtility.propose({
      previousHash,
      message,
      nonce,
    }).then(response => {
      resetState();
      setNotification('Block was created!');
      removeMessages();
      _.isFunction(onBlockCreated) && onBlockCreated();
    }).catch(e => {
      setError(e.message);
      removeMessages()
    });

  }

  function resetState() {
    //setPreviousHash('');
    setMessage('');
    setNonce('');
    setNotification('');
    setError('');
  }

  return (<div className='create-proposal-form sep-section'>
    <div className='create-proposal-form-input'>

      <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
      <input type="text" placeholder='nonce' value={nonce} onChange={e => setNonce(e.target.value)} />
      {/*<input type="text" placeholder='previous hash' value={previousHash} onChange={e => setPreviousHash(e.target.value)} />*/}
      <button onClick={invokeBlockProposal}>Create</button>
    </div>
    <div className='create-proposal-form-error'>{error}</div>
    <div className='create-proposal-form-message'>{notification}</div>
  </div>);
}




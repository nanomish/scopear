import React, {useEffect, useState, useRef} from 'react';
import _ from 'lodash';
import ServerUtility from '../ServerUtility';
const ERROR_TYPE = 'error';
const MESSAGE_TYPE = 'message';

export default function CreateBlock({onBlockCreated, previousHash}) {
  const [message, setMessage] = useState('');
  const [nonce, setNonce] = useState('');
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('')
  const removeNotifications = useRef();

  useEffect(() => {
    removeNotifications.current = _.debounce(() => {
      setNotification('');
      setNotificationType('');

      return () => removeNotifications.current.cancel();
    }, 4000);
  }, []);


  function invokeBlockProposal() {

    if (!message || !previousHash) {
      return;
    }

    ServerUtility.propose({
      previousHash,
      message,
      nonce,
    }).then(() => {
      resetState();
      setNotification('Block was created!');
      setNotificationType(MESSAGE_TYPE);
      removeNotifications.current();
      _.isFunction(onBlockCreated) && onBlockCreated();
    }).catch(e => {
      setNotification(e.message);
      setNotificationType(ERROR_TYPE);

      removeNotifications.current();
    });

  }

  function resetState() {
    setMessage('');
    setNonce('');
    setNotification('');
    setNotificationType('');
  }

  return (<div className='create-proposal-form sep-section'>
    <div className='create-proposal-form-input'>
      <input type="text" placeholder='message' value={message} onChange={e => setMessage(e.target.value)} />
      <input type="text" placeholder='nonce' value={nonce} onChange={e => setNonce(e.target.value)} />
      <button onClick={invokeBlockProposal}>Create</button>
    </div>
    <div className='create-proposal-form-message'
         style={{color: notificationType === ERROR_TYPE ? 'red' : 'green'}}>
      {notification}
    </div>
  </div>);
}




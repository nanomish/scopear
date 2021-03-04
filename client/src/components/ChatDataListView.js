import React from 'react';
import _ from 'lodash';

export default function ChatDataListView({blocks = []}) {

  return <div className="chat-style">{
    _.map(blocks, b => <ChatLine block={b} key={b.hash}/>)
  }</div>
}

function ChatLine({block}) {
  return <div className="chat-line-style" key={block.hash}>{block.message}</div>
}



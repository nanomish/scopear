import React, {useEffect} from 'react';
import _ from 'lodash';
const chatStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  margin: '0 .5em',
  overflow: 'auto',
};

const chatLineStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
}

export default function ChatDataListView({blocks = []}) {

  return <div style={chatStyle}>{
    _.map(blocks, b => <ChatLine block={b} key={b.hash}/>)
  }</div>
}

function ChatLine({block}) {
  return <div style={chatLineStyle} key={block.hash}>{block.message}</div>
}



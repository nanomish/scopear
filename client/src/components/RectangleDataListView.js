import React from 'react';
import _ from "lodash";

const rectangleViewStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 .5em',
  overflow: 'auto',
}

const rectangleLineStyle = {
  border: '1px solid white',
  display: 'flex',
  flexDirection: 'column',
  padding: '.2em',
  width: '95%',
  fontSize: '.8em',
  marginTop: '.5em',
}

const itemNameStyle = {
  fontWeight: '600',
  width: '7em',
  float: 'left',
  textAlign: 'left',
}

const itemValueStyle = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: 'calc(100% - 8em)',
  whiteSpace: 'nowrap',
  float: 'left',
  textAlign: 'left',
};

export default function RectangleDataListView({blocks}) {

  return <div style={rectangleViewStyle}>{
    _.map(blocks, b => <RectangleListItem block={b} key={b.hash}/>)
  }</div>
}


function RectangleListItem({block}) {
    return (
      <div style={rectangleLineStyle}>
        <RViewItem key={'hash'} block={block} property={'hash'} />
        <RViewItem key={'previousHash'} block={block} property={'previousHash'} />
        <RViewItem key={'message'} block={block} property={'message'} />
        <RViewItem key={'nonce'} block={block} property={'nonce'} />
      </div>
    )
}

function RViewItem({block, property}) {
  return (
    <div>
      <div style={itemNameStyle}>{property}</div>
      <div style={itemValueStyle}>{block[property]}</div>
    </div>
  )
}

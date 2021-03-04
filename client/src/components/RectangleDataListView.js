import React from 'react';
import _ from "lodash";

export default function RectangleDataListView({blocks}) {

  return (
    <div className="rectangle-view-styling">{
      _.map(blocks, b => <RectangleListItem block={b} key={b.hash}/>)
    }</div>
  );
}


function RectangleListItem({block}) {
  return (
    <div className="rectangle-line-styling">
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
      <div className="item-name-styling">{property}</div>
      <div className="item-value-styling">{block[property]}</div>
    </div>
  )
}

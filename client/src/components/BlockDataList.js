import React, {useState, useEffect} from 'react';
import RectangleDataListView from "./RectangleDataListView";
import ChatDataListView from "./ChatDataListView";
import ServerUtility from "../ServerUtility";
const componentStyle = {
  border: '1px solid white',
  width: '30em',
  height: '15em',
};

const mainStyle = {
  overflow: 'scroll',
  maxHeight: '13em',
}

const radioStyle = {
  cursor: 'pointer',
  margin: '0 1em 0.7em 1em',
  transform: 'scale(1.5)',
}

const VIEW_TYPE_RECTANGLE = 'rectangle';
const VIEW_TYPE_CHAT = 'chat';
export default function BlockDataList({ blocks}) {
  const [viewType, setViewType] = useState(VIEW_TYPE_CHAT);

  function onViewSwitched(value) {
    setViewType(value)
  }

  return (
    <div style={componentStyle}>
      <div>
        <form onClick={event => onViewSwitched(event.target.value)}>
          <input type="radio" name="viewType" style={radioStyle} value={VIEW_TYPE_RECTANGLE}/>
          <input type="radio" name="viewType" style={radioStyle} value={VIEW_TYPE_CHAT} defaultChecked/>
        </form>
      </div>

      <div style={mainStyle}>
        {
          viewType === VIEW_TYPE_RECTANGLE ?
            <div>
              <RectangleDataListView blocks={blocks} />
            </div>
            :
            <div>
              <ChatDataListView blocks={blocks} />
            </div>
        }
      </div>
    </div>
  )
}

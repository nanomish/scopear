import React, {useState} from 'react';
import RectangleDataListView from "./RectangleDataListView";
import ChatDataListView from "./ChatDataListView";

const VIEW_TYPE_RECTANGLE = 'rectangle';
const VIEW_TYPE_CHAT = 'chat';

export default function BlockDataList({ blocks}) {
  const [viewType, setViewType] = useState(VIEW_TYPE_RECTANGLE);

  function onViewSwitched(value) {
    setViewType(value);
  }

  return (
    <div className="component-style">
      <div>
        <form onClick={event => onViewSwitched(event.target.value)}>
          Rectangles <input type="radio"
                            name="viewType"
                            className="radio-style"
                            defaultChecked={viewType === VIEW_TYPE_RECTANGLE}
                            value={VIEW_TYPE_RECTANGLE} />
          Chat <input type="radio"
                      name="viewType"
                      className="radio-style"
                      defaultChecked={viewType === VIEW_TYPE_CHAT}
                      value={VIEW_TYPE_CHAT} />
        </form>
      </div>

      <div className="main-style">
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

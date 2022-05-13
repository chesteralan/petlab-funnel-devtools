import React from 'react'

const SelectFilterByPathname = (props) => {

    const { filterBy, setFilterByPathname, funnels } = props;

    if( filterBy === 'pathname') {
    return <select onBlur={(evt) => setFilterByPathname(evt.target.value)}>
      <option>-- Filter By Pathname --</option>
      {funnels?.map((item) => {
          return <option value={item.data.url} key={`funnel-${item.id}`}>{item.data.url}</option>
        }
      )}
    </select>
    } else {
      return ``;
    }
  };

export default SelectFilterByPathname
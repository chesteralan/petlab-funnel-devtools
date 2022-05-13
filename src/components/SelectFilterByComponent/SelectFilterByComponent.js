import React from 'react'

const SelectFilterByComponent = (props) => {

    const { filterBy, filterByComponent, setFilterByComponent } = props;

    const components = [
      'Header 2',
      'Video 2',
      'Delivery Frequency',
      'Package Selector',
      'Slides:AnswerSelect',
      'User Address',
    ]
    if( filterBy === 'component') {
    return <select onClick={(evt) => setFilterByComponent(evt.target.value)}>
      <option value={""}>-- Filter By Component --</option>
      {components.map((item) => <option key={item} selected={filterByComponent===item}>{item}</option>)}
    </select>
    } else {
      return ``;
    }
  };

export default SelectFilterByComponent
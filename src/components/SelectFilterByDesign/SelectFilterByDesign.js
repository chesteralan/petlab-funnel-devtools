import React from 'react'

const SelectFilterByDesign = (props) => {

    const { filterBy, setFilterByDesign } = props;

    if( filterBy === 'design') {
    return <select onBlur={(evt) => setFilterByDesign(evt.target.value)}>
      <option value="design2">Design 2</option>
      <option value="design1">Design 1</option>
    </select>
    } else {
      return ``;
    }
  };

export default SelectFilterByDesign
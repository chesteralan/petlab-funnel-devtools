import React from 'react'

const SelectFilterByTag = (props) => {

    const { filterBy, filterByTag, setFilterByTag, funnels } = props;

    if( filterBy === 'tag') {
      const tags = funnels?.map((item) => {
        if( typeof item.data.tags === 'object' ) {
          return item.data.tags;
        } else {
          return [];
        }
      });
     const merged = [].concat.apply([], tags);
     const merged2 = [...new Set(merged)]
    return <select onChange={(evt) => setFilterByTag(evt.target.value)}>
      <option>{(filterByTag !== "") ? filterByTag : `-- Filter By Tag --`}</option>
      {merged2.filter((tag) => tag !== null && tag?.trim() !== ``).sort((a,b) => ( a < b ) ? -1 : 0).map((tag) => {
          return <option value={tag} key={tag}>{tag}</option>
        }
      )}
    </select>
    } else {
      return ``;
    }
  };

export default SelectFilterByTag
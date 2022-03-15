import React from 'react'
import { filterFunction, sortFunction } from './helpers';

const LinkListContainer = (props) => {

    const { funnels,linkList,linkListQuery } = props;

    if( linkList.length === 0 ) {
      return ``
    } else {
      const trimmedLinkList = linkList.trim().replace(/\/$/, "");
    return (<>
          <strong>Link List</strong>
          <ul>
    <strong>Funnels</strong>
    {funnels.filter((item) => filterFunction(item, props)).sort((a,b) => sortFunction(a,b,props)).map(({name, data: { url }}, index) => (
    <li key={index}>
        {name} - <a href={`${trimmedLinkList}${url}${linkListQuery}`} target="_blank" rel="noreferrer">{trimmedLinkList}{url}{linkListQuery}</a>
    </li>
    ))}
    </ul>
    </>);
    }
  };

export default LinkListContainer
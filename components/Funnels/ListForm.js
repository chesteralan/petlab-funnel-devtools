import React from 'react'

const ListForm = (props) => {

    const {
        linkList, setLinkList,
        linkListQuery, setLinkListQuery,
      } = props;

    const showList = (evt) => {
        setLinkList(evt.target.value);
      };
    
      const showListQuery = (evt) => {
        setLinkListQuery(evt.target.value);
      };

    return (<div>
  {(linkList !== "") && <button style={{ color: 'red', padding: 10 }} onClick={() => setLinkList("")}>X</button>}
      <input onKeyUp={showList} defaultValue={linkList} placeholder="Enter Address Here" type="text" style={{ width: `50%`, padding: 10, margin: 10 }} />
      <input onKeyUp={showListQuery} defaultValue={linkListQuery} placeholder="Enter Query Here" type="text" style={{ width: `40%`, padding: 10, margin: 10 }} />
      </div>)
  }
  

export default ListForm
import React from 'react'

const ShowHiddenColumnsContainer = (props) => {

    const {
        tableBuilder, setTableBuilder,
        tableStaging, setTableStaging,
        tableLive, setTableLive,
        tableLocal, setTableLocal,
        tableData, setTableData,
        tableProductSelector, setTableProductSelector,
      } = props;

      const styles = {
        textAlign: 'center',
        marginBottom: 10,
      };

    return <>
   <div style={styles}>
  
   <button style={{ display: (!tableBuilder ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableBuilder(true)}>Show Builder</button>
   
   <button style={{ display: (!tableStaging ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableStaging(true)}>Show Staging</button>
  
   <button style={{ display: (!tableLive ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableLive(true)}>Show Live</button>
  
   <button style={{ display: (!tableLocal ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableLocal(true)}>Show Local</button>
  
   <button style={{ display: (!tableProductSelector ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableProductSelector(true)}>Show Product Selector</button>
   
   <button style={{ display: (!tableData ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableData(true)}>Show Data</button>
  
   </div>
  
  </>
  };

export default ShowHiddenColumnsContainer
import React from 'react'
import SelectSort from '../SelectSort/SelectSort'
import SelectFilter from '../SelectFilter/SelectFilter'
import SelectFilterByPathname from '../SelectFilterByPathname/SelectFilterByPathname'
import SelectFilterByDesign from '../SelectFilterByDesign/SelectFilterByDesign'
import SelectFilterByTag from '../SelectFilterByTag/SelectFilterByTag'
import SelectVariable from '../SelectVariable/SelectVariable'
import SelectFilterByComponent from '../SelectFilterByComponent/SelectFilterByComponent'

const THeadContainer = (props) => {

    const {
        funnels,
        tableBuilder, setTableBuilder,
        tableStaging, setTableStaging,
        tableLive, setTableLive,
        tableLocal, setTableLocal,
        tableData, setTableData,
        tableProductSelector, setTableProductSelector,
        showLiveUrl, setShowLiveUrl,
        showStagingUrl, setShowStagingUrl,
        showLocalUrl, setShowLocalUrl
    } = props;
      
    const thStyles = { position: 'sticky', top: 0,  backgroundColor: '#CCC' };

    return (<thead>
    <tr>
   <th style={thStyles} width="35%" align="left">
     <strong>Funnels ({funnels.length})</strong>
     <SelectSort {...props} />
     <SelectFilter {...props} />
     <SelectFilterByPathname {...props} />
     <SelectFilterByDesign {...props} />
     <SelectFilterByTag {...props} />
     <SelectFilterByComponent {...props} />
   </th>
   <th style={{ display: (tableBuilder ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong>Builder</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableBuilder(false)}>x</button>
   </th>
   <th style={{ display: (tableStaging ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong tabIndex={0} role="button" onKeyDown={()=>{}} onClick={() => setShowStagingUrl(!showStagingUrl)}>Staging</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableStaging(false)}>x</button>
   </th>
   <th style={{ display: (tableLive ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong tabIndex={0} role="button" onKeyDown={()=>{}} onClick={() => setShowLiveUrl(!showLiveUrl)}>Live</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableLive(false)}>x</button>
   </th> 
   <th style={{ display: (tableLocal ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong tabIndex={0} role="button" onKeyDown={()=>{}} onClick={() => setShowLocalUrl(!showLocalUrl)}>Local</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableLocal(false)}>x</button>
   </th>
   <th style={{ display: (tableProductSelector ? 'table-cell' : 'none'), ...thStyles }} width="10%" align="left"><strong>Product Selector</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableProductSelector(false)}>x</button>
   </th>
   <th style={{ display: (tableData ? 'table-cell' : 'none'), ...thStyles }} width="40%" align="left">Data <SelectVariable {...props} />
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableData(false)}>x</button>
   </th>
  </tr>
    </thead>);

  }

export default THeadContainer
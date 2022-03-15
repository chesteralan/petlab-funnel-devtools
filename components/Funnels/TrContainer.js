import React from 'react'
import ShowVariableContainer from './ShowVariableContainer';

function TrContainer(props) {
    
    const {funnel,...rest} = props;

    const {
        name, 
        data, 
        id: pageId 
    } = funnel;

    const { url } = data;
    const productsId = data?.products?.id;
    const productsDataId = data?.products?.value?.name;

    const {
        FUNNEL_ROOT_URL_LIVE,
        FUNNEL_ROOT_URL_STAGING,
        tableBuilder,
        tableStaging, 
        tableLive, 
        tableLocal, 
        tableData, 
        tableProductSelector, 
        showLiveUrl, 
        showStagingUrl, 
      } = rest;

  return <tr>
  <td width="40%">{name}</td>
  <td width="7%" align="center" style={{ fontSize: '10px', display: (tableBuilder ? 'table-cell' : 'none') }}>
    <a href={`https://builder.io/content/${pageId}`} rel="noreferrer" target="_blank">Edit Page</a> &middot;
    <a href={`https://builder.io/content/${productsId}`} rel="noreferrer" target="_blank">Edit Product</a>
  </td>
  <td width="5%" align="center" style={{ display: (tableStaging ? 'table-cell' : 'none') }}><a href={`${FUNNEL_ROOT_URL_STAGING}${url}`} rel="noreferrer" target="_blank">{showStagingUrl ? `${FUNNEL_ROOT_URL_STAGING}${url}` : 'Staging'}</a></td>
  <td width="5%" align="center" style={{ display: (tableLive ? 'table-cell' : 'none') }}><a href={`${FUNNEL_ROOT_URL_LIVE}${url}`} rel="noreferrer" target="_blank">{showLiveUrl ? `${FUNNEL_ROOT_URL_LIVE}${url}` : 'Live'}</a></td> 
  <td width="5%" align="center" style={{ display: (tableLocal ? 'table-cell' : 'none') }}><a href={`${url}`} rel="noreferrer" target="_blank">Local</a></td>
  <td width="10%" align="left" style={{ display: (tableProductSelector ? 'table-cell' : 'none'),wordBreak: 'break-all' }}><small><a href={`/devtools/funnel-data?path=${url}`} rel="noreferrer" target="_blank">{productsDataId}</a></small></td>
  <td width="40%" align="left" style={{ display: (tableData ? 'table-cell' : 'none') }}><ShowVariableContainer {...props} /></td>
</tr>

}

export default TrContainer
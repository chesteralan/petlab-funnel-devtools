import React from 'react'

const THeadContainer = (props) => {

    const {
        funnels,
        setSortBy,
        filterBy, setFilterBy,
        setFilterByPathname,
        setFilterByDesign,
        setFilterByTag,
        showVariable, setShowVariable,
        tableBuilder, setTableBuilder,
        tableStaging, setTableStaging,
        tableLive, setTableLive,
        tableLocal, setTableLocal,
        tableData, setTableData,
        tableProductSelector, setTableProductSelector,
        showLiveUrl, setShowLiveUrl,
        showStagingUrl, setShowStagingUrl,
    } = props;

    const SelectSort = () => {
        return <select onBlur={(evt) => setSortBy(evt.target.value)}>
          <option>-- Sort By --</option>
          {[
            'name-asc',
            'name-desc',
            'pathname-asc',
            'pathname-desc',
            'klaviyo-asc',
            'klaviyo-desc',
            'upsell-asc',
            'upsell-desc',
            'none',
          ].map((option) => {
              return <option value={option} key={option}>{option}</option>
          }
          )}
        </select>
      };
      
      const SelectFilter = () => {
        return <select onBlur={(evt) => setFilterBy(evt.target.value)}>
          <option>-- Filter By --</option>
          {[
            'rebrand_styling',
            'pathname',
            'design',
            'tag',
            'sub-free-gift',
            'otp-free-gift',
            'none',
          ].map((option) => {
              return <option value={option} key={option}>{option}</option>
          }
          )}
        </select>
      };
      
      const SelectFilterByPathname = () => {
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
      
      const SelectFilterByDesign = () => {
        if( filterBy === 'design') {
        return <select onBlur={(evt) => setFilterByDesign(evt.target.value)}>
          <option value="design2">Design 2</option>
          <option value="design1">Design 1</option>
        </select>
        } else {
          return ``;
        }
      };
      
      const SelectFilterByTag = () => {
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
        return <select onBlur={(evt) => setFilterByTag(evt.target.value)}>
          <option>-- Filter By Tag --</option>
          {merged2.filter((tag) => tag !== null && tag?.trim() !== ``).sort((a,b) => ( a < b ) ? -1 : 0).map((tag) => {
              return <option value={tag} key={tag}>{tag}</option>
            }
          )}
        </select>
        } else {
          return ``;
        }
      };
      
      const SelectVariable = () => {
        return <select onBlur={(evt) => setShowVariable(evt.target.value)}>
          <option value="">-- Select --</option>
          {[
            'pathname',
            'klaviyo',
            'pixel_ids',
            'upsell',
            'upsell-extra',
            'currency',
            'store',
            'expedited_delivery',
            'expedited_delivery_price',
            'sub-variant-ids',
            'sub-prices',
            'sub-free-gifts',
            'sub-discount-codes',
            'sub-bump-offer',
            'otp-variant-ids',
            'otp-prices',
            'otp-free-gifts',
            'otp-discount-codes',
            'otp-bump-offer',
            'rebrand_styling',
            'tags',
            'extra',
            'rebill_discount',
            'higher_initial_discount',
          ].map((option) => {
              return <option value={option} key={option}>{option}</option>
          }
          )}
        </select>
      };
      


    const thStyles = { position: 'sticky', top: 0,  backgroundColor: '#CCC' };

    return (<thead>
    <tr>
   <th style={thStyles} width="35%" align="left">
     <strong>Funnels ({funnels.length})</strong>
     <SelectSort />
     <SelectFilter />
     <SelectFilterByPathname />
     <SelectFilterByDesign />
     <SelectFilterByTag />
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
   <th style={{ display: (tableLocal ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong>Local</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableLocal(false)}>x</button>
   </th>
   <th style={{ display: (tableProductSelector ? 'table-cell' : 'none'), ...thStyles }} width="10%" align="left"><strong>Product Selector</strong>
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableProductSelector(false)}>x</button>
   </th>
   <th style={{ display: (tableData ? 'table-cell' : 'none'), ...thStyles }} width="40%" align="left">Data ({showVariable}) <SelectVariable />
   <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableData(false)}>x</button>
   </th>
  </tr>
    </thead>);

  }

export default THeadContainer
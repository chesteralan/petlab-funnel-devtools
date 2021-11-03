import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';

const FunnelsList = ({ data }) => {

  const [linkList, setLinkList] = useState('');
  const [sortBy, setSortBy] = useState('none');
  const [filterBy, setFilterBy] = useState('none');
  const [filterByPathname, setFilterByPathname] = useState('');
  const [filterByDesign, setFilterByDesign] = useState('design2');
  const [filterByTag, setFilterByTag] = useState('Probiotic Chews');
  const [showVariable, setShowVariable] = useState('pathname');
  const [tableBuilder, setTableBuilder] = useState(true);
  const [tableStaging, setTableStaging] = useState(false);
  const [tableLive, setTableLive] = useState(true);
  const [tableLocal, setTableLocal] = useState(true);
  const [tableData, setTableData] = useState(true);
  const [tableProductSelector, setTableProductSelector] = useState(false);

  const funnels = data?.allBuilderModels?.funnel;
  const salesLetters = data?.allBuilderModels?.salesLetter;
  const slides = data?.allBuilderModels?.slide;
  const quizzes = data?.allBuilderModels?.quiz;
  const allFunnelPageData = data?.allFunnelPageData?.nodes;

  const showList = (evt) => {
    setLinkList(evt.target.value);
  };

  const LinkListContainer = () => {
    if( linkList.length === 0 ) {
      return ``
    } else {
      const trimmedLinkList = linkList.trim().replace(/\/$/, "");
    return (<>
          <strong>Link List</strong>
          <ul>
    <strong>Funnels</strong>
    {funnels.map(({name, data: { url }}, index) => (<li key={index}>
        {name} - <a href={`${trimmedLinkList}${url}`} target="_blank" rel="noreferrer">{trimmedLinkList}{url}</a>
    </li>))}
    <br />
    <strong>Sales Letters</strong>
    {salesLetters.map(({name, data: { url }}, index) => (<li key={index}>
      {name} - <a href={`${trimmedLinkList}${url}`} rel="noreferrer" target="_blank">{trimmedLinkList}{url}</a>
    </li>))}
    </ul>
    </>);
    }
  };

const TrContainer = (props) => {
const {name, data, id: pageId } = props;
const { url } = data;
const productsId = data?.products?.id;
const productsDataId = data?.products?.value?.name;

  return <tr>
  <td width="40%">{name}</td>
  <td width="7%" align="center" style={{ fontSize: '10px', display: (tableBuilder ? 'table-cell' : 'none') }}>
    <a href={`https://builder.io/content/${pageId}`} rel="noreferrer" target="_blank">Edit Page</a> &middot;
    <a href={`https://builder.io/content/${productsId}`} rel="noreferrer" target="_blank">Edit Product</a>
  </td>
  <td width="5%" align="center" style={{ display: (tableStaging ? 'table-cell' : 'none') }}><a href={`https://staging-builder-gatsby-funnel.netlify.app${url}`} rel="noreferrer" target="_blank">Staging</a></td>
  <td width="5%" align="center" style={{ display: (tableLive ? 'table-cell' : 'none') }}><a href={`https://offer.thepetlabco.com${url}`} rel="noreferrer" target="_blank">Live</a></td> 
  <td width="5%" align="center" style={{ display: (tableLocal ? 'table-cell' : 'none') }}><a href={`${url}`} rel="noreferrer" target="_blank">Local</a></td>
  <td width="10%" align="left" style={{ display: (tableProductSelector ? 'table-cell' : 'none'),wordBreak: 'break-all' }}><small><a href={`/devtools/funnel-data?path=${url}`} rel="noreferrer" target="_blank">{productsDataId}</a></small></td>
  <td width="40%" align="left" style={{ display: (tableData ? 'table-cell' : 'none') }}><ShowVariableContainer {...data} /></td>
</tr>

};

const ListForm = () => {
  return (<div>
    <input onKeyUp={showList} placeholder="Enter Address Here" type="text" style={{ width: `90%`, padding: 10, margin: 10 }} />
    </div>)
}

const thStyles = { position: 'sticky', top: 0,  backgroundColor: '#CCC' };
 
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
    {salesLetters?.map((item) => {
        return <option value={item.data.url} key={`salesLetter-${item.id}`}>{item.data.url}</option>
      }
    )}
    {slides?.map((item) => {
        return <option value={item.data.url} key={`slide-${item.id}`}>{item.data.url}</option>
      }
    )}
    {quizzes?.map((item) => {
        return <option value={item.data.url} key={`quiz-${item.id}`}>{item.data.url}</option>
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
    ].map((option) => {
        return <option value={option} key={option}>{option}</option>
    }
    )}
  </select>
};

const ShowVariableContainer = (props) => {
  const { url, products, tags } = props;
  const { value: { data: ProductData } } = products;
  const funnelData = allFunnelPageData.filter(n => n.path === url);
  const productSelector = funnelData[0]?.productSelector;

  switch(showVariable) {
    case 'store':
      return ProductData.store;
    case 'expedited_delivery_price':
      return ProductData.extra?.expedited_delivery_price || ``;
    case 'expedited_delivery':
      return (ProductData.extra?.expedited_delivery ? `true` : `false` ) || `false`;
    case 'rebrand_styling':
      return (ProductData.extra?.rebrand_styling ? `true` : `false` ) || `false`;
    case 'klaviyo':
      return ProductData.extra.klaviyo_list || ``;
    case 'pixel_ids':
      return ProductData.extra.pixel_ids || ``;
    case 'upsell':
      return <a href={`${ProductData.upsellUrl}/replace-with-actual-token`} rel="noreferrer" target="_blank">{ProductData.upsellUrl}</a>;
    case 'otp-variant-ids':
      let OTPVariantIds = [];
      const OTPVariantIds1 = ProductData?.onetime?.productItems;
      OTPVariantIds1.map(item => {
        if( item ) {
          OTPVariantIds.push(item?.product?.id);
        }
        return item;
      });
      return OTPVariantIds.map((item,index) => (<div key={index}><small><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item}`}>Product Variant {index}</a> </small></div>))
    case 'otp-prices':
      const prices = productSelector?.onetime?.products.map(item => {
        if( item?.checkoutData ) {
          return item?.checkoutData;
        } else {
          return {
            discounted_price: 0,
            perceived_rrp: 0,
            price: 0
          }
        }
      });
      return prices.map((item,index) => (<div key={index}><small> {index}: DP: <strong>{item.discounted_price.toFixed(2)}</strong> PRRP: <strong>{item.perceived_rrp.toFixed(2)} ({(100 * (1 - (item.discounted_price / item.perceived_rrp))).toFixed(2)}%)</strong> RRP: <strong>{item.price.toFixed(2)} ({(100 * (1 - (item.discounted_price / item.price))).toFixed(2)}%)</strong></small></div>))
    case 'otp-free-gifts':
        return ProductData?.onetime?.productItems.map((item,index) => {
          if( item.freeGift.id !== `` ) {
            return (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item.freeGift.id}`}>Free Gift {index}</a> </small>);
          } else {
            return '';
          }
        });
    case 'otp-discount-codes':
      let OTPdiscountCodes = [];
      const discountCodes2 = ProductData?.onetime?.discountCodes;
      discountCodes2.map(code => {
        if( code ) {
          OTPdiscountCodes.push(code.code);
        }
        return code;
      });
      return OTPdiscountCodes.join(",");
    case 'otp-bump-offer':
      const OTPBumpOffer = ProductData?.onetime?.bumpOffer;
      return OTPBumpOffer.map((item,index) => (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item?.product?.item?.id}`}>Variant {index} ({item?.product?.discountCode})</a> </small>))
    case 'sub-variant-ids':
          let SUBVariantIds = [];
          const SUBVariantIds1 = ProductData?.subscription?.productItems;
          SUBVariantIds1.map(item => {
            if( item ) {
              SUBVariantIds.push(item?.product?.id);
            }
            return item;
          });
          return SUBVariantIds.map((item,index) => (<><small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item}`}>Product Variant {index}</a> </small><br /></>))
    case 'sub-prices':
      const subprices = productSelector?.subscription?.products.map(item => {
        if( item?.checkoutData ) {
          return item?.checkoutData;
        } else {
          return {
            discounted_price: 0,
            perceived_rrp: 0,
            price: 0
          }
        }
      });
      return subprices.map((item,index) => (<div key={index}><small> {index}: DP: <strong>{item.discounted_price.toFixed(2)}</strong> PRRP: <strong>{item.perceived_rrp.toFixed(2)} ({(100 * (1 - (item.discounted_price / item.perceived_rrp))).toFixed(2)}%)</strong> RRP: <strong>{item.price.toFixed(2)} ({(100 * (1 - (item.discounted_price / item.price))).toFixed(2)}%)</strong></small></div>))
    case 'sub-free-gifts':
      return ProductData?.subscription?.productItems.map((item,index) => {
        if( item.freeGift.id !== `` ) {
          return (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item.freeGift.id}`}>Free Gift {index}</a> </small>);
        } else {
          return '';
        }
      });
    case 'sub-discount-codes':
      let SUBdiscountCodes = [];
      const discountCodes1 = ProductData?.subscription?.discountCodes;
      discountCodes1.map(code => {
        if( code ) {
          SUBdiscountCodes.push(code.code);
        }
        return code;
      });
      return SUBdiscountCodes.join(",");
    case 'sub-bump-offer':
      const SUBBumpOffer = ProductData?.subscription?.bumpOffer;
      return SUBBumpOffer.map((item,index) => (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item?.product?.item?.id}`}>Variant {index} ({item?.product?.discountCode})</a> </small>))
    case 'currency':
      return `${ProductData.currency.code} (${ProductData.currency.symbol})`;
    case 'tags':
      return (tags) ? tags : ``;
    default:
      return url;
  } 
};
 
const filterFunction = (item) => {

  switch(filterBy) {
    case 'rebrand_styling':
        return item.data.products.value.data.extra?.rebrand_styling ? true : false;
    case 'pathname':
      return item.data.url === filterByPathname ? true : false;
    case 'design':
      return item.data.design === filterByDesign ? true : false;
    case 'tag':
      return item?.data?.tags?.includes(filterByTag);
    default:
      return true;
  }
};

const sortFunction = (a,b) => {
  switch(sortBy) {
    case 'name-asc':
      if ( a.name < b.name ){
        return -1;
      }
      if ( a.name > b.name ){
        return 1;
      }
      return 0;
    case 'name-desc':
      if ( a.name < b.name ){
        return 1;
      }
      if ( a.name > b.name ){
        return -1;
      }
      return 0;
    case 'pathname-asc':
      if ( a.data.url < b.data.url ){
        return -1;
      }
      if ( a.data.url > b.data.url ){
        return 1;
      }
      return 0;
    case 'pathname-desc':
      if ( a.data.url < b.data.url ){
        return 1;
      }
      if ( a.data.url > b.data.url ){
        return -1;
      }
      return 0;
    case 'klaviyo-asc':
        if ( a.data.products.value.data.extra.klaviyo_list < b.data.products.value.data.extra.klaviyo_list ) {
          return -1;
        }
        if ( a.data.products.value.data.extra.klaviyo_list > b.data.products.value.data.extra.klaviyo_list ) {
          return 1;
        }
        return 0;
    case 'klaviyo-desc':
        if ( a.data.products.value.data.extra.klaviyo_list < b.data.products.value.data.extra.klaviyo_list ) {
          return 1;
        }
        if ( a.data.products.value.data.extra.klaviyo_list > b.data.products.value.data.extra.klaviyo_list ) {
          return -1;
        }
        return 0;
    case 'upsell-asc':
          if ( a.data.products.value.data.upsellUrl < b.data.products.value.data.upsellUrl ) {
            return -1;
          }
          if ( a.data.products.value.data.upsellUrl > b.data.products.value.data.upsellUrl ) {
            return 1;
          }
          return 0;
    case 'upsell-desc':
            if ( a.data.products.value.data.upsellUrl < b.data.products.value.data.upsellUrl ) {
              return 1;
            }
            if ( a.data.products.value.data.upsellUrl > b.data.products.value.data.upsellUrl ) {
              return -1;
            }
            return 0;
    default:
      return 0;
  }
}

const THeadContainer = () => {
  return    <thead>
  <tr>
 <th style={thStyles} width="35%" align="left">
   <strong>Funnels</strong>
   <SelectSort />
   <SelectFilter />
   <SelectFilterByPathname />
   <SelectFilterByDesign />
   <SelectFilterByTag />
 </th>
 <th style={{ display: (tableBuilder ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong>Builder</strong>
 <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableBuilder(false)}>x</button>
 </th>
 <th style={{ display: (tableStaging ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong>Staging</strong>
 <button style={{ color: 'red', cursor: 'pointer', float: 'right', marginRight: 5 }} onClick={() => setTableStaging(false)}>x</button>
 </th>
 <th style={{ display: (tableLive ? 'table-cell' : 'none'), ...thStyles }} width="5%" align="center"><strong>Live</strong>
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
  </thead>
};

const ShowHiddenColumnsContainer = () => {
  return    <>
 <div style={{textAlign: 'center'}}>

 <button style={{ display: (!tableBuilder ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableBuilder(true)}>Show Builder</button>
 
 <button style={{ display: (!tableStaging ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableStaging(true)}>Show Staging</button>

 <button style={{ display: (!tableLive ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableLive(true)}>Show Live</button>

 <button style={{ display: (!tableLocal ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableLocal(true)}>Show Local</button>

 <button style={{ display: (!tableProductSelector ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableProductSelector(true)}>Show Product Selector</button>
 
 <button style={{ display: (!tableData ? 'inline-block' : 'none'), color: 'green', cursor: 'pointer', fontSize: 10, marginRight: 20 }} onClick={() => setTableData(true)}>Show Data</button>

 </div>

</>
};
  
    return (<div style={{ padding: 20 }}>
      <ListForm />
      <LinkListContainer />
  <ShowHiddenColumnsContainer />
 <table border="1" cellPadding="2" cellSpacing="0" style={{ width: '100%', border: '1px solid #000' }}>
    <THeadContainer />
   <tbody>
    
    {funnels.filter(filterFunction).sort(sortFunction).map((props, index) => <TrContainer {...props} key={index} />)}
    
    <tr>
      <td colSpan="7">
      <br /><strong>Sales Letters</strong>
      </td>
    </tr>
    {salesLetters.filter(filterFunction).sort(sortFunction).map((props, index) => <TrContainer {...props} key={index} />)}
    
    <tr>
      <td colSpan="7">
      <br /><strong>Slides</strong>
      </td>
    </tr>
    {slides.filter(filterFunction).sort(sortFunction).map((props, index) => <TrContainer {...props} key={index} />)}
    
    <tr>
      <td colSpan="7">
      <br /><strong>Quizzes</strong>
      </td>
    </tr>
    {quizzes.filter(filterFunction).sort(sortFunction).map((props, index) => <TrContainer {...props} key={index} />)}
    
    
    </tbody>
    </table>
<Helmet>
  <title>Petlab Developer Tools</title>
</Helmet>
    </div>);
  
};

export default FunnelsList;

export const query = graphql`
query FunnelsList {
  allBuilderModels {
    funnel(limit: 100, options: {includeRefs: true}) {
      id
      data {
        url
        products
        tags
        design
      }
      name
    }
    salesLetter(limit: 100, options: {includeRefs: true}) {
      id
      data {
        url
        products
        design
      }
      name
    }
    slide(limit: 100, options: {includeRefs: true}) {
      data {
        url
        products
      }
      name
    }
    quiz(limit: 100, options: {includeRefs: true}) {
      data {
        url
        products
      }
      name
    }
  }

  allFunnelPageData {
    nodes {
      path
      productSelector {
        upsell
        store
        currency {
          code
          symbol
        }
        extra
        onetime {
          discounts
          bumpoffers {
            checkoutData {
              country
              discounted_price
              image
              price
              perceived_rrp
              product_id
              quantity
              splitFlag
              split_price
              title
              title_index
              variant_id
            }
            data {
              checkoutTitle
              quantity
              variantId
            }
            discount_percentage
            display_title
            productRef {
              checkoutTitle
              discountPercentage
              displayTitle
              product {
                discountCode
              }
            }
            name
          }
          products {
            checkoutData {
              country
              discounted_price
              image
              price
              perceived_rrp
              product_id
              quantity
              splitFlag
              split_price
              title
              title_index
              variant_id
            }
            data {
              checkoutTitle
              quantity
              variantId
            }
            display_title
            discount_percentage
            freeGiftData {
              quantity
              variantId
            }
            free_gift_discount_code
            name
            productRef {
              checkoutTitle
              discountCode
              discountPercentage
              displayTitle
            }
          }
        }
        subscription {
          bumpoffers {
            checkoutData {
              discounted_price
              country
              image
              price
              perceived_rrp
              product_id
              quantity
              split_price
              splitFlag
              title
              title_index
              variant_id
            }
            data {
              checkoutTitle
              quantity
              variantId
            }
            discount_percentage
            display_title
            name
            productRef {
              checkoutTitle
              discountPercentage
              displayTitle
              product {
                discountCode
              }
            }
          }
          products {
            checkoutData {
              country
              discounted_price
              image
              price
              perceived_rrp
              product_id
              quantity
              splitFlag
              split_price
              title
              title_index
              variant_id
            }
            data {
              checkoutTitle
              quantity
              variantId
            }
            discount_percentage
            display_title
            freeGiftData {
              quantity
              variantId
            }
            free_gift_discount_code
            name
            productRef {
              checkoutTitle
              discountCode
              discountPercentage
              displayTitle
              freeGiftDiscountCode
            }
          }
          discounts
        }
      }
    }
  }

}
`
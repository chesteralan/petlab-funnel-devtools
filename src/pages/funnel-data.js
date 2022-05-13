import React from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import TopNav from '../components/TopNav/TopNav';
import RefreshDataButton from '../components/RefreshDataButton/RefreshDataButton';
import '../css/common.css';

const DataList = (props) => {

    const { allFunnelPageData: { nodes } } = props;

    return (<>
    <Helmet>
    <title>Petlab - Builder - Developer Tools</title>
</Helmet>
    
<div style={{ padding: 20 }}>
    <RefreshDataButton />
    <TopNav active="product-selectors" />
    <br />
    <br />
    <strong>Data List</strong>
    <ul>
    {nodes.map(({ path }, index) => {
        return <li key={index}><a 
        href={`/devtools/funnel-data?path=${path}`}
        >{path}</a></li>
    })}
    </ul>
    </div></>)
}

const LoopObject = ({ items }) => {
  if( items ) {
  switch(typeof items) {
     case 'object':
       const itemsToArray = Object.entries(items);
       if( !itemsToArray )  {
         return ``;
       } else {
      return (<table width="100%" border="1" cellPadding="5" cellSpacing="0">
      <tbody>
    {itemsToArray.map(([key,item],index) => (<tr key={index}>
      <td valign="top" style={{ backgroundColor: 'white'}}><strong>{key}</strong></td>
      <td align="right" style={{ backgroundColor: '#f1f1f16b'}}>
        <LoopObject items={item} />
      </td>
    </tr>))}
    </tbody>
  </table>)
       }
       case 'string':
       case 'number':
         return items;
  default:
    return ``;
  }
} else {
  return ``;
}
}

const ExtraData = (props) => {
    return <div><strong>Extra:</strong>
    <LoopObject items={props} />
    </div>
}

const Discounts = (props) => {
  return <div><strong>Discounts:</strong>
  <LoopObject items={props} />
  </div>
}

const BumpOffers = (props) => {
    return <div><strong>Bump Offers:</strong>
    <LoopObject items={props} />
    </div>
}

const Products = (props) => {
  return <div><strong>Products:</strong>
  <LoopObject items={props} />
  </div>
}

const FilteredData = (props) => {
 
    const [{ path, productSelector: { extra, onetime, subscription, upsell, store, currency } }] = props;
    
    console.log("extra:", extra);
    console.log("onetime:", onetime);
    console.log("subscription:", subscription);

    return (<div style={{ padding: 20 }}>
    <RefreshDataButton />
    <TopNav active="product-selectors" />
    <p><strong><a href="/devtools/funnel-data">Back to Data List</a></strong></p>
    <p><strong>Note:</strong> You can also view in the console.</p>
    <h1 style={{ textAlign: 'center' }}>{path}</h1>
    <hr />
    <p><strong>Store URL</strong>: {store}</p> 
    <p><strong>Upsell URL:</strong> {upsell}</p> 
    <p><strong>Currency:</strong> {currency.code} - {currency.symbol}</p> 
    <hr />
    <h4>SUBSCRIPTION</h4>
    <Products {...subscription?.products} />
    <Discounts {...subscription?.discounts} />
    <BumpOffers {...subscription?.bumpoffers} />
    <hr />
    <h4>ONE TIME</h4>
    <Products {...onetime?.products} />
    <Discounts {...onetime?.discounts} />
    <BumpOffers {...onetime?.bumpoffers} />
    <hr />
    <ExtraData {...JSON.parse(extra)} />
<Helmet>
  <title>Petlab Developer Tools</title>
</Helmet>
    </div>)
}

const FunnelData = (props) => {

    const { data } = props;

    const [path, setPath] = React.useState('');

    React.useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const pathParam = urlParams.get('path');
      return setPath(pathParam);
    },[setPath])
    
    if( path ) {
        const funnelData = data?.allFunnelPageData?.nodes.filter(n => n.path === path);
        return <FilteredData {...funnelData} />
    } else {
        return <DataList {...data} />
    }
  
};

export default FunnelData;

export const query = graphql`
query FunnelsData {
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
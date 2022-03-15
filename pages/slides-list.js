import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useLocalStorage from '../hooks/useLocalStorage';
import { graphql } from 'gatsby';
import '../css/common.css';

// funnel components
import TrContainer from '../components/Funnels/TrContainer';
import LinkListContainer from '../components/Funnels/LinkListContainer';
import THeadContainer from '../components/Funnels/THeadContainer';
import ShowHiddenColumnsContainer from '../components/Funnels/ShowHiddenColumnsContainer';
import ListForm from '../components/Funnels/ListForm';
import RefreshDataButton from '../components/RefreshDataButton/RefreshDataButton';
import TopNav from '../components/TopNav/TopNav';
import PasswordInput from '../components/PasswordInput/PasswordInput';


// funnel helpers 
import { filterFunction, sortFunction } from '../components/Funnels/helpers';


const FunnelsList = (props) => {

  const FUNNEL_ROOT_URL_LIVE = process.env.GATSBY_FUNNEL_ROOT_URL_LIVE ?? 'https://offer.thepetlabco.com';
  const FUNNEL_ROOT_URL_STAGING = process.env.GATSBY_FUNNEL_ROOT_URL_STAGING ?? 'https://staging-builder-gatsby-funnel.netlify.app';
  
  const [ password ] = useLocalStorage("PETLAB_BUILDER_DEVTOOLS_PASSWORD", "");

  const [linkList, setLinkList] = useState('');
  const [linkListQuery, setLinkListQuery] = useState('');
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
  const [showLiveUrl, setShowLiveUrl] = useState(false);
  const [showStagingUrl, setShowStagingUrl] = useState(false);

  const funnels = props.data.allBuilderModels.slide;
  const allFunnelPageData = props.data.allFunnelPageData.nodes;

  const STATES = {
    FUNNEL_ROOT_URL_LIVE,
    FUNNEL_ROOT_URL_STAGING,
    funnels,
    allFunnelPageData,
    linkList, setLinkList,
    linkListQuery, setLinkListQuery,
    sortBy, setSortBy,
    filterBy, setFilterBy,
    filterByPathname, setFilterByPathname,
    filterByDesign, setFilterByDesign,
    filterByTag, setFilterByTag,
    showVariable, setShowVariable,
    tableBuilder, setTableBuilder,
    tableStaging, setTableStaging,
    tableLive, setTableLive,
    tableLocal, setTableLocal,
    tableData, setTableData,
    tableProductSelector, setTableProductSelector,
    showLiveUrl, setShowLiveUrl,
    showStagingUrl, setShowStagingUrl,
  };

    return <>{( (password?.length > 0) && (password === process.env.GATSBY_DEVTOOLS_PASSWORD) ) ? (<div style={{ padding: 20 }}>
      <RefreshDataButton />
      <TopNav active="slides" />
      <ListForm {...STATES} />
      <LinkListContainer {...STATES} />
      <ShowHiddenColumnsContainer {...STATES} />
 <table border="1" cellPadding="2" cellSpacing="0" style={{ width: '100%', border: '1px solid #000' }} id="devtools-funnels-table">
    <THeadContainer {...STATES} />
   <tbody>
   {funnels.filter((item) => filterFunction(item, STATES)).sort((a,b) => sortFunction(a,b,STATES)).map((funnel, index) => <TrContainer funnel={funnel} {...STATES} key={index} />)}
    </tbody>
    </table>
    </div>) : <PasswordInput />}
    <Helmet>
      <title>Petlab - Builder - Developer Tools</title>
    </Helmet>
    </>
};

export default FunnelsList;

export const query = graphql`
query {
  allBuilderModels {
    slide(options: { cacheSeconds: 2, staleCacheSeconds: 2, includeRefs: true }) {
      id
      name
      data {
        products
        url
      }
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
`;
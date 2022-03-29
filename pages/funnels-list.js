import React from 'react';
import { Helmet } from 'react-helmet';
import useLocalStorage from '../hooks/useLocalStorage';
import { graphql } from 'gatsby';
import '../css/common.css';

// funnel components
import TrContainer from '../components/TrContainer/TrContainer';
import LinkListContainer from '../components/LinkListContainer/LinkListContainer';
import THeadContainer from '../components/THeadContainer/THeadContainer';
import ShowHiddenColumnsContainer from '../components/ShowHiddenColumnsContainer/ShowHiddenColumnsContainer';
import ListForm from '../components/ListForm/ListForm';
import RefreshDataButton from '../components/RefreshDataButton/RefreshDataButton';
import TopNav from '../components/TopNav/TopNav';
import PasswordInput from '../components/PasswordInput/PasswordInput';

// funnel helpers 
import { filterFunction, sortFunction } from '../utils/helpers';
import Pages from '../components/Pages/Pages';


const FunnelsList = (props) => {

  const FUNNEL_ROOT_URL_LIVE = process.env.GATSBY_FUNNEL_ROOT_URL_LIVE ?? 'https://offer.thepetlabco.com';
  const FUNNEL_ROOT_URL_STAGING = process.env.GATSBY_FUNNEL_ROOT_URL_STAGING ?? 'https://staging-builder-gatsby-funnel.netlify.app';
  
  const [ password ] = useLocalStorage("PETLAB_BUILDER_DEVTOOLS_PASSWORD", "");

  const [linkList, setLinkList] = useLocalStorage('link-list','');
  const [linkListQuery, setLinkListQuery] = useLocalStorage('link-list-query','');
  const [sortBy, setSortBy] = useLocalStorage('sort-by','none');
  const [filterBy, setFilterBy] = useLocalStorage('filter-by','none');
  const [filterByPathname, setFilterByPathname] = useLocalStorage('filter-by-pathname','');
  const [filterByDesign, setFilterByDesign] = useLocalStorage('filter-by-design','design2');
  const [filterByTag, setFilterByTag] = useLocalStorage('filter-by-tag','Control');
  const [showVariable, setShowVariable] = useLocalStorage('show-variable','pathname');
  const [tableBuilder, setTableBuilder] = useLocalStorage('table-builder',true);
  const [tableStaging, setTableStaging] = useLocalStorage('table-staging',false);
  const [tableLive, setTableLive] = useLocalStorage('table-live',true);
  const [tableLocal, setTableLocal] = useLocalStorage('table-local',true);
  const [tableData, setTableData] = useLocalStorage('table-data',true);
  const [tableProductSelector, setTableProductSelector] = useLocalStorage('table-product-selector',false);
  const [showLiveUrl, setShowLiveUrl] = useLocalStorage('table-live-url',false);
  const [showStagingUrl, setShowStagingUrl] = useLocalStorage('table-staging-url',false);

  const funnels = props.data.allBuilderModels.funnel;
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

    return <>{((password?.length > 0) && (password === process.env.GATSBY_DEVTOOLS_PASSWORD) ) ? (<div style={{ padding: 20 }}>
      <RefreshDataButton />
      <RebuildSiteButton />
      <TopNav active="funnels" />
      <ListForm {...STATES} />
      <LinkListContainer {...STATES} />
      <ShowHiddenColumnsContainer {...STATES} />
 <table border="1" cellPadding="2" cellSpacing="0" style={{ width: '100%', border: '1px solid #000' }} id="devtools-funnels-table">
    <THeadContainer {...STATES} />
   <tbody>
   {funnels && funnels.filter((item) => filterFunction(item, STATES)).sort((a,b) => sortFunction(a,b,STATES)).map((funnel, index) => <TrContainer funnel={funnel} {...STATES} key={index} />)}
    </tbody>
    </table>
    <Pages {...props.pageContext} pathPrefix={`/devtools/funnels-list`} />
    </div>) : <PasswordInput />}
    <Helmet>
      <title>Petlab - Builder - Developer Tools</title>
    </Helmet>
    </>
};

export default FunnelsList;

export const query = graphql`
query ($limit: Int = 50, $offset: Int = 0) {
  allBuilderModels {
    funnel( 
      options: { cacheSeconds: 2, staleCacheSeconds: 2, includeRefs: true }
      limit: $limit
      offset: $offset
      ) {
      id
      name
      data {
        products
        settings
        tags
        url
        siteMeta
        design
        currentCategory
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
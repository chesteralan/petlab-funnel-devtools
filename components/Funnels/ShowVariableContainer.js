import React from 'react'

const ShowVariableContainer = (props) => {
    const { funnel, ...rest } = props;
    const { allFunnelPageData, showVariable } = rest;
    const {
        data, 
    } = funnel;
    const { url, products, tags } = data;
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
      case 'upsell-extra':
        return <a href={`${ProductData.extra.upsell_url}/replace-with-actual-token`} rel="noreferrer" target="_blank">{ProductData.extra.upsell_url}</a>;
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
              return (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item.freeGift.id}`}>Free Gift {index} ({parseFloat(item.freeGiftValue).toFixed(2)})</a> </small>);
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
            console.log(ProductData);
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
            return (<small key={index}><a rel="noreferrer" target="_blank" href={`https://builder.io/content/${item.freeGift.id}`}>Free Gift {index} ({parseFloat(item.freeGiftValue).toFixed(2)})</a> </small>);
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
      case 'extra':
        return (productSelector?.extra) ? productSelector?.extra : ``;
      case 'rebill_discount':
        return ProductData.extra.rebill_discount || ``;
      case 'higher_initial_discount':
        return ProductData.extra.higher_initial_discount || ``;
      default:
        return url;
    } 
  };

export default ShowVariableContainer
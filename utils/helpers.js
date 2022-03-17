
const filterFunction = (item, STATES) => {
   
    const {
        filterBy,
        filterByPathname,
        filterByDesign,
        filterByTag
    } = STATES;

    let hasGift = false;
    let productItems;

    switch(filterBy) {
      case 'rebrand_styling':
          return item.data.products.value.data.extra?.rebrand_styling ? true : false;
      case 'pathname':
        return item.data.url === filterByPathname ? true : false;
      case 'design':
        return item.data.design === filterByDesign ? true : false;
      case 'tag':
        return item?.data?.tags?.includes(filterByTag);
      case 'sub-free-gift':
        productItems = item.data.products.value.data.subscription.productItems;
        productItems.map((item) => {
          if(item.freeGift.id !== "") {
            hasGift = true;
          }
          return item;
        });
        return hasGift;
      case 'otp-free-gift':
          productItems = item.data.products.value.data.onetime.productItems;
          hasGift = false;
          productItems.map((item) => {
            if(item.freeGift.id !== "") {
              hasGift = true;
            }
            return item;
          });
          return hasGift;
      default:
        return true;
    }
  };
  
const sortFunction = (a,b,STATES) => {

    const { sortBy } = STATES;
    
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

export { filterFunction, sortFunction }
exports.createPages = async function ({ graphql, actions }) {
   const path = require('path');

   const fetchFunnelData = async (model="funnel",offset=0,limit=25) => {
    const results = await graphql(`
    query {
      allBuilderModels {
        ${model}(limit: ${limit}, offset: ${offset}, options: { cacheSeconds: 2, staleCacheSeconds: 2 }) {
          id
        }
      }
    }
  `);
    
    return results.data['allBuilderModels'][model];

 }

 const fetchFunnels = async (model="funnel",limit=25) => {
  let fetching = true;
  let offset = 0;
  let pages = [];
  while(fetching) {
    await fetchFunnelData(model,offset,limit)
    .then((data) => {
        if( data ) {
          if( data.length > 0 ) {
            pages.push({
              fetching: fetching,
              offset: offset,
              limit: limit
            })
          }
          if( data.length < limit ) {
              fetching = false;
          }
        } else {
          fetching = false;
        }
    });
    offset = offset + limit;
  }
  return pages;
}

const resultsLimit = 50;

await fetchFunnels("funnel",resultsLimit).then((pages) => {
  pages.map(({ limit, offset, fetching }) => {
    const slug = (offset > 0) ? `/devtools/funnels-list-${offset}-${limit}` : `/devtools/funnels-list`;
    actions.createPage({
      path: slug,
      component: path.resolve(`${__dirname}/pages/funnels-list.js`),
      context: { 
        devtools_shortcuts: false,
        offset: offset,
        limit: limit,
        fetching: fetching,
        pages: pages,
      },
    });
  })
});

await fetchFunnels("salesLetter",resultsLimit).then((pages) => {
  pages.map(({ limit, offset, fetching }) => {
    const slug = (offset > 0) ? `/devtools/salesletters-list-${offset}-${limit}` : `/devtools/salesletters-list`;
    actions.createPage({
      path: slug,
      component: path.resolve(`${__dirname}/pages/salesletters-list.js`),
      context: { 
        devtools_shortcuts: false,
        offset: offset,
        limit: limit,
        fetching: fetching,
        pages: pages,
      },
    });
  })
});

await fetchFunnels("quiz",resultsLimit).then((pages) => {
  pages.map(({ limit, offset, fetching }) => {
    const slug = (offset > 0) ? `/devtools/quizzes-list-${offset}-${limit}` : `/devtools/quizzes-list`;
    actions.createPage({
      path: slug,
      component: path.resolve(`${__dirname}/pages/quizzes-list.js`),
      context: { 
        devtools_shortcuts: false,
        offset: offset,
        limit: limit,
        fetching: fetching,
        pages: pages,
      },
    });
  })
});

await fetchFunnels("slide",resultsLimit).then((pages) => {
  pages.map(({ limit, offset, fetching }) => {
    const slug = (offset > 0) ? `/devtools/slides-list-${offset}-${limit}` : `/devtools/slides-list`;
    actions.createPage({
      path: slug,
      component: path.resolve(`${__dirname}/pages/slides-list.js`),
      context: { 
        devtools_shortcuts: false,
        offset: offset,
        limit: limit,
        fetching: fetching,
        pages: pages,
      },
    });
  })
});



    actions.createPage({
      path: '/devtools/funnel-data',
      component: path.resolve(`${__dirname}/pages/funnel-data.js`),
      context: { 
        devtools_shortcuts: false
      },
    })

}


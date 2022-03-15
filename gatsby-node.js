
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: '/\.(js|jsx)$/',
        }
      ],
    },
  })
}

exports.createPages = async function ({ graphql, actions }) {
   const path = require('path');

   const resultsLimit = 50;

   const fetchFunnelData = async (offset=0) => {
    const results = await graphql(`
    query {
      allBuilderModels {
        funnel(limit: ${resultsLimit}, offset: ${offset}, options: { cacheSeconds: 2, staleCacheSeconds: 2 }) {
          id
        }
      }
    }
  `);
    
    return results.data['allBuilderModels']['funnel'];

 }

 const fetchFunnels = async () => {
  let fetching = true;
  let offset = 0;
  let pages = [];
  while(fetching) {
    await fetchFunnelData(offset)
    .then((data) => {
        if( data.length > 0 ) {
          pages.push({
            fetching: fetching,
            offset: offset,
            limit: resultsLimit
          })
        }
        if( data.length < resultsLimit ) {
            fetching = false;
        }
    });
    offset = offset + resultsLimit;
  }
  return pages;
}

await fetchFunnels().then((pages) => {
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

    actions.createPage({
      path: '/devtools/salesletters-list',
      component: path.resolve(`${__dirname}/pages/salesletters-list.js`),
      context: { 
        devtools_shortcuts: false
      },
    })

    actions.createPage({
      path: '/devtools/quizzes-list',
      component: path.resolve(`${__dirname}/pages/quizzes-list.js`),
      context: { 
        devtools_shortcuts: false
      },
    })

    actions.createPage({
      path: '/devtools/slides-list',
      component: path.resolve(`${__dirname}/pages/slides-list.js`),
      context: { 
        devtools_shortcuts: false
      },
    })

    actions.createPage({
      path: '/devtools/funnel-data',
      component: path.resolve(`${__dirname}/pages/funnel-data.js`),
      context: { 
        devtools_shortcuts: false
      },
    })
}


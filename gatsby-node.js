if( process.env.NODE_ENV === 'development' ) {

exports.createPages = async function ({ actions }) {

   const path = require('path');

    actions.createPage({
        path: '/devtools/funnels-list',
        component: path.resolve(`${__dirname}/funnels-list.js`),
        context: { slug: '/devtools/funnels-list' },
      })

    actions.createPage({
        path: '/devtools/funnel-data',
        component: path.resolve(`${__dirname}/funnel-data.js`),
        context: { slug: '/devtools/funnel-data' },
      })
}

}
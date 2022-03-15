import React from 'react'
import { Link } from 'gatsby'

export default function TopNav(props) {

  const active = props?.active ?? 'funnels';

  const links = [
    { id: 'funnels', label: 'Funnels', url: '/devtools/funnels-list', target: '_self' },
    { id: 'salesletters', label: 'Sales Letters', url: '/devtools/salesletters-list', target: '_self' },
    { id: 'quizzes', label: 'Quizzes', url: '/devtools/quizzes-list', target: '_self' },
    { id: 'slides', label: 'Slides', url: '/devtools/slides-list', target: '_self' },
    { id: 'product-selectors', label: 'Product Selectors', url: '/devtools/funnel-data', target: '_self' },
  ];

    return (
        <>
        {links.map((link) => {
          if( active === link.id ) {
            return <span key={link.id} style={{ padding: '0 20px' }}>{link.label}</span>
          } else {
            return <Link key={link.id} to={link.url} style={{ padding: '0 20px' }} target={link.target}>{link.label}</Link>
          }
        })}
    {( process.env.NODE_ENV === 'development' ) && <a href="/__graphql" target="__graphql" style={{ padding: '0 20px' }}>GraphQL</a>}
  </>
    )
}

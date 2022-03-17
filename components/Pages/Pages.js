import React from 'react'
import { Link } from 'gatsby'

const Pages = ({ pages, pathPrefix, offset: currentOffset }) => {

  const styles = { 
    marginTop: 10, 
    textAlign: 'center', 
    listStyle: "none",
    display: "flex", 
    flexDirection: "row",
    marginLeft: 0, 
    marginRight: 0, 
    padding: 0
  };

  
  return (<>
    {(pages.length > 1) && <ul style={styles}>
    {pages.map(({ limit, offset }, index) => {
        const path = (offset > 0) ? `${pathPrefix}-${offset}-${limit}` : pathPrefix;
        const itemStyles = {
          margin: "auto",
          
        };
        const linkStyles = {
         display: "block",
          padding: "2px 10px",
          fontSize: "12px",
          textDecoration: "none",
        };
        if(offset === currentOffset) {
          itemStyles.backgroundColor = "#ffe9e9";
          linkStyles.color = "black";
        } else {
          itemStyles.backgroundColor = "transparent";
          linkStyles.color = "black";
        }

    return <li key={index} style={itemStyles}>
        <Link to={path} style={linkStyles}>Page {index + 1}</Link> 
        </li>
    })}
    </ul>}
    </>
  )
}

export default Pages;
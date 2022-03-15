if( process.env.NODE_ENV === 'development' ) {

const React = require("react");
const axios = require("axios");

const ContainerStyles = {
    position: 'fixed',
    top: 200,
    right: 0,
    display: 'block',
    zIndex: 999,
}

const ContentStyles = {
    backgroundColor: 'white',
    border: '1px solid #000',
    borderRight: 0,
    fontSize: 18,
    padding: 5,
    lineHeight: 0,
    cursor: 'pointer',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.5,
    boxShadow: '0 0 10px 0 #000',
    display:'block',
    width: 20,
    margin: '5px 0',
}

const ConfigStyles = {
    backgroundColor: 'white',
    border: '1px solid #000',
    borderRight: 0,
    fontSize: 18,
    padding: 5,
    lineHeight: 0,
    cursor: 'pointer',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.5,
    boxShadow: '0 0 10px 0 #000',
    display:'block',
    width: 20,
    margin: '5px 0',
}

const RefreshStyles = {
    backgroundColor: 'white',
    border: '1px solid #000',
    borderRight: 0,
    fontSize: 18,
    padding: 5,
    lineHeight: 0,
    cursor: 'pointer',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    opacity: 0.5,
    boxShadow: '0 0 10px 0 #000',
    display:'block',
    width: 20,
    margin: '5px 0',
}

exports.wrapPageElement = ({ element, props }) => {

    const devtoolsShortcuts = props.pageContext?.devtools_shortcuts;
 
    if( devtoolsShortcuts === false ) {
        return <>{element}</>;
    }

    const allBuilderModels = props.data?.allBuilderModels ?? false;
    const { Builder } = require('@builder.io/react');

    if( Builder.isEditing ) {
        Object.assign(ContainerStyles, { display: 'none' });
    }

    const keys = Object.keys(allBuilderModels);
    const [funnel] = allBuilderModels[keys[0]];
    const funnelPath = funnel.content?.data.url;
    const funnelId = funnel.content?.id;
    const funnelProducts = funnel.content?.data.products;

    const handleRefreshPage = () => {
        axios.post("/__refresh", {}).then(() => {
            console.log("refreshing data...");
            window.location.reload();
        });
    }

    const FUNNEL_ROOT_URL_LIVE = process.env.GATSBY_FUNNEL_ROOT_URL_LIVE ?? 'https://offer.thepetlabco.com';

    return (
        <>
        {element}
        <div style={ContainerStyles}>
            <a style={ContentStyles} aria-label="Edit Content" href={`${FUNNEL_ROOT_URL_LIVE}${funnelPath}`} target="_blank" rel="noreferrer"><i className="fa fa-eye"></i></a>
            <a style={ContentStyles} aria-label="Edit Content" href={`https://builder.io/content/${funnelId}`} target="_blank" rel="noreferrer"><i className="fa fa-pencil"></i></a>
            <a style={ConfigStyles} aria-label="Edit Products" href={`https://builder.io/content/${funnelProducts?.id}`} target="_blank" rel="noreferrer"><i className="fa fa-cogs"></i></a>
            <button style={RefreshStyles} aria-label="Refresh Data" onClick={handleRefreshPage}><i className="fa fa-refresh" aria-hidden="true"></i></button>
        </div>
        </>
    )
};

}
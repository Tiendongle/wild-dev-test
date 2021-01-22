export const fetchAssets = ( url = 'http://ec2-35-166-253-114.us-west-2.compute.amazonaws.com/api') => {
    return fetch( url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: `{
                assets(volume: "sliderImages") {
                    url
                    ... on sliderImages_Asset {
                        id
                        caption
                        altText
                    }
                }
            }`
        }),
    })
    .then( response =>  response.json() )
    .then( json => {
        if ( json.errors ) return Promise.reject( json.errors );
        return json;
    })
};
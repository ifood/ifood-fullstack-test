
/**
 * Build a url with the given parameters as query string
 * @param {String} urlStr 
 * @param {String} baseUrl 
 * @param {*} params 
 */
export const buildUrl = (urlStr, baseUrl, params) => {
    let url = new URL(urlStr, baseUrl);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return url;
}
const getCurrentLanguage = () => {
    if (navigator.languages !== undefined) {
        return navigator.languages[0];
    }
    return navigator.language;
};

const formatCurrency = (number) => number.toLocaleString(getCurrentLanguage(), { style: 'currency', currency: 'USD' });

const formatDate = (value) => new Intl.DateTimeFormat(getCurrentLanguage()).format(new Date(value.split('+')[0]));

const objectToQuerystring = (obj) => {
    if (!obj) return '';
    return Object.keys(obj).reduce((str, key, i) => {
        const delimiter = (i === 0) ? '?' : '&';
        const newKey = encodeURIComponent(key);
        const val = encodeURIComponent(obj[newKey]);
        return [str, delimiter, newKey, '=', val].join('');
    }, '');
};

const CONSTANTS = {
    italian: 'Italian',
    default: 'default',
};

export { getCurrentLanguage, formatCurrency, formatDate, objectToQuerystring, CONSTANTS };

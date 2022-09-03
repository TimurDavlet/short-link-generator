const apiPath = 'http://79.143.31.216';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  statisticsPath: () => [apiPath, 'statistics?order=asc_short'].join('/'),
  registrPath: (name, pass) => [apiPath, `register?username=${name}&password=${pass}`].join('/'),
  squeeze: (link) => [apiPath, `squeeze?link=${encodeURIComponent(link)}`].join('/'),
  apiPath: () => apiPath,
};

export default routes;

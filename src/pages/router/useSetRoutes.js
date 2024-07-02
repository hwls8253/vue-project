export function useSetRoutes() {
  const setName = (namePrefix, pageName) => `${(typeof publishingPrefix === 'undefined') ? '' : publishingPrefix}${namePrefix}${pageName}`;
  const setPageNameClass = (namePrefix, str1) => `${namePrefix.toLowerCase()}-${str1.toLowerCase()}-wrap`;

  return {
    setName,
    setPageNameClass,
  };
}

export function routerMapper({ path, name, meta }) {
  return { path, name, meta };
}
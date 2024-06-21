import useSetRoutes from '&/guide/composables/useSetRoutes';

const path = 'pages';
const namePrefix = 'test';

const root = `/${path}/${namePrefix}/`;
const { setName, setPageNameClass } = useSetRoutes();

const routesBr = [
  {
    path: `${root}`,
    name: setName(namePrefix, 'Main'), // publishingPrMain
    meta: {
      layout: 'blank',
      wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
      containerClass: [],
    },
    component: () => import('&/pages/test.vue'),
  },
];
export default routesBr;

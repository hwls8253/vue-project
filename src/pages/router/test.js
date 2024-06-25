import useSetRoutes from '@/pages/router/useSetRoutes';

const path = 'pages';
const namePrefix = 'test';

const root = `/${path}/${namePrefix}/`;
const { setName, setPageNameClass } = useSetRoutes();

const test = [
  {
    path: `${root}`,
    name: setName(namePrefix, 'Main'), // publishingPrMain
    meta: {
      layout: 'blank',
      wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
      containerClass: [],
    },
    component: () => import('@/pages/circleButton.vue'),
  },
];
export default test;

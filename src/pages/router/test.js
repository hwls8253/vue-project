import useSetRoutes from '@/pages/router/useSetRoutes';

const path = 'pages';
const namePrefix = 'test';

const { setName, setPageNameClass } = useSetRoutes();

const test = [
  {
    path: `/${path}/circleButton/`,
    name: setName(namePrefix, 'Main'), // publishingPrMain
    meta: {
      layout: 'blank',
      wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
      containerClass: [],
    },
    component: () => import('@/pages/circleButton.vue'),
  },
  {
    path: `/${path}/cardSwiper/`,
    name: setName(namePrefix, 'Main'), // publishingPrMain
    meta: {
      layout: 'blank',
      wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
      containerClass: [],
    },
    component: () => import('@/pages/cardSwiper.vue'),
  },
  {
    path: `/${path}/lerp/`,
    name: setName(namePrefix, 'Main'), // publishingPrMain
    meta: {
      layout: 'blank',
      wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
      containerClass: [],
    },
    component: () => import('@/pages/lerp.vue'),
  },
];
export default test;

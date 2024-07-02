import { useSetRoutes, routerMapper } from '@/pages/router/useSetRoutes';

const path = 'pages';
const namePrefix = 'test';

const { setName, setPageNameClass } = useSetRoutes();

const test = [
  {
    ...routerMapper({
      path: `/${path}/circleButton/`,
      name: setName(namePrefix, 'Main'), // publishingPrMain
      meta: {
        layout: 'blank',
        wrapClass: [setPageNameClass(namePrefix, 'Main')], // pr-main
        containerClass: [],
      },
    }),
    component: () => import('@/pages/circleButton.vue'),
  },
  {
    ...routerMapper({
      path: `/${path}/cardSwiper/`,
      name: setName('aa', 'Main'), // publishingPrMain
      meta: {
        layout: 'blank',
        wrapClass: [setPageNameClass('aa', 'Main')], // pr-main
        containerClass: [],
      },
    }),
    component: () => import('@/pages/cardSwiper.vue'),
  },
  {
    ...routerMapper({
      path: `/${path}/lerp/`,
      name: setName('bb', 'Main'), // publishingPrMain
      meta: {
        layout: 'blank',
        wrapClass: [setPageNameClass('bb', 'Main')], // pr-main
        containerClass: [],
      },
    }),
    component: () => import('@/pages/lerp.vue'),
  },
];
export default test;

import { mergeDeep } from '../utils/merge-deep';
import { ConfigName } from '../interfaces/config-name.model';
import { Config } from '../interfaces/config.model';

const defaultConfig: Config = {
  id: ConfigName.apollo,
  name: 'Apollo',
  imgSrc: '//vex-landing.visurel.com/assets/img/layouts/apollo.png',
  layout: 'horizontal',
  boxed: false,
  sidenav: {
    title: 'VEX',
    imageUrl: 'assets/img/demo/logo.svg',
    showCollapsePin: true,
    state: 'expanded'
  },
  toolbar: {
    fixed: true
  },
  navbar: {
    position: 'below-toolbar'
  },
  footer: {
    visible: true,
    fixed: true
  }
};

export const configs: Config[] = [
  defaultConfig,
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.ares,
    name: 'Ares',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/ares.png',
    toolbar: {
      fixed: false
    },
    navbar: {
      position: 'in-toolbar'
    },
    footer: {
      fixed: false
    }
  }),
  mergeDeep({ ...defaultConfig }, {
    id: ConfigName.zeus,
    name: 'Zeus',
    imgSrc: '//vex-landing.visurel.com/assets/img/layouts/zeus.png',
    sidenav: {
      state: 'collapsed'
    },
  }),
];

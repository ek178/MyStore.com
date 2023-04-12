import { Icon } from '@visurel/iconify-angular';

export type NavigationItem = NavigationLink | NavigationDropdown | NavigationSubheading;

export interface NavigationLink {
  onlyAdmins?: boolean;
  type: 'link';
  route: string | any;
  fragment?: string;
  label: string;
  icon?: Icon;
  routerLinkActiveOptions?: { exact: boolean };
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationDropdown {
  onlyAdmins?: boolean;
  type: 'dropdown';
  label: string;
  icon?: Icon;
  children: Array<NavigationLink | NavigationDropdown>;
  badge?: {
    value: string;
    bgClass: string;
    textClass: string;
  };
}

export interface NavigationSubheading {
  onlyAdmins?: boolean;
  type: 'subheading';
  label: string;
  children: Array<NavigationLink | NavigationDropdown>;
}

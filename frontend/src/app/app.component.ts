import {Component, Inject, LOCALE_ID, Renderer2} from '@angular/core';
import {ConfigService} from '../@vex/services/config.service';
import {Settings} from 'luxon';
import {DOCUMENT} from '@angular/common';
import {Platform} from '@angular/cdk/platform';
import {NavigationService} from '../@vex/services/navigation.service';
import {LayoutService} from '../@vex/services/layout.service';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {SplashScreenService} from '../@vex/services/splash-screen.service';
import {Style, StyleService} from '../@vex/services/style.service';
import {ConfigName} from '../@vex/interfaces/config-name.model';
import {UsersService} from "./pages/my-shop/services/users.service";

@Component({
    selector: 'vex-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'star-link';

    constructor(private configService: ConfigService,
                private styleService: StyleService,
                private renderer: Renderer2,
                private platform: Platform,
                @Inject(DOCUMENT) private document: Document,
                @Inject(LOCALE_ID) private localeId: string,
                private layoutService: LayoutService,
                private route: ActivatedRoute,
                private navigationService: NavigationService,
                private splashScreenService: SplashScreenService,
                private usersService: UsersService) {
        Settings.defaultLocale = this.localeId;


        if (this.platform.BLINK) {
            this.renderer.addClass(this.document.body, 'is-blink');
        }


        /**
         * Customize the template to your needs with the ConfigService
         * Example:
         *  this.configService.updateConfig({
         *    sidenav: {
         *      title: 'Custom App',
         *      imageUrl: '//placehold.it/100x100',
         *      showCollapsePin: false
         *    },
         *    footer: {
         *      visible: false
         *    }
         *  });
         */

        /**
         * Config Related Subscriptions
         * You can remove this if you don't need the functionality of being able to enable specific configs with queryParams
         * Example: example.com/?layout=apollo&style=default
         */

        this.document.body.dir = 'rtl';


        this.route.queryParamMap.pipe(
            filter(queryParamMap => queryParamMap.has('layout'))
        ).subscribe(queryParamMap => this.configService.setConfig(queryParamMap.get('layout') as ConfigName));

        this.route.queryParamMap.pipe(
            filter(queryParamMap => queryParamMap.has('style'))
        ).subscribe(queryParamMap => this.styleService.setStyle(queryParamMap.get('style') as Style));


        /**
         * Add your own routes here
         */
        this.navigationService.items = [
            {
                type: 'dropdown',
                label: 'The Shop',
                children: [
                    {
                        type: 'link',
                        label: 'Home',
                        route: '/',
                    },
                    {
                        type: 'link',
                        label: 'Complete Payment',
                        route: '/payment',
                    },
                ],
            },
            {
                type: 'dropdown',
                label: 'My Profile',
                children: [
                    {
                        type: 'link',
                        label: 'Me',
                        route: '/profile',
                    },
                    {
                        type: 'link',
                        label: 'My Orders',
                        route: '/orders',
                    },
                ],
            },
            {
                type: 'dropdown',
                label: 'Shop Admin',
                onlyAdmins: true,
                children: [
                    {
                        type: 'link',
                        label: 'Products Edit',
                        route: '/products',
                    },
                ],
            },
            // {
            //     type: 'link',
            //     label: 'Dashboard',
            //     route: 'dashboard',
            //     icon: faSatellite,
            //     routerLinkActiveOptions: {exact: true}
            // },
            // {
            //     type: 'subheading',
            //     label: 'תווכים',
            //     children: [
            //         {
            //             type: 'link',
            //             label: 'תקשורת ת"ג/תג"מ',
            //             route: '/apps/aio-table',
            //             icon: icAssessment
            //         },
            //         {
            //             type: 'link',
            //             label: 'תקשורת תנ"מ',
            //             route: '/apps/social',
            //             icon: icAssessment
            //         },
            //         {
            //             type: 'link',
            //             label: 'תקשורת שקדיה',
            //             route: '/apps/calendar',
            //             icon: faSatellite,
            //         },
            //         {
            //             type: 'link',
            //             label: 'תקשורת רותם',
            //             route: '/apps/help-center',
            //             icon: faSatelliteDish,
            //         },
            //         {
            //             type: 'link',
            //             label: 'שיתוף ערוצים',
            //             route: '/apps/scrumboard',
            //             icon: icAssessment,
            //         },
            //     ],
            // },
            // {
            //     type: 'subheading',
            //     label: 'אפליקציות',
            //     children: [
            //         {
            //             type: 'link',
            //             label: 'מברקה',
            //             route: '/apps/chat',
            //             icon: icMail,
            //             badge: {
            //                 value: '16',
            //                 bgClass: 'bg-cyan',
            //                 textClass: 'text-cyan-contrast',
            //             },
            //         },
            //         {
            //             type: 'link',
            //             label: 'ניטור מערכת',
            //             route: '/apps/mail',
            //             icon: icAssessment,
            //         },
            //
            //     ]
            // },
            // {
            //     type: 'subheading',
            //     label: 'הגדרות',
            //     children: [
            //         {
            //             type: 'dropdown',
            //             label: 'פורטל טכנאי',
            //             icon: icAssessment,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Login',
            //                     route: '/login'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Register',
            //                     route: '/register'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Forgot Password',
            //                     route: '/forgot-password'
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'link',
            //             label: 'פורטל מלאך',
            //             icon: icAssessment,
            //             route: '/coming-soon'
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Errors',
            //             icon: icError,
            //             badge: {
            //                 value: '4',
            //                 bgClass: 'bg-green',
            //                 textClass: 'text-green-contrast',
            //             },
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: '404',
            //                     route: '/pages/error-404'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: '500',
            //                     route: '/pages/error-500'
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'link',
            //             label: 'Pricing',
            //             icon: icAttachMoney,
            //             route: '/pages/pricing'
            //         },
            //         {
            //             type: 'link',
            //             label: 'Invoice',
            //             icon: icReceipt,
            //             route: '/pages/invoice'
            //         },
            //         {
            //             type: 'link',
            //             label: 'FAQ',
            //             icon: icHelp,
            //             route: '/pages/faq'
            //         },
            //         {
            //             type: 'link',
            //             label: 'Guides',
            //             icon: icBook,
            //             route: '/pages/guides',
            //             badge: {
            //                 value: '18',
            //                 bgClass: 'bg-teal',
            //                 textClass: 'text-teal-contrast',
            //             },
            //         },
            //     ]
            // },
            // {
            //     type: 'subheading',
            //     label: 'UI Elements',
            //     children: [
            //         {
            //             type: 'dropdown',
            //             label: 'Components',
            //             icon: icBubbleChart,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Overview',
            //                     route: '/ui/components/overview'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Autocomplete',
            //                     route: '/ui/components/autocomplete'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Buttons',
            //                     route: '/ui/components/buttons'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Button Group',
            //                     route: '/ui/components/button-group'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Cards',
            //                     route: '/ui/components/cards'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Checkbox',
            //                     route: '/ui/components/checkbox'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Dialogs',
            //                     route: '/ui/components/dialogs'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Grid List',
            //                     route: '/ui/components/grid-list'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Input',
            //                     route: '/ui/components/input'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Lists',
            //                     route: '/ui/components/lists'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Menu',
            //                     route: '/ui/components/menu'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Progress',
            //                     route: '/ui/components/progress'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Progress Spinner',
            //                     route: '/ui/components/progress-spinner'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Radio',
            //                     route: '/ui/components/radio'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Slide Toggle',
            //                     route: '/ui/components/slide-toggle'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Slider',
            //                     route: '/ui/components/slider'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Snack Bar',
            //                     route: '/ui/components/snack-bar'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Tooltip',
            //                     route: '/ui/components/tooltip'
            //                 },
            //             ]
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Forms',
            //             icon: icFormatColorText,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Form Elements',
            //                     route: '/ui/forms/form-elements'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Form Wizard',
            //                     route: '/ui/forms/form-wizard'
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Icons',
            //             icon: icStar,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Material Icons',
            //                     route: '/ui/icons/ic'
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'FontAwesome Icons',
            //                     route: '/ui/icons/fa'
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Page Layouts',
            //             icon: icViewCompact,
            //             children: [
            //                 {
            //                     type: 'dropdown',
            //                     label: 'Card',
            //                     children: [
            //                         {
            //                             type: 'link',
            //                             label: 'Default',
            //                             route: '/ui/page-layouts/card',
            //                             routerLinkActiveOptions: {exact: true}
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Tabbed',
            //                             route: '/ui/page-layouts/card/tabbed',
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Large Header',
            //                             route: '/ui/page-layouts/card/large-header',
            //                             routerLinkActiveOptions: {exact: true}
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Tabbed & Large Header',
            //                             route: '/ui/page-layouts/card/large-header/tabbed'
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     type: 'dropdown',
            //                     label: 'Simple',
            //                     children: [
            //                         {
            //                             type: 'link',
            //                             label: 'Default',
            //                             route: '/ui/page-layouts/simple',
            //                             routerLinkActiveOptions: {exact: true}
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Tabbed',
            //                             route: '/ui/page-layouts/simple/tabbed',
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Large Header',
            //                             route: '/ui/page-layouts/simple/large-header',
            //                             routerLinkActiveOptions: {exact: true}
            //                         },
            //                         {
            //                             type: 'link',
            //                             label: 'Tabbed & Large Header',
            //                             route: '/ui/page-layouts/simple/large-header/tabbed'
            //                         }
            //                     ]
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Blank',
            //                     icon: icPictureInPicture,
            //                     route: '/ui/page-layouts/blank'
            //                 },
            //             ]
            //         },
            //     ]
            // },
            // {
            //     type: 'subheading',
            //     label: 'Documentation',
            //     children: [
            //         {
            //             type: 'link',
            //             label: 'Changelog',
            //             route: '/documentation/changelog',
            //             icon: icUpdate
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Getting Started',
            //             icon: icBook,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Introduction',
            //                     route: '/documentation/introduction',
            //                     fragment: 'introduction',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Folder Structure',
            //                     route: '/documentation/folder-structure',
            //                     fragment: 'folder-structure',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Installation',
            //                     route: '/documentation/installation',
            //                     fragment: 'installation',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Development Server',
            //                     route: '/documentation/start-development-server',
            //                     fragment: 'start-development-server',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Build for Production',
            //                     route: '/documentation/build-for-production',
            //                     fragment: 'build-for-production',
            //                     routerLinkActiveOptions: {exact: true}
            //                 }
            //             ]
            //         },
            //         {
            //             type: 'dropdown',
            //             label: 'Customization',
            //             icon: icBook,
            //             children: [
            //                 {
            //                     type: 'link',
            //                     label: 'Configuration',
            //                     route: '/documentation/configuration',
            //                     fragment: 'configuration',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Changing Styling',
            //                     route: '/documentation/changing-styling-and-css-variables',
            //                     fragment: 'changing-styling-and-css-variables',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Using Custom Colors',
            //                     route: '/documentation/using-custom-colors-for-the-primarysecondarywarn-palettes',
            //                     fragment: 'using-custom-colors-for-the-primarysecondarywarn-palettes',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //                 {
            //                     type: 'link',
            //                     label: 'Adding Menu Items',
            //                     route: '/documentation/adding-menu-items',
            //                     fragment: 'adding-menu-items',
            //                     routerLinkActiveOptions: {exact: true}
            //                 },
            //             ]
            //         },
            //         {
            //             type: 'link',
            //             label: 'Further Help',
            //             icon: icBook,
            //             route: '/documentation/further-help',
            //             fragment: 'further-help',
            //             routerLinkActiveOptions: {exact: true}
            //         },
            //     ]
            // },
            // {
            //     type: 'subheading',
            //     label: 'Customize',
            //     children: []
            // },
            // {
            //     type: 'link',
            //     label: 'Configuration',
            //     route: () => this.layoutService.openConfigpanel(),
            //     icon: icSettings
            // }
        ];
    }
}

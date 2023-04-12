import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CustomLayoutComponent} from './custom-layout/custom-layout.component';
import {VexRoutes} from '../@vex/interfaces/vex-route.interface';
import {NotEmptyCartGuard} from './pages/my-shop/guards/not-empty-cart.guard';
import {OnlyAdminsGuard} from './pages/my-shop/guards/only-admins.guard';
import {OnlyLoggedInUsersGuard} from './pages/my-shop/guards/only-logged-in-users.guard';
import {OnlyNotLoggedInUsersGuard} from "./pages/my-shop/guards/only-not-logged-in-users.guard";

const routes: VexRoutes = [
    {
        path: 'login',
        loadChildren: () => import('./pages/pages/auth/login/login.module').then(m => m.LoginModule),
        canActivate: [OnlyNotLoggedInUsersGuard]
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/pages/auth/register/register.module').then(m => m.RegisterModule),
        canActivate: [OnlyNotLoggedInUsersGuard]
    },
    {
        path: 'forgot-password',
        loadChildren: () => import('./pages/pages/auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
        canActivate: [OnlyNotLoggedInUsersGuard]
    },
    {
        path: 'coming-soon',
        loadChildren: () => import('./pages/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule),
    },
    {
        path: '',
        component: CustomLayoutComponent,
        children: [
            {
                path: 'my-shop/my-shop-services-layout',
                redirectTo: '/'
            },
            {
                path: '',
                loadChildren: () => import('./pages/my-shop/pages/my-shop/my-shop.module')
                    .then(m => m.MyShopModule),
                canActivate: [OnlyLoggedInUsersGuard]
            },
            {
                path: 'payment',
                loadChildren: () => import('./pages/my-shop/pages/payment/payment.module').then(m => m.PaymentModule),
                canActivate: [OnlyLoggedInUsersGuard, NotEmptyCartGuard]
            },
            {
                path: 'orders',
                loadChildren: () => import('./pages/my-shop/pages/user-orders/user-orders.module').then(m => m.UserOrdersModule),
                canActivate: [OnlyLoggedInUsersGuard]
            },
            {
                path: 'profile',
                loadChildren: () => import('./pages/my-shop/pages/profile-detials/profile-detials.module').then(m => m.ProfileDetialsModule),
                canActivate: [OnlyLoggedInUsersGuard]
            },
            {
                path: 'dashboard',
                loadChildren: () => import('./pages/dashboards/dashboard-analytics/dashboard-analytics.module')
                    .then(m => m.DashboardAnalyticsModule),
            },
            {
                path: 'products',
                loadChildren: () => import('./pages/my-shop/pages/products-edit-page/products-edit-page.module')
                    .then(m => m.ProductsEditPageModule),
                canActivate: [OnlyLoggedInUsersGuard, OnlyAdminsGuard]
            },
            {
                path: 'apps',
                children: [
                    {
                        path: 'chat',
                        loadChildren: () => import('./pages/apps/chat/chat.module').then(m => m.ChatModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'mail',
                        loadChildren: () => import('./pages/apps/mail/mail.module').then(m => m.MailModule),
                        data: {
                            toolbarShadowEnabled: true,
                            scrollDisabled: true
                        }
                    },
                    {
                        path: 'social',
                        loadChildren: () => import('./pages/apps/social/social.module').then(m => m.SocialModule)
                    },
                    {
                        path: 'contacts',
                        loadChildren: () => import('./pages/apps/contacts/contacts.module').then(m => m.ContactsModule)
                    },
                    {
                        path: 'calendar',
                        loadChildren: () => import('./pages/apps/calendar/calendar.module').then(m => m.CalendarModule),
                        data: {
                            toolbarShadowEnabled: true
                        }
                    },
                    {
                        path: 'help-center',
                        loadChildren: () => import('./pages/apps/help-center/help-center.module').then(m => m.HelpCenterModule),
                    },
                    {
                        path: 'scrumboard',
                        loadChildren: () => import('./pages/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule),
                    },
                    {
                        path: 'editor',
                        loadChildren: () => import('./pages/apps/editor/editor.module').then(m => m.EditorModule),
                    },
                ]
            },
            {
                path: 'pages',
                children: [
                    {
                        path: 'pricing',
                        loadChildren: () => import('./pages/pages/pricing/pricing.module').then(m => m.PricingModule)
                    },
                    {
                        path: 'faq',
                        loadChildren: () => import('./pages/pages/faq/faq.module').then(m => m.FaqModule)
                    },
                    {
                        path: 'guides',
                        loadChildren: () => import('./pages/pages/guides/guides.module').then(m => m.GuidesModule)
                    },
                    {
                        path: 'invoice',
                        loadChildren: () => import('./pages/pages/invoice/invoice.module').then(m => m.InvoiceModule)
                    },
                    {
                        path: 'error-404',
                        loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
                    },
                    {
                        path: 'error-500',
                        loadChildren: () => import('./pages/pages/errors/error-500/error-500.module').then(m => m.Error500Module)
                    }
                ]
            },
            {
                path: 'ui',
                children: [
                    {
                        path: 'components',
                        loadChildren: () => import('./pages/ui/components/components.module').then(m => m.ComponentsModule),
                    },
                    {
                        path: 'forms/form-elements',
                        loadChildren: () => import('./pages/ui/forms/form-elements/form-elements.module').then(m => m.FormElementsModule),
                        data: {
                            containerEnabled: true
                        }
                    },
                    {
                        path: 'forms/form-wizard',
                        loadChildren: () => import('./pages/ui/forms/form-wizard/form-wizard.module').then(m => m.FormWizardModule),
                        data: {
                            containerEnabled: true
                        }
                    },
                    {
                        path: 'icons',
                        loadChildren: () => import('./pages/ui/icons/icons.module').then(m => m.IconsModule)
                    },
                    {
                        path: 'page-layouts',
                        loadChildren: () => import('./pages/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule),
                    },
                ]
            },
            {
                path: 'documentation',
                loadChildren: () => import('./pages/documentation/documentation.module').then(m => m.DocumentationModule),
            },
            {
                path: '**',
                loadChildren: () => import('./pages/pages/errors/error-404/error-404.module').then(m => m.Error404Module)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'corrected',
        anchorScrolling: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

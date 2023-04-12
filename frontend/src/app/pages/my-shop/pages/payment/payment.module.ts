import {NgModule} from '@angular/core';
import {PaymentComponent} from './payment.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from "@angular/material/stepper";
import {IconModule} from "@visurel/iconify-angular";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import {SecondaryToolbarModule} from "../../../../../@vex/components/secondary-toolbar/secondary-toolbar.module";
import {BreadcrumbsModule} from "../../../../../@vex/components/breadcrumbs/breadcrumbs.module";
import {PaymentRoutingModule} from "./payment-routing.module";
import {PaymentFormComponent} from "../../components/payment-form/payment-form.component";
import {FlexModule} from "@angular/flex-layout";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {PaymentSummeryReceiptComponent} from "../../components/payment-summery-receipt/payment-summery-receipt.component";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {MatDialogModule} from "@angular/material/dialog";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {PaymentSummeryTableComponent} from "../../components/payment-summery-table/payment-summery-table.component";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
    declarations: [PaymentComponent, PaymentFormComponent, PaymentSummeryReceiptComponent, PaymentSummeryTableComponent],
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        PaymentRoutingModule,
        MatStepperModule,
        IconModule,
        MatIconModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule,
        MatSelectModule,
        SecondaryToolbarModule,
        BreadcrumbsModule,
        FlexModule,
        MatInputModule,
        MatCardModule,
        MatDividerModule,
        MatDialogModule,
        ScrollingModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    exports: [
        PaymentComponent,
        PaymentFormComponent,
        PaymentSummeryReceiptComponent,
    ]
})
export class PaymentModule {
}

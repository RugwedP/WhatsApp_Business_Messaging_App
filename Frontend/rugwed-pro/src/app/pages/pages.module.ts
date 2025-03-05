import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { LightboxModule } from 'ngx-lightbox';

import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
import { CryptoModule } from './crypto/crypto.module';
import { EmailModule } from './email/email.module';
import { InvoicesModule } from './invoices/invoices.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { ContactsModule } from './contacts/contacts.module';
import { BlogModule } from "./blog/blog.module";
import { UtilityModule } from './utility/utility.module';
import { UiModule } from './ui/ui.module';
import { FormModule } from './form/form.module';
import { TablesModule } from './tables/tables.module';
import { IconsModule } from './icons/icons.module';
import { ChartModule } from './chart/chart.module';
import { CalendarComponent } from './calendar/calendar.component';
import { MapsModule } from './maps/maps.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ChatComponent } from './chat/chat.component';

import { FilemanagerComponent } from './filemanager/filemanager.component';
import { AddClientComponent } from './whatsapp/add-client/add-client.component';
import { CreateComponent } from './whatsapp/add-client/create/create.component';
import { UploadComponent } from './whatsapp/add-client/upload/upload.component';
import { DashboardComponent } from './whatsapp/dashboard/dashboard.component';
import { LoginComponent } from './whatsapp/login/login.component';
import { UseTemplateComponent } from './whatsapp/use-template/use-template.component';
import { SelectClientComponent } from './whatsapp/select-client/select-client.component';
import { RegisterAdminComponent } from './whatsapp/register-admin/register-admin.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AddCategoryComponent } from './whatsapp/add-category/add-category.component';
import { AboutUsComponent } from './whatsapp/about-us/about-us.component';
import { VerifyTemplateComponent } from './whatsapp/verify-template/verify-template.component';



@NgModule({
        declarations: [ChatComponent, FilemanagerComponent, DashboardComponent, UseTemplateComponent, AboutUsComponent, ],
        imports: [CommonModule,
                VerifyTemplateComponent,
                AddCategoryComponent,
                SelectClientComponent, 
                BsDatepickerModule,
                RegisterAdminComponent,
                LoginComponent,
                CalendarComponent,
                AddClientComponent,
                UploadComponent,
                CreateComponent,
                ReactiveFormsModule,
                BsDropdownModule.forRoot(),
                ModalModule.forRoot(),
                PagesRoutingModule,
                NgApexchartsModule,
                ReactiveFormsModule,
                DashboardsModule,
                CryptoModule,
                EcommerceModule,
                EmailModule,
                InvoicesModule,
                ProjectsModule,
                UIModule,
                TasksModule,
                ContactsModule,
                BlogModule,
                UtilityModule,
                UiModule,
                FormModule,
                TablesModule,
                IconsModule,
                ChartModule,
                WidgetModule,
                MapsModule,
                FullCalendarModule,
                TabsModule.forRoot(),
                TooltipModule.forRoot(),
                CollapseModule.forRoot(),
                AlertModule.forRoot(),
                SimplebarAngularModule,
                LightboxModule,
                PickerModule], providers: [provideHttpClient(withInterceptorsFromDi())]
})
export class PagesModule { }

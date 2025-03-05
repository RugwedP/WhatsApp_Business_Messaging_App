import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultComponent } from './dashboards/default/default.component';
import { FilemanagerComponent } from './filemanager/filemanager.component';
import { AddClientComponent } from './whatsapp/add-client/add-client.component';
import { UploadComponent } from './whatsapp/add-client/upload/upload.component';
import { CreateComponent } from './whatsapp/add-client/create/create.component';
import { DashboardComponent } from './whatsapp/dashboard/dashboard.component';
import { CreateTemplateComponent } from './whatsapp/create-template/create-template.component';
import { UseTemplateComponent } from './whatsapp/use-template/use-template.component';
import { SelectClientComponent } from './whatsapp/select-client/select-client.component';
// import { LoginComponent } from './whatsapp/login/login.component';
import { RegisterAdminComponent } from './whatsapp/register-admin/register-admin.component';
import { LoginComponent } from '../account/auth/login/login.component';
import { AddCategoryComponent } from './whatsapp/add-category/add-category.component';
import { AboutUsComponent } from './whatsapp/about-us/about-us.component';
import { VerifyTemplateComponent } from './whatsapp/verify-template/verify-template.component';


const routes: Routes = [
  // { path: '', redirectTo: 'dashboard' },
  {
    path: "",
    component: DashboardComponent
  },
  {
    path:"add-client",
    component:CreateComponent
  },
  {
    path:'upload-file',
    component: UploadComponent
  },
  {
    path:"dashboardpage",
    component:DashboardComponent
  },
  {
    path:"create-template",
    component:CreateTemplateComponent
  },
  {
    path:"use-template",
    component:UseTemplateComponent
  },
  {
    path:"create-template",
    component:UseTemplateComponent
  },
  {
    path:"select-client",
    component:SelectClientComponent
  },
   {
    path:'login',
    component:LoginComponent
   },{

      path:'admin',
      component: RegisterAdminComponent
   },
   {
      path:"add-category",
      component:AddCategoryComponent
   },
   {
    path:"verify-template",
    component:VerifyTemplateComponent
   },
   {
    path:"about-us",
    component:AboutUsComponent
 },

  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'filemanager', component: FilemanagerComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule) },
  { path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

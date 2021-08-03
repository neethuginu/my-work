import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyAppsComponent } from './company-apps/company-apps.component';
import { Grid1Component } from './grid1/grid1.component';
// import { Grid2Component } from './grid2/grid2.component';
import { Grid3Component } from './grid3/grid3.component';
import { LicenseManageWidgetComponent } from './license-manage-widget/license-manage-widget.component';
import { MarketPlaceDiscountManagerComponent } from './market-place-discount-manager/market-place-discount-manager.component';
import { PathComponent } from './path/path.component';
import { PriceeditorComponent } from './priceeditor/priceeditor.component';
// import { GridComponent } from './grid/grid.component';
import { SlickGridComponent } from './slick-grid/slick-grid.component';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { TeamListComponent } from './team-list/team-list.component';
import { VyaTicketComponent } from './vya-ticket/vya-ticket.component';


const routes: Routes = [
    {
        path: "team-add",
        component: TeamAddComponent
      },
      {
        path:"marketPlace-discountManager",
        component:MarketPlaceDiscountManagerComponent
      },
      {
        path:"company-apps",
        component: CompanyAppsComponent
      },
      {
        path:"license-manage-widget",
        component: LicenseManageWidgetComponent
      },
      {
        path:"path",
        component: PathComponent
      },
      {
        path: "slick-grid",
        component: SlickGridComponent
      },
      {
        path: "price-editor",
        component: PriceeditorComponent
      },
      {
        path: "grid3",
        component: Grid3Component
      },  
      {
        path: "vya-Ticket",
        component: VyaTicketComponent
      },  
    
      // {
      //   path: "grid2",
      //   component: Grid2Component
      // },
      {
        path: "grid1",
        component: Grid1Component
      },
     
      {
        path: "team-list",
        component: TeamListComponent
      },
      {
        path: "team-edit",
        component: TeamEditComponent
      },
      {
        path: "team-view",
        component: TeamEditComponent
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

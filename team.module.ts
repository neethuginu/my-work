import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeamRoutingModule } from './team-routing.module';
import { TeamAddComponent } from './team-add/team-add.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamEditComponent } from './team-edit/team-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VyaPipeModule } from '../../lib/pipes/vya.pipe.module';
import { ChartsModule } from 'ng2-charts';
import { AlertModule } from 'ngx-bootstrap/alert';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
import { DefectListRoutingModule } from '../vessel/defect-list/defect-list-routing.module';
import { ImageCropperModule } from 'ngx-image-cropper';
import { TeamViewComponent } from './team-view/team-view.component';
import { SlickGridComponent } from './slick-grid/slick-grid.component';
import { AngularSlickgridModule } from 'angular-slickgrid';

import { Grid1Component } from './grid1/grid1.component';
import { Grid3Component } from './grid3/grid3.component';
import { PriceeditorComponent } from './priceeditor/priceeditor.component';
import { VyaTicketComponent } from './vya-ticket/vya-ticket.component';
import { MarketPlaceDiscountManagerComponent } from './market-place-discount-manager/market-place-discount-manager.component';
import { Grid2Component } from './grid1/grid2/grid2.component';
import { CompanyAppsComponent } from './company-apps/company-apps.component';
import { PathComponent } from './path/path.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LicenseManageWidgetComponent } from './license-manage-widget/license-manage-widget.component';



@NgModule({
  declarations: [TeamAddComponent, TeamListComponent, TeamEditComponent, TeamViewComponent, SlickGridComponent, Grid2Component,Grid1Component, Grid3Component, PriceeditorComponent, VyaTicketComponent, MarketPlaceDiscountManagerComponent, CompanyAppsComponent, PathComponent, LicenseManageWidgetComponent],
  imports: [
    CommonModule,
    TeamRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    VyaPipeModule,
    ChartsModule,
    NgxPaginationModule,
    NgSelectModule,
    ImageCropperModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    AngularSlickgridModule.forRoot({}),
    AlertModule.forRoot(),
    DefectListRoutingModule,
  ]
})
export class TeamModule { }

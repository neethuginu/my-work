import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularGridInstance, Column,  FieldType,  GridOption } from 'angular-slickgrid';


@Component({
  selector: 'app-grid2',
  templateUrl: './grid2.component.html',
  styleUrls: ['./grid2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Grid2Component implements OnInit {

   angularGrid2!: AngularGridInstance;
   gridObj2: any;
   columnDefinitions2!: Column[];
   gridOptions2!: GridOption;
   dataset2!: any [];
   
   constructor(private http:HttpClient) {  }
 
 
   ngOnInit(): void {
     this.prepareGrid2();
     this.http.get(('http://localhost:3000/grids')).subscribe(((data: any[]) => this.dataset2 = data) as any);

   }
 
   angularGridReady2(angularGrid: AngularGridInstance) {
     this.angularGrid2 = angularGrid;
     this.gridObj2 = angularGrid.slickGrid;
   }
 
   
 
   prepareGrid2() {
     this.columnDefinitions2 = [
       { id: 'sel', name: '#', field: 'num', behavior: 'select', cssClass: 'cell-selection', width: 40, resizable: false, selectable: false },
       { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: 'Common Factor' },
       { id: 'duration', name: 'Duration', field: 'duration', columnGroup: 'Common Factor' },
       { id: 'start', name: 'Start', field: 'start', columnGroup: 'Period' },
       { id: 'finish', name: 'Finish', field: 'finish', columnGroup: 'Period' },
       { id: '%', name: '% Complete', field: 'percentComplete', selectable: false, columnGroup: 'Analysis' },
       { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', type: FieldType.boolean, columnGroup: 'Analysis' }
     ];
 
     this.gridOptions2 = {
       enableColumnReorder :false,
       enableCellNavigation: true,
       createPreHeaderPanel: true,
       showPreHeaderPanel: true,
       preHeaderPanelHeight: 25,
       explicitInitialization: true,
       frozenColumn: 2,
       gridMenu: { hideClearFrozenColumnsCommand: false },
       headerMenu: { hideFreezeColumnsCommand: false }
     };
 
   }
 
  //  getData(count: number) {
  //    // Set up some test columns.
  //    const mockDataset :any= [];
  //    for (let i = 0; i < count; i++) {
  //      mockDataset[i] = {
  //        id: i,
  //        num: i,
  //        title: 'Task ' + i,
  //        duration: '5 days',
  //        percentComplete: Math.round(Math.random() * 100),
  //        start: '01/01/2009',
  //        finish: '01/05/2009',
  //        effortDriven: (i % 5 === 0)
  //      };
  //    }
  //    return mockDataset;
  //  }
 
  //  setFrozenColumns2(frozenCols: number) {
  //    this.gridObj2.setOptions({ frozenColumn: frozenCols });
  //    this.gridOptions2 = this.gridObj2.getOptions();
  //  }
 
   /**
    * A callback to render different row column span
    * Your callback will always have the "item" argument which you can use to decide on the colspan
    * Your return must always be in the form of:: return { columns: {}}
  //   */
  //  renderDifferentColspan(item: any): ItemMetadata {
  //    if (item.id % 2 === 1) {
  //      return {
  //        columns: {
  //          duration: {
  //            colspan: 3 // "duration" will span over 3 columns
  //          }
  //        }
  //      };
  //    }
  //    return {
  //      columns: {
  //        0: {
  //          colspan: '*' // starting at column index 0, we will span accross all column (*)
  //        }
  //      }
  //    };
  //  }
 }
 
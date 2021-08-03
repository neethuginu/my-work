

  import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
  import { AngularGridInstance, Column,  FieldType,  GridOption, ItemMetadata } from 'angular-slickgrid';
  
  
  
@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class Grid1Component implements OnInit {
    angularGrid2!: AngularGridInstance;
    gridObj2: any;
    columnDefinitions1!: Column[];
    gridOptions1!: GridOption;
    dataset1!: any [];
    
    constructor(private http:HttpClient) {  }
  
  
    ngOnInit(): void {
      this.prepareGrid1();
      this.http.get(('http://localhost:3000/grids')).subscribe(((data: any[]) => this.dataset1 = data) as any);

    }  
    
    angularGridReady2(angularGrid: AngularGridInstance) {
      this.angularGrid2 = angularGrid;
      this.gridObj2 = angularGrid.slickGrid;
    }
  
    prepareGrid1() {
      this.columnDefinitions1 = [
        { id: 'title', name: 'Title', field: 'title', sortable: true, columnGroup: 'Common Factor' },
        { id: 'duration', name: 'Duration', field: 'duration', columnGroup: 'Common Factor' },
        { id: 'start', name: 'Start', field: 'start', columnGroup: 'Period' },
        { id: 'finish', name: 'Finish', field: 'finish', columnGroup: 'Period' },
        { id: '%', name: '% Complete', field: 'percentComplete', selectable: false, columnGroup: 'Analysis' },
        { id: 'effort-driven', name: 'Effort Driven', field: 'effortDriven', type: FieldType.boolean, columnGroup: 'Analysis' }
      ];
  
      this.gridOptions1 = {
        enableColumnReorder :false,
        enableAutoResize: false,
        enableCellNavigation: true,
        enableExport: true,
        enableSorting: true,
        createPreHeaderPanel: true,
        showPreHeaderPanel: true,
        preHeaderPanelHeight: 28,
        explicitInitialization: true,
        colspanCallback: this.renderDifferentColspan,
      };
  
      // this.dataset1 = this.getData(5);
    }
  
  
    // getData(count: number) {
    //   // Set up some test columns.
    //   const mockDataset :any= [];
    //   for (let i = 0; i < count; i++) {
    //     mockDataset[i] = {
    //       id: i,
    //       num: i,
    //       title: 'Task ' + i,
    //       duration: '5 days',
    //       percentComplete: Math.round(Math.random() * 100),
    //       start: '01/01/2009',
    //       finish: '01/05/2009',
    //       effortDriven: (i % 5 === 0)
    //     };
    //   }
    //   return mockDataset;
    // }
  
  
    /**
     * A callback to render different row column span
     * Your callback will always have the "item" argument which you can use to decide on the colspan
     * Your return must always be in the form of:: return { columns: {}}
     */
    renderDifferentColspan(item: any): ItemMetadata {
      if (item.id % 2 === 1) {
        return {
          columns: {
            duration: {
              colspan: 3 // "duration" will span over 3 columns
            }
          }
        };
      }
      return {
        columns: {
          0: {
            colspan: '*' // starting at column index 0, we will span accross all column (*)
          }
        }
      };
    }
  }
  
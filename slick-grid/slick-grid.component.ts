// <!--
// * Copyright (c) 2020 Vyasaka Technologies. All Rights Reserved.
// -->
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularGridInstance, Column, Editors, formatNumber, GridOption, OnEventArgs } from 'angular-slickgrid';
import { SlickService } from '../slick.service';
import moment from "moment";



declare const Slick: any;

@Component({
  selector: 'app-slick-grid',
  templateUrl: './slick-grid.component.html',
  styleUrls: ['./slick-grid.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SlickGridComponent implements OnInit {
   today = moment().format(" MMMM DD YYYY");


  form: FormGroup = new FormGroup({});
  angularGrid!: AngularGridInstance;
  columnDefinitions!: Column[];
  gridOptions!: GridOption;
  dataset: any[] = [];
  frozenColumnCount = 2;
  frozenRowCount = 3;
  isFrozenBottom = false;
  gridObj: any;
  slickEventHandler: any;

  // edit
  isAutoEdit = true;
  alertWarning: any;
  id: any;
  updatedObject: any;
  data: any;
  newPiece:any;

  constructor(
    private dataService: SlickService,
    private formBuilder: FormBuilder,
  ) {
    this.slickEventHandler = new Slick.EventHandler();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      wholesaleBuyingPrice: ["", Validators.required],
      actualBuyingPrice: ["", Validators.required],
      creditCardCommission: ["", Validators.required],
      marketPlaceCommission: ["", Validators.required],
      gstToPay: ["", Validators.required],
    });
    this.prepareDataGrid();
    this.getData();
  }

  get f() {
    return this.form.controls;
  }

  ngOnDestroy() {
    this.slickEventHandler.unsubscribeAll();
  }

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.slickEventHandler.subscribe(this.gridObj.onMouseEnter, (event: Event) => this.highlightRow(event, true));
    this.slickEventHandler.subscribe(this.gridObj.onMouseLeave, (event: Event) => this.highlightRow(event, false));
  }

  highlightRow(event: Event, isMouseEnter: boolean) {
    const cell = this.gridObj.getCellFromEvent(event);
    const rows = isMouseEnter ? [cell.row] : [];
    this.gridObj.setSelectedRows(rows); // highlight current row
    event.preventDefault();
  }

  prepareDataGrid() {
    this.columnDefinitions = [
      {
        id: 'piece', name: 'Pieces', field: 'piece',
        minWidth: 50, width: 30,
        cannotTriggerInsert: true,
        resizable: false,
        unselectable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
        onCellClick: (e: Event, args: OnEventArgs) => {
          console.log(args, e);
        }
      },
      {
        id: 'pieces', name: 'Pieces', field: 'pieces',
        minWidth: 50, width: 30,
        filterable: true,
        sortable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
      },
      {
        id: 'discountPercentage', name: 'Discount %', field: 'discountPercentage',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
        editor: {
          model: Editors.text,
          required: true,
        },
      },
      {
        id: 'discount', name: 'Discount', field: 'discount',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'customerprice', name: 'Customer Price', field: 'customerprice',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'creditcardfee', name: 'Credit Card Fee', field: 'creditcardfee',
        resizable: false,
        minWidth: 100, width: 80,
        filterable: true,
        sortable: true,
      },
      {
        id: 'gstpaidbymm', name: 'GST paid By MM', field: 'gstpaidbymm',
        minWidth: 100, width: 180,
        filterable: true,
        sortable: true,
      },
      {
        id: 'mmcommission', name: 'MM Commision', field: 'mmcommission',
        minWidth: 100, width: 10,
        filterable: true,
        sortable: true,
      },
      {
        id: 'customercashbackz', name: 'Customer CashBack', field: 'customercashbackz',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true,
      },
      {
        id: 'vendorpricetomm', name: 'Vendor Price to MM', field: 'vendorpricetomm',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true,
      },
      {
        id: 'forvendor', name: ' For Vendor', field: 'forvendor',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true,
      },
      {
        id: 'vendor', name: ' For Vendor', field: 'vendor',
        minWidth: 100, width: 120,
        filterable: true,
        sortable: true,
      },
    ];

    this.gridOptions = {
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 10
      },
      enableExcelCopyBuffer: true,
      enableCellNavigation: true,
      editable: true,
      autoEdit: true,
      asyncEditorLoading: true,
      enableColumnReorder: false,
      gridMenu: { hideClearFrozenColumnsCommand: false },
      headerMenu: { hideFreezeColumnsCommand: false }
    };
  }

  getData(): void {
    this.dataService.getDatas().subscribe((res: any) => {
      this.dataset = res;
    })
  }
  
  addNewItem(insertPosition?:'top') {
    const newItem1 = this.createNewItem();
    // const newItem2 = this.createNewItem(2);

    // single insert
    this.angularGrid.gridService.addItem(newItem1, { position: insertPosition });

    // OR multiple inserts
    // this.angularGrid.gridService.addItems([newItem1, newItem2], { position: insertPosition });
  }
  
  createNewItem() {
    
    return {
      id:"",
      piece:"",
      pieces: "",
      discountPercentage: "",
      discount: "",
      customerprice: "",
      creditcardfee: "",
      gstpaidbymm: "",
      mmcommission: "",
      customercashbackz: "",
      vendorpricetomm: "",
      forvendor: "",
      vendor: ""
    };
  }  

  onCellChanged(e: Event, args: any) {
    console.log(e);
    this.updatedObject = args.item;  

    // vendathanu
    // const id: any = this.updatedObject.id;
    // this.dataService.update(id, this.updatedObject).subscribe(() => {
    //   console.log(this.updatedObject.pieces)
    // }) 
  }

  create(data: any) {
    this.data = data;  
    this.updatedObject.discount = this.data.actualBuyingPrice * this.updatedObject.discountPercentage / 100;
    this.updatedObject.customerprice = this.data.actualBuyingPrice - this.updatedObject.discount;
    this.updatedObject.creditcardfee = Math.round(this.data.creditCardCommission / 100) * this.updatedObject.customerprice;
    this.updatedObject.gstpaidbymm = (this.data.gstToPay / 100) * this.updatedObject.customerprice;
    this.updatedObject.mmcommission = Math.round((this.data.marketPlaceCommission / 100) * this.updatedObject.customerprice);
    this.updatedObject.customercashbackz = this.data.actualBuyingPrice - this.updatedObject.customerprice;
    this.updatedObject.vendorpricetomm = this.data.actualBuyingPrice - (this.updatedObject.creditcardfee + this.updatedObject.mmcommission);
    this.updatedObject.forvendor = this.updatedObject.vendorpricetomm - this.data.wholesaleBuyingPrice;
    this.updatedObject.vendor = this.updatedObject.forvendor * 100;
    const id: any = this.updatedObject.id;
    this.dataService.update(id, this.updatedObject).subscribe(() => {
      console.log(this.updatedObject.pieces)       })  
  }

  onSubmit(){
     const arr=[];
     arr.push(this.updatedObject,this.today)
     console.log(arr)
  }

  onCellClicked(e: Event, args: any) {
    const metadata = this.angularGrid.gridService.getColumnFromEventArguments(args);
    console.log(metadata);
    
    this.newPiece=metadata.dataContext.piece;
    // console.log(this.newPiece)
    console.log(e)
  }

  /** change dynamically, through slickgrid "setOptions()" the number of pinned columns */
  changeFrozenColumnCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenColumn: this.frozenColumnCount
      });
    }
  }
  /** change dynamically, through slickgrid "setOptions()" the number of pinned rows */
  changeFrozenRowCount() {
    if (this.gridObj && this.gridObj.setOptions) {
      this.gridObj.setOptions({
        frozenRow: this.frozenRowCount
      });
    }
  }

  costDurationFormatter(_row: number, _cell: number, _value: any, _columnDef: Column, dataContext: any) {
    const costText = this.isNullUndefinedOrEmpty(dataContext.cost) ? 'n/a' : formatNumber(dataContext.cost, 0, 2, false, '$', '', '.', ',');
    let durationText = 'n/a';
    if (!this.isNullUndefinedOrEmpty(dataContext.duration) && dataContext.duration >= 0) {
      durationText = `${dataContext.duration} ${dataContext.duration > 1 ? 'days' : 'day'}`;
    }
    return `<b>${costText}</b> | ${durationText}`;
  }

  isNullUndefinedOrEmpty(data: any) {
    return (data === '' || data === null || data === undefined);
  }

  onValidationError(_e: Event, args: any) {
    alert(args.validationResults.msg);
  }

}












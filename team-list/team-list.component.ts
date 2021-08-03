import { Component, OnInit } from '@angular/core';
import { SessionStore } from '../../../services/session.store';
import { TeamService } from '../data.service';
import { Router } from "@angular/router";



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  // pagination
  page: number = 1;
  userName = SessionStore.getUserProfile()["profile"]["firstName"];
  settings: any;
  dateFormat: any;
  paginate: any;
  searchString = "";

  // checkbox
  isChecked: boolean | undefined = false;
  checkedIdList: any[] = [];
  id: string = "";
  alertMsg: boolean | undefined = undefined;
  isCollapsed: boolean = false;
  allTeam: any;

  constructor(
    private dataService: TeamService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllDetails();
  }

  getSelectedId(isCheckedStatus: boolean, id: string) {
    if (isCheckedStatus === true) {
      this.id = id;
      console.log(this.id)
      this.isChecked = isCheckedStatus;
      this.checkedIdList.push(this.id);
    } else {
      this.isChecked = undefined;
      this.id = "";
      const index = this.checkedIdList.indexOf(this.id);
      this.checkedIdList.splice(index);
    }
  }
  editUser(id: string) {
    debugger;
    this.router.navigate(['team/team-list/team-edit'],
      { queryParams: { id: id } });
    console.log(id)
  }
  delete(id: string) {
    this.dataService.deleteUser(id).subscribe(() => {
      this.getAllDetails();
    })
  }

  getAllDetails() {
    this.dataService.getAll().subscribe((response) => {
      this.allTeam = response
    })
    console.log(this.allTeam)
  }


  refreshPage() {
    this.getAllDetails();
  }
}

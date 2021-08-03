import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../data.service';
import { Team } from '../team.model';


@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss']
})
export class TeamEditComponent implements OnInit {
  [x: string]: any;

  teamForm: FormGroup = new FormGroup({});
  submitted: boolean = false;

  typeData: string[] = [];
 

  // IMAGE
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileUpload: any = [];

  // code validation  
  alertMsg: boolean | undefined = undefined;
  teamData: Team = new Team();


  profileLin: string[] = ["Facebook", "Twitter", "Linkedin"];
  id : any;


  constructor(
    private formBuilder: FormBuilder,
    private dataService: TeamService,
    // private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getdefectDataEditById(this.id);
    this.teamForm = this.formBuilder.group({
      image: ["", Validators.required],
      name: ["", Validators.required],
      designation: ["", Validators.required],
      description: ["", Validators.required],
      profileLink: ["", Validators.required],

    });
  }

  get f() {
    return this.teamForm.controls;
  }

  getdefectDataEditById(id: any) {
    debugger;
    this.dataService.get(id).subscribe((data: any) => {
      console.log(data);
      this.teamData = data;
      this.updateEditView(this.teamData);
      // this.patchFamilyDetails();   
    });
  }


  updateEditView(teamData: any) {
    this.teamForm.patchValue({
      image: teamData.image,
      name: teamData.name,
      designation: teamData.inspector,
      description: teamData.reportedDate,
      profileLink: teamData.inspectionDate,

    });
  }


  onSubmit(teamData: any) {
    console.log(teamData)    
  }

}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../data.service';

// import { NotificationService } from '../../../services/notification.service';
@Component({
  selector: 'app-team-view',
  templateUrl: './team-view.component.html',
  styleUrls: ['./team-view.component.scss']
})
export class TeamViewComponent implements OnInit {

  teamForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  // IMAGE
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileUpload: any = [];
  team: any = {};

  alertMsg: boolean | undefined = undefined;
  profileLin: string[] = ["Facebook", "Twitter", "Linkedin"];


  constructor(
    private formBuilder: FormBuilder,
    private dataService: TeamService,
    // private notificationService: NotificationService

  ) { }

  ngOnInit(): void {
    this.teamForm = this.formBuilder.group({
      image: ["", Validators.required],
      name: ["", Validators.required],
      designation: ["", Validators.required],
      description: ["", Validators.required],
      profileLink: ["", Validators.required],
    });
  }
  getTeam(id: string) {
    this.dataService.get(id).subscribe((response) => {
      this.team = response
    })
    console.log(this.team)

  }
  get f() {
    return this.teamForm.controls;
  }

  onSubmit(data: any) {
    this.submitted = true;
    data.image = this.croppedImage;
    console.log(data);

  }
}


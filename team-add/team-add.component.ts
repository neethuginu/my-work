import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import * as uuid from "uuid";
import { TeamService } from '../data.service';
// import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-team-add',
  templateUrl: './team-add.component.html',
  styleUrls: ['./team-add.component.scss']
})
export class TeamAddComponent implements OnInit {
  teamForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  typeData: string[] = [];

  // IMAGE
  imageChangedEvent: any = '';
  croppedImage: any = '';
  fileUpload: any = [];

  // code validation
  alertMsg: boolean | undefined = undefined;
  profileLin: string[] = ["Facebook", "Twitter", "Linkedin"];
  allTeams: any;


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
    this.getAllTeam();
  }

  get f() {
    return this.teamForm.controls;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent)
    // this.fileUpload=event.target.file[];
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: HTMLImageElement) {
    console.log(image)
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  getAllTeam() {
    this.dataService.getAll().subscribe((response) => {
      this.allTeams = response
    })
  }

  onSubmit(data: any) {
    this.submitted = true;
    data.image = this.croppedImage;
    data.id = uuid.v4();
    console.log(data);
    this.dataService.createUser(data).subscribe(() => {
      this.getAllTeam();
      alert("user succesfully added");
    })
  }
}

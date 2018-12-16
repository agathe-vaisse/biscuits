import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {faCookieBite, faEdit, faThumbsDown, faThumbsUp, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Mission} from '../model/Mission';
import {MissionService} from '../services/mission.service';
import {MissionsComponent} from '../missions.component';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Kid} from '../../kids/model/Kid';

@Component({
  selector: 'app-mission-details',
  templateUrl: './mission-details.component.html',
  styleUrls: ['./mission-details.component.css']
})
export class MissionDetailsComponent implements OnInit {

  @Input() mission: Mission;
  @Output() isMissionUpdated = new EventEmitter<boolean>();

  faCookieBite = faCookieBite;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faCheck = faCheck;
  faEdit = faEdit;
  faTimes = faTimes;
  updateMissionForm: FormGroup;
  private submitted = false;
  private isUpdated = false;
  private isNotUpdated = false;
  private isEditToggled = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
     private missionService: MissionService, private missionsComponent: MissionsComponent) {
  }

  ngOnInit() {
    this.updateMissionForm = this.formBuilder.group({
      action: ['', Validators.required],
      biscuits: ['', Validators.required]
    });
  }

  toggleEdit() {
  this.isEditToggled = !this.isEditToggled;
  }

  get f() { return this.updateMissionForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.updateMissionForm.invalid) {
      return;
    }
    this.mission.action = this.updateMissionForm.controls.action.value;
    this.mission.biscuitsToEarn = this.updateMissionForm.controls.biscuits.value;
    if (!this.updateMissionForm.controls.action.value) {
      this.mission.action = this.mission.action;
    }
    if (!this.updateMissionForm.controls.biscuits.value) {
      this.mission.biscuitsToEarn = this.mission.biscuitsToEarn;
    }
    this.missionService.updateMission(this.mission.id, this.mission).subscribe(
      () => {
        this.isUpdated = true;
        this.toggleEdit();
      },
      error => {
        this.isNotUpdated = true;
      }
    );
  }

  deleteMission() {
  this.missionService.deleteMission(this.mission.id).subscribe(
  data => {
    this.isUpdated = true;
    this.isMissionUpdated.emit( this.isUpdated);
	},
  		error => {
        console.log(error);
  			this.isNotUpdated = true;
  		});
  }


  completeMission(mission: Mission) {
    console.log(mission);
    this.missionService.completeMission(mission.id)
      .subscribe(
        () => {
          this.isUpdated = true;
          this.isMissionUpdated.emit( this.isUpdated);
          console.log(this.mission.isDone);
        },
        error => {
          console.log(error);
          this.isNotUpdated = true;
  });
  }

  cancelCompleteMission(mission: Mission) {
    console.log(mission);
    this.missionService.cancelCompleteMission(mission.id)
      .subscribe(
        () => {
          this.isUpdated = true;
          this.isMissionUpdated.emit( this.isUpdated);
          console.log(this.mission.isDone);
        },
        error => {
          console.log(error);
          this.isNotUpdated = true;
  });
  }
}

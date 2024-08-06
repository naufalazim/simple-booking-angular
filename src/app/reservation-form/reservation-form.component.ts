import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {

  reservationForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private Router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestName: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      roomNumber: ['', Validators.required]
    })

    //===== Note: ActivatedRoute basically will keep data when user edit the page/refresh =========
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if(id){
      let reservation = this.reservationService.getReservation(id);
      if(reservation){
        this.reservationForm.patchValue(reservation);
      }
    }

    //===============================================
  }

  onSubmit() {
    if(this.reservationForm.valid){
      let reservation: Reservation = this.reservationForm.value;
      let id = this.activatedRoute.snapshot.paramMap.get("id"); // this line of code it took id from url
      if(id){
        //update
        this.reservationService.updateReservation(id, reservation)
      } else {
        //create new if no id created yet:

        this.reservationService.addReservation(reservation)
      }
      this.Router.navigateByUrl("/list");
      }
    }


  }



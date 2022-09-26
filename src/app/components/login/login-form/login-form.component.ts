import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { HttpClient } from '@angular/common/http';
import { SpotifyAuthService } from '../../../services/spotify.auth'
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderService } from 'src/app/providers/provider-service';
import { LocalstorageService } from 'src/common/local-storage.service';
@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
	sy = faSpotify;
	form: FormGroup;
	email: FormControl = new FormControl("", [Validators.required, Validators.email]);
	password: FormControl = new FormControl("", [Validators.required]);
	date = Date();
	submitted: boolean = false; // show and hide the success message
	isLoading: boolean = false; // disable the submit button if we're loading
	responseMessage: any; // the response message to show to the user
	CLIENT_ID: string = '7ece4bb7979f433ab4a0a604bc2f97b5';
	REDIRECT_URI: string = '/callback'
	constructor(private route: ActivatedRoute,
		private router: Router,
		private democraylistService: ProviderService,
		private localstorageService: LocalstorageService,
		private formBuilder: FormBuilder, 
		private http: HttpClient) {
		this.form = this.formBuilder.group({
			date: this.date,
			email: this.email,
			name: this.password,
		});
	}
	ngOnInit(): void {} 
	onSubmit() {
		if (this.form.status == "VALID") {
			//this.form.disable(); // disable the form if it's valid to disable multiple submissions
			this.isLoading = true; // sending the post request async so it's in progress
			this.submitted = false; // hide the response message on multiple submits
			// db = "messages";
			// this.firestore.collection(`${db}`).add({
			// 	name: this.form.get("name").value,
			// 	email: this.form.get("email").value,
			// 	message: this.form.get("message").value,
			// 	date: this.form.get("date").value,
			// 	html: `<div>From: ${this.form.get("name").value} </div>
			// 		<div>Email: <a href="mailto: ${this.form.get("email").value} "> ${this.form.get("email").value} </a></div>
			// 		<div>Date: ${this.form.get("date").value} </div>
			// 		<div>Message: ${this.form.get("message").value} </div>`
			// }).then((res: any)  => {
			// 	this.responseMessage = `Hi ${this.form.get("name").value}, thank you for your message. I will get back to you as soon.`;
			// 	this.submitted = true; // show the response message
			// 	this.form.reset();
			// 	this.form.enable(); // re enable the form after a success
			// 	this.isLoading = false; // re enable the submit button
			// }).catch((e: any) => {
			// 	this.responseMessage = e;
			// 	this.submitted = true; // show the response message
			// 	this.form.enable(); // re enable the form after a success
			// 	this.isLoading = false; // re enable the submit button
			// })
		}else{
			this.responseMessage = this.form.status;
			this.submitted = true; // show the response message
		}
	}
	authSpotify() {
		this.isLoading = true;
		localStorage.removeItem('access_token');
		this.democraylistService.getSpotifyAuthUrl().subscribe(response => {
      		window.open(response.url, '_self');
    	});
	}
}
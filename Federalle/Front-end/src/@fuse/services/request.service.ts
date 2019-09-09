import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import { tap } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class RequestService {

	previousUrl: any;
	backUrl: any;
	
	url = 'http://federalle-api.azurewebsites.net/' ;
	currentUser = localStorage.getItem('currentUser');
	reqOpts: any = {
		params: new HttpParams(),
		headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};
	constructor(private httpClient: HttpClient,
				private router: Router) 
			{
		router.events.filter(event => event instanceof NavigationEnd)
			.subscribe(e => {
				// console.log('prev:', this.previousUrl);
				this.backUrl = this.previousUrl
				this.previousUrl = e['url'];
				// console.log(this.previousUrl)
			});
	}

	getBackUrl() {
		return this.backUrl;
	}

	server(target, type, form?, url?, file?): Observable<any> {

		if (form) {
			if (type == 'get') {
				this.reqOpts.params = form;
			} else {
				this.reqOpts = form;
			}
		}
		if (file) {
			let input = new FormData();
			for (let i in form) {
				console.log(i, form[i])
				if (i != 'file') input.append(i, form[i]);
			}
			console.log('prepareSave', file)
			input.append('file', file);
			this.reqOpts = input;

		}

		const path = (url ? url : 'http://federalle-api.azurewebsites.net');
		console.log('this.path', path)
		console.log('this.reqOpts', this.reqOpts)
		return this.httpClient[type](path + target, this.reqOpts)
		
	}
	extractData(res: Response) {
		let body = res.json();
	}

	search(name): Observable<any> {
		const path = this.url + '/api/find'
		return this.httpClient['post'](path, { part: name })
			.pipe(
				tap((response: any) => {
					console.log('response do search', response)
					return response;
				})
			);
	}

	handleError(error: any) {
		let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
		console.error(errMsg);
		return Observable.throw(errMsg);
	}



}
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class CepService {

  constructor(private http: HttpClient) {}

	buscaCep(cep: string){
		console.log('buscar cep ~~>', cep)
			if(cep != ""){
				let validacep = /^[0-9]{8}$/;
				if(validacep.test(cep)){
				return this.http.get(`https://viacep.com.br/ws/${cep}/json/`)
				// .catch((e)=>{
				// 	//console.log('Errro cep', e)
				// 	return e;

				// })
				}
				return of (true);
			}
	}

}

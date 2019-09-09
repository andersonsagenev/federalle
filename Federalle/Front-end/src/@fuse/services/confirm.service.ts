import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import Swal from 'sweetalert2'
import { resolve } from 'path';
declare var $: any;


@Injectable()
export class ConfirmService {

    customClass: any;

    SwalConfirm(title?, text?, type?) {
        return new Promise((resolve) => {
            !title ? title = 'Você tem certeza?' : '';
            !text ? text = "deseja realmente excluir o item!" : '';
            !type ? type = 'warning' : '' ;
            Swal.fire({
                title: title,
                text: text,
                type: type,
                cancelButtonColor: '#feb164',
                confirmButtonColor: '#28a745',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
                showCancelButton: true,
            }).then(function (result) {
                if (result.value) {
                    Swal.fire({
                        title: 'Removido!',
                        text: 'Registro excluído com sucesso.',
                        type: 'success',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(() => {
                resolve(false);
            }
            );
            return;
        })
    }
    SwalDelete() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Registro excluído com sucesso',
            type: 'success',
            confirmButtonText: 'Fechar'
        })
    }
    SwalInsert() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro executado com sucesso',
            type: 'success',
            showConfirmButton: false,
            timer: 1000
        })
    }
    SwalUpdate() {
        Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro atualizado com sucesso',
            type: 'success',
            showConfirmButton: false,
            timer: 1000
        })
    }
    SwalMessage(type?, title?, text?) {
        !type ? type = 'success' : '';
        !title ? title = 'Sucesso!' : '';
        !text ? text = 'executado com sucesso' : '';
        Swal.fire({
            title: title,
            text: text,
            type: type,
            confirmButtonText: 'Fechar'
        })
    }
    SwalError(title?, text?) {
        !title ? title = 'Erro' : '';
        !text ? text = 'Erro ao executar o comando' : '';
        Swal.fire({
            title: title,
            text: text,
            type: 'error',
            confirmButtonText: 'Fechar'
        })
    }
    SwalCleanCep() {
        Swal.fire({
            title: 'Alerta!',
            text: 'Informe um cep válido para consulta',
            type: 'info',
            confirmButtonText: 'Fechar'
        })
    }
    
}

import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HomeService {
    private datos = new BehaviorSubject<Array<any>>([]);;
  
    BehaviorSubject
    datoPedido= this.datos.asObservable();
    private actualizar = new BehaviorSubject<String>('');;

    actualizarPedido= this.actualizar.asObservable();
   

    constructor(private http: HttpClient) { }

    public getData() {
      return this.http.get('https://fvwzxk56cg.execute-api.us-east-1.amazonaws.com/mock/productos');
    }

    datosPedido(dato:any) {
        this.datos.next(dato);
    }
    actualizarPedidos(value:any) {
        this.actualizar.next(value);
    }

    guardarLocalStorage(pedido){
        
     
        var products=[]; 
        products=JSON.parse(localStorage.getItem("Productos"));
        console.log(products)
        if (products==null){
            products=[];
            products.push(JSON.parse(localStorage.getItem('Productos')));
            localStorage.setItem('Productos', JSON.stringify(products));
        }
        products.push(pedido);
        localStorage.setItem('Productos',JSON.stringify(products) );
        
      
        
    }
}
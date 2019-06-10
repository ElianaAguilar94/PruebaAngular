import { Component ,OnInit} from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

import { DialogService } from "ng2-bootstrap-modal";
import { ConfirmComponent } from '../modal/modal.component';
import { DetalleComponent } from '../detalleProducto/detalle.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    public productosCatalogo:any=[];

    constructor(private homeService:HomeService,private router:Router,private dialogService:DialogService){

    }

    ngOnInit(){
        this.homeService.getData().subscribe(response => { 
            this.productosCatalogo=response;
            
        }); 
       //localStorage.clear();
    }
    public comprarProducto(producto){
        if(producto.cantidadDisponible<=0){  
            this.showConfirm();
        }else{
            this.homeService.datosPedido(producto);
            this.router.navigate(['/home/comprar/'])
        }
    }

    public verproducto(item){
        let disposable = this.dialogService.addDialog(DetalleComponent, {
            title:'Detalle del producto: ' + item.descripcion, 
            img: item.imagen})
    }

    showConfirm() {
        let disposable = this.dialogService.addDialog(ConfirmComponent, {
            title:'Advertencia', 
            message:'Este producto no tiene disponibilidad'})
    }

}
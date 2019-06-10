import { Component ,OnInit} from '@angular/core';
import { LocalDataSource, Cell } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { EditarComponent } from '../editar/editar.component';
import { HomeService } from '../Home/home.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})

export class PedidoComponent {
    itemSource: LocalDataSource;
    public pedidosGuardados:any=[];
    public datosTabla:any=[];
    public count:number=0;
    public id_pedido:string;
    

    public Settings = { //tabla eventos
        selectMode: 'single',
        hideHeader: false,
        hideSubHeader: true,
        delete: {
          confirmDelete: true
        },
        actions: {
          columnTitle: 'Opciones',
          add: false,
          edit: false,
          delete: false,
          custom: [
            {
              name: 'edit-button',
              title: '<i title= "Editar" >Editar</i>'
            },
          ],
          position: 'right'
        },
        noDataMessage: 'No hay registros para mostrar',
        columns: {
         idPedido: {
            title: 'Id Producto',
            type: 'string',
            filter: false
          },
          categoia: {
            title: 'Categoria',
            type: 'string',
            filter: false
          },
          nombre: {
            title: 'Producto',
            type: 'string',
            filter: false
          },
          precio: {
            title: 'Precio',
            type: 'string',
            filter: true
          },
          
        },
        pager: {
          display: true,
          perPage: 10
        }
      };

    constructor(private homeService:HomeService,private router:Router,private dialogService:DialogService){
        this.pedidosGuardados=JSON.parse(localStorage.getItem("Productos"));
        
    }

    ngOnInit(){
        this.mostarDatos();
    }


    public mostarDatos(){
        if (this.pedidosGuardados[0]==null){
            this.pedidosGuardados.splice(0,1)
        }
      
        this.datosTabla=this.pedidosGuardados.map(pedido=>{
            return{
                nombre:pedido.producto.descripcion,
                idPedido:pedido.idpedido,
                categoia:pedido.producto.categoria,
                precio:pedido.producto.precio
            }  
        })
        this.count=this.datosTabla.length
        this.itemSource = new LocalDataSource(this.datosTabla);
    }

    public onRowCustomButton(event): void {
        this.homeService.actualizarPedido.subscribe(edicion => { 
            this.mostarDatos();
        });
        if (event.action === 'edit-button') {
            this.pedidosGuardados.forEach(pedido=>{
               if(pedido.idpedido==event.data.idPedido){
                let disposable = this.dialogService.addDialog(EditarComponent, {
                    nombreUsuario:pedido})
               }             
            })
        }
        
    }

    public volverInicio(){
        this.router.navigate(['/home/'])
    }
    public busquedaId(){
        let encontrado:boolean=false;
        this.datosTabla.forEach((id,x) => {
           if(id.idPedido==this.id_pedido){
               let dato=[this.datosTabla[x]]
              this.itemSource = new LocalDataSource(dato);
              this.count=dato.length
              encontrado=true;
           }
        });
        if(!encontrado){
            let dato=[]
            this.itemSource = new LocalDataSource(dato);
            this.count=dato.length
        }
        if(this.id_pedido==''){
            this.mostarDatos();
        }
        encontrado=false;
    }

    public limpiarId(){
        this.id_pedido='';
        this.mostarDatos();
    }
}
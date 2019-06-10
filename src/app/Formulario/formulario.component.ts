import { Component ,OnInit, Input} from '@angular/core';
import { HomeService } from '../Home/home.service';
import { FormGroup,FormBuilder, FormControl,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})

export class FormularioComponent {
    public productoComprar:any=[];
    public formPedido: FormGroup;
    public nombre: FormControl;
    public img:any=[];
    public cargaCorrecta:boolean=false;
    public invalidoForm:boolean=false;
    public editando:boolean=false;

    @Input() datosEdicionUsuario;
    
    constructor(private homeService:HomeService,private formBuilder: FormBuilder, private router:Router){
        this.homeService.datoPedido.subscribe(eventoEditar => { 
            this.productoComprar=eventoEditar
        });
        this.formPedido = this.formBuilder.group({
            'nombre': ['',Validators.required],
            'fecha':['',Validators.required],
            'direccion':['',Validators.required],
            'cuidad':['',Validators.required],
        });
    
    }

    ngOnInit(){
        var URLactual = window.location
        if (URLactual.pathname=='/home/comprar'){
            this.editando=false;
        }else if(URLactual.pathname=='/home/pedido'){
            this.editando=true;
            this.formPedido = this.formBuilder.group({
                'nombre': [this.datosEdicionUsuario.nombre,Validators.required],
                'fecha':[this.datosEdicionUsuario.fecha,Validators.required],
                'direccion':[this.datosEdicionUsuario.direccion,Validators.required],
                'cuidad':[this.datosEdicionUsuario.cuidad,Validators.required],
            });
            this.img=this.datosEdicionUsuario.imagen
        }
        
    }


    public confirmarPedido(){

        if(this.cargaCorrecta && this.formPedido.valid){
            this.invalidoForm=false;
            let id =Math.floor(Math.random()*99999999999999999999);
            let datosUsuario={
                "nombre":this.formPedido.value.nombre,
                "fecha":this.formPedido.value.fecha,
                "direccion":this.formPedido.value.direccion,
                "cuidad":this.formPedido.value.cuidad,
                "imagen":this.img,
                "idpedido":id,
                "producto":this.productoComprar,
            }
            this.homeService.guardarLocalStorage(datosUsuario);
           // localStorage.setItem('Productos', JSON.stringify(datosUsuario));
            this.router.navigate(['/home/final/'])
        }else {
            this.invalidoForm=true;
        }

       
    }
    public volverInicio(){
        this.router.navigate(['/home/'])
    }
    public cargandoImagen(files: FileList){
        this.img=Object.keys(files).map(function(key) {return files[key]; })
        let sizeImagen=this.img[0].size
        let tipoImagen=this.img[0].type.split("/")

        if(tipoImagen[1]=='pdf' && sizeImagen<=1000000){
            this.cargaCorrecta=true
        }
        this.img=[{ "nombreImg": this.img[0].name,
                   "tipoimg":this.img[0].type,
                   "sizeImg":this.img[0].size
        }]
        
    }
    public guardarCambiosEdicion(){

        if(this.cargaCorrecta && this.formPedido.valid){
            this.invalidoForm=false;
            var products=[]; 
            products=JSON.parse(localStorage.getItem("Productos"));    
            products.map(datos=>{
                if(datos.idpedido==this.datosEdicionUsuario.idpedido){
                    datos.nombre=this.formPedido.value.nombre;
                    datos.fecha=this.formPedido.value.fecha;
                    datos.direccion=this.formPedido.value.direccion;
                    datos.cuidad=this.formPedido.value.cuidad
                }
            })
            localStorage.setItem('Productos',JSON.stringify(products) );

            this.homeService.actualizarPedidos('si');

        }else {
            this.invalidoForm=true;
        }

    }
   
}
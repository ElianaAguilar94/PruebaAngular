import { Component ,OnInit, Input} from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal"
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface ConfirmModel {
    nombreUsuario:any;
    
}

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})

export class EditarComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    nombreUsuario:any;
    public formPedido: FormGroup;
    @Input()  datosEdicion ;
    
    constructor(dialogService: DialogService, private formBuilder: FormBuilder) {
      super(dialogService);

      this.formPedido = this.formBuilder.group({
        'nombre': ['',Validators.required],
        'fecha':['',Validators.required],
        'direccion':['',Validators.required],
        'cuidad':['',Validators.required],
        });
     
    }
    ngOnInit(){
        this.datosEdicion=this.nombreUsuario
    }


}
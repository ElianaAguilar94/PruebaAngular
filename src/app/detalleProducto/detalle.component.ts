import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal"

export interface ConfirmModel {
    img:any;
    title:string;
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})

export class DetalleComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
    img:any;
    title:string;
    
    constructor(dialogService: DialogService) {
      super(dialogService);
    }

}
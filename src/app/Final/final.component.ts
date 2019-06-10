import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})

export class FinalComponent {
   
    constructor(private router:Router){
    }

    ngOnInit(){
    }
    
    public volverInicio(){
        this.router.navigate(['/home/'])
    }
   
}
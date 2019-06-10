import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Home/home.component';
import { HomeService } from './Home/home.service';
import { HttpClientModule } from '@angular/common/http';
import { FormularioComponent } from './Formulario/formulario.component';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinalComponent } from './Final/final.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { ConfirmComponent } from './modal/modal.component';
import { DetalleComponent } from './detalleProducto/detalle.component';
import { HeaderComponent } from './header/header.component';
import { PedidoComponent } from './pedidos/pedido.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditarComponent } from './editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormularioComponent,
    FinalComponent,
    ConfirmComponent,
    DetalleComponent,
    HeaderComponent,
    PedidoComponent,
    EditarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BootstrapModalModule,
    BootstrapModalModule.forRoot({container:document.body}),
    Ng2SmartTableModule
  ],
  entryComponents: [
    ConfirmComponent,
    DetalleComponent,
    EditarComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

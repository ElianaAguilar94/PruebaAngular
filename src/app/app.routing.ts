import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';
import { HomeComponent } from './Home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { FormularioComponent } from './Formulario/formulario.component';
import { FinalComponent } from './Final/final.component';
import { PedidoComponent } from './pedidos/pedido.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home' ,component:HomeComponent},
  { path: 'home/comprar' ,component:FormularioComponent},
  { path: 'home/final' ,component: FinalComponent},
  { path: 'home/pedido' ,component: PedidoComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
   // useHash: true
});

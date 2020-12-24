import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmpleadosComponent } from './components/create-empleados/create-empleados.component';
import { ListEmpleadosComponent } from './components/list-empleados/list-empleados.component';

const routes: Routes = [
  /*Para inicializar nuestra vista directamente viendo la lista de usuarios*/
  {path:'', redirectTo: 'lista-empleados', pathMatch: 'full'}, 
  {path:'lista-empleados', component: ListEmpleadosComponent},
  {path:'crear-empleado', component: CreateEmpleadosComponent},
  /*En caso de no encontrar o ingresar una url erronea redirecciona a la vista lista-empleados*/ 
  {path:'**', redirectTo: 'lista-empleados', pathMatch: 'full'}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

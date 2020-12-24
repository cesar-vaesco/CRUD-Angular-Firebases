import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../service/empleado.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-list-empleados',
  templateUrl: './list-empleados.component.html',
  styleUrls: ['./list-empleados.component.css']
})
export class ListEmpleadosComponent implements OnInit {
  empleados: any[] =[];
  public page: number;

  constructor(private _empleadoService: EmpleadoService,
              private toastr: ToastrService
    ) { 
      /*Declarada dentro del constructor*/ 
    this.page = 0;
  }

  ngOnInit(): void {
    this.getEmpleados();
  }

  getEmpleados(){
    this._empleadoService.getEmpleados().subscribe(data => {
      //console.log(data);
      this.empleados =[];
      data.forEach((element:any) => {
        //console.log(element.payload.doc.id);
        //console.log(element.payload.doc.data());
        this.empleados.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
     // console.log(this.empleados);
    })
  }

  eliminarEmpleado(id: string){
    this._empleadoService.eliminarEmpleado(id).then(()=>{
      this.toastr.error(
        'El empleado fue eliminado con éxito...!!! ',
        'Registro eliminado',
        {
          positionClass: 'toast-bottom-right'
        }
      ); 
      console.log('Empleado eliminado con éxito');
    }).catch(error =>{
      console.log(error);
    })
  }

}

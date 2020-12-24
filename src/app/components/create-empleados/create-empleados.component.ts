import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../service/empleado.service';

@Component({
  selector: 'app-create-empleados',
  templateUrl: './create-empleados.component.html',
  styleUrls: ['./create-empleados.component.css'],
})
export class CreateEmpleadosComponent implements OnInit {
  /**
   * PErmite conectar con el formulario del html
   */
  createEmpleado: FormGroup;
  submitted = false;
  loading = false;
  id: string | null;
  titulo: string = '';
  aceptar: string =''; 

  /**CONSTRUCTOR */
  constructor(
    private fb: FormBuilder,
    /*Se importa el servicio */
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
    /*Variable que permite tomar el id que se muestra en la url cuando consultamos un registro para editar*/
    this.id = this.aRoute.snapshot.paramMap.get('id');
    //console.log(this.id);
  }

  ngOnInit(): void {
    this.editarEmpleado();
    if (this.id == null) {
      this.titulo = 'Agregar Empleado';
      this.aceptar = 'Agregar'
    }
   
  }

  agregarEmpleado() {
    /*Se cambia el estado de submmited*/
    this.submitted = true;
    /*En caso de que al llenar el formulario los datos vayan vacios, el formulario se invalida */
    if (this.createEmpleado.invalid) {
      return;
    }

    const empleado: any = {
      nombre: this.createEmpleado.value.nombre,
      apellido: this.createEmpleado.value.apellido,
      documento: this.createEmpleado.value.documento,
      salario: this.createEmpleado.value.salario,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
    };
    this.loading = true;
    this._empleadoService
      .agregarEmpleado(empleado)
      .then(() => {
        this.toastr.success(
          'El empleado ' + empleado.nombre + ' fue registrado con éxito...!!! ',
          'Empleado registrado',
          {
            positionClass: 'toast-bottom-right',
          }
        );
        this.loading = false;
        console.log('Empleado registrado con éxito!!!!');
        this.router.navigate(['/lista-empleados']);
      })
      .catch((error) => {
        console.log(error);
        this.loading = false;
      });
  }

  editarEmpleado() {
    this.titulo = 'Editar Empleado';
    this.aceptar = 'Editar'
    if (this.id != null) {
      this.loading = true;
      this._empleadoService.editarEmpleado(this.id).subscribe((data) => {
        this.loading = false;
        console.log(data.payload.data()['nombre']);
        /*Método que permite llenar con los datos los campos para conocer los datos a editar*/
        this.createEmpleado.setValue({
          nombre: data.payload.data()['nombre'],
          apellido: data.payload.data()['apellido'],
          documento: data.payload.data()['documento'],
          salario: data.payload.data()['salario'],
        });
      });
    }
  }
}

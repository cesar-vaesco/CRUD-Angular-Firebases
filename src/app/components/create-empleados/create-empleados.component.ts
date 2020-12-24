import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  /**CONSTRUCTOR */
  constructor(
    private fb: FormBuilder,
    /*Se importa el servicio */
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.createEmpleado = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required],
      salario: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
          'El empleado fue registrado con éxito...!!!',
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
}

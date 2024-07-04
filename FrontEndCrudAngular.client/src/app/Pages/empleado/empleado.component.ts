import { ChangeDetectionStrategy, Component, Directive, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter, MAT_DATE_FORMATS,} from '@angular/material/core';
import { CommonModule } from '@angular/common'; 
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';
import { ResponseAPI } from '../../Models/ResponseAPI';
import {MatSelectModule} from '@angular/material/select';
import { DepartamentoService } from '../../Services/departamento.service';
import { Departamento } from '../../Models/Departamento';

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy',
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'dd/MM/yyyy',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};


@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatSelectModule
    ,MatInputModule,MatDatepickerModule,CommonModule],
  providers: [provideNativeDateAdapter(),
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class EmpleadoComponent implements OnInit{
  
  @Input('intId') intIdEmpleado!:number;
  private objDepartamentoService = inject(DepartamentoService);
  public objListDepartamento:Departamento[] = [];
  private objEmpleadoService = inject(EmpleadoService);
  public objDepartamento!:Departamento;
  public objFormBuild = inject(FormBuilder);

  public objFormEmpleado:FormGroup =this.objFormBuild.group({
    strNombreCompleto:[''],
    strEstado:[''],
    strCorreo:[''],
    dcSalario:[0],
    intDepartamentoId:[0],
    dtFechaIngreso:[new Date()],
    dtFechaModificacion:[''],
  });

  obtenerDepartamentos(): void {
    this.objDepartamentoService.getListaDepartamento().subscribe({
      next: (data: Departamento[]) => {
        if (data.length > 0) {
          console.log(data);
          this.objListDepartamento = data;
        } else {
          alert("No se encontraron departamentos.");
        }
      },
      error: (err: any) => {
        console.error('Error al obtener departamentos:', err.message);
      }
    });
  }
  constructor(private objRouter:Router ){}
  
  ngOnInit(): void {
    this.obtenerDepartamentos();
      if(this.intIdEmpleado != 0)
        {
          this.objEmpleadoService.obtenerEmpleado(this.intIdEmpleado)
          .subscribe(
            {
              next:(data:Empleado) =>{
                this.objFormEmpleado.patchValue({
                  strNombreCompleto:data.strNombreCompleto,
                  strEstado:data.strEstado,
                  strCorreo:data.strCorreo,
                  dcSalario:data.dcSalario,
                  dtFechaIngreso:data.dtFechaIngreso,
                  intDepartamentoId:data.intDepartamentoId,
                });
          const departamentoSeleccionado = this.objListDepartamento.find(dep => dep.intIdDepartamento == this.objFormEmpleado.value.intDepartamentoId);
          if (departamentoSeleccionado !== undefined) {
            this.objDepartamento = departamentoSeleccionado;
          }
              },
              error:(err:any)=>{
                console.log(err.message);
              }
            }
          );
        }

  };

  guardar(){
    const objEmpleado:Empleado =
    {
    intId: Number(this.intIdEmpleado),
    strNombreCompleto:this.objFormEmpleado.value.strNombreCompleto,
    intDepartamentoId:this.objFormEmpleado.value.intDepartamentoId,
    strEstado:this.objFormEmpleado.value.strEstado,
    strCorreo:this.objFormEmpleado.value.strCorreo,
    dcSalario:this.objFormEmpleado.value.dcSalario,
    dtFechaIngreso:this.objFormEmpleado.value.dtFechaIngreso,
    dtFechaModificacion:null
    }
    if(this.intIdEmpleado == 0 )
      {
        console.log(objEmpleado);
        this.objEmpleadoService.crearEmpleado(objEmpleado)
      .subscribe(
        {
          next:(data:ResponseAPI) =>{
            console.log(data);
            if(data.isSuccess){
              this.volver();
            }else{
              alert("Error al crear ");
            }
          },
          error:(err:any)=>{
            
          console.log(err);
            console.log(err.message);
          }
        });
      }
      else
      {
        console.log(objEmpleado);
        this.objEmpleadoService.editarEmpleado(objEmpleado)
      .subscribe(
        {
          next:(data:ResponseAPI) =>{
            if(data.isSuccess){
              this.volver();
            }else{
              alert("Error al actualizar ");
            }
          },
          error:(err:any)=>{
            console.log(err.message);
          }
        });

      }

  };

volver()
{
  this.objRouter.navigate(["/"]);
};

}

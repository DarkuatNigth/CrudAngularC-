import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { EmpleadoService } from '../../Services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../Models/Empleado';
import { ResponseAPI } from '../../Models/ResponseAPI';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [ReactiveFormsModule,MatButtonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent implements OnInit{

  @Input('intId') intIdEmpleado!:number;
  private objEmpleadoService = inject(EmpleadoService);
  public objFormBuild = inject(FormBuilder);

  public objFormEmpleado:FormGroup =this.objFormBuild.group({
    strNombreCompleto:[''],
    strEstado:[''],
    strCorreo:[''],
    dcSalario:[0],
    intDepartamentoId:[1],
    dtFechaIngreso:[''],
    dtFechaModificacion:[''],
  });

  constructor(private objRouter:Router){}
  
  ngOnInit(): void {
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
    intId: this.intIdEmpleado,
    strNombreCompleto:this.objFormEmpleado.value.strNombreCompleto,
    intDepartamentoId:this.objFormEmpleado.value.intDepartamentoId,
    strEstado:this.objFormEmpleado.value.strEstado,
    strCorreo:this.objFormEmpleado.value.strCorreo,
    dcSalario:this.objFormEmpleado.value.dcSalario,
    dtFechaIngreso:'',
    dtFechaModificacion:''
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

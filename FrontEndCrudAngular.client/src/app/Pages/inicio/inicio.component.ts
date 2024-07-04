import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';
import { ResponseAPI } from '../../Models/ResponseAPI';
import { Departamento } from '../../Models/Departamento';
import { DepartamentoService } from '../../Services/departamento.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule,CommonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private objEmpleadoService = inject(EmpleadoService);
  public objListaEmpleado:Empleado[] = [];
  private objDepartamentoService = inject(DepartamentoService);
  public objListDepartamento:Departamento[] = [];
  public objDisplayedColumns: string[] = ["nombreEmpleado", "correo", "salario","departamento", "fechaIngreso","estado","Accion"];
  constructor(private objRouter:Router)
  {
    this.obtenerDepartamentos();
    this.obtenerEmpleados();
  }

  
  nuevo()
  {
    this.objRouter.navigate(["/empleado",0]);
  }

  
  editar(objEmpleado: Empleado)
  {
    this.objRouter.navigate(["/empleado",objEmpleado.intId]);
  }

  
  eliminar(objEmpleado: Empleado)
  {
    if(confirm("¿Desea Eliminar al empleado? \n" + objEmpleado.strNombreCompleto))
      {
        this.objEmpleadoService.eliminarEmpleado(objEmpleado.intId).subscribe(
          {
            next: (data: ResponseAPI) => {
                if(data.isSuccess)
                  {
                    this.obtenerEmpleados();
                  }
            },
            error: (err: any) => {
              console.log(err.message);
            }
          });
      }
  }

  obtenerNombreDepartamento(intValor:number)
  { 
    const objDepartamento = this.objListDepartamento.find(obj => obj.intIdDepartamento === intValor);
    return objDepartamento?.strNombreDepartamento;
  }
  obtenerEmpleados(){
    this.objEmpleadoService.getLista().subscribe(
      {
        next: (data: Empleado[]) => {
            if(data.length >0)
              {
                console.log(data);
                this.objListaEmpleado = data;
              }else
              {
                alert("No se pudo eliminar el empleado.");
              }
        },
        error: (err: any) => {
          console.log(err.message);
        }
      })
  }

  
  obtenerDepartamentos(): void {
    this.objDepartamentoService.getListaDepartamento().subscribe({
      next: (data: Departamento[]) => {
        if (data.length > 0) {
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

}

import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpleadoService } from '../../Services/empleado.service';
import { Empleado } from '../../Models/Empleado';
import { Router } from '@angular/router';
import { ResponseAPI } from '../../Models/ResponseAPI';



@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  private objEmpleadoService = inject(EmpleadoService);
  public objListaEmpleado:Empleado[] = [];
  public objDisplayedColumns: string[] = ["nombreEmpleado", "correo", "salario", "fechaIngreso","fechaModificacion","estado","Accion"];
  constructor(private objRouter:Router)
  {
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

}

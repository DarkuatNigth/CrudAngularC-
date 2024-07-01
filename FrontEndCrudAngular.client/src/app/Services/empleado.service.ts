import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appSetting } from '../Settings/app.setting';
import { Empleado } from '../Models/Empleado';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private apiUrl: string = appSetting.apiUrl + "empleado";

  constructor(private http: HttpClient) { }

  getLista() {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtenerEmpleado(intIdEmpleado: number) {
    return this.http.get<Empleado>(`${this.apiUrl}/${intIdEmpleado}`);
  }

  crearEmpleado(objEmpleado: Empleado) {
    return this.http.post<ResponseAPI>(this.apiUrl, objEmpleado);
  }

  editarEmpleado(objEmpleado: Empleado) {
    return this.http.put<ResponseAPI>(this.apiUrl, objEmpleado);
  }

  eliminarEmpleado(intIdEmpleado: number) {
    return this.http.delete<ResponseAPI>(`${this.apiUrl}/${intIdEmpleado}`);
  }
}

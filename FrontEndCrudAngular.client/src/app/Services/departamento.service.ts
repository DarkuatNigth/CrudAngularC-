import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appSetting } from '../Settings/app.setting';
import { Empleado } from '../Models/Empleado';
import { ResponseAPI } from '../Models/ResponseAPI';
import { Departamento } from '../Models/Departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl: string = appSetting.apiUrl + "departamento";

  constructor(private http: HttpClient) { }

  getListaDepartamento() {
    return this.http.get<Departamento[]>(this.apiUrl);
  }
}

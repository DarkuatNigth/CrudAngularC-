export interface Empleado 
{
    intId: number,
	strNombreCompleto:string,
	intDepartamentoId:number,
	strEstado:string,
	strCorreo:string,
	dcSalario:number,
    dtFechaIngreso:Date,
    dtFechaModificacion:Date | null
}
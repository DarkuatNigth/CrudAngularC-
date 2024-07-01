using BackEndCrudAngular.Server.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;

namespace BackEndCrudAngular.Server.Models.Data
{
    public class EmpleadoData
    {
        private readonly string _objConexion;

        public EmpleadoData(IConfiguration objConfiguration)
        {
            _objConexion = objConfiguration.GetConnectionString("CadenaConSql")!;
        }

        public async Task<List<Empleado>> obtenerListaEmpleado() 
        {
            List<Empleado> objListEmpleado = null;

            using (var objConexion = new SqlConnection(_objConexion)) 
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_listaEmpleados", objConexion);
                objComando.CommandType = CommandType.StoredProcedure;

                using (var objReader = await objComando.ExecuteReaderAsync())
                {
                    objListEmpleado = new List<Empleado>();
                    while (await objReader.ReadAsync()) 
                    {
                        objListEmpleado.Add(AsignarEmpleado(objReader));
                    }
                }
            }

             return objListEmpleado;
        }

        public async Task<Empleado> obtenerEmpleado(int intIdEmpleado)
        {
            Empleado objEmpleado = null;

            using (var objConexion = new SqlConnection(_objConexion))
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_obtenerEmpleado", objConexion);
                objComando.Parameters.AddWithValue("@IdEmpleado", intIdEmpleado);
                objComando.CommandType = CommandType.StoredProcedure;

                using (var objReader = await objComando.ExecuteReaderAsync())
                {
                    while (await objReader.ReadAsync())
                    {
                        objEmpleado = AsignarEmpleado(objReader);
                    }
                }
            }

            return objEmpleado;
        }

        public async Task<bool> crearEmpleado(Empleado objNuevoEmpleado)
        {
            bool blEstadoProceso = false;

            using (var objConexion = new SqlConnection(_objConexion))
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_crearEmpleado", objConexion);
                objComando.Parameters.AddWithValue("@NombreCompleto", objNuevoEmpleado.strNombreCompleto);
                objComando.Parameters.AddWithValue("@DepartamentoId", objNuevoEmpleado.intDepartamentoId);
                objComando.Parameters.AddWithValue("@Correo", objNuevoEmpleado.strCorreo);
                objComando.Parameters.AddWithValue("@Sueldo", objNuevoEmpleado.dcSalario);
                objComando.Parameters.AddWithValue("@FechaContrato", objNuevoEmpleado.dtFechaIngreso);
                objComando.CommandType = CommandType.StoredProcedure;

                try 
                {
                    blEstadoProceso = await objComando.ExecuteNonQueryAsync() > 0 ? true :false;
                }
                catch (Exception objExcepcion) 
                {
                    blEstadoProceso = false ;
                }
            }

            return blEstadoProceso;
        }


        public async Task<bool> editarEmpleado(Empleado objNuevoEmpleado)
        {
            bool blEstadoProceso = false;

            using (var objConexion = new SqlConnection(_objConexion))
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_editarEmpleado", objConexion);
                objComando.Parameters.AddWithValue("@IdEmpleado", objNuevoEmpleado.intId);
                objComando.Parameters.AddWithValue("@NombreCompleto", objNuevoEmpleado.strNombreCompleto);
                objComando.Parameters.AddWithValue("@DepartamentoId", objNuevoEmpleado.intDepartamentoId);
                objComando.Parameters.AddWithValue("@Correo", objNuevoEmpleado.strCorreo);
                objComando.Parameters.AddWithValue("@Sueldo", objNuevoEmpleado.dcSalario);
                objComando.Parameters.AddWithValue("@FechaContrato", objNuevoEmpleado.dtFechaIngreso);
                objComando.CommandType = CommandType.StoredProcedure;

                try
                {
                    blEstadoProceso = await objComando.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception objExcepcion)
                {
                    blEstadoProceso = false;
                }
            }

            return blEstadoProceso;
        }

        public async Task<bool> eliminarEmpleado(int intIdEmpleado)
        {
            bool blEstadoProceso = false;

            using (var objConexion = new SqlConnection(_objConexion))
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_eliminarEmpleado", objConexion);
                objComando.Parameters.AddWithValue("@IdEmpleado", intIdEmpleado);
                objComando.CommandType = CommandType.StoredProcedure;

                try
                {
                    blEstadoProceso = await objComando.ExecuteNonQueryAsync() > 0 ? true : false;
                }
                catch (Exception objExcepcion)
                {
                    blEstadoProceso = false;
                }
            }

            return blEstadoProceso;
        }
        public Empleado AsignarEmpleado(SqlDataReader objReader)
        {
            Empleado objEmpleado = new Empleado()
            {
                intId = Convert.ToInt32(objReader["Id"]),
                strNombreCompleto = objReader["nombreEmpleado"].ToString()!,
                intDepartamentoId = Convert.ToInt32(objReader["departamentoId"]),
                strEstado = objReader["estado"].ToString()!,
                strCorreo = objReader["correo"].ToString()!,
                dcSalario = Convert.ToDecimal(objReader["salario"].ToString()!),
                dtFechaIngreso = objReader["fechaIngreso"] == DBNull.Value ? (DateTime?)null : 
                DateTime.Parse(objReader["fechaIngreso"].ToString()!),
                dtFechaModificacion = objReader["fechaModificacion"] == DBNull.Value ? (DateTime?)null :
                DateTime.Parse(objReader["fechaModificacion"].ToString()!),

            };
            return objEmpleado;
        }
    }
}

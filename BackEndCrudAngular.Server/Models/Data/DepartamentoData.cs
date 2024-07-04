using BackEndCrudAngular.Server.Models;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Data.SqlTypes;

namespace BackEndCrudAngular.Server.Models.Data
{
    public class DepartamentoData
    {
        private readonly string _objConexion;

        public DepartamentoData(IConfiguration objConfiguration)
        {
            _objConexion = objConfiguration.GetConnectionString("CadenaConSql")!;
        }

        public async Task<List<Departamento>> obtenerListaDepartamento() 
        {
            List<Departamento> objListDepartamento = null;

            using (var objConexion = new SqlConnection(_objConexion)) 
            {
                await objConexion.OpenAsync();
                SqlCommand objComando = new SqlCommand("sp_listaDepartamentos", objConexion);
                objComando.CommandType = CommandType.StoredProcedure;

                using (var objReader = await objComando.ExecuteReaderAsync())
                {
                    objListDepartamento = new List<Departamento>();
                    while (await objReader.ReadAsync()) 
                    {
                        objListDepartamento.Add(AsignarDepartamento(objReader));
                    }
                }
            }

             return objListDepartamento;
        }

        public Departamento AsignarDepartamento(SqlDataReader objReader)
        {
            Departamento objDepartamento = new Departamento()
            {
                intIdDepartamento = DBNull.Value.Equals(objReader["Id"]) ? 0 :
                Convert.ToInt32(objReader["Id"].ToString()),
                strNombreDepartamento = DBNull.Value.Equals(objReader["nombreDepartamento"]) ? " ":
                objReader["nombreDepartamento"].ToString()!,
                strEstado = DBNull.Value.Equals(objReader["estado"]) ? " " :
                objReader["estado"].ToString()!,
                dtFechaCreacion = DBNull.Value.Equals(objReader["fechaCreacion"]) ? (DateTime?)null :
                DateTime.Parse(objReader["fechaCreacion"].ToString()!),
                dtFechaModificacion = DBNull.Value.Equals(objReader["fechaModificacion"]) ? (DateTime?)null :
                DateTime.Parse(objReader["fechaModificacion"].ToString()!),
            };
            return objDepartamento;
        }
    }
}

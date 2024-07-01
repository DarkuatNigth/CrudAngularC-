using Microsoft.Data.SqlClient;

namespace BackEndCrudAngular.Server.Models
{
    public class Empleado
    {
        public int intId { get; set; }
        public int intDepartamentoId { get; set; }
        public string strNombreCompleto { get; set; }
        public string? strEstado { get; set; }
        public string strCorreo { get; set; }
        public decimal dcSalario { get; set; }

        public DateTime? dtFechaIngreso { get; set; }
        public DateTime? dtFechaModificacion { get; set; }

       
    }
}

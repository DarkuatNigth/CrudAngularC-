namespace BackEndCrudAngular.Server.Models
{
    public class Departamento
    {
        public int intIdDepartamento { get; set; }
        
        public string strNombreDepartamento { get; set; }

        public string strEstado { get; set; }

        public DateTime? dtFechaCreacion { get; set; }

        public DateTime? dtFechaModificacion { get; set; }
    }
}

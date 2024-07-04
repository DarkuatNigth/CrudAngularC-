using BackEndCrudAngular.Server.Models;
using BackEndCrudAngular.Server.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace BackEndCrudAngular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : Controller
    {
        public readonly DepartamentoData _objDepartamentoData;

        public DepartamentoController(DepartamentoData objData) 
        {
            _objDepartamentoData = objData;
        }

        [HttpGet]
        public async Task<IActionResult> consultarListDepartamento()
        {
            List<Departamento> listDepartamento = await _objDepartamentoData.obtenerListaDepartamento();
            return StatusCode(StatusCodes.Status200OK, listDepartamento);
        }
    }
}

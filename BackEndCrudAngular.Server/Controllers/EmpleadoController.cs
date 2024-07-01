using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BackEndCrudAngular.Server.Models.Data;
using BackEndCrudAngular.Server.Models;



namespace BackEndCrudAngular.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly EmpleadoData _objEmpleadoData;

        public EmpleadoController(EmpleadoData objEmpleadoData)
        {
            _objEmpleadoData = objEmpleadoData;
        }

        [HttpGet]   
        public async Task<IActionResult> consultarListEmpleado() 
        {
            List<Empleado> listEmpleado = await _objEmpleadoData.obtenerListaEmpleado();
            return StatusCode(StatusCodes.Status200OK,listEmpleado);
        }


        [HttpGet("{intIdEmpleado}")]
        public async Task<IActionResult> consultarEmpleado(int intIdEmpleado)
        {
            Empleado objEmpleado = await _objEmpleadoData.obtenerEmpleado(intIdEmpleado);
            return StatusCode(StatusCodes.Status200OK, objEmpleado);
        }


        [HttpPost]
        public async Task<IActionResult> crearEmpleado([FromBody] Empleado objEmpleado)
        {
            bool blEjecuto = await _objEmpleadoData.crearEmpleado(objEmpleado);
            return StatusCode(StatusCodes.Status200OK, new {isSuccess = blEjecuto});
        }

        [HttpPut]
        public async Task<IActionResult> editarEmpleado([FromBody] Empleado objEmpleado)
        {
            bool blEjecuto = await _objEmpleadoData.editarEmpleado(objEmpleado);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = blEjecuto });
        }


        [HttpDelete("{intIdEmpleado}")]
        public async Task<IActionResult> eliminarEmpleado(int intIdEmpleado)
        {
            bool blEjecuto = await _objEmpleadoData.eliminarEmpleado(intIdEmpleado);
            return StatusCode(StatusCodes.Status200OK, new { isSuccess = blEjecuto });
        }
    }
}

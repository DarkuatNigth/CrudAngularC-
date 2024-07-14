-- Crear la base de datos
CREATE DATABASE DBempleados;
GO

-- Usar la base de datos
USE DBempleados;
GO

-- Crear la tabla departamento
CREATE TABLE departamento (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    nombreDepartamento NVARCHAR(255) NOT NULL,
    estado NVARCHAR(50) NOT NULL DEFAULT 'Activo',
    fechaCreacion DATETIME NOT NULL DEFAULT GETDATE(),
    fechaModificacion DATETIME NULL
);
GO

-- Crear la tabla empleado
CREATE TABLE empleado (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    nombreEmpleado NVARCHAR(255) NOT NULL,
    departamentoId INT NOT NULL,
    estado NVARCHAR(50) NOT NULL DEFAULT 'Activo',
	correo NVARCHAR(50) NOT NULL,
    fechaIngreso DATETIME NOT NULL DEFAULT GETDATE(),
    salario DECIMAL(10, 2) NOT NULL,
    fechaModificacion DATETIME NULL,
    FOREIGN KEY (departamentoId) REFERENCES departamento(Id)
);
GO


create procedure sp_listaDepartamentos
as
begin
	
	select 
	Id,
	nombreDepartamento,
	estado,
	fechaCreacion,
	fechaModificacion
	from Departamento
	
end

go

create procedure sp_listaEmpleados
as
begin
	
	select 
	Id,
	nombreEmpleado,
	departamentoId,
	estado,
	correo,
	salario,
	convert(char(10),fechaIngreso,103)[fechaIngreso],
	convert(char(10),fechaModificacion,103)[fechaModificacion]
	from Empleado 
	
end

go

create procedure sp_obtenerEmpleado
(
@IdEmpleado int
)
as
begin
	
	select 
	Id,
	nombreEmpleado,
	departamentoId,
	estado,
	correo,
	salario,
	convert(char(10),fechaIngreso,103)[fechaIngreso],
	convert(char(10),fechaModificacion,103)[fechaModificacion]
	from Empleado where Id = @IdEmpleado
	
end

go

create or Alter procedure sp_crearEmpleado(
@NombreCompleto varchar(50),
@DepartamentoId int, 
@Correo varchar(50),
@Sueldo decimal(10,2),
@FechaContrato varchar(20)
)
as
begin
	set dateformat dmy

	insert into Empleado
	(
      [nombreEmpleado]
      ,[departamentoId]
      ,[correo]
      ,[salario]
      ,[fechaIngreso]
	  ,[estado]
	)
	values
	(
	@NombreCompleto,
	@DepartamentoId,
	@Correo,
	@Sueldo,
	convert(date,@FechaContrato),
	'Activo'
	)
end

go

create or Alter procedure sp_editarEmpleado(
@IdEmpleado int,
@NombreCompleto varchar(50),
@DepartamentoId int, 
@Correo varchar(50),
@Sueldo decimal(10,2),
@FechaContrato VARCHAR(20)
)
as
begin
	set dateformat dmy

	update Empleado
	set
	nombreEmpleado = @NombreCompleto,
	correo = @Correo,
	salario = @Sueldo,
	departamentoId = @DepartamentoId,
	fechaIngreso = convert(date,@FechaContrato)
	where Id = @IdEmpleado
end

go

create or ALTER procedure sp_eliminarEmpleado(
@IdEmpleado int
)
as
begin
DECLARE @strEstado NVARCHAR(20) = 'Eliminado';
	update Empleado
	set
	estado = @strEstado,
	fechaModificacion = GETDATE()
	where Id = @IdEmpleado
end

-- Insertar los tres departamentos
INSERT INTO departamento (nombreDepartamento)
VALUES 
('Recursos Humanos'),
('Finanzas'),
('IT');
GO

-- Agregar un empleado a Recursos Humanos
EXEC sp_crearEmpleado @NombreCompleto = 'Juan Pérez', @departamentoId = 1, @correo = 'juan.perez@example.com', @Sueldo = 50000, @fechaContrato = '2019-05-01';

-- Agregar un empleado a Finanzas
EXEC sp_crearEmpleado @NombreCompleto = 'María García', @departamentoId = 2, @correo = 'maria.garcia@example.com', @Sueldo = 60000, @fechaContrato = '2018-03-15';

-- Agregar un empleado a IT
EXEC sp_crearEmpleado @NombreCompleto = 'Carlos Sánchez', @departamentoId = 3, @correo = 'carlos.sanchez@example.com', @Sueldo = 70000, @fechaContrato = '2017-08-20';
GO
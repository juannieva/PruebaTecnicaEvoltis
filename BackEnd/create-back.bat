@echo off
setlocal enabledelayedexpansion

rem Verifica si el parámetro ha sido proporcionado
if "%1"=="" (
    echo 
    powershell -command "Write-Host 'No ingresaste el nombre del proyecto.' -ForegroundColor Red"
    exit /b
)

call :get_project_name %1

echo ===================================
echo Nombre del proyecto: %project_name%
echo ===================================

git clone http://tfs.gobiernocba.gov.ar/tfs/SUAF/ServiciosComunes/_git/ComunesBack

if %errorlevel% neq 0 (        
    echo
    powershell -command "Write-Host 'Se produjo un error al realizar el clone.' -ForegroundColor Red"
    exit /b 1
)

git checkout dev
cd ComunesBack 
  git checkout dev 
  rmdir /s /q .git
  ren Common.Api %project_name%.Api
  ren Common.Data %project_name%.Data
  ren Common.Entities %project_name%.Entities
  ren Common.Services %project_name%.Services
  ren CommonSolution.sln %project_name%Solution.sln
  call :replace_in_file %project_name%Solution.sln

  cd %project_name%.Api
    ren Common.Api.csproj %project_name%.api.csproj
    call :replace_in_file %project_name%.Api.csproj
    call :replace_in_file Program.cs
    cd Controllers
      call :replace_in_file CommonController.cs
      call :replace_in_file TestController.cs
    cd ..
    cd Filters
      call :replace_in_file AuthenticationFilter.cs
    cd ..
    cd Middlewares
      call :replace_in_file ExceptionMiddleware.cs
    cd ..
    cd Models
      cd Auth
        call :replace_in_file BasicAuthenticationIdentity.cs
        call :replace_in_file DatosIdentity.cs
        call :replace_in_file SistemaEnMantenimiento.cs
        call :replace_in_file TokenFromRequest.cs
        call :replace_in_file ValidarTokenRequest.cs
      cd ..
    cd ..
  cd ..

  cd %project_name%.Data
    ren Common.Data.csproj %project_name%.Data.csproj
    call :replace_in_file %project_name%.Data.csproj
    call :replace_in_file ICommonDataAccess.cs
    cd Implementations
      call :replace_in_file CommonDataAccess.cs    
    cd ..
  cd ..

  cd %project_name%.Entities
    ren Common.Entities.csproj %project_name%.Entities.csproj
    call :replace_in_file %project_name%.Entities.csproj
    cd Dtos
      call :replace_in_file ItemListBase.cs
      call :replace_in_file DummyDto.cs
    cd ..
    cd Exceptions
      call :replace_in_file ValidacionException.cs
      call :replace_in_file UnauthorizedException.cs
      call :replace_in_file SessionException.cs
      call :replace_in_file MantenimientoException.cs
      call :replace_in_file DataBaseException.cs
      call :replace_in_file ConflictException.cs
      call :replace_in_file BadRequestException.cs
    cd ..
    cd Requests
      call :replace_in_file PaginationDataBaseRequest.cs
      call :replace_in_file DummyRequest.cs
    cd ..
      cd Responses
      call :replace_in_file PaginationResponse.cs
      call :replace_in_file PaginationData.cs
    cd ..
    cd Utils
      call :replace_in_file PageValidator.cs
    cd ..
  cd ..

  cd %project_name%.Services
    ren Common.Services.csproj %project_name%.Services.csproj
    call :replace_in_file %project_name%.Services.csproj
    call :replace_in_file ICommonService.cs
    cd Extensions
      call :replace_in_file ServiceCollectionExtension.cs
    cd ..
    cd Implementations
    call :replace_in_file CommonService.cs
    cd ..
  cd ..
  robocopy . .. /move /e
cd ..
rmdir /s /q ComunesBack
echo
powershell -command "Write-Host 'El proceso se realizo exitosamente' -ForegroundColor Green"
exit /b

:get_project_name 
set "param=%~1"
set "project_name=%~1"
exit /b

:replace_in_file
set "file=%~1"
powershell -Command "(Get-Content %file%) | ForEach-Object {$_ -creplace '\bCommon\b', '%project_name%'} | Set-Content temp.txt"
del /q %file%
ren temp.txt %file%
echo * Se actualizo el archivo %file%
exit /b
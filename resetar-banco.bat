@echo off
setlocal

echo ==========================================
echo Helix Health - Reset do banco local H2
echo ==========================================
echo.
echo Este script apaga apenas os arquivos do banco local em:
echo backend\data
echo.
echo Antes de continuar, pare o Spring Boot se ele estiver rodando.
echo.

set /p CONFIRMAR=Digite RESETAR para apagar o banco local: 

if /I not "%CONFIRMAR%"=="RESETAR" (
    echo.
    echo Operacao cancelada.
    pause
    exit /b 0
)

echo.
echo Apagando arquivos do banco local...

if exist "backend\data\helixhealth.mv.db" del /q "backend\data\helixhealth.mv.db"
if exist "backend\data\helixhealth.trace.db" del /q "backend\data\helixhealth.trace.db"
if exist "backend\data\helixhealth.lock.db" del /q "backend\data\helixhealth.lock.db"

echo.
echo Banco local resetado.
echo Ao iniciar o Spring Boot novamente, o H2 vai criar o banco de novo.
echo.
pause

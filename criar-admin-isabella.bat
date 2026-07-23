@echo off
setlocal

echo ==========================================
echo Helix Health - Criar admin Isabella
echo ==========================================
echo.
echo Deixe o Spring Boot rodando antes de continuar.
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0criar-admin-isabella.ps1"

echo.
pause

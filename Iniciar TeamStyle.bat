@echo off
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0iniciar-servidor.ps1"
if errorlevel 1 (
  echo.
  echo No se pudo iniciar TeamStyle. Revisa teamstyle-server-error.log.
  pause
)

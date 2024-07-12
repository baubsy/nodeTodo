@echo off
Start "web server" /D "%~dp0\Backend" cmd /C node Main.js
Start "frontend" /D "%~dp0\..\react-todo" cmd /C npm run start
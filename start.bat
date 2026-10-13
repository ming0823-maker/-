@echo off
cd /d "%~dp0"
title Smart Library OS
echo ===================================================
echo   智慧圖書館管理作業系統 (Smart Library OS)
echo ===================================================
echo.
echo 正在啟動伺服器...
echo 【重要提醒】請保持此黑色視窗開啟，不要關閉！
echo 伺服器啟動後將自動在瀏覽器開啟: http://localhost:3000
echo ===================================================
echo.
node server.js
echo.
echo 伺服器已停止。
pause

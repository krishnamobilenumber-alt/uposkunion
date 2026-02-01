@echo off
title UP Outsourcing Sangh - LIVE SYNC
color 0A
echo Starting Background Auto-Sync...
echo Any change you save will be instantly uploaded to uposkunion.in
echo.
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0AutoSyncWatcher.ps1"
pause

@echo off
echo ===================================================
echo UP OUTSOURCING SANGH - MANUAL UPDATE SCRIPT (v3.3)
echo ===================================================
echo.
echo Attempting to upload fixes to GitHub...
echo.

git add .
git commit -m "Fix: Registration Page Refresh Issue (v3.3 - No Cache Meta Tags)"
git push origin main

echo.
echo ===================================================
echo Update Process Completed.
echo Please check for any errors above.
echo ===================================================
pause

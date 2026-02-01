@echo off
echo STARTING DEBUG DEPLOYMENT > deploy_log.txt
echo Time: %TIME% >> deploy_log.txt
echo. >> deploy_log.txt

echo Checking Git Version... >> deploy_log.txt
git --version >> deploy_log.txt 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo GIT NOT FOUND IN PATH! >> deploy_log.txt
) else (
    echo Git found. >> deploy_log.txt
)
echo. >> deploy_log.txt

echo Running Git Add... >> deploy_log.txt
git add . >> deploy_log.txt 2>&1
echo. >> deploy_log.txt

echo Running Git Commit... >> deploy_log.txt
git commit -m "Debug Fix v3.3" >> deploy_log.txt 2>&1
echo. >> deploy_log.txt

echo Running Git Push... >> deploy_log.txt
git push origin main >> deploy_log.txt 2>&1
echo. >> deploy_log.txt

echo DONE. >> deploy_log.txt
echo ========================================
echo DEBUGGING COMPLETE.
echo Please allow the AI to read 'deploy_log.txt'
echo ========================================
pause

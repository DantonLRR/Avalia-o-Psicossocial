@echo off
"C:\xampp\mysql\bin\mysqldump.exe" -u root db_avaliacao_psicossocial > database/db_backup.sql
echo Banco exportado com sucesso!
pause
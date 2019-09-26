CHCP 1252
M:
cd "M:\LS_Feuerborn\Deutsch-Französischer Studienkurs\DATENBANK\Quellcode\"
git config core.sshCommand "ssh -i server/ssh_key -F /dev/null" && git fetch --all && git reset --hard origin/master && npm install && npm run build && npm run production
PAUSE
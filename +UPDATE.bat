git config core.sshCommand "ssh -i datenbank/ssh_key -F /dev/null"
git fetch --all && git reset --hard origin/master && npm install && npm run build && npm run production
PAUSE
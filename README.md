# Steps to run this project:

1. Run `pnpm i` command
2. copy `template.env` change file name to `.env`
3. set environment
4. run `npm install pm2 -g`
5. run `sudo pm2 install pm2-logrotate`
6. run `pm2 set pm2-logrotate:max_size 2M`
7. Run `npm run dev` command

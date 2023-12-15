import { exec } from 'child_process';

exec('tsc', (err, stdout, stderr) => {
  console.log(stdout);
  console.error(stderr);
});

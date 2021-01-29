import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exec, execFile, fork, spawn } from 'child_process';
import { createReadStream, readFile } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const childSP = spawn('../child-process/src/childSP.ts');

  spawn('node', ['../child-process/src/childSP.js'])


  //To find all files in this folder

 
  const childps = spawn('dir', [], {shell: true});
  childps.stdout.on('data', (data) => {
    console.log ('All files which are present in directory -::')
    console.log(data.toString())
  })
  

  //To read file and show number of character from it
  const readStream = createReadStream('../child-process/src/dataRead.txt');
  const wc = spawn('wc', ['-c'], {shell: true});
  console.log('this is first step');

  readStream.pipe(wc.stdin);
  // console.log (wc.stdin);

  wc.stdout.on('data', (data) => {
    console.log('inside stdout');
    console.log('Number of characters');
  })

  //to read code line by line

  // const rf = spawn('dir | grep .txt', {shell: true});
  // rf.stdout.on ('data', (result) => {
  //   console.log ('result',result.toString())
  // })


  exec('dir | grep .txt',(error, response) => {
    console.log ('this is exec data file');
    console.log(response);
  });


  //to find all files from shell

  execFile('dir', {shell: true}, (error, result) => {
    console.log ('This is using execFile');
    console.log(result);
  });


  // const { spawn } = require('child_process');
  // const ps = spawn('ps', ['ax']);
  // const grep = spawn('grep', ['ssh']);

  // ps.stdout.on('data', (data) => {
  //   grep.stdin.write(data);
  // });

  // ps.stderr.on('data', (data) => {
  //   console.error(`ps stderr: ${data}`);
  // });


  // var spawn = require('child_process').spawn,
  //   grep = spawn('grep', ['ssh']);

  // console.log('Spawned child pid: ' + grep.pid);
  // grep.stdin.end();

  const child = fork('../child-process/src/child.ts');

  child.send(10);

  child.on('message', (message: number) => {
    console.log ('This is the result of fork process -:;')
    console.log ('Result :', message);
  })

  await app.listen(3000);
}
bootstrap();

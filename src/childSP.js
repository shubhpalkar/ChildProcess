import { spawn } from "child_process";

//To find all files in this folder
  const child12 = spawn('dir', [], {shell: true});
  child12.stdout.on('data', (data) => {
      console.log ('show result of child spawn -:');
    console.log(data.toString())
  })

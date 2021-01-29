// console.log('Hello world!');
// console.log(process.execArgv);

function factorial(n) {
    console.log('program in factorial function', n);
    if(n === 1 || n === 0){
      return 1;
    }
    return factorial(n - 1) * n;
  }
   
  process.on('message', (n) => {
    process.send(factorial(n));
    process.disconnect();
  });
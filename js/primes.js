const MAXNUM = +process.argv[2] || 100;

const primes = [2, 3];

console.time();
for (var i=5; i<MAXNUM; i+=2) {
  for (var j=1; (primes[j]*primes[j]<=i) && (i % primes[j] !== 0); j++) {};
  if (j===primes.length || primes[j]*primes[j]>i) {
     primes.push(i);
  }
}

console.log(primes);
console.timeEnd();

console.log('Starting app');

setTimeout(() => {
    console.log('Inside of callback')
}, 2000);

setTimeout(() => {
    console.log('Second callback')
}, 0000);

console.log('Ending app');
# My First Node Server Project

## Steps

1. create empty folder and navigate to it in command line
```
npm init
```
2. initialize typescript
```
tsc --init
```
3. go to tsconfig.json  and update:
```
"target" : "es2018",
...
"moduleResolution": "node",
...
"outDir": "./dist",
"rootDir": "./src"
```
4. install typescript types for node
```
npm install --save-dev @types/node
```

## The Event Loop

Node uses one thread that is running on an event loop. 

Executes code when events happen and keeps running listening for events. There may be some multithreading happening in the back. But conceptually it is a loop.

## Request Objects

Lots of data with data and functions that can be called on it.
    - metadata
        - host
        - connection
        - response accept
        - accept encoding
    
The important fields are:
    - url
    - method
    - headers

## Streams and Buffers

Request and Response come in a stream of data. 

Stream is an ongoing process and the request is read by node in chunks. This allows us to work on requests without the full request being read.

If we are sending a file, this allows the server to handle parts of the file to be handled before the entire request is parsed. We work on the data using Buffers. The buffer is a construct to hold multiple chunks before it is released.

```
const body : Uint8Array[] : []
req.on('data', (chunk : Uint8Array) => {
    body.push(chunk);
});
req.on('end', () => {
    const parsedBody = Buffer.concat(body).toString();
    console.log(parsedBody);
})
```
As we see above the data event on the request can be handled and chunks of data is sent to it. The above code shows us putting together the response.

## Event Driven Code Execution

With request.on functions, functions will be executing asynchronously. You can't count on when the .on('end', ()=> {}) is executed

NodeJS has kind of an interal registry of events and listeners and when events happen it will then go through and look for listeners.

Be aware of the order of when code is executed in NodeJS.

## Blocking and Unblock code

```
fs.writeFileSync('message.txt', "HELLO WORLD");
```
This blocks code execution until this file operation is done. This blocks the next line of code.

Better to use
```
fs.writeFile('message.txt', "hello world", (err) => {
    //handle error
});
```
This is why NodeJS is powerful, code is always running.

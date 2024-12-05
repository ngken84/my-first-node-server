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

How can it handle so many requests if there is only one thread?
Is it a security issue?
Is it a performance issue?

### Performance

If we access file systems, the second request may have to wait for a single file to be processed. If we look at the Event Loop, the event loop handles callbacks. The operation of the file system will happen outside of the event loop and the event loop will handle the callbacks.

Long taking operations are handled by a "Worker Pool" that spins up workers when needed. It is detached from your code. If you are using a file, a worker is spooled up and the worker then triggers the callback which is handled by the event loop. 

This is built into NodeJS and doesn't require you to manage it.

### The Event Loop Callbacks

The order is:
1. Timer and setIntervals and Timeouts
2. Pending Callbacks: if there are too many of these callbacks, it can "postpone them"
    File operations, network operations
3. Poll Phase : look for new I/O events and execute their callbacks. Also check Timer callbacks and jump back to #1 if needed
4. setImmediate callbacks
5. Close Callbacks - execute all 'close' event callbacks
6. Maybe exit? if there are no remaining event handlers (refs == 0) <= counts all event listeners to be handled. Will normally never exit because value will at least be 1 because of server.listen() call

### Security

How do we prevent data from being spoiled. Keep functions scoped to itself!


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

## Debug Tips!

### How to not have to restart the server whenever changes are made

We need to add a 3rd party package to do this:
```
npm install nodemon --save-dev
```
Then we can update the start script to :
```
"start" : "nodemon ./dist/app.js"
```

### Understanding Errors

How do we find and fix errors in our code?

#### Types of Errors

##### Syntax Errors
Typos in your code. 

How to deal with them? Typescript, duh. Also the IDE will catch a lot of them. The app will not even be able to run. 

##### Runtime Errors
Code that breaks when it runs.

How to deal with these? You will generally get an error message in the terminal. At the top of the error message you will get
- an error code
- a detailed error message
- a line number somewhere in the stack trace.

##### Logical Errors
Don't see error message, the app just doesn't work the way it should.

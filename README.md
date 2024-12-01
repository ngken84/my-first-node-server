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

## Request Responses




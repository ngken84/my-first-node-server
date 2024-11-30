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




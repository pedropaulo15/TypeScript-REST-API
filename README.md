# TypeScript-REST-API
REST API implemented in TypeScript, accessing an Postgres database Docker image.

In this project a REST API were implemented for a simplified version of the website Reddit. User will be able to create an account/ login and post links. Other users will then be able to upvote and downvote the links.

To run this project you are going to need to install Node.js, TypeScript and ts-node. You will also need to create a package.json file and a tsconfig.json file. 

Create package.json file:
`$ npm init --y`

Create tsconfig.ts file:
`$ tsc --init`


Configure the tsconfig.json file as follows:

```{
 "compilerOptions": {
   "target": "es5",
   "module": "commonjs",
   "lib": ["es2015"],
   "strict": false,
   "esModuleInterop": true,
   "experimentalDecorators": true,
   "emitDecoratorMetadata": true
 }
}
```

Configure the package.json file as follows:

```{
 "name": "iwa_project",
 "version": "1.0.0",
 "description": "",
 "main": "index.js",
 "scripts": {
   "start": "ts-node src/backend/index.ts",
   "test": "nyc --clean --all --require ts-node/register --require reflect-metadata/Reflect --extension .ts -- mocha --timeout 5000 **/*.test.ts"
 },
 "author": "",
 "license": "ISC",
 "devDependencies": {
   "@types/chai": "4.1.2",
   "@types/express": "4.11.1",
   "@types/jsonwebtoken": "7.2.6",
   "@types/mocha": "5.1.0",
   "@types/node": "9.6.5",
   "@types/supertest": "2.0.4",
   "chai": "4.1.2",
   "mocha": "5.1.1",
   "supertest": "3.0.0",
   "ts-node": "6.0.0",
   "typescript": "2.8.1"
 },
 "dependencies": {
   "express": "4.16.3",
   "jsonwebtoken": "8.2.1",
   "pg": "7.4.1",
   "reflect-metadata": "0.1.12",
   "typeorm": "0.1.21"
 }
}
```



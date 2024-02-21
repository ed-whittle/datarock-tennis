# Tennis Scoring Code Challenge

## Build
`npm i`

## Executing
`cd src && ts-node index.ts` will execute a sample game that goes to a tiebreak

## Tests
`npm test` will execute the unit tests and the coverage

```
----------------|---------|----------|---------|---------|-------------------
File            | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------|---------|----------|---------|---------|-------------------
All files       |   98.41 |    84.21 |     100 |   98.19 |                   
 constants      |     100 |      100 |     100 |     100 |                   
  constants.ts  |     100 |      100 |     100 |     100 |                   
 match          |   96.72 |     62.5 |     100 |   96.49 |                   
  Match.ts      |   95.65 |     62.5 |     100 |   95.23 | 54-55             
  Player.ts     |     100 |      100 |     100 |     100 |                   
 match/gamemode |     100 |      100 |     100 |     100 |                   
  Standard.ts   |     100 |      100 |     100 |     100 |                   
  Tiebreak.ts   |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
```

Match is not 100% covered due to the private tiebreaker method.
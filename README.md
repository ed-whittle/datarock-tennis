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
All files       |   98.38 |    84.21 |     100 |   98.16 |                   
 constants      |     100 |      100 |     100 |     100 |                   
  constants.ts  |     100 |      100 |     100 |     100 |                   
 match          |   96.61 |     62.5 |     100 |   96.36 |                   
  Match.ts      |   95.45 |     62.5 |     100 |      95 | 60-61             
  Player.ts     |     100 |      100 |     100 |     100 |                   
 match/gamemode |     100 |      100 |     100 |     100 |                   
  Standard.ts   |     100 |      100 |     100 |     100 |                   
  Tiebreak.ts   |     100 |      100 |     100 |     100 |                   
----------------|---------|----------|---------|---------|-------------------
```

Match is not 100% covered due to the private tiebreaker method.
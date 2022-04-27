## Description

The program listens on a specific local folder and watches for new files.

## Run in Docker container
No build needed
```bash
$ cd scripts/
$ chmod ug+x *.sh
$ ./up.sh
```

## Build

```bash
$ cd service/
$ yarn global add @nestjs/cli
$ yarn
$ yarn build
```

## Running the app

```bash
# development
$ cd service/
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```
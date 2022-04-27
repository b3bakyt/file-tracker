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

Create .env file.

Modify FILES_DIR (absolute path to .batch files directory).

Modify Redis variables: REDIS_HOST, REDIS_PASSWORD, REDIS_PORT.
```Bash
$ cp .env.example .env
```

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
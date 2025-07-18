<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Example Requests Weather APIs (https://roadmap.sh/projects/weather-api-wrapper-service)

## Get 15-day forecast for a location
```
GET /weather/Lagos
```

## Get weather for a specific date
```
GET /weather/Lagos/2024-07-15
```

## Get weather for a date range
```
GET /weather/Lagos/2024-07-15?date2=2024-07-20
```

# Example curl commands

```
curl http://localhost:3000/weather/Lagos
curl http://localhost:3000/weather/Lagos/2024-07-15
curl "http://localhost:3000/weather/Lagos/2024-07-15?date2=2024-07-20"
```

# Error Handling
- If the city or date is invalid, you will receive a 400 error with a message like:
  ```json
  { "statusCode": 400, "message": "Invalid city or date" }
  ```
- If the 3rd party API is down, you will receive a 503 error:
  ```json
  { "statusCode": 503, "message": "Failed to fetch weather data" }
  ```
- If you exceed the rate limit (10 requests per minute per IP), you will receive a 429 error:
  ```json
  { "statusCode": 429, "message": "Too Many Requests" }
  ```

---

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>


</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

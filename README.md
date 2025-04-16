# Веб-интерфейс для Task Resolver 

## Запуск

### Переменные окружения

* `BASE_REST_API_URL` - базовый путь до REST API, например, `https://domain/api/v1`

### Локально

#### Development

```bash
$ npm i
$ npm run dev
```

#### Production

```bash
$ npm i
$ npm run build
$ npm run start
```

### Docker

```bash
$ docker build -t web-ui -f ./.docker/Dockerfile . 
$ docker run -p 80:3000 web-ui
```


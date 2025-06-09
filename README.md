# Sentinel

Este repositório contém o backend em Java Spring Boot e o frontend em React.

## Backend

Antes de executar o backend é necessário definir as variáveis de ambiente `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` com as credenciais do banco de dados. Em seguida utilize o wrapper Maven:

```bash
./mvnw spring-boot:run
```

## Frontend

Para executar o frontend:

```bash
cd frontend
npm install
npm start
```

Se ocorrer o erro `Can't resolve 'css.gg/icons/all.css'`, remova a pasta
`node_modules` do frontend e execute `npm install` novamente para garantir que a
versão `2.0.0` do `css.gg` seja instalada.

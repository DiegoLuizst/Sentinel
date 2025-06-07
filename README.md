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

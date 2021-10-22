<div align="center">
    <h1>CRUD de médicos e especialidades</h1>
    <img width="150px" src="https://user-images.githubusercontent.com/77863834/130308932-251ca9eb-bccf-4297-9b06-b4c8e64edb88.png" align="center" alt="GitHub Readme Stats" />
</div>

</br>

<div align="center">

<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />

<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />

<img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" />

<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />

</br>

<img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white" />

<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />

<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />

<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />

<img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" />

<img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E" />

</div>

</br>

[README in English](#readme-in-english)

## Sumário

* [Sobre](#sobre)
* [Pré Requisitos](#pré-requisitos)
* [Instalação](#instalação)
* [Executando o sistema](#executando-o-sistema)
* [Documentação](#documentação)
* [Executando os testes](#executando-os-testes)

</br>

## Sobre

O sistema serve para gerenciar médicos e especialidades. Esses são as duas entidades presentes no sistema, e para cada uma delas é possível realizar as operações **Criar**, **Atualizar**, **Listar**, **Deletar** e **Recuperar**. O médico ainda conta com a operação de **Filtrar**.

</br>

## Pré Requisitos

Para rodar o sistema, é necessário ter instalado as seguintes bibliotecas:

* [Git](https://git-scm.com/download/)
* [Node.js](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/get-docker/)
* [Docker-Compose](https://docs.docker.com/compose/install/)

</br>

## Instalação

Para baixar os arquivos do sistema do repositório remoto, basta utilizar o seguinte comando:
```sh
git clone git@github.com:ArthurEnrique15/doctors-specialties-crud.git && cd doctors-specialties-crud
```

</br>

## Executando o sistema

Para executar o sistema, basta utilizar o seguinte comando:
```
make app
```
> O comando _make app_ executa o serviço `app` do [docker-compose](./docker-compose.yml) e consequentemente os serviços dos quais ele depende, que são o `database` e as `migrations`.
>
> Assim, a imagem do _postgres_ é baixada, as migrations são executadas juntamente com o dockerfile do projeto e por fim a aplicação é iniciada na porta 3333.
>
> Caso queira remover a aplicação execute `make destroy`.

</br>

## Documentação

Após executar o sistema, a documentação de todas as rotas estará disponível no seguinte endereço: <http://localhost:3333/api-docs/>

</br>

## Executando os testes

Para executar os testes, basta utilizar o seguinte comando:
```
make test
```

> Para a execução dos testes foram utilizadas as bibliotecas `jest` e `supertest`

</br></br>

# README in English

## Summary

* [About](#about)
* [Pre Requisites](#pre-requisites)
* [Installation](#installation)
* [Running the system](#running-the-system)
* [Documentation](#documentation)
* [Running the tests](#running-the-tests)

</br>

## About

The system is used to manage doctors and specialties. These are the two entities present in the system, and for each of them it's possible to execute the following actions: **Create**, **Update**, **List**, **Delete** and **Recover**. It's also possible to execute a **Filter** action for the doctors.

</br>

## Pre Requisites

To run the system, it's necessary to have the following libraries installed:

* [Git](https://git-scm.com/download/)
* [Node.js](https://nodejs.org/en/download/)
* [Docker](https://docs.docker.com/get-docker/)
* [Docker-Compose](https://docs.docker.com/compose/install/)

</br>

## Installation

To download the system files from the remote repository, just run the following command:

```sh
git clone git@github.com:ArthurEnrique15/doctors-specialties-crud.git && cd doctors-specialties-crud
```

</br>

## Running the system

To run the system, just run the following command:

```
make app
```
> The command _make app_ executes the `app` service from [docker-compose](./docker-compose.yml) and the services that it depends on (`database` and `migrations`).
>
> So the _postgres_ image is downloaded, the migrations are executed along with the project Dockerfile, and finally the application is initialized in the port 3333.
>
> If you want to remove the application, run the command `make destroy`

</br>

## Documentation

After executing the system, the documentation of all routes will be available in the following address: <http://localhost:3333/api-docs/>

</br>

## Running the tests

To run the tests, just run the following command:

```
make test
```

> The libraries `jest` and `supertest` where used to run the tests.


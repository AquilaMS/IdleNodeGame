
# Idle Node

Projeto usado para estudo de NodeJS com suite de teste Jest e autenticação JWT.



## Documentação da API



```http
  POST /acc/get 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user` | `json` | Retorna os dados do usuário logado |



```http
 POST /buy/${powerupID}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user.id`      | `int` | Atualiza o **user.balance** e o **user.sumMultplier**|


```http
 GET /powerups/
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|       | `int` |Retorna os dados de todos os **powerups** registrados|

```http
 POST /signin/{email, password}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `{email, password}`      | `string` |Retorna token JWT do usuário|

```http
 POST /signup/{name. email, password}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `{name, email, password}`      | `string` |Retorna *id*, *name* e *email*|

```http
 POST /users/update
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user.id`      | `int` |Atualiza o valor de **user.balance** de acordo com a diferença entre *inDate* e *outDate* do usuário. Retorna o valor atualizado de *user.balance*|



# Idle Node

Projeto usado para estudo de NodeJS com suite de teste Jest e autenticação JWT.


## Documentação da API




  ```
  POST /acc/get
  ``` 


| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user` | `json` | Retorna os dados do usuário logado |



```
POST /buy/${powerupID}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user.id`      | `int` | Atualiza o **user.balance** e o **user.sumMultplier**|


```
 GET /powerups/
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|       | `int` |Retorna os dados de todos os **powerups** registrados|

```
 POST /signin/{email, password}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `{email, password}`      | `string` |Retorna token JWT do usuário|

```
 POST /signup/{name. email, password}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `{name, email, password}`      | `string` |Retorna *id*, *name* e *email*|

```
 POST /users/update
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user.id`      | `int` |Atualiza o valor de **user.balance** de acordo com a diferença entre *inDate* e *outDate* do usuário. Retorna o valor atualizado de *user.balance*|

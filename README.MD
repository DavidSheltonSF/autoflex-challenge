# Desafio Autoflex


## Hospedagem
Obs: Foi escolhido um serviço gratuito de hospedagem, portanto o site pode levar uns 50s para carregar

[Clique aqui](https://autoflex-challenge.onrender.com/) para acessar o site

## Tecnologias

### Frontend
- Next.js
- React.js
- Tailwind CSS
- TypeScript

### Backend
- Node.js (Express.js)
- PostgreSQL
- TypeScript
- Jest (testes unitários)

## Aspectos técnicos

Foi aplicada uma arquitetura baseada em controllers, services e repositories para separação de responsabilidades.

### Testes

Para a aplicação dos testes foram desenvolvidos repositorios fake para testar controllers e services de forma isolada, sem precisar fazer consultas desnecessárias ao banco.

### Design Patterns
- Singleton (PostgreHelper)
- Factory (HttpResponseFactory, makeProductsController, makeCommoditiesController)


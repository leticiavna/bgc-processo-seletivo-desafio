## BGC - Desafio 2
O projeto consiste numa landing page pra a reserva de minions. Além do formulário de compra, tem uma aba também onde é possível ver reservas realizadas, além de funcionalidades de autenticação e cadastro.

O projeto pode ser encontrado [aqui](http://react-minion-app.s3-website-us-east-1.amazonaws.com/).

### Workflow
Para entrar na page, é preciso logar ou se cadastrar. O login é realizado com email e senha cadastrados. 
Para se cadastrar, é preciso informar um email, e uma senha contendo 8 ou mais dígitos, letras maiúsculas e minúsculas, números e símbolos.

Na homepage, é possível fazer as reservas: informando o nome, email e os minions desejados, e depois clicando em "Reservar". Após essa ação, será salvo no banco de dados a reserva feita e será disparado um email contendo os dados dessa reserva.

### O que foi utilizado (WIP)
- [Cloud9 IDE] - desenvolvimento
- [ReactJS] com [Material UI] - frontend
- [Serverless Framework]
- [AWS Lambda]
- [AWS API Gateway] 
- [AWS S3] - deploy da aplicação frontend
- [AWS SES] - envio de emails
- [AWS DynamoDB] - banco de dados
- [AWS Cognito] - gerência de login e cadastro
- [Dashbird] - para debugar envios de emails

### Rodando local (WIP)
(...)

### Pendências
- Alertas mais amigáveis e bonitos
- Amazon SES no modo Sandbox, logo os emails não são enviados para o cliente.
- Ordenação da tabela "minhas reservas"

### Referências (WIP)
- [Serverless Stack](https://serverless-stack.com/)

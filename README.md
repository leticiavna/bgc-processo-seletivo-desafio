## BGC - Desafio 2
O projeto consiste numa landing page pra a reserva de minions. Além do formulário de compra, tem uma aba também onde é possível ver reservas realizadas, além de funcionalidades de autenticação e cadastro.

O projeto pode ser encontrado [aqui](http://react-minion-app.s3-website-us-east-1.amazonaws.com/).


### Workflow
Para entrar na page, é preciso logar ou se cadastrar. O login é realizado com email e senha cadastrados. 
Para se cadastrar, é preciso informar um email, e uma senha contendo 8 ou mais dígitos, letras maiúsculas e minúsculas, números e símbolos.
**P.S. Ao se cadastrar, será preciso confirmar o email. Você receberá um código de confirmação no email inputado.**

Na homepage, é possível fazer as reservas: informando o nome, email e os minions desejados, e depois clicando em "Reservar". Após essa ação, será salvo no banco de dados a reserva feita e será disparado um email contendo os dados dessa reserva. Para visualizar as reservas realizadas, é só clicar em "Minhas Reservas" no topo da página.


### O que foi utilizado
- [Cloud9 IDE](https://aws.amazon.com/pt/cloud9/)
- [ReactJS](https://reactjs.org/) com [Material UI](https://material-ui.com/)
- [Serverless Framework](https://serverless.com/)
- Serviços AWS: [AWS Lambda](https://aws.amazon.com/pt/lambda/), [AWS API Gateway](https://aws.amazon.com/pt/api-gateway/), [AWS S3](https://aws.amazon.com/pt/s3/), [AWS SES](https://aws.amazon.com/pt/ses/), [AWS DynamoDB](https://aws.amazon.com/pt/dynamodb/), [AWS Cognito](https://aws.amazon.com/pt/cognito/)
- [Dashbird](https://dashbird.io/) - para debugar envios de emails


### Rodando local
(work in progress)

-----

#### Pendências
- Alertas mais amigáveis e bonitos
- Amazon SES no modo Sandbox, logo os emails não são enviados para o cliente.
- Ordenação da tabela "minhas reservas"


#### Referências (WIP)
- [Serverless Stack](https://serverless-stack.com/)
- [Karma Commit Messages](http://karma-runner.github.io/4.0/dev/git-commit-msg.html) 
- Post de @viniciuskneves [Send e-mails through AWS SES and Lambda](https://dev.to/centrics/send-e-mails-through-aws-ses-and-lambda-17f2)

# Desafio front-end do Stoodi

Olá!

Este é um teste para trabalhar como pessoa desenvolvedora front-end no Stoodi.

## Para participar desta parte do processo você deve:
- Fazer um fork deste projeto;
- Criar um repositório FECHADO (private) na sua conta do bitbucket;
- Colocar o seu nome e email no topo do arquivo README do seu repositório;
- Desenvolver a tarefa abaixo no seu repositório;
- Ao terminar o desenvolvimento, dê acesso de leitura ao usuário thiagopadula (thiagopadula@gmail.com) ao seu repositório.

## Objetivo:

Criar um exercício de múltipla escolha usando HTML, CSS e Javascript. O aluno deve poder responder e saber se sua resposta está certa ou errada, e, se estiver errada, poder tentar novamente.

## Composição da tela

- Enunciado da pergunta;
- Quatro alternativas de resposta;
- Botão para verificar a resposta;
- Feedback sobre a resposta do aluno.

## Layout
### Imagem 1:

![Cenário 1](https://static.stoodi.com.br/frontend-challenge/tela-1.png)
___

### Imagem 2:

![Cenário 2](https://static.stoodi.com.br/frontend-challenge/tela-2.png)
___

### Imagem 3:

![Cenário 3](https://static.stoodi.com.br/frontend-challenge/tela-3a.png)
___

### Imagem 4:

![Cenário 4](https://static.stoodi.com.br/frontend-challenge/tela-3b.png)

___
## Critérios

- Você deve pegar as informações da pergunta dessa API: `https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/`
- As alternativas são exclusivas (o aluno não deve responder mais de uma ao mesmo tempo);
- O botão "verificar resposta" deve estar desabilitado se nenhuma alternativa estiver selecionada (*imagem 1*);
- O botão "verificar resposta" deve estar habilitado se uma alternativa estiver selecionada (*imagem 2*);
- Ao clicar em "verificar resposta", o componente deve fazer um POST para `https://8zqqb4wng6.execute-api.us-east-1.amazonaws.com/dev/` com um objeto contendo os seguintes dados:
    - `exercise_id` (tipo number)
	- `choice` (tipo string, com a letra da alternativa selecionada)
- O POST vai retornar uma propriedade `is_correct` que informa se a alternativa enviada era a correta. Se o aluno:
    - Acertou a resposta: a linha da alternativa selecionada deve ficar verde e o botão deve ter o texto "próximo". Esse botão não tem nenhuma funcionalidade (*imagem 3*);
    - Errou a resposta: a linha da alternativa selecionada deve ficar vermelha e o botão deve ter o texto "refazer" (*imagem 4*). Ao clicar nesse botão, a opção selecionada deve ficar desmarcada, o feedback de erro deve sumir e o botão deve ficar desabilitado (exatamente como quando o aluno acessa o exercício pela primeira vez).
- A página deve ficar como no layout.

## Observações

- Deve-se usar HTML, CSS e Javascript. Fica a seu critério utilizar frameworks, bibliotecas ou pré-processadores;
- Escrever testes é um diferencial;
- Escreva todas as instruções de como rodar o projeto. Se quiser colocar mais observações, fique à vontade;
- A fonte utilizada no layout é a Lato (https://fonts.google.com/specimen/Lato);
- Você será avaliadx pela qualidade/funcionalidade do seu código e aderência ao layout. Desenvolva como se fosse um código de produção em um time e não uma prova ou script;
- Estamos à disposição para ajudar com dúvidas ou dificuldades, é só entrar em contato :)
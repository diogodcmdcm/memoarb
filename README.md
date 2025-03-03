# Memo Protocol

Este projeto foi submetido para participação no **Hackathon da Arbitrum**.

O **Memo Protocol** é um protocolo de NFTs projetado para registrar e eternizar momentos importantes em eventos – sejam eles online ou presenciais. Com o Memo, cada experiência se transforma em um **registro digital único**, permitindo que os participantes guardem e compartilhem suas conquistas de forma descentralizada.

## 📁 Estrutura do Projeto

O Memo Protocol combina duas redes blockchain para oferecer uma experiência totalmente on-chain e eficiente:

- **Backend (`memoarb`)**: Construído na **Arbitrum**, responsável pelo mint e pela transferência dos NFTs para as carteiras dos usuários.
- **Frontend e Armazenamento de Dados (`memoarbfront`)**: Hospedado na **Internet Computer (ICP)**, garantindo uma interface totalmente descentralizada e um armazenamento on-chain seguro.

Essa arquitetura permite que o **Memo Protocol** entregue um DApp verdadeiramente descentralizado, combinando a escalabilidade da Arbitrum com o poder de computação on-chain da ICP.

## 🚀 Instalação do Frontend

Para instalar as dependências do frontend, execute os seguintes comandos:

```sh
npm install moment --save
npm install pdf-lib
npm install react-router-dom
npm install @dfinity/auth-client

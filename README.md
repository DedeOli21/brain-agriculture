# Brain Agriculture API

## Descrição
A **Brain Agriculture API** é um sistema desenvolvido utilizando **NestJS** e **TypeORM**, projetado para gerenciar informações sobre fazendas, safras, culturas e colheitas. A API permite a criação, consulta e gerenciamento desses dados de forma estruturada.

## Tecnologias Utilizadas
- **NestJS** (Framework Node.js para aplicações escaláveis)
- **TypeORM** (ORM para interação com banco de dados)
- **PostgreSQL** (Banco de dados relacional)
- **Swagger** (Documentação da API)
- **Docker** (Containerização da aplicação)
- **Railway** (Hospedagem da aplicação)

## Endpoints Principais
A API fornece os seguintes recursos:

### **Produtores (Producers)**
- Criar, listar e atualizar,deletar e buscar Produtores

### **Fazendas (Farms)**
- Criar, listar e buscar fazendas

### **Safras (Seasons)**
- Criar e listar safras associadas a uma fazenda

### **Culturas (Crops)**
- Criar e listar culturas associadas a uma safra

### **Colheitas (Harvests)**
- Criar e listar colheitas associadas a uma cultura

## Instalação e Configuração
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/brain-agriculture.git
   ```
2. Acesse a pasta do projeto:
   ```sh
   cd brain-agriculture
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e configure os valores necessários:
   ```env
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/brain_agriculture
   ```
4. Rode a aplicação utilizando Docker:
   ```sh
   docker-compose up --build
   ```

5. Se quiser rodar a aplicação localmente:
   ```sh
   yarn build
   yarn start:dev
   ```

6. O Coverage da API
![image](https://github.com/user-attachments/assets/269d85d5-8f03-4ed8-8818-201a4d950d27)


## Documentação da API
A documentação da API está disponível via Swagger na URL:
[**https://brain-agriculture-production.up.railway.app/api/docs**](https://brain-agriculture-production.up.railway.app/api/docs)

## Hospedagem
A API está hospedada na plataforma **Railway** e pode ser acessada através da URL:
[**https://brain-agriculture-production.up.railway.app**](https://brain-agriculture-production.up.railway.app)


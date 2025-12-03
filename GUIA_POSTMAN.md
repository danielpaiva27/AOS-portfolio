# 📮 Guia de Testes no Postman

## 🚀 Como Iniciar o Servidor

1. Abra o terminal no diretório do projeto
2. Execute: `npm start`
3. O servidor iniciará em: `http://localhost:3000`

---

## 📋 Rotas Disponíveis

### 1️⃣ **Rota Inicial - Verificar API**

**GET** `http://localhost:3000/`

**Resposta:**
```json
{
  "message": "API do Portfolio",
  "endpoints": {
    "portfolio": "/api/portfolio",
    "projects": "/api/projects",
    "skills": "/api/skills"
  }
}
```

---

## 👤 Portfolio (Informações Pessoais)

### **Ver Portfolio**
**GET** `http://localhost:3000/api/portfolio`

**Resposta:**
```json
{
  "id": 1,
  "name": "Seu Nome",
  "email": "seu.email@exemplo.com",
  "bio": "Desenvolvedor Full Stack",
  "github": "https://github.com/seuuser",
  "linkedin": "https://linkedin.com/in/seuuser"
}
```

### **Atualizar Portfolio**
**PUT** `http://localhost:3000/api/portfolio`

**Headers:**
- Content-Type: `application/json`

**Body (raw JSON):**
```json
{
  "name": "Daniel Luna",
  "email": "daniel@exemplo.com",
  "bio": "Desenvolvedor Backend especializado em Node.js",
  "github": "https://github.com/danielluna",
  "linkedin": "https://linkedin.com/in/danielluna"
}
```

**Resposta:**
```json
{
  "message": "Portfolio atualizado com sucesso",
  "data": {
    "id": 1,
    "name": "Daniel Luna",
    "email": "daniel@exemplo.com",
    "bio": "Desenvolvedor Backend especializado em Node.js",
    "github": "https://github.com/danielluna",
    "linkedin": "https://linkedin.com/in/danielluna"
  }
}
```

---

## 💼 Projetos

### **Listar Todos os Projetos**
**GET** `http://localhost:3000/api/projects`

**Resposta:**
```json
[
  {
    "id": 1,
    "title": "Projeto 1",
    "description": "Descrição do projeto 1",
    "technologies": ["JavaScript", "Node.js", "Express"],
    "githubUrl": "https://github.com/user/projeto1"
  }
]
```

### **Ver Projeto Específico**
**GET** `http://localhost:3000/api/projects/1`

**Resposta:**
```json
{
  "id": 1,
  "title": "Projeto 1",
  "description": "Descrição do projeto 1",
  "technologies": ["JavaScript", "Node.js", "Express"],
  "githubUrl": "https://github.com/user/projeto1"
}
```

### **Criar Novo Projeto**
**POST** `http://localhost:3000/api/projects`

**Headers:**
- Content-Type: `application/json`

**Body (raw JSON):**
```json
{
  "title": "Sistema de Blog",
  "description": "Blog desenvolvido com Node.js e Express",
  "technologies": ["Node.js", "Express", "MongoDB"],
  "githubUrl": "https://github.com/user/blog-project",
  "demoUrl": "https://meublog.com"
}
```

**Resposta:**
```json
{
  "message": "Projeto criado com sucesso",
  "data": {
    "id": 2,
    "title": "Sistema de Blog",
    "description": "Blog desenvolvido com Node.js e Express",
    "technologies": ["Node.js", "Express", "MongoDB"],
    "githubUrl": "https://github.com/user/blog-project",
    "demoUrl": "https://meublog.com"
  }
}
```

### **Atualizar Projeto**
**PUT** `http://localhost:3000/api/projects/1`

**Headers:**
- Content-Type: `application/json`

**Body (raw JSON):**
```json
{
  "title": "Projeto Atualizado",
  "description": "Nova descrição do projeto",
  "technologies": ["JavaScript", "Node.js", "Express", "PostgreSQL"]
}
```

**Resposta:**
```json
{
  "message": "Projeto atualizado com sucesso",
  "data": {
    "id": 1,
    "title": "Projeto Atualizado",
    "description": "Nova descrição do projeto",
    "technologies": ["JavaScript", "Node.js", "Express", "PostgreSQL"]
  }
}
```

### **Deletar Projeto**
**DELETE** `http://localhost:3000/api/projects/1`

**Resposta:**
```json
{
  "message": "Projeto deletado com sucesso"
}
```

---

## 🎯 Habilidades (Skills)

### **Listar Todas as Habilidades**
**GET** `http://localhost:3000/api/skills`

**Resposta:**
```json
[
  {
    "id": 1,
    "name": "JavaScript",
    "level": "Avançado"
  },
  {
    "id": 2,
    "name": "Node.js",
    "level": "Intermediário"
  }
]
```

### **Criar Nova Habilidade**
**POST** `http://localhost:3000/api/skills`

**Headers:**
- Content-Type: `application/json`

**Body (raw JSON):**
```json
{
  "name": "React",
  "level": "Avançado",
  "category": "Frontend"
}
```

**Resposta:**
```json
{
  "message": "Habilidade criada com sucesso",
  "data": {
    "id": 3,
    "name": "React",
    "level": "Avançado",
    "category": "Frontend"
  }
}
```

### **Deletar Habilidade**
**DELETE** `http://localhost:3000/api/skills/1`

**Resposta:**
```json
{
  "message": "Habilidade deletada com sucesso"
}
```

---

## 🧪 Testando no Postman - Passo a Passo

### 1. **Criar uma Coleção**
   - Abra o Postman
   - Clique em "New Collection"
   - Nome: "Portfolio API"

### 2. **Testar Sequência Completa**

Execute nesta ordem:

1. **GET** `http://localhost:3000/` → Verificar se API está online
2. **GET** `http://localhost:3000/api/portfolio` → Ver dados atuais
3. **PUT** `http://localhost:3000/api/portfolio` → Atualizar seu perfil
4. **POST** `http://localhost:3000/api/projects` → Criar projeto
5. **GET** `http://localhost:3000/api/projects` → Ver todos os projetos
6. **POST** `http://localhost:3000/api/skills` → Adicionar habilidade
7. **GET** `http://localhost:3000/api/skills` → Ver todas as habilidades

### 3. **Dicas Importantes**

- **Para POST e PUT:** Sempre selecione:
  - Body → raw → JSON
  - Adicione o header: `Content-Type: application/json`
  
- **IDs automáticos:** Ao criar projetos/skills, o ID é gerado automaticamente

- **Dados em memória:** Os dados existem apenas enquanto o servidor está rodando. Ao reiniciar, os dados voltam ao padrão.

---

## ⚠️ Possíveis Erros

### Erro 404 - Not Found
```json
{
  "message": "Projeto não encontrado"
}
```
**Solução:** Verifique se o ID existe fazendo um GET primeiro.

### Erro 400 - Bad Request
Geralmente ocorre quando:
- Body JSON está malformado
- Headers estão incorretos

**Solução:** 
- Verifique a sintaxe JSON
- Certifique-se de que `Content-Type: application/json` está nos headers

---

## 📊 Testando com Múltiplos Dados

### Exemplo: Adicionar 3 Projetos

1. **POST** `/api/projects` - Projeto 1
```json
{
  "title": "E-commerce",
  "description": "Loja virtual completa",
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

2. **POST** `/api/projects` - Projeto 2
```json
{
  "title": "API REST",
  "description": "API de gerenciamento de usuários",
  "technologies": ["Express", "PostgreSQL"]
}
```

3. **POST** `/api/projects` - Projeto 3
```json
{
  "title": "Dashboard Analytics",
  "description": "Painel de análise de dados",
  "technologies": ["Vue.js", "Chart.js"]
}
```

4. **GET** `/api/projects` → Verá os 3 projetos + o projeto inicial

---

## ✅ Checklist de Testes

- [ ] Servidor está rodando (porta 3000)
- [ ] GET na rota inicial funciona
- [ ] Consegue visualizar portfolio
- [ ] Consegue atualizar portfolio
- [ ] Consegue criar projeto
- [ ] Consegue listar projetos
- [ ] Consegue atualizar projeto
- [ ] Consegue deletar projeto
- [ ] Consegue criar habilidade
- [ ] Consegue listar habilidades
- [ ] Consegue deletar habilidade

---

**🎉 Pronto! Agora você tem uma API simples e funcional para seu portfolio!**

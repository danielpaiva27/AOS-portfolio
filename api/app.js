import express from "express";
import { Portfolio, Project, Skill, syncDatabase } from "./db.js";

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// ROTAS DO PORTFOLIO
app.get("/api/portfolio", async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne();
    if (!portfolio) {
      return res.status(404).json({ message: "Portfolio não encontrado" });
    }
    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar portfolio", error: error.message });
  }
});

app.put("/api/portfolio", async (req, res) => {
  try {
    let portfolio = await Portfolio.findOne();
    if (!portfolio) {
      portfolio = await Portfolio.create(req.body);
    } else {
      await portfolio.update(req.body);
    }
    res.json({ message: "Portfolio atualizado com sucesso", data: portfolio });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar portfolio", error: error.message });
  }
});

// ROTAS DE PROJETOS
app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.findAll({ order: [['createdAt', 'DESC']] });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar projetos", error: error.message });
  }
});

app.get("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar projeto", error: error.message });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ message: "Projeto criado com sucesso", data: project });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar projeto", error: error.message });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }
    await project.update(req.body);
    res.json({ message: "Projeto atualizado com sucesso", data: project });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar projeto", error: error.message });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Projeto não encontrado" });
    }
    await project.destroy();
    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar projeto", error: error.message });
  }
});

// ROTAS DE HABILIDADES
app.get("/api/skills", async (req, res) => {
  try {
    const skills = await Skill.findAll({ order: [['name', 'ASC']] });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar habilidades", error: error.message });
  }
});

app.post("/api/skills", async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ message: "Habilidade criada com sucesso", data: skill });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar habilidade", error: error.message });
  }
});

app.delete("/api/skills/:id", async (req, res) => {
  try {
    const skill = await Skill.findByPk(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: "Habilidade não encontrada" });
    }
    await skill.destroy();
    res.json({ message: "Habilidade deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar habilidade", error: error.message });
  }
});

// Rota inicial
app.get("/", (req, res) => {
  res.json({ 
    message: "API do Portfolio - PostgreSQL",
    endpoints: {
      portfolio: "/api/portfolio",
      projects: "/api/projects",
      skills: "/api/skills"
    }
  });
});

// Inicializar servidor
syncDatabase().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  });
});

export default app;
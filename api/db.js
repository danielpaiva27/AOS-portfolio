import { Sequelize, DataTypes } from "sequelize";
import "dotenv/config";
import pg from "pg";

// Conexão com PostgreSQL
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
  dialectModule: pg, // Desativa logs SQL no console
});

// Modelo Portfolio
const Portfolio = sequelize.define("Portfolio", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  bio: DataTypes.TEXT,
  github: DataTypes.STRING,
  linkedin: DataTypes.STRING,
  phone: DataTypes.STRING,
});

// Modelo Project
const Project = sequelize.define("Project", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  githubUrl: DataTypes.STRING,
  demoUrl: DataTypes.STRING,
  imageUrl: DataTypes.STRING,
});

// Modelo Skill
const Skill = sequelize.define("Skill", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  level: {
    type: DataTypes.STRING,
    defaultValue: "Intermediário",
  },
  category: DataTypes.STRING,
});

// Sincronizar banco de dados
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado ao PostgreSQL");
    
    await sequelize.sync({ alter: true }); // Cria/atualiza tabelas
    console.log("✅ Tabelas sincronizadas");
    
    // Criar dados iniciais se não existir
    const portfolioCount = await Portfolio.count();
    if (portfolioCount === 0) {
      await Portfolio.create({
        name: "Seu Nome",
        email: "seu.email@exemplo.com",
        bio: "Desenvolvedor Full Stack",
        github: "https://github.com/seuuser",
        linkedin: "https://linkedin.com/in/seuuser",
      });
      
      await Project.create({
        title: "Projeto Exemplo",
        description: "Descrição do projeto exemplo",
        technologies: ["JavaScript", "Node.js", "Express"],
        githubUrl: "https://github.com/user/projeto1",
      });
      
      await Skill.bulkCreate([
        { name: "JavaScript", level: "Avançado", category: "Frontend" },
        { name: "Node.js", level: "Intermediário", category: "Backend" },
      ]);
      
      console.log("✅ Dados iniciais criados");
    }
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error.message);
  }
};

export { sequelize, Portfolio, Project, Skill, syncDatabase };

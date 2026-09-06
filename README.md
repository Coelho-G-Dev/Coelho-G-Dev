<div align="center">

# 👨🏻‍💻 Gabriel Coelho Sousa
### **Desenvolvedor Back-End | Node.js • TypeScript • Java • Python**

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=20&duration=3000&pause=1000&color=38BDF8&center=true&vCenter=true&multiline=false&width=620&lines=Desenvolvedor+Back-End+%7C+Node.js+%26+TypeScript;Microsservi%C3%A7os+%7C+RabbitMQ+%7C+Redis+%7C+PostgreSQL;Arquiteturas+RAG+%7C+FastAPI+%26+pgvector;Testes+Automatizados+%26+TDD+%7C+Jest+%26+Pytest;C%C3%B3digo+Limpo%2C+Clean+Architecture+%26+APIs+REST" alt="Typing SVG" />
</a>

<br/><br/>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Gabriel%20Coelho-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabriel-coelho-7184a32a3)
[![Portfolio](https://img.shields.io/badge/Portf%C3%B3lio-Online-10B981?style=for-the-badge&logo=vercel&logoColor=white)](https://portfolio-next-flax-seven.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Coelho--G--Dev-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Coelho-G-Dev)
[![Email](https://img.shields.io/badge/Email-Contato%20Profissional-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabrielcoelho.contato@gmail.com)

</div>

---

### 📌 Sobre Mim & Visão de Engenharia

Sou desenvolvedor focado em **Engenharia de Software Back-End**, graduando em **Ciência e Tecnologia (BICT)** pela **Universidade Federal do Maranhão (UFMA)**. 

Dedico meus estudos e projetos à construção de **microsserviços, fluxos orientados a eventos (EDA), pipelines RAG com busca vetorial e APIs RESTful estruturadas e documentadas**. Desenvolvo projetos autorais aplicando na prática mensageria assíncrona com **RabbitMQ** (Topic Exchanges, filas dedicadas e DLQ), controle de concorrência e cache com **Redis**, bancos relacionais e vetoriais (**PostgreSQL / pgvector / Prisma**), e testes automatizados com **Jest e Pytest**, seguindo princípios de Clean Architecture e SOLID.

Alio o aprendizado contínuo em tecnologia à experiência prévia liderando equipes e processos operacionais sob ritmo acelerado, trazendo senso de prioridade, responsabilidade e resiliência na resolução de problemas técnicos.

- 🎓 **Formação Acadêmica**: Ciência e Tecnologia (BICT) — UFMA
- 🏆 **Formações & Especializações**:
  - **Oracle Next Education (ONE)** — Trilha Back-End com Java
  - **Oracle Next Education (ONE)** — Trilha de Inteligência Artificial & Engenharia de Prompts
  - **Formação Trilhas 2B** — Desenvolvimento de Software Back-End
- 🎯 **Foco de Carreira**: Desenvolvimento Back-End (Node.js, TypeScript, Java / Spring Boot, Python / FastAPI, Microsserviços e Arquiteturas Escaláveis em Nuvem).

---

### 🚀 Projetos em Destaque

<table>
  <tr>
    <td width="50%" valign="top">
      <h3 align="left">🛡️ <a href="https://github.com/Coelho-G-Dev/authguard">AuthGuard — Enterprise Auth Microservice</a></h3>
      <p>
        Microsserviço de autenticação, identidade e autorização de padrão corporativo, desenhado com arquitetura limpa e alta resiliência.
      </p>
      <ul>
        <li><b>Segurança Avançada:</b> Rotação contínua de JWT, autenticação multifator nativa (<b>2FA/TOTP</b> com QR Code), RBAC granular e revogação atômica de sessões com <b>Redis Token Blacklist</b>.</li>
        <li><b>Resiliência & Concorrência:</b> Rate limiting distribuído (Token Bucket Algorithm) e orquestração de 5 containers com Docker Compose.</li>
        <li><b>Event-Driven (EDA):</b> Publicação e consumo assíncrono de eventos com <b>RabbitMQ</b> (Topic Exchanges, filas dedicadas e Dead Letter Queues - DLQ).</li>
        <li><b>Rastreabilidade & Observabilidade:</b> Distributed Tracing com propagação de contexto padrão W3C, endpoints de saúde (<code>/health</code>, <code>/ready</code>) e métricas.</li>
        <li><b>Qualidade:</b> 100% de aprovação em <b>94 testes automatizados (16 suites com Jest)</b> com <b>>90% de cobertura de código</b>.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
        <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
        <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
        <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" />
        <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
        <img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3 align="left">🧠 <a href="https://github.com/Coelho-G-Dev/rag-servicos-publicos">RAG Serviços Públicos — Semantic Search & AI Microservices</a></h3>
      <p>
        Sistema distribuído de busca semântica e síntese fundamentada sobre serviços públicos, projetado em microsserviços desacoplados e pipeline RAG resiliente.
      </p>
      <ul>
        <li><b>Busca Vetorial de Alta Performance:</b> Embeddings locais com <code>all-MiniLM-L6-v2</code> (384d) e indexação HNSW em <b>PostgreSQL + pgvector</b> (cosine similarity em sub-segundo).</li>
        <li><b>Geração Fundamentada (Anti-Alucinação):</b> Orquestração de LLM com <b>Google Gemini</b> via injeção estrita de contexto, fontes auditáveis e modo fallback resiliente.</li>
        <li><b>Microsserviços Desacoplados:</b> API Gateway público em <b>Node.js / Express / TypeScript</b> e AI Service em <b>Python 3.11 / FastAPI</b> com comunicação interna autenticada.</li>
        <li><b>Observabilidade & Métricas:</b> Monitoramento com <b>Prometheus</b> (latência HTTP, consultas RAG, GC/event loop), logs estruturados em JSON (Pino) e <b>Swagger / OpenAPI</b>.</li>
        <li><b>Infraestrutura & Qualidade:</b> Blueprint IaC para Render (<code>render.yaml</code>), multi-containers com Docker Compose e testes automatizados com <b>Pytest</b> e <b>Jest</b>.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" />
        <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" />
        <img src="https://img.shields.io/badge/pgvector-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
        <img src="https://img.shields.io/badge/Google%20Gemini-8E75C2?style=flat-square&logo=google&logoColor=white" />
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
        <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
        <img src="https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white" />
      </p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3 align="left">💰 <a href="https://github.com/Coelho-G-Dev/api-financeira-inteligente">API Financeira Inteligente</a></h3>
      <p>
        API robusta de controle orçamentário e inteligência financeira integrada a modelos de Inteligência Artificial Generativa.
      </p>
      <ul>
        <li><b>Auditoria com IA:</b> Avaliação inteligente de despesas e geração de insights de economia via <b>Google Gemini AI</b>.</li>
        <li><b>Tarefas Automatizadas:</b> Agendamento distribuído de rotinas e processamento periódico com <b>Node-Cron</b>.</li>
        <li><b>Segurança & Validação:</b> Autenticação stateless via JWT, hash criptográfico de senhas e sanitização rigorosa de payloads com <b>Zod</b>.</li>
        <li><b>Persistência:</b> Modelagem relacional e queries eficientes para controle financeiro em tempo real.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" />
        <img src="https://img.shields.io/badge/Google%20Gemini-8E75C2?style=flat-square&logo=google&logoColor=white" />
        <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
        <img src="https://img.shields.io/badge/Zod-3E67B1?style=flat-square&logo=zod&logoColor=white" />
      </p>
    </td>
    <td width="50%" valign="top">
      <h3 align="left">🔎 <a href="https://github.com/Coelho-G-Dev/Desafio-05-Back-End">BuscaSUS</a></h3>
      <p>
        Plataforma de geolocalização e busca de serviços de saúde pública desenvolvida com impacto social.
      </p>
      <ul>
        <li><b>Integrações Públicas:</b> Consumo e normalização de dados abertos governamentais.</li>
        <li><b>Geolocalização:</b> Integração avançada com a <b>Google Maps API</b> para cálculo de proximidade e roteamento eficiente para unidades médicas.</li>
        <li><b>Arquitetura:</b> Estrutura modular em Node.js com endpoints otimizados para alta concorrência de consultas.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
        <img src="https://img.shields.io/badge/Google%20Maps%20API-4285F4?style=flat-square&logo=googlemaps&logoColor=white" />
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
      </p>
    </td>
  </tr>
  <tr>
    <td colspan="2" valign="top">
      <h3 align="left">📘 <a href="https://github.com/Coelho-G-Dev/Planer-de-Estudos-">Planner de Estudos & Workflows</a></h3>
      <p>
        Ecossistema integrado de produtividade, rastreamento de métricas acadêmicas e automações de tarefas.
      </p>
      <ul>
        <li><b>Fluxos Automatizados:</b> Integração de APIs para sincronização contínua de rotinas e tarefas.</li>
        <li><b>Organização Técnica:</b> Gestão estruturada de cronogramas e sprints pessoais de aprendizado de tecnologia.</li>
      </ul>
      <p>
        <img src="https://img.shields.io/badge/Automation-FF6B6B?style=flat-square&logo=git&logoColor=white" />
        <img src="https://img.shields.io/badge/Notion%20API-000000?style=flat-square&logo=notion&logoColor=white" />
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" />
      </p>
    </td>
  </tr>
</table>

---

### 🛠️ Stack Tecnológica & Arsenal de Engenharia

<table>
  <tbody>
    <tr>
      <td width="25%"><b>Linguagens & Runtimes</b></td>
      <td>
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
        <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
        <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
        <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java" />
        <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
        <img src="https://img.shields.io/badge/SQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="SQL" />
      </td>
    </tr>
    <tr>
      <td width="25%"><b>Frameworks & Arquitetura</b></td>
      <td>
        <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
        <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
        <img src="https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white" alt="Fastify" />
        <img src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" alt="Spring Boot" />
        <img src="https://img.shields.io/badge/Prisma%20ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma" />
        <img src="https://img.shields.io/badge/RESTful%20APIs-02569B?style=for-the-badge&logo=googlecloud&logoColor=white" alt="RESTful APIs" />
        <img src="https://img.shields.io/badge/Clean%20Architecture-00599C?style=for-the-badge&logo=blueprint&logoColor=white" alt="Clean Arch" />
      </td>
    </tr>
    <tr>
      <td width="25%"><b>Bancos de Dados & Filas</b></td>
      <td>
        <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
        <img src="https://img.shields.io/badge/pgvector-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="pgvector" />
        <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" />
        <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white" alt="RabbitMQ" />
        <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
      </td>
    </tr>
    <tr>
      <td width="25%"><b>DevOps, Testes & Infra</b></td>
      <td>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker" />
        <img src="https://img.shields.io/badge/Jest%20(TDD)-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest" />
        <img src="https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white" alt="Pytest" />
        <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white" alt="Prometheus" />
        <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
        <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" alt="GitHub Actions" />
        <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" />
        <img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt="Linux" />
      </td>
    </tr>
    <tr>
      <td width="25%"><b>Interface & Ecossistema</b></td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
        <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
        <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
        <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
      </td>
    </tr>
  </tbody>
</table>

---

### 📊 Estatísticas do GitHub

<div align="center">
  <a href="https://github.com/Coelho-G-Dev">
    <img height="165em" src="https://github-readme-stats-eight-theta.vercel.app/api?username=Coelho-G-Dev&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true" alt="Gabriel Coelho's GitHub Stats" />
    <img height="165em" src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=Coelho-G-Dev&layout=compact&theme=tokyonight&hide_border=true" alt="Top Languages" />
  </a>
</div>

<div align="center">
  <a href="https://github.com/Coelho-G-Dev">
    <img src="https://streak-stats.demolab.com/?user=Coelho-G-Dev&theme=tokyonight&hide_border=true" alt="Gabriel Coelho's GitHub Streak" />
  </a>
</div>

---

### 🤝 Vamos Conversar?

Estou sempre aberto a trocar ideias sobre **engenharia de software, arquitetura back-end, microsserviços e novas oportunidades profissionais**.

- 💼 **LinkedIn**: [linkedin.com/in/gabriel-coelho-7184a32a3](https://www.linkedin.com/in/gabriel-coelho-7184a32a3)
- 🌐 **Portfólio**: [portfolio-next-flax-seven.vercel.app](https://portfolio-next-flax-seven.vercel.app/)
- 💻 **GitHub**: [@Coelho-G-Dev](https://github.com/Coelho-G-Dev)
- 📬 **E-mail**: [gabrielcoelho.contato@gmail.com](mailto:gabrielcoelho.contato@gmail.com)

<div align="center">
  <sub>Construindo sistemas confiáveis com código limpo, segurança e alta performance. 🚀</sub>
</div>
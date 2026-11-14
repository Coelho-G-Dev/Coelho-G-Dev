export const SITE = "https://portfolio-next-flax-seven.vercel.app";
export const NUMBERS = { testsCidade: 435, testsAuthguard: 94, awardDate: "2026-10-23" };
export const PROJECTS = {
  cidade:    { title: "Cidade Energia",            repo: "https://github.com/Coelho-G-Dev/Cidade-Energia-Back-End",
               front: "https://github.com/Coelho-G-Dev/Cidade-Energia-Front-End",
               app: "https://cidade-energia.vercel.app", docs: "https://cidade-energia-back-end.vercel.app/api/docs" },
  authguard: { title: "AuthGuard",                 repo: "https://github.com/Coelho-G-Dev/authguard" },
  guia:      { title: "Guia Maranhão",             repo: "https://github.com/Coelho-G-Dev/Guia-Maranhao" },
  buscasus:  { title: "BuscaSUS",                  repo: "https://github.com/Coelho-G-Dev/Desafio-05-Back-End",
               front: "https://github.com/Coelho-G-Dev/Busca-Sus/tree/main/frontend" },
  rag:       { title: "RAG Serviços Públicos",     repo: "https://github.com/Coelho-G-Dev/rag-servicos-publicos" },
  financeira:{ title: "API Financeira Inteligente", repo: "https://github.com/Coelho-G-Dev/api-financeira-inteligente" },
};
// Mesma ordem de projectsForDoor() do site. `link` diz qual repositório a linha mostra.
export const DOOR_LISTS = {
  backend: [
    { id: "cidade", link: "repo",
      en: "Serverless API on Next.js and Supabase: 22 routes validated with Zod, RLS on every table, 302 tests.",
      pt: "API serverless em Next.js e Supabase: 22 rotas validadas com Zod, RLS em todas as tabelas, 302 testes." },
    { id: "authguard", link: "repo",
      en: "Identity and permissions service: 1,400 req/s, p99 under 35 ms, RabbitMQ with a DLQ, 94 tests.",
      pt: "Serviço de identidade e permissões: 1.400 req/s, p99 abaixo de 35 ms, RabbitMQ com DLQ, 94 testes." },
    { id: "guia", link: "repo",
      en: "Public services API for Maranhão: IBGE and Google Maps data in one place, with JWT auth.",
      pt: "API de serviços públicos do Maranhão: dados do IBGE e do Google Maps num só lugar, com JWT." },
    { id: "buscasus", link: "repo",
      en: "Finds the nearest public health unit and maps the route, with a MongoDB 2dsphere index.",
      pt: "Encontra a unidade de saúde pública mais próxima e traça a rota, com índice 2dsphere no MongoDB." },
    { id: "rag", link: "repo",
      en: "Two decoupled services: FastAPI runs the RAG and a Node.js service filters metadata, with the vectors in the same PostgreSQL.",
      pt: "Dois serviços desacoplados: FastAPI orquestra o RAG e um serviço Node.js filtra metadados, com os vetores no mesmo PostgreSQL." },
    { id: "financeira", link: "repo",
      en: "ACID transactions on a PostgreSQL ledger, with AI-assisted auditing.",
      pt: "Transações ACID num ledger em PostgreSQL, com auditoria assistida por IA." },
  ],
  frontend: [
    { id: "cidade", link: "front",
      en: "Next.js 16 and React 19 PWA: solar simulator, quiz tracks, map and tutor. 133 tests, and a mock mode that runs without a back end.",
      pt: "PWA em Next.js 16 e React 19: simulador solar, trilhas com quiz, mapa e tutor. 133 testes e um modo simulado que roda sem back-end." },
    { id: "buscasus", link: "front",
      en: "Mobile-first map interface: health units by radius and routes with Google Maps.",
      pt: "Interface de mapa mobile-first: unidades de saúde por raio e rotas com o Google Maps." },
  ],
  ia: [
    { id: "rag", link: "repo",
      en: "Answers about public services that cite the source: HNSW vector search under 15 ms on 384d local embeddings.",
      pt: "Respostas sobre serviços públicos que citam a fonte: busca vetorial HNSW abaixo de 15 ms com embeddings locais de 384d." },
    { id: "financeira", link: "repo",
      en: "Gemini flags anomalies off the posting path, without delaying any transaction.",
      pt: "O Gemini aponta anomalias fora do caminho do lançamento, sem atrasar nenhuma transação." },
    { id: "cidade", link: "repo",
      en: "Energinho tutor: RAG with Gemini and pgvector, with a similarity threshold calibrated on real questions.",
      pt: "Tutor Energinho: RAG com Gemini e pgvector, com limiar de similaridade calibrado com perguntas reais." },
  ],
};

export const LOCALES = ['en','pt'];
export const THEMES = ['light','dark'];
export const DOORS = ['backend','frontend','ia'];
export const NAV = ['work','skills','contact'];
export const LINKS = { linkedin:'https://www.linkedin.com/in/gabriel-coelho-7184a32a3',email:'mailto:gabrielbiellosousa@gmail.com' };
export const SKILLS = {
  "en": [
    {
      "name": "Back-end",
      "items": [
        "Node.js",
        "TypeScript",
        "Python and FastAPI"
      ]
    },
    {
      "name": "Front-end",
      "items": [
        "Next.js 16 and React 19",
        "React and maps",
        "Accessibility",
        "Mock mode"
      ]
    },
    {
      "name": "Messaging and caching",
      "items": [
        "RabbitMQ",
        "Redis"
      ]
    },
    {
      "name": "Databases and vector search",
      "items": [
        "PostgreSQL",
        "pgvector",
        "Supabase",
        "Prisma"
      ]
    },
    {
      "name": "Testing and delivery",
      "items": [
        "Vitest and Jest",
        "Playwright",
        "Docker and Compose",
        "GitHub Actions"
      ]
    }
  ],
  "pt": [
    {
      "name": "Back-end",
      "items": [
        "Node.js",
        "TypeScript",
        "Python e FastAPI"
      ]
    },
    {
      "name": "Front-end",
      "items": [
        "Next.js 16 e React 19",
        "React e mapas",
        "Acessibilidade",
        "Modo simulado"
      ]
    },
    {
      "name": "Mensageria e cache",
      "items": [
        "RabbitMQ",
        "Redis"
      ]
    },
    {
      "name": "Bancos e busca vetorial",
      "items": [
        "PostgreSQL",
        "pgvector",
        "Supabase",
        "Prisma"
      ]
    },
    {
      "name": "Testes e entrega",
      "items": [
        "Vitest e Jest",
        "Playwright",
        "Docker e Compose",
        "GitHub Actions"
      ]
    }
  ]
};
export const COPY = { en: {
  "name": "Gabriel Coelho",
  "branches": [
    "DLQ",
    "RAG"
  ],
  "role": "Full-stack, back-end focused · São Luís, Brazil",
  "houses": [
    "Client",
    "Gateway",
    "RabbitMQ",
    "Audit",
    "PostgreSQL"
  ],
  "nav": {
    "work": "Work",
    "skills": "Skills",
    "contact": "Contact"
  },
  "button": "See the full portfolio",
  "featuredLinks": [
    "App",
    "API docs",
    "Back-end",
    "Front-end"
  ],
  "builtWith": "Built with Alcides Casemiro and Gabriel Rodrigues.",
  "doors": {
    "backend": {
      "name": "Back-end",
      "line": "APIs, queues and data that never get lost."
    },
    "frontend": {
      "name": "Front-end",
      "line": "Interfaces and PWAs that talk cleanly to the API."
    },
    "ia": {
      "name": "AI",
      "line": "RAG that answers with sources."
    }
  },
  "inPortfolio": "in the portfolio",
  "skillsMore": "Where each one shows up",
  "tilesTitle": "My year in tiles",
  "tilesLegend": "Each tile is a week of commits on GitHub.",
  "otherLanguage": "Português",
  "contact": [
    "Portfolio",
    "LinkedIn",
    "Email"
  ]
}, pt: {
  "name": "Gabriel Coelho",
  "branches": [
    "DLQ",
    "RAG"
  ],
  "role": "Full-stack com foco em back-end · São Luís, MA",
  "houses": [
    "Cliente",
    "Gateway",
    "RabbitMQ",
    "Auditoria",
    "PostgreSQL"
  ],
  "nav": {
    "work": "Projetos",
    "skills": "Skills",
    "contact": "Contato"
  },
  "button": "Ver o portfólio completo",
  "featuredLinks": [
    "App",
    "Docs da API",
    "Back-end",
    "Front-end"
  ],
  "builtWith": "Feito com Alcides Casemiro e Gabriel Rodrigues.",
  "doors": {
    "backend": {
      "name": "Back-end",
      "line": "APIs, filas e dados que não se perdem."
    },
    "frontend": {
      "name": "Front-end",
      "line": "Interfaces e PWAs que conversam bem com a API."
    },
    "ia": {
      "name": "IA",
      "line": "RAG que responde com fontes."
    }
  },
  "inPortfolio": "no portfólio",
  "skillsMore": "Onde cada uma aparece",
  "tilesTitle": "Meu ano em azulejos",
  "tilesLegend": "Cada azulejo é uma semana de commits no GitHub.",
  "otherLanguage": "English",
  "contact": [
    "Portfólio",
    "LinkedIn",
    "E-mail"
  ]
} };
const [year,month,day] = NUMBERS.awardDate.split('-');
COPY.en.intro = 'Full-stack developer, back-end focused. I study Science and Technology at UFMA and build REST APIs, queue-based services with RabbitMQ and Redis, and RAG search on PostgreSQL with pgvector: '+NUMBERS.testsCidade+' automated tests in Cidade Energia, '+NUMBERS.testsAuthguard+' in AuthGuard.';
COPY.pt.intro = 'Desenvolvedor full-stack com foco em back-end. Curso Ciência e Tecnologia na UFMA e construo APIs REST, serviços com filas em RabbitMQ e Redis e busca RAG em PostgreSQL com pgvector: '+NUMBERS.testsCidade+' testes automatizados no Cidade Energia, '+NUMBERS.testsAuthguard+' no AuthGuard.';
COPY.en.award = '1ST PLACE · EQUATORIAL HACKATHON · '+['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'][Number(month)-1]+' '+Number(day)+', '+year;
COPY.pt.award = '1º LUGAR · HACKATHON EQUATORIAL · '+Number(day)+' '+['JAN','FEV','MAR','ABR','MAI','JUN','JUL','AGO','SET','OUT','NOV','DEZ'][Number(month)-1]+' '+year;
COPY.en.featuredLine = 'RAG tutor API · PWA · '+NUMBERS.testsCidade+' tests · live';
COPY.pt.featuredLine = 'API com tutor RAG · PWA · '+NUMBERS.testsCidade+' testes · no ar';
COPY.en.tilesTotal = n => n+' contributions in the last twelve months';
COPY.pt.tilesTotal = n => n+' contribuições nos últimos doze meses';
export function doorCount(door) { return DOOR_LISTS[door].length; }
export function countLabel(n,locale) { return n+' '+(locale==='pt' ? (n===1?'projeto':'projetos') : (n===1?'project':'projects')); }

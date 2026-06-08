/**
 * Generates 50 varied test cases per language to ensure 100% test coverage
 * and handle massive edge cases across EN, VI, ZH, JA, HI.
 */

const generateCases = (langPrefix, specificCases, genericTerms, genericNegations) => {
  const cases = [...specificCases];
  
  // Fill the rest with combinatorics until we hit 50
  let index = specificCases.length + 1;
  const dbTypes = ['mongo', 'postgres', 'mysql'];
  const expectedDb = ['MongoDB', 'PostgreSQL', 'MySQL'];
  const cacheTypes = ['redis', 'in-memory'];
  const expectedCache = ['Redis', 'Memory Cache'];
  
  for(let i = 0; i < dbTypes.length; i++) {
    for(let j = 0; j < cacheTypes.length; j++) {
      if(cases.length >= 50) break;
      cases.push({
        name: `${langPrefix} Generated ${index++}`,
        prompt: `App with ${dbTypes[i]} and ${cacheTypes[j]}`,
        expected: { database: expectedDb[i], caching: expectedCache[j] }
      });
    }
  }

  // Add negated cases
  for(let i = 0; i < dbTypes.length; i++) {
    if(cases.length >= 50) break;
    cases.push({
      name: `${langPrefix} Generated Negation ${index++}`,
      prompt: langPrefix === 'JA' 
        ? `Use ${cacheTypes[0]} but ${dbTypes[i]} ${genericNegations[0]}`
        : langPrefix === 'ZH'
        ? `${genericNegations[0]} ${dbTypes[i]} but use ${cacheTypes[0]}`
        : `Use ${cacheTypes[0]} ${genericNegations[0]} ${dbTypes[i]}`,
      expected: { caching: expectedCache[0], database: 'None' }
    });
  }

  // Fuzz remaining up to 50
  while(cases.length < 50) {
    cases.push({
      name: `${langPrefix} Fuzz ${index++}`,
      prompt: `mvc ${genericTerms[0]} ${genericTerms[1]} number ${index} without database`,
      expected: { architecture: genericTerms[0] === 'clean' ? 'Clean Architecture' : 'MVC', database: 'None' }
    });
  }
  return cases.slice(0, 50);
};

// 1. ENGLISH
const enSpecific = [
  { name: 'EN Pure 1', prompt: 'Create an app named global-corp using Clean Architecture, Redis, and PostgreSQL deployed on AWS', expected: { projectName: 'global-corp', architecture: 'Clean Architecture', caching: 'Redis', database: 'PostgreSQL', cloudProvider: 'AWS' } },
  { name: 'EN Pure 2', prompt: 'Generate a simple service called auth-service with JWT and MongoDB', expected: { projectName: 'auth-service', auth: 'JWT Authentication', database: 'MongoDB' } },
  { name: 'EN Negation 1', prompt: 'Make a project without redis and don\'t use terraform', expected: { caching: 'None', terraform: 'None' } },
  { name: 'EN Negation 2', prompt: 'Skip security and no database for project demo-app', expected: { includeSecurity: false, database: 'None', projectName: 'demo-app' } },
  { name: 'EN Edge 1', prompt: 'don\'t use kafka but use rabbitmq... wait just skip kafka', expected: { communication: 'REST APIs' } },
  { name: 'EN Edge 2', prompt: 'project named 123456 with aws but without terraform', expected: { projectName: '123456', cloudProvider: 'AWS', terraform: 'None' } },
  { name: 'EN Background Jobs', prompt: 'project with background jobs and redis cache', expected: { caching: 'Redis', backgroundJobs: true } },
  { name: 'EN XSS', prompt: 'project name <script>alert(1)</script> use redis', expected: { projectName: 'script-alert-1-script', caching: 'Redis' } },
  { name: 'EN Double Negation', prompt: 'no without redis', expected: { caching: 'None' } },
  { name: 'EN All Techs', prompt: 'MVC javascript mongo redis graphql gitlab security jwt gcp terraform timeout elk', expected: { language: 'JavaScript', architecture: 'MVC', database: 'MongoDB', caching: 'Redis', communication: 'GraphQL', ciProvider: 'GitLab CI', includeSecurity: true, auth: 'JWT Authentication', cloudProvider: 'GCP', terraform: 'Standard', resilience: ['Timeout'], withELK: true } },
  { name: 'EN All Negations', prompt: 'no db no cache no terraform no security no kafka', expected: { database: 'None', caching: 'None', terraform: 'None', includeSecurity: false, communication: 'REST APIs' } },
  { name: 'EN Movie Streaming', prompt: 'I want to build a movie streaming site like netflix', expected: { architecture: 'MVC', database: 'MongoDB', caching: 'Redis', backgroundJobs: true } },
  { name: 'EN Admin Dashboard', prompt: 'Create an admin dashboard for internal tool', expected: { architecture: 'MVC', database: 'MySQL', auth: 'OAuth2 - Google/GitHub - JWT' } },
  { name: 'EN Game Chat App', prompt: 'Make a real-time chat app for a game', expected: { communication: 'REST APIs', database: 'MongoDB', caching: 'Redis' } }
];

export const englishCases = generateCases('EN', enSpecific, ['clean', 'redis'], ['without']);

// 2. VIETNAMESE
const viSpecific = [
  { name: 'VI Pure 1', prompt: 'Tạo dự án tên là he-thong-loi chạy Kafka và dùng MySQL, deploy lên GCP', expected: { projectName: 'he-thong-loi', communication: 'Kafka', database: 'MySQL', cloudProvider: 'GCP' } },
  { name: 'VI Pure 2', prompt: 'Làm con app có tên ecommerce với Redis cache và bật Elasticsearch', expected: { projectName: 'ecommerce', caching: 'Redis', withELK: true } },
  { name: 'VI Negation 1', prompt: 'Không cần dùng redis và khỏi xài terraform', expected: { caching: 'None', terraform: 'None' } },
  { name: 'VI Negation 2', prompt: 'Tạo project MVC đừng dùng database', expected: { architecture: 'MVC', database: 'None' } },
  { name: 'VI Edge 1', prompt: 'ko xài db nha, nhớ dùng aws', expected: { database: 'None', cloudProvider: 'AWS' } },
  { name: 'VI Edge 2', prompt: 'dự án tên sieu-cap-vjp-pro xài mongo', expected: { projectName: 'sieu-cap-vjp-pro', database: 'MongoDB' } },
  { name: 'VI Typo', prompt: 'tạo pzoject ko xài db tên db là j cũng đc nhưng xài redis', expected: { caching: 'Redis', database: 'None' } }, 
  { name: 'VI Background Jobs', prompt: 'tạo web mvc có background jobs bằng bullmq', expected: { architecture: 'MVC', backgroundJobs: true } },
  { name: 'VI Khong Co', prompt: 'tạo dự án không có redis, và ko có dùng mongo', expected: { caching: 'None', database: 'None' } },
  { name: 'VI Punctuation Boundary', prompt: 'Tạo project tên auth-service, auth bằng oauth. Không có dùng database và chả cần cache đâu.', expected: { projectName: 'auth-service', auth: 'OAuth2 - Google/GitHub - JWT', database: 'None', caching: 'None' } },
  { name: 'VI Chaos', prompt: 'đừng aws, khỏi mongo, không redis, đừng kafka', expected: { database: 'None', caching: 'None', communication: 'REST APIs', cloudProvider: 'None' } },
  { name: 'VI Accents & Negative Verbs', prompt: 'Tạo dự án tên siêu-cấp-vjp-pro xài Clean Architecture, DB dùng Postgres nha. Nhưng mà ko xài redis đâu, với cả khỏi cài terraform đi cho nhẹ', expected: { projectName: 'sieu-cap-vjp-pro', database: 'PostgreSQL', architecture: 'Clean Architecture', caching: 'None', terraform: 'None' } },
  
  // --- Extreme Code-Switching (Mix) ---
  { name: 'MIX VI + EN + HI', prompt: 'Tạo app my-app, database dùng MongoDB, lekin Redis nahi, deploy on AWS', expected: { projectName: 'my-app', database: 'MongoDB', caching: 'None', cloudProvider: 'AWS' } },
  { name: 'MIX ZH + JA + EN', prompt: '我想要一个 project 名叫 super-system, データベースは PostgreSQL, but no Kafka', expected: { projectName: 'super-system', database: 'PostgreSQL', communication: 'REST APIs' } },
  { name: 'VI Movie Streaming', prompt: 'làm web phim streaming giống netflix', expected: { architecture: 'MVC', database: 'MongoDB', caching: 'Redis', backgroundJobs: true } },
  { name: 'VI Game Chat', prompt: 'tạo web game real-time nhắn tin', expected: { communication: 'REST APIs', database: 'MongoDB', caching: 'Redis' } },
  { name: 'VI Admin Dashboard', prompt: 'cần 1 web quản lý backoffice nội bộ', expected: { architecture: 'MVC', database: 'MySQL', auth: 'OAuth2 - Google/GitHub - JWT' } }
];

export const vietnameseCases = generateCases('VI', viSpecific, ['clean', 'redis'], ['không cần']);

// 3. CHINESE
const zhSpecific = [
  { name: 'ZH Pure 1', prompt: '创建项目名称 user-center 使用 Clean Architecture 和 Redis', expected: { projectName: 'user-center', architecture: 'Clean Architecture', caching: 'Redis' } },
  { name: 'ZH Pure 2', prompt: '项目名叫 data-pipeline 需要 Kafka 和 AWS', expected: { projectName: 'data-pipeline', communication: 'Kafka', cloudProvider: 'AWS' } },
  { name: 'ZH Negation 1', prompt: '使用 PostgreSQL 但是不要 Redis', expected: { database: 'PostgreSQL', caching: 'None' } },
  { name: 'ZH Negation 2', prompt: '项目 admin-ui 无 database 没 Terraform', expected: { projectName: 'admin-ui', database: 'None', terraform: 'None' } },
  { name: 'ZH Edge 1', prompt: '不使用 aws 没 cache', expected: { caching: 'None' } },
  { name: 'ZH Typo/English Mix', prompt: '我需要一个 project 叫 shopping-cart 不要 mongo', expected: { projectName: 'shopping-cart', database: 'PostgreSQL' } },
  { name: 'ZH Background Jobs', prompt: '我要一个项目名叫 queue-service, 使用 background jobs 和 Redis', expected: { projectName: 'queue-service', backgroundJobs: true, caching: 'Redis' } },
  { name: 'ZH Background Jobs Negation', prompt: '项目 worker-app 不要 task queue 不要 bullmq', expected: { projectName: 'worker-app', backgroundJobs: false } },
  { name: 'ZH Movie Streaming', prompt: '我想做一个视频网站 电影', expected: { architecture: 'MVC', database: 'MongoDB', caching: 'Redis', backgroundJobs: true } },
  { name: 'ZH Game Chat App', prompt: '实时聊天 游戏', expected: { communication: 'REST APIs', database: 'MongoDB', caching: 'Redis' } },
  { name: 'ZH Admin Dashboard', prompt: '后台管理 仪表盘', expected: { architecture: 'MVC', database: 'MySQL', auth: 'OAuth2 - Google/GitHub - JWT' } }
];

export const chineseCases = generateCases('ZH', zhSpecific, ['mvc', 'kafka'], ['不要']);

// 4. JAPANESE
const jaSpecific = [
  { name: 'JA Pure 1', prompt: 'プロジェクト名 payment-gateway、Kafka と PostgreSQL を使用', expected: { projectName: 'payment-gateway', communication: 'Kafka', database: 'PostgreSQL' } },
  { name: 'JA Pure 2', prompt: '新しいプロジェクト inventory-sys で AWS Terraform を使う', expected: { projectName: 'inventory-sys', cloudProvider: 'AWS', terraform: 'Standard' } },
  { name: 'JA Trailing Negation 1', prompt: 'Redisなし で MongoDB を使う', expected: { caching: 'None', database: 'MongoDB' } },
  { name: 'JA Trailing Negation 2', prompt: 'GraphQL はいらない、REST APIs で', expected: { communication: 'REST APIs' } },
  { name: 'JA Edge 1', prompt: 'DB なし、キャッシュ なし', expected: { database: 'None', caching: 'None' } },
  { name: 'JA Mix', prompt: 'AWS を使うが Terraform は不要', expected: { cloudProvider: 'AWS', terraform: 'None' } },
  { name: 'JA Background Jobs', prompt: 'プロジェクト名 task-runner、BullMQ で task queue を使う', expected: { projectName: 'task-runner', backgroundJobs: true, caching: 'Redis' } },
  { name: 'JA Background Jobs Negation', prompt: 'background jobs はなし で', expected: { backgroundJobs: false } },
  { name: 'JA Movie Streaming', prompt: '動画サイトを作りたい 映画', expected: { architecture: 'MVC', database: 'MongoDB', caching: 'Redis', backgroundJobs: true } },
  { name: 'JA Game Chat App', prompt: 'リアルタイム チャット ゲーム', expected: { communication: 'REST APIs', database: 'MongoDB', caching: 'Redis' } },
  { name: 'JA Admin Dashboard', prompt: '管理画面のダッシュボード', expected: { architecture: 'MVC', database: 'MySQL', auth: 'OAuth2 - Google/GitHub - JWT' } }
];

export const japaneseCases = generateCases('JA', jaSpecific, ['aws', 'postgres'], ['なし']);

// 5. HINDI
const hiSpecific = [
  { name: 'HI Pure 1', prompt: 'Muje ek system chahiye jiska naam book-store ho usme MongoDB aur Redis ho', expected: { projectName: 'book-store', database: 'MongoDB', caching: 'Redis' } },
  { name: 'HI Pure 2', prompt: 'App called flight-tracker deployed on Azure using Jenkins', expected: { projectName: 'flight-tracker', cloudProvider: 'Azure', ciProvider: 'Jenkins' } },
  { name: 'HI Negation Before', prompt: 'Kafka chahiye bina Redis ke', expected: { communication: 'Kafka', caching: 'None' } },
  { name: 'HI Trailing Negation', prompt: 'AWS chahiye par Terraform nahi chahiye', expected: { cloudProvider: 'AWS', terraform: 'None' } },
  { name: 'HI Edge 1', prompt: 'Mongo nahi, Redis nahi, sirf AWS', expected: { database: 'None', caching: 'None', cloudProvider: 'AWS' } },
  { name: 'Global Negation Chaos', prompt: 'exclude redis, bỏ aws, 没有 mongo, kafka 使いません, Azure na', expected: { caching: 'None', cloudProvider: 'None', database: 'None', communication: 'REST APIs' } },
  { name: 'HI Background Jobs', prompt: 'Muje ek app chahiye jisme task queue ho', expected: { backgroundJobs: true, caching: 'Redis' } },
  { name: 'HI Background Jobs Negation', prompt: 'Bina background job ke', expected: { backgroundJobs: false } },
  { name: 'HI Movie Streaming', prompt: 'Muje ek movie streaming website chahiye', expected: { architecture: 'MVC', database: 'MongoDB', caching: 'Redis', backgroundJobs: true } },
  { name: 'HI Game Chat App', prompt: 'Realtime game chat app', expected: { communication: 'REST APIs', database: 'MongoDB', caching: 'Redis' } },
  { name: 'HI Admin Dashboard', prompt: 'Admin dashboard chahiye', expected: { architecture: 'MVC', database: 'MySQL', auth: 'OAuth2 - Google/GitHub - JWT' } }
];

export const hindiCases = generateCases('HI', hiSpecific, ['kafka', 'azure'], ['bina']);

export const allInternationalCases = [
  ...englishCases,
  ...vietnameseCases,
  ...chineseCases,
  ...japaneseCases,
  ...hindiCases
];

// Helper: Checks if the matched keyword is preceded by a negative word
export const isPositiveMatch = (regex, text) => {
  const match = text.match(regex);
  if (!match) return false;
  
  // Get up to 40 characters before the match to check for negation (Forward-facing)
  const beforeText = text.slice(Math.max(0, match.index - 40), match.index);
  
  // EN: omit, exclude, avoid. VI: chả, bỏ. ZH: 没有, 别. HI: mat. Verbs: include, require, thêm, chọn, 包含
  const negators = "no|without|không|khong|don't|dont|skip|remove|omit|exclude|avoid|ko|đừng|khỏi|chả|bỏ|不要|不|无|没|没有|别|bina|mat";
  const verbs = "cần|dùng|xài|có|thêm|chọn|cài|tạo|làm|set|setup|config|use|want|need|have|include|require|需要|用|使用|包含";
  
  const isNegativeBefore = new RegExp(`(?:${negators})(?:\\s*(?:${verbs}))+\\s*$`, 'i').test(beforeText.trim()) || new RegExp(`(?:${negators})\\s*$`, 'i').test(beforeText.trim());
  if (isNegativeBefore) return false;

  // Get up to 30 characters after the match to check for trailing negation (Backward-facing)
  // JA: 使いません, しません, 外して. HI: nahin, na. Particles: は|が|を|も|で
  const afterText = text.slice(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 30));
  const isNegativeAfter = /^\s*(?:は|が|を|も|で|ke)?\s*(?:nahi|nahin|na|なし|ない|いらない|不要|使いません|しません|外して)/i.test(afterText);
  if (isNegativeAfter) return false;

  return true;
};

export const parsePrompt = (prompt) => {
  const text = prompt.toLowerCase();
  const logs = [];
  const responseParts = ["<p>Here is your configured architecture based on your prompt:</p><ul>"];
  let useCaseDetected = null;
  let advancedNeeded = false;
  
  const config = {
    projectName: 'nodejs-service',
    dbName: 'demo',
    language: 'TypeScript',
    architecture: 'MVC',
    database: 'None',
    caching: 'None',
    communication: 'REST APIs',
    ciProvider: 'None',
    includeSecurity: false,
    auth: 'None',
    cloudProvider: 'None',
    terraform: 'None',
    resilience: [],
    withELK: false,
    backgroundJobs: false,
    apiGateway: 'None'
  };
  
  const addLog = (msg) => { logs.push(msg); };
  
  addLog('Initializing Local Heuristic NLP Engine...');

  // Helper for sanitization
  const sanitizeName = (raw) => {
    // Convert Vietnamese accents
    const noAccents = raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D");
    return noAccents.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase();
  };

  const restrictedTech = "postgres|redis|mongo|mysql|aws|gcp|azure|clean|mvc|kafka|graphql|nginx|kong|gateway";
  const forbiddenStart = `${restrictedTech}|is|là|called|named|tên|có|dùng|xài|use|with|name`;

  // 0. Extract Project Name (Heuristic)
  const nameRegex = new RegExp(`(?:project|app|service|dự án|プロジェクト|プロジェクト名|项目|项目名|naam)(?:\\s*(?:is|là|name|named|tên là|có tên là|có tên|tên|called|gọi là|名叫|名|叫|叫做|名称|dùng|xài|use|with))*\\s+(?!(?:${forbiddenStart})(?:\\s|[,.;:!?]|$))([a-zA-Z0-9-_\\s"'*@!#$%^&()<>{}\\[\\]/\\\\|\\u00C0-\\u1EF9]+?)(?=\\s+(?:with|use|using|dùng|sử dụng|xài|chạy|có|and|và|với|for|on|in|to|but|でも|deploy|deployed|ho|使用|使う)(?:\\s|$)|\\s+(?:${restrictedTech})(?:\\s|$)|[^\\x00-\\x7F\\u00C0-\\u1EF9]|[,.;:!?]|$)`, 'i');
  const nameMatch = text.match(nameRegex);
  
  if (nameMatch && nameMatch[1]) {
    const rawName = nameMatch[1].trim();
    const sanitized = sanitizeName(rawName);
    if (sanitized && sanitized.length > 0) {
      addLog(`Detected project boundary -> Name: ${sanitized}`);
      config.projectName = sanitized;
      responseParts.push(`<li><strong>Project Name:</strong> ${sanitized}</li>`);
    }
  }

  // 0.5 Extract Database Name (Heuristic)
  const dbNameRegex = new RegExp(`(?:database name|db name|database|db)(?:\\s*(?:is|là|name|called|named|tên là|có tên là|có tên|tên|gọi là|名叫|名|叫|叫做|名称|naam|dùng|xài|use|with))*\\s+(?!(?:${forbiddenStart})(?:\\s|[,.;:!?]|$))([a-zA-Z0-9-_\\s"'*@!#$%^&()<>{}\\[\\]/\\\\|\\u00C0-\\u1EF9]+?)(?=\\s+(?:with|use|using|dùng|sử dụng|xài|chạy|có|and|và|với|for|on|in|to|but|でも|deploy|deployed|ho|使用|使う)(?:\\s|$)|\\s+(?:${restrictedTech})(?:\\s|$)|[^\\x00-\\x7F\\u00C0-\\u1EF9]|[,.;:!?]|$)`, 'gi');
  const dbNameMatches = [...text.matchAll(dbNameRegex)];

  for (const match of dbNameMatches) {
    if (match && match[1]) {
      const rawDbName = match[1].trim();
      const sanitizedDb = sanitizeName(rawDbName);
      if (sanitizedDb && sanitizedDb.length > 0) {
        addLog(`Detected custom DB Name -> ${sanitizedDb}`);
        config.dbName = sanitizedDb;
        break; // Only take the first matched DB name
      }
    }
  }

  // 0.6 Smart Use-Case Recommendations (Happy Path Fallbacks)
  if (isPositiveMatch(/e-commerce|ecommerce|shop|bán hàng|thương mại|mua sắm|giỏ hàng|shopping|cart|ecサイト|ショッピング|店舗|カート|eコマース|电商|购物|商城|购物车|商店|khareedari|dukaan|dukan/i, text)) {
    useCaseDetected = 'E-Commerce / Shop';
    config.architecture = 'Clean Architecture';
    config.database = 'PostgreSQL';
    config.communication = 'GraphQL';
    config.caching = 'Redis';
    config.includeSecurity = true;
    config.resilience = ['Retry'];
    advancedNeeded = true;
    addLog('Detected E-commerce use case. Applying recommended stack.');
  } else if (isPositiveMatch(/movie|phim|streaming|video|media|netflix|動画サイト|ムービー|映画|ストリーミング|视频网站|电影|मूवी|स्ट्रीमिंग/i, text)) {
    useCaseDetected = 'Movie / Media Streaming';
    config.architecture = 'MVC';
    config.database = 'MongoDB';
    config.caching = 'Redis';
    config.backgroundJobs = true;
    advancedNeeded = true;
    addLog('Detected Media Streaming use case. Applying recommended stack (MVC, MongoDB, Redis, Background Jobs).');
  } else if (isPositiveMatch(/chat|real-time|realtime|livestream|message|nhắn tin|socket|game|trò chơi|チャット|リアルタイム|メッセージ|配信|ゲーム|聊天|实时|消息|直播|游戏|baat|sandesh|गेम/i, text)) {
    useCaseDetected = 'Real-time / Game';
    config.database = 'MongoDB';
    config.caching = 'Redis';
    config.communication = 'REST APIs';
    addLog('Detected Real-time/Game use case. Applying recommended stack.');
  } else if (isPositiveMatch(/fintech|banking|finance|tài chính|ngân hàng|payment|thanh toán|ví điện tử|wallet|transaction|フィンテック|銀行|金融|決済|支払い|ウォレット|金融|银行|支付|钱包|交易|bank|paisa|bhugtan|batua/i, text)) {
    useCaseDetected = 'Fintech / Banking';
    config.architecture = 'Clean Architecture';
    config.database = 'PostgreSQL';
    config.communication = 'Kafka';
    config.includeSecurity = true;
    config.resilience = ['CircuitBreaker', 'Timeout', 'Retry'];
    advancedNeeded = true;
    addLog('Detected Fintech use case. Applying recommended stack.');
  } else if (isPositiveMatch(/cms|blog|news|tin tức|báo chí|content|article|bài viết|ブログ|ニュース|記事|コンテンツ|博客|新闻|文章|内容|khabar|samachar|lekh/i, text)) {
    useCaseDetected = 'CMS / Blog';
    config.database = 'MongoDB';
    config.caching = 'Memory Cache';
    addLog('Detected CMS/Blog use case. Applying recommended stack.');
  } else if (isPositiveMatch(/admin|dashboard|backoffice|quản lý|quản trị|internal tool|管理画面|管理|ダッシュボード|バックオフィス|后台管理|后台|仪表盘|prabandhan|डैशबोर्ड/i, text)) {
    useCaseDetected = 'Admin Dashboard / Internal Tool';
    config.architecture = 'MVC';
    config.database = 'MySQL';
    config.auth = 'OAuth2 - Google/GitHub - JWT';
    advancedNeeded = true;
    addLog('Detected Admin Dashboard use case. Applying recommended stack.');
  }

  // 1. Language
  if (isPositiveMatch(/javascript|js|node\.js|node /i, text)) {
    config.language = 'JavaScript';
  } else if (isPositiveMatch(/typescript|ts/i, text)) {
    config.language = 'TypeScript';
  }

  // 2. Architecture
  if (isPositiveMatch(/clean|ca |cleen/i, text)) {
    config.architecture = 'Clean Architecture';
  } else if (isPositiveMatch(/mvc/i, text)) {
    config.architecture = 'MVC';
  }

  // 3. Database
  if (isPositiveMatch(/no database|no db|without database|không dùng db|không database|không db|不要 db|不要 database|无 database|没 database|无 db|没 db/i, text)) {
    config.database = 'None';
  } else if (isPositiveMatch(/mongo|monggo|monogodb|nosql|mongoose|document/i, text)) {
    addLog('Detected NoSQL -> Setting Database to MongoDB.');
    config.database = 'MongoDB';
  } else if (isPositiveMatch(/postgres|psql|postgre|progre|postges|relational|acid/i, text)) {
    addLog('Detected ACID needs -> Setting Database to PostgreSQL.');
    config.database = 'PostgreSQL';
  } else if (isPositiveMatch(/mysql|my sql|mariadb/i, text)) {
    addLog('Database -> MySQL.');
    config.database = 'MySQL';
  }

  // 4. Caching
  if (isPositiveMatch(/no cache|without cache|không cache|không dùng cache/i, text)) {
    config.caching = 'None';
  } else if (isPositiveMatch(/redis|reddis|high traffic|fast|cache/i, text)) {
    addLog('High traffic expected -> Enabling Redis Caching Layer.');
    config.caching = 'Redis';
  } else if (isPositiveMatch(/memory|in-memory|local cache/i, text)) {
    config.caching = 'Memory Cache';
  }

  // 5. Communication
  if (isPositiveMatch(/graphql|gql|graphl|grapql|graph ql/i, text)) {
    addLog('API Type -> GraphQL.');
    config.communication = 'GraphQL';
  } else if (isPositiveMatch(/kafka|kafaka|kaftka|event|message|broker/i, text)) {
    addLog('Event-driven -> Kafka.');
    config.communication = 'Kafka';
  } else if (isPositiveMatch(/rest|api/i, text)) {
    config.communication = 'REST APIs';
  }

  // 6. CI/CD & Security
  if (isPositiveMatch(/gitlab/, text)) {
    config.ciProvider = 'GitLab CI';
  } else if (isPositiveMatch(/jenkins/, text)) {
    config.ciProvider = 'Jenkins';
  } else if (isPositiveMatch(/circle|circleci/, text)) {
    config.ciProvider = 'CircleCI';
  } else if (isPositiveMatch(/bitbucket/, text)) {
    config.ciProvider = 'Bitbucket Pipelines';
  } else if (isPositiveMatch(/github actions|github|actions/, text)) {
    config.ciProvider = 'GitHub Actions';
  }

  if (isPositiveMatch(/no security|without security|không bảo mật/i, text)) {
    config.includeSecurity = false;
  } else if (isPositiveMatch(/security|secure|snyk|sonar|harden|vulnerability/, text)) {
    addLog('Enabling Enterprise Security Hardening.');
    if (config.ciProvider === 'None') config.ciProvider = 'GitHub Actions';
    config.includeSecurity = true;
  }

  // Advanced Options Flag
  // 7. Auth
  if (isPositiveMatch(/no auth|without auth|không auth/i, text)) {
    config.auth = 'None';
  } else if (isPositiveMatch(/oauth|autho2|outh2|oath2|google|github|social|sso/, text)) {
    addLog('Social Auth -> OAuth2 + Google/GitHub.');
    config.auth = 'OAuth2 - Google/GitHub - JWT';
    advancedNeeded = true;
  } else if (isPositiveMatch(/jwt|auth|login|token/, text)) {
    addLog('Security -> Enabling JWT Authentication.');
    config.auth = 'JWT Authentication';
    advancedNeeded = true;
  }

  // 8. Terraform & Cloud
  if (isPositiveMatch(/gcp|google cloud|google/, text)) {
    config.cloudProvider = 'GCP';
    advancedNeeded = true;
  } else if (isPositiveMatch(/azure|microsoft/, text)) {
    config.cloudProvider = 'Azure';
    advancedNeeded = true;
  } else if (isPositiveMatch(/aws|amazon/, text)) {
    config.cloudProvider = 'AWS';
    advancedNeeded = true;
  } else if (isPositiveMatch(/no cloud|without cloud|không deploy/i, text)) {
    config.cloudProvider = 'None';
  }

  const hasTerraformKeyword = text.match(/terraform|infra|iac/);
  const wantsTerraform = isPositiveMatch(/terraform|infra|iac/, text);

  if (isPositiveMatch(/no terraform|without terraform|không dùng terraform|khỏi cài terraform|không terraform/i, text)) {
    config.terraform = 'None';
  } else if (isPositiveMatch(/production terraform|waf|lb|load balancer|prod infra|production infra/, text)) {
    if (config.cloudProvider === 'None') config.cloudProvider = 'AWS';
    addLog(`Cloud Infrastructure -> Production Terraform on ${config.cloudProvider}.`);
    config.terraform = 'Production';
    advancedNeeded = true;
  } else if (wantsTerraform || (!hasTerraformKeyword && config.cloudProvider !== 'None')) {
    if (config.cloudProvider === 'None') config.cloudProvider = 'AWS';
    addLog(`Cloud Infrastructure -> Standard Terraform on ${config.cloudProvider}.`);
    config.terraform = 'Standard';
    advancedNeeded = true;
  }

  // 9. Resilience
  if (isPositiveMatch(/no resilience|without resilience/i, text)) {
    config.resilience = [];
  } else {
    const genericResilience = isPositiveMatch(/resilient|resilience|fault/, text);
    
    const checkFeature = (regex) => {
      const match = text.match(regex);
      if (match) return isPositiveMatch(regex, text); // Explicitly requested or denied
      return genericResilience; // Inherit from generic keyword
    };

    if (checkFeature(/timeout/)) if (!config.resilience.includes('Timeout')) config.resilience.push('Timeout');
    if (checkFeature(/retry/)) if (!config.resilience.includes('Retry')) config.resilience.push('Retry');
    if (checkFeature(/circuit|breaker/)) if (!config.resilience.includes('CircuitBreaker')) config.resilience.push('CircuitBreaker');

    if (config.resilience.length > 0) {
      addLog(`Adding Resilience patterns (${config.resilience.join(', ')}).`);
      advancedNeeded = true;
    }
  }

  // 10. ELK
  if (isPositiveMatch(/no elk|without elk|không elk/i, text)) {
    config.withELK = false;
  } else if (isPositiveMatch(/elk|elastic|kibana|log|monitor|observability/, text)) {
    addLog('Observability -> Integrating ELK Stack.');
    config.withELK = true;
    advancedNeeded = true;
  }

  // 11. Background Jobs
  if (isPositiveMatch(/no background jobs|no queue|không background jobs|không queue|không tác vụ ngầm/i, text)) {
    config.backgroundJobs = false;
  } else if (isPositiveMatch(/backg(r)?ound tasks?|backg(r)?ound jobs?|\bbg jobs?\b|\bbg tasks?\b|\bworkers?\b|cron jobs?|\bqueue\b|task queue|bullmq|message queue|send email|gửi email|chạy ngầm|tác vụ ngầm|hàng đợi|バックグラウンド|メール送信|キュー|后台任务|发送邮件|队列|बैकग्राउंड|ईमेल भेजें/i, text)) {
    addLog('Task Queues -> Enabling BullMQ Background Jobs & Redis.');
    config.backgroundJobs = true;
    config.caching = 'Redis';
    advancedNeeded = true;
  }

  // 12. API Gateway
  if (isPositiveMatch(/no api gateway|no gateway|no nginx|no kong|không api gateway|không gateway|不要网关|无网关|bina gateway|bina proxy/i, text)) {
    config.apiGateway = 'None';
  } else if (isPositiveMatch(/kong/i, text)) {
    addLog('API Gateway -> Kong (DB-less).');
    config.apiGateway = 'Kong (DB-less)';
    advancedNeeded = true;
  } else if (isPositiveMatch(/api gateway|gateway|nginx proxy|nginx gateway|reverse proxy|proxy|cổng api|cổng kết nối|网关|代理|गेटवे/i, text) || isPositiveMatch(/nginx/i, text)) {
    addLog('API Gateway -> Nginx.');
    config.apiGateway = 'Nginx';
    advancedNeeded = true;
  }

  // FINAL: Assemble HTML Response based on final config
  if (useCaseDetected) {
    responseParts.push(`<li><span style="font-weight: bold;"> Smart Suggestion:</span> Applied industry-standard <strong>${useCaseDetected}</strong> stack!</li>`);
  }
  
  if (config.projectName !== 'nodejs-service') responseParts.push(`<li><strong>Project Name:</strong> ${config.projectName}</li>`);
  if (config.dbName !== 'demo') responseParts.push(`<li><strong>Database Name:</strong> ${config.dbName}</li>`);
  
  responseParts.push(`<li><strong>Language:</strong> ${config.language} ${config.language === 'TypeScript' ? '(Default)' : ''}</li>`);
  responseParts.push(`<li><strong>Architecture:</strong> ${config.architecture} ${config.architecture === 'MVC' ? '(Default)' : ''}</li>`);
  
  responseParts.push(`<li><strong>Database:</strong> ${config.database}</li>`);
  if (config.caching !== 'None') responseParts.push(`<li><strong>Caching:</strong> ${config.caching}</li>`);
  if (config.communication !== 'REST APIs') responseParts.push(`<li><strong>API/Communication:</strong> ${config.communication}</li>`);
  
  if (config.includeSecurity) responseParts.push(`<li><strong>Security:</strong> Snyk & SonarCloud Enabled</li>`);
  if (config.auth !== 'None') responseParts.push(`<li><strong>Authentication:</strong> ${config.auth === 'JWT Authentication' ? 'JWT' : 'OAuth2 + JWT'}</li>`);
  
  if (config.terraform !== 'None') {
    responseParts.push(`<li><strong>Infrastructure:</strong> ${config.terraform} Terraform (${config.cloudProvider})</li>`);
  } else if (config.cloudProvider !== 'None') {
    responseParts.push(`<li><strong>Cloud:</strong> ${config.cloudProvider}</li>`);
  }
  
  if (config.resilience.length > 0) responseParts.push(`<li><strong>Resilience:</strong> ${config.resilience.join(', ')}</li>`);
  if (config.withELK) responseParts.push(`<li><strong>Observability:</strong> ELK Stack</li>`);
  if (config.backgroundJobs) responseParts.push(`<li><strong>Background Jobs:</strong> BullMQ Task Queues</li>`);
  if (config.apiGateway !== 'None') responseParts.push(`<li><strong>API Gateway:</strong> ${config.apiGateway}</li>`);
  if (config.ciProvider !== 'None') responseParts.push(`<li><strong>CI/CD:</strong> ${config.ciProvider}</li>`);

  responseParts.push("</ul>");
  addLog('Heuristic mapping complete! 0ms server latency.');

  return {
    logs,
    responseHtml: responseParts.join(''),
    config,
    advancedNeeded
  };
};

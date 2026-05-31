// Helper: Checks if the matched keyword is preceded by a negative word
export const isPositiveMatch = (regex, text) => {
  const match = text.match(regex);
  if (!match) return false;
  
  // Get up to 30 characters before the match to check for negation (Forward-facing)
  const beforeText = text.slice(Math.max(0, match.index - 30), match.index);
  
  // Added Hindi (bina) and Japanese (不要 - fuyō). Allowed multiple verbs (e.g. cần dùng)
  const isNegativeBefore = /(?:no|without|không|khong|don't|dont|skip|remove|ko|đừng|khỏi|不要|不|无|没|bina)(?:\s*(?:cần|dùng|xài|use|want|need|have|需要|用|使用))+\s*$/i.test(beforeText.trim()) || /(?:no|without|không|khong|don't|dont|skip|remove|ko|đừng|khỏi|不要|不|无|没|bina)\s*$/i.test(beforeText.trim());
  if (isNegativeBefore) return false;

  // Get up to 20 characters after the match to check for trailing negation (Backward-facing)
  // Needed for Japanese (なし nashi, いらない iranai) and Hindi (nahi). Added optional particles (は|が|を).
  const afterText = text.slice(match.index + match[0].length, Math.min(text.length, match.index + match[0].length + 20));
  const isNegativeAfter = /^\s*(?:は|が|を)?\s*(?:nahi|なし|ない|いらない)/i.test(afterText);
  if (isNegativeAfter) return false;

  return true;
};

export const parsePrompt = (rawText) => {
  const text = rawText.toLowerCase();
  const logs = [];
  const responseParts = ["<p>Here is your configured architecture based on your prompt:</p><ul>"];
  
  // Default clean state
  const config = {
    projectName: 'nodejs-service',
    language: 'TypeScript',
    architecture: 'MVC',
    database: 'None',
    caching: 'None',
    communication: 'REST APIs',
    ciProvider: 'None',
    includeSecurity: false,
    auth: 'None',
    cloudProvider: 'AWS',
    terraform: 'None',
    resilience: [],
    withELK: false
  };

  const addLog = (message) => {
    logs.push(message);
  };

  addLog('Initializing Local Heuristic NLP Engine...');

  // 0. Extract Project Name (Heuristic)
  // Allowed a broader set of characters like * @ ! # ( ) < > to demonstrate active sanitization (prevents XSS)
  const nameRegex = /(?:project|app|service|dự án|プロジェクト|プロジェクト名|项目|项目名|naam)(?:\s*(?:name|named|tên là|có tên là|có tên|tên|called|gọi là|名|叫|叫做|名称))?\s+([a-z0-9-_\s"'*@!#$%^&()<>{}\[\]/\\|]+?)(?=\s+(?:with|using|dùng|sử dụng|xài|chạy|có|and|và|với|for|on|in|to|but|でも|deploy|deployed|ho)(?:\s|$)|\s+(?:postgres|redis|mongo|aws|gcp|azure|clean|mvc|kafka|graphql)(?:\s|$)|[^\x00-\x7F]|$)/;
  const nameMatch = text.match(nameRegex);
  
  if (nameMatch && nameMatch[1]) {
    const rawName = nameMatch[1].trim();
    // Strict sanitization: replace anything not a-z, 0-9, -, _ with a dash
    const sanitized = rawName.replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    if (sanitized && sanitized.length > 0) {
      addLog(`Detected project boundary -> Name: ${sanitized}`);
      config.projectName = sanitized;
      responseParts.push(`<li><strong>Project Name:</strong> ${sanitized}</li>`);
    }
  }

  // 0.5 Extract Database Name (Heuristic)
  const dbNameRegex = /(?:database name|db name|database|db)(?:\s*(?:is|là|called|named|tên là|có tên là|名|叫|叫做|名称|naam))?\s+([a-z0-9-_\s"'*@!#$%^&()<>{}\[\]/\\|]+?)(?=\s+(?:with|using|dùng|sử dụng|xài|chạy|có|and|và|với|for|on|in|to|but|でも|deploy|deployed|ho)(?:\s|$)|\s+(?:postgres|redis|mongo|aws|gcp|azure|clean|mvc|kafka|graphql)(?:\s|$)|[^\x00-\x7F]|$)/g;
  const dbNameMatches = [...text.matchAll(dbNameRegex)];

  for (const match of dbNameMatches) {
    if (match && match[1]) {
      const rawDbName = match[1].trim();
      const sanitizedDb = rawDbName.replace(/[^a-z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      // If it's not a generic tech keyword, it's our DB Name!
      if (sanitizedDb && sanitizedDb.length > 0 && !/^(?:postgres|redis|mongo|mysql|none)$/.test(sanitizedDb)) {
        addLog(`Detected custom DB Name -> ${sanitizedDb}`);
        config.dbName = sanitizedDb;
        responseParts.push(`<li><strong>Database Name:</strong> ${sanitizedDb}</li>`);
        break;
      }
    }
  }

  // 1. Language
  if (isPositiveMatch(/javascript|js|node\.js|node /i, text)) {
    config.language = 'JavaScript';
    responseParts.push("<li><strong>Language:</strong> JavaScript</li>");
  } else {
    responseParts.push("<li><strong>Language:</strong> TypeScript (Default)</li>");
  }

  // 2. Architecture
  if (isPositiveMatch(/clean|ca /i, text)) {
    config.architecture = 'Clean Architecture';
    responseParts.push("<li><strong>Architecture:</strong> Clean Architecture</li>");
  } else {
    responseParts.push("<li><strong>Architecture:</strong> MVC (Default)</li>");
  }

  // 3. Database
  if (isPositiveMatch(/no database|no db|without database|không dùng db|không database|không db|不要 db|不要 database/i, text)) {
    config.database = 'None';
  } else if (isPositiveMatch(/mongo|nosql|mongoose|document/i, text)) {
    addLog('Detected NoSQL -> Setting Database to MongoDB.');
    config.database = 'MongoDB';
    responseParts.push("<li><strong>Database:</strong> MongoDB</li>");
  } else if (isPositiveMatch(/postgres|psql|postgre|relational|acid/i, text)) {
    addLog('Detected ACID needs -> Setting Database to PostgreSQL.');
    config.database = 'PostgreSQL';
    responseParts.push("<li><strong>Database:</strong> PostgreSQL</li>");
  } else if (isPositiveMatch(/mysql|my sql|mariadb/i, text)) {
    addLog('Database -> MySQL.');
    config.database = 'MySQL';
    responseParts.push("<li><strong>Database:</strong> MySQL</li>");
  }

  // 4. Caching
  if (isPositiveMatch(/redis|reddis|high traffic|fast|cache/i, text)) {
    addLog('High traffic expected -> Enabling Redis Caching Layer.');
    config.caching = 'Redis';
    responseParts.push("<li><strong>Caching:</strong> Redis</li>");
  } else if (isPositiveMatch(/memory|in-memory|local cache/i, text)) {
    config.caching = 'Memory Cache';
    responseParts.push("<li><strong>Caching:</strong> Memory Cache</li>");
  }

  // 5. Communication
  if (isPositiveMatch(/graphql|gql/, text)) {
    addLog('API Type -> GraphQL.');
    config.communication = 'GraphQL';
    responseParts.push("<li><strong>API:</strong> GraphQL</li>");
  } else if (isPositiveMatch(/kafka|event|message|broker/, text)) {
    addLog('Event-driven -> Kafka.');
    config.communication = 'Kafka';
    responseParts.push("<li><strong>Communication:</strong> Kafka</li>");
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

  if (isPositiveMatch(/security|secure|snyk|sonar|harden|vulnerability/, text)) {
    addLog('Enabling Enterprise Security Hardening.');
    if (config.ciProvider === 'None') config.ciProvider = 'GitHub Actions';
    config.includeSecurity = true;
    responseParts.push("<li><strong>Security:</strong> Snyk & SonarCloud Enabled</li>");
  }

  // Advanced Options Flag
  let advancedNeeded = false;

  // 7. Auth
  if (isPositiveMatch(/oauth|google|github|social|sso/, text)) {
    addLog('Social Auth -> OAuth2 + Google/GitHub.');
    config.auth = 'OAuth2 - Google/GitHub - JWT';
    responseParts.push("<li><strong>Authentication:</strong> OAuth2 + JWT</li>");
    advancedNeeded = true;
  } else if (isPositiveMatch(/jwt|auth|login|token/, text)) {
    addLog('Security -> Enabling JWT Authentication.');
    config.auth = 'JWT Authentication';
    responseParts.push("<li><strong>Authentication:</strong> JWT</li>");
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
  } else {
    config.cloudProvider = 'None';
  }

  const hasTerraformKeyword = text.match(/terraform|infra|iac/);
  const wantsTerraform = isPositiveMatch(/terraform|infra|iac/, text);

  if (wantsTerraform && config.cloudProvider === 'None') {
    config.cloudProvider = 'AWS'; // Fallback to AWS if Terraform is explicitly requested without a cloud
  }

  if (isPositiveMatch(/production terraform|waf|lb|load balancer|prod infra|production infra/, text)) {
    addLog(`Cloud Infrastructure -> Production Terraform on ${config.cloudProvider}.`);
    config.terraform = 'Production';
    responseParts.push(`<li><strong>Infrastructure:</strong> Production Terraform (${config.cloudProvider})</li>`);
    advancedNeeded = true;
  } else if (wantsTerraform || (!hasTerraformKeyword && config.cloudProvider !== 'None')) {
    addLog(`Cloud Infrastructure -> Standard Terraform on ${config.cloudProvider}.`);
    config.terraform = 'Standard';
    responseParts.push(`<li><strong>Infrastructure:</strong> Standard Terraform (${config.cloudProvider})</li>`);
    advancedNeeded = true;
  }

  // 9. Resilience
  const genericResilience = isPositiveMatch(/resilient|resilience|fault/, text);
  
  const checkFeature = (regex) => {
    const match = text.match(regex);
    if (match) return isPositiveMatch(regex, text); // Explicitly requested or denied
    return genericResilience; // Inherit from generic keyword
  };

  if (checkFeature(/timeout/)) config.resilience.push('Timeout');
  if (checkFeature(/retry/)) config.resilience.push('Retry');
  if (checkFeature(/circuit|breaker/)) config.resilience.push('CircuitBreaker');

  if (config.resilience.length > 0) {
    addLog(`Adding Resilience patterns (${config.resilience.join(', ')}).`);
    responseParts.push(`<li><strong>Resilience:</strong> ${config.resilience.join(', ')}</li>`);
    advancedNeeded = true;
  }

  // 10. ELK
  if (isPositiveMatch(/elk|elastic|kibana|log|monitor|observability/, text)) {
    addLog('Observability -> Integrating ELK Stack.');
    config.withELK = true;
    responseParts.push("<li><strong>Observability:</strong> ELK Stack</li>");
    advancedNeeded = true;
  }

  responseParts.push("</ul>");
  addLog('Heuristic mapping complete! 0ms server latency.');

  return {
    logs,
    responseHtml: responseParts.join(''),
    config,
    advancedNeeded
  };
};

# Lecture 5: MCP Servers & Enterprise AI Integration

**Duration:** 30 minutes  
**Target Audience:** Senior developers, tech leads, development teams  
**Prerequisites:** Lectures 1-4 completion, enterprise development experience

## Cover Image Prompt

```
Create a beautiful and engaging cartoon-style illustration (16:9 aspect ratio) showing a developer character connecting multiple server towers and cloud services with glowing data streams. The scene should feature enterprise buildings in the background, various API connection points, security shields, and integration pipelines. Include elements like server racks, cloud icons, data flow arrows, and security badges. Use a sophisticated color palette with deep blues, silver, and gold accents against a gradient background. Style: Clean cartoon/vector art with enterprise and connectivity themes.
```

## Learning Objectives

By the end of this lecture, participants will be able to:

- Understand and implement Model Context Protocol (MCP) servers
- Integrate enterprise systems with Cursor AI workflows
- Configure secure AI development environments
- Build custom AI workflows and automation
- Plan and execute enterprise-scale AI adoption strategies

## Course Summary

I've created a comprehensive 5-lecture Cursor AI Development Course with the following structure:

### 📚 Complete Course Materials Created

1. **lecture-1-cursor-overview-basics.md** - Cursor AI Overview & Basic Features
2. **lecture-2-advanced-chat-inline-editing.md** - Advanced Chat Interface & Inline Editing  
3. **lecture-3-codebase-understanding-context.md** - Codebase Understanding & Context Management
4. **lecture-4-cursor-rules-configuration.md** - Cursor Rules & Configuration
5. **lecture-5-mcp-servers-enterprise-integration.md** - MCP Servers & Enterprise AI Integration

### 🎯 Each Lecture Includes

✅ **Structured Content** (30-minute duration)

- Clear learning objectives
- Detailed lecture structure with time allocations
- Progressive difficulty building on previous lectures

✅ **Practical Examples**

- Copy-paste ready prompts for immediate use
- Real-world code snippets and scenarios
- Expected AI responses for reference

✅ **Comprehensive Speaker Notes**

- 30 minutes of delivery content per lecture
- Key speaking points for each section
- Live demo suggestions and timing
- Transition guidance between topics

✅ **Hands-On Exercises**

- Practice activities (8-10 minutes each)
- Real project integration opportunities
- Progressive skill building

✅ **Cover Image Prompts**

- Cartoon-style illustrations (800x800px, 1:1 aspect ratio)
- Unique visual themes for each lecture
- Engaging and professional design specifications

### 🚀 Course Progression

**Lecture 1**: Foundation - Basic Cursor features and setup
**Lecture 2**: Skills - Advanced chat and inline editing mastery  
**Lecture 3**: Scale - Large codebase navigation and context management
**Lecture 4**: Team - Rules, configuration, and collaboration
**Lecture 5**: Enterprise - MCP servers and organizational integration

### 📖 Key Features

- **Enterprise-Ready**: Focuses on team collaboration and organizational adoption
- **Practical Focus**: Emphasizes real-world application over theory
- **Progressive Learning**: Each lecture builds on previous knowledge
- **Best Practices**: Includes common pitfalls and optimization strategies
- **Future-Proof**: Covers emerging features like MCP servers

The course is designed for immediate implementation, with ready-to-use materials that can be delivered to development teams wanting to maximize their productivity with Cursor AI.

## Lecture Structure

### 1. Introduction to MCP Servers (8 minutes)

#### What is Model Context Protocol (MCP)?

- **Definition**: Standardized protocol for AI model context sharing
- **Purpose**: Enable AI models to access external data and services
- **Architecture**: Client-server model for context provision
- **Benefits**: Extended AI capabilities beyond training data

#### MCP Server Types

- **Database Servers**: Direct database query capabilities
- **API Servers**: External service integration
- **File System Servers**: Enhanced file operations
- **Custom Servers**: Organization-specific integrations

#### MCP vs Traditional Integration

- **Real-time Context**: Dynamic data access during AI interactions
- **Standardized Interface**: Consistent integration patterns
- **Security Model**: Controlled access to enterprise resources
- **Scalability**: Enterprise-grade performance and reliability

### 2. Setting Up MCP Servers (10 minutes)

#### Installation and Configuration

- **Server Discovery**: Finding and installing MCP servers
- **Configuration Management**: Server settings and parameters
- **Authentication Setup**: Secure connection establishment
- **Testing and Validation**: Ensuring proper server operation

#### Popular MCP Servers

- **Database Connectors**: PostgreSQL, MySQL, MongoDB
- **Cloud Services**: AWS, Azure, Google Cloud Platform
- **Development Tools**: Git, Docker, Kubernetes
- **Documentation Systems**: Confluence, Notion, GitBook

#### Custom Server Development

- **MCP Protocol Implementation**: Building custom servers
- **Server Templates**: Starting points for common use cases
- **API Integration Patterns**: Connecting to internal systems
- **Deployment Strategies**: Production server management

### 3. Enterprise Integration Strategies (8 minutes)

#### Security and Compliance

- **Access Control**: Role-based permissions and authentication
- **Data Privacy**: Ensuring sensitive information protection
- **Audit Logging**: Tracking AI interactions and data access
- **Compliance Standards**: Meeting regulatory requirements

#### Infrastructure Integration

- **CI/CD Pipeline Integration**: AI-assisted development workflows
- **Monitoring and Observability**: Tracking AI usage and performance
- **Resource Management**: Scaling AI capabilities with demand
- **Backup and Recovery**: Ensuring continuity of AI services

#### Team Adoption Strategies

- **Gradual Rollout**: Phased implementation approach
- **Training Programs**: Educating teams on AI integration
- **Success Metrics**: Measuring productivity improvements
- **Change Management**: Managing organizational transformation

### 4. Advanced Workflows & Future Planning (4 minutes)

#### Automated Development Workflows

- **Code Review Automation**: AI-assisted code quality checks
- **Documentation Generation**: Automated technical documentation
- **Testing Pipeline Integration**: AI-generated test scenarios
- **Deployment Assistance**: AI-guided deployment processes

#### Future-Proofing Strategies

- **Technology Evolution**: Adapting to new AI capabilities
- **Skill Development**: Continuous learning and adaptation
- **Process Optimization**: Iterative improvement of AI workflows
- **Innovation Opportunities**: Identifying new AI applications

## Example Prompts & Code Snippets

### Example 1: Setting Up Database MCP Server

**Chat Prompt:**

```
Help me set up an MCP server to connect Cursor to our PostgreSQL database. I need to:
1. Configure secure database access
2. Set up query capabilities for development assistance
3. Ensure proper permissions and security
4. Test the integration with sample queries
```

**Expected AI Response:**

```
I'll help you set up a PostgreSQL MCP server for Cursor. Here's a complete configuration:

## 1. Install PostgreSQL MCP Server

```bash
# Install the MCP PostgreSQL server
npm install -g @mcp/server-postgres

# Or using the official installer
curl -fsSL https://cursor.sh/install-mcp | sh -s -- postgres
```

## 2. Configuration Setup

### Create MCP Configuration File (.mcp-servers.json)

```json
{
  "servers": {
    "postgres-dev": {
      "command": "mcp-server-postgres",
      "args": [
        "--host", "localhost",
        "--port", "5432",
        "--database", "dev_database",
        "--user", "cursor_readonly",
        "--schema", "public"
      ],
      "env": {
        "POSTGRES_PASSWORD": "${POSTGRES_MCP_PASSWORD}",
        "MCP_LOG_LEVEL": "info"
      }
    }
  }
}
```

### Environment Variables (.env)

```bash
# Database connection
POSTGRES_MCP_PASSWORD=secure_readonly_password
DATABASE_URL=postgresql://cursor_readonly:${POSTGRES_MCP_PASSWORD}@localhost:5432/dev_database

# Security settings
MCP_AUTH_TOKEN=your_secure_token
MCP_ALLOWED_SCHEMAS=public,app_schema
MCP_QUERY_TIMEOUT=30000
```

## 3. Database User Setup (PostgreSQL)

```sql
-- Create a read-only user for MCP
CREATE USER cursor_readonly WITH PASSWORD 'secure_readonly_password';

-- Grant connection privileges
GRANT CONNECT ON DATABASE dev_database TO cursor_readonly;
GRANT USAGE ON SCHEMA public TO cursor_readonly;
GRANT USAGE ON SCHEMA app_schema TO cursor_readonly;

-- Grant read-only access to specific tables
GRANT SELECT ON ALL TABLES IN SCHEMA public TO cursor_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA app_schema TO cursor_readonly;

-- Grant access to sequences (for understanding auto-increment fields)
GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO cursor_readonly;
GRANT SELECT ON ALL SEQUENCES IN SCHEMA app_schema TO cursor_readonly;

-- Set default privileges for future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO cursor_readonly;
ALTER DEFAULT PRIVILEGES IN SCHEMA app_schema GRANT SELECT ON TABLES TO cursor_readonly;
```

## 4. Security Configuration

### Connection Security (pg_hba.conf)

```
# Allow MCP connections with password authentication
host    dev_database    cursor_readonly    127.0.0.1/32    md5
host    dev_database    cursor_readonly    ::1/128         md5
```

### Query Restrictions (mcp-postgres-config.yaml)

```yaml
security:
  max_query_time: 30
  allowed_operations:
    - SELECT
    - EXPLAIN
    - DESCRIBE
  forbidden_keywords:
    - DROP
    - DELETE
    - UPDATE
    - INSERT
    - TRUNCATE
    - ALTER
  max_rows_returned: 1000
  
query_templates:
  table_info: "SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = $1"
  table_constraints: "SELECT constraint_name, constraint_type FROM information_schema.table_constraints WHERE table_name = $1"
```

## 5. Testing the Integration

### Basic Connection Test

```javascript
// test-mcp-connection.js
const { MCPClient } = require('@mcp/client');

async function testConnection() {
  const client = new MCPClient({
    serverCommand: 'mcp-server-postgres',
    serverArgs: ['--config', '.mcp-servers.json']
  });
  
  try {
    await client.connect();
    console.log('MCP server connected successfully');
    
    // Test basic query
    const result = await client.query({
      sql: 'SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = $1',
      parameters: ['public']
    });
    
    console.log('Database accessible:', result);
    
    await client.disconnect();
  } catch (error) {
    console.error('Connection failed:', error);
  }
}

testConnection();
```

## 6. Cursor Integration

### Using Database Context in Cursor

Now you can use database context in your Cursor conversations:

```
@postgres-dev
Show me the schema for the users table and suggest improvements for the indexes based on common query patterns.
```

```
@postgres-dev
Analyze the relationship between users and orders tables and generate a TypeScript interface that represents this data structure.
```

## 7. Best Practices

### Performance Optimization

- Use connection pooling for multiple queries
- Implement query result caching
- Set appropriate query timeouts
- Monitor database performance impact

### Security Best Practices

- Use read-only database users
- Implement IP restrictions
- Enable audit logging
- Regular security reviews
- Rotate credentials periodically

### Monitoring and Maintenance

```yaml
# monitoring-config.yaml
monitoring:
  metrics:
    - query_count
    - query_duration
    - error_rate
    - connection_count
  
  alerts:
    high_query_duration: 10s
    error_rate_threshold: 5%
    max_connections: 10
  
  logging:
    level: info
    include_queries: false  # Security: don't log actual queries
    include_results: false  # Security: don't log query results
```

This setup provides secure, read-only database access for Cursor while maintaining proper security boundaries.

```

### Example 2: AWS Services MCP Integration
**Chat Prompt:**
```

Set up MCP integration with AWS services for our development team. We need access to:

1. EC2 instances and their status
2. RDS database information
3. S3 bucket contents and management
4. Lambda function details
5. CloudWatch logs and metrics

```

**Expected AI Response:**
```

I'll help you set up comprehensive AWS MCP integration for your development team.

## 1. AWS MCP Server Installation

```bash
# Install AWS MCP server
npm install -g @mcp/server-aws

# Or using direct installation
curl -fsSL https://mcp.aws.amazon.com/install | sh
```

## 2. AWS Credentials Configuration

### IAM Policy for MCP Access

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "EC2ReadOnlyAccess",
      "Effect": "Allow",
      "Action": [
        "ec2:DescribeInstances",
        "ec2:DescribeInstanceStatus",
        "ec2:DescribeSecurityGroups",
        "ec2:DescribeKeyPairs",
        "ec2:DescribeImages"
      ],
      "Resource": "*"
    },
    {
      "Sid": "RDSReadOnlyAccess", 
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances",
        "rds:DescribeDBClusters",
        "rds:DescribeDBSubnetGroups",
        "rds:DescribeDBParameterGroups"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3ReadOnlyAccess",
      "Effect": "Allow", 
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:GetBucketLocation",
        "s3:GetBucketVersioning"
      ],
      "Resource": [
        "arn:aws:s3:::dev-*",
        "arn:aws:s3:::dev-*/*",
        "arn:aws:s3:::staging-*",
        "arn:aws:s3:::staging-*/*"
      ]
    },
    {
      "Sid": "LambdaReadOnlyAccess",
      "Effect": "Allow",
      "Action": [
        "lambda:ListFunctions",
        "lambda:GetFunction",
        "lambda:GetFunctionConfiguration",
        "lambda:ListVersionsByFunction"
      ],
      "Resource": "*"
    },
    {
      "Sid": "CloudWatchReadOnlyAccess",
      "Effect": "Allow",
      "Action": [
        "logs:DescribeLogGroups",
        "logs:DescribeLogStreams", 
        "logs:GetLogEvents",
        "cloudwatch:GetMetricStatistics",
        "cloudwatch:ListMetrics"
      ],
      "Resource": "*"
    }
  ]
}
```

### MCP Server Configuration (.mcp-servers.json)

```json
{
  "servers": {
    "aws-dev": {
      "command": "mcp-server-aws",
      "args": [
        "--region", "us-west-2",
        "--profile", "mcp-dev"
      ],
      "env": {
        "AWS_PROFILE": "mcp-dev",
        "AWS_REGION": "us-west-2",
        "MCP_AWS_TIMEOUT": "30000"
      }
    },
    "aws-staging": {
      "command": "mcp-server-aws", 
      "args": [
        "--region", "us-west-2",
        "--profile", "mcp-staging"
      ],
      "env": {
        "AWS_PROFILE": "mcp-staging",
        "AWS_REGION": "us-west-2"
      }
    }
  }
}
```

## 3. AWS CLI Configuration

### Setup AWS Profiles (~/.aws/config)

```ini
[profile mcp-dev]
region = us-west-2
output = json

[profile mcp-staging]
region = us-west-2
output = json
```

### Credentials (~/.aws/credentials)

```ini
[mcp-dev]
aws_access_key_id = AKIA...
aws_secret_access_key = ...

[mcp-staging]
aws_access_key_id = AKIA...
aws_secret_access_key = ...
```

## 4. Service-Specific Configurations

### EC2 Instance Management

```yaml
# ec2-config.yaml
ec2:
  filters:
    - name: "instance-state-name"
      values: ["running", "stopped", "pending"]
    - name: "tag:Environment"
      values: ["dev", "staging"]
  
  fields:
    - instance-id
    - instance-type
    - state
    - private-ip-address
    - public-ip-address
    - tags
```

### RDS Database Information

```yaml
# rds-config.yaml
rds:
  include_clusters: true
  include_instances: true
  filters:
    - db-instance-class
    - engine
    - engine-version
    - allocated-storage
    - storage-type
```

### S3 Bucket Management

```yaml
# s3-config.yaml
s3:
  allowed_buckets:
    - "dev-*"
    - "staging-*"
    - "app-assets-*"
  
  operations:
    - list_objects
    - get_object_metadata
    - get_bucket_policy
    - get_bucket_versioning
  
  max_objects_listed: 1000
```

## 5. Lambda Function Integration

```yaml
# lambda-config.yaml
lambda:
  filters:
    - function-name-prefix: "dev-"
    - function-name-prefix: "staging-"
  
  include_details:
    - configuration
    - code_size
    - environment_variables
    - layers
    - vpc_config
```

## 6. CloudWatch Integration

```yaml
# cloudwatch-config.yaml
cloudwatch:
  log_groups:
    - "/aws/lambda/dev-*"
    - "/aws/lambda/staging-*"
    - "/aws/ec2/*"
    - "/aws/rds/*"
  
  metrics:
    namespaces:
      - "AWS/EC2"
      - "AWS/RDS"
      - "AWS/Lambda"
      - "AWS/S3"
  
  time_range:
    default_hours: 24
    max_hours: 168  # 7 days
```

## 7. Usage Examples in Cursor

### EC2 Instance Analysis

```
@aws-dev
Show me all running EC2 instances in our dev environment and analyze their resource utilization. Suggest optimizations for cost and performance.
```

### Database Performance Review

```
@aws-dev
Review our RDS instances and their configurations. Identify any performance bottlenecks and suggest parameter tuning recommendations.
```

### S3 Storage Analysis

```
@aws-dev
Analyze our S3 buckets for:
1. Storage costs and optimization opportunities
2. Security policy compliance
3. Lifecycle management recommendations
4. Access patterns and performance
```

### Lambda Function Optimization

```
@aws-dev
Review our Lambda functions and provide:
1. Performance optimization suggestions
2. Cost reduction opportunities
3. Security best practices compliance
4. Memory and timeout optimization recommendations
```

### CloudWatch Monitoring Setup

```
@aws-dev
Help me set up comprehensive monitoring for our application stack:
1. Create custom dashboards
2. Set up alerting rules
3. Analyze current log patterns
4. Suggest monitoring improvements
```

## 8. Security and Compliance

### Access Control

```yaml
# security-config.yaml
security:
  mfa_required: true
  session_duration: 3600  # 1 hour
  
  ip_restrictions:
    - "10.0.0.0/8"     # Internal network
    - "172.16.0.0/12"  # VPN range
  
  audit_logging:
    enabled: true
    include_responses: false  # Don't log sensitive data
    log_group: "/mcp/aws-audit"
```

### Rotation Strategy

```bash
#!/bin/bash
# rotate-mcp-credentials.sh

# Rotate AWS credentials monthly
aws iam create-access-key --user-name mcp-dev-user
# Update MCP configuration with new credentials
# Delete old access key after verification
```

## 9. Monitoring and Alerting

### MCP Usage Monitoring

```yaml
# monitoring.yaml
monitoring:
  metrics:
    - api_calls_per_minute
    - response_time
    - error_rate
    - data_transfer
  
  alerts:
    high_api_usage:
      threshold: 100
      period: 60s
    
    slow_responses:
      threshold: 5s
      period: 300s
```

This comprehensive AWS integration provides your team with powerful infrastructure insights while maintaining security best practices.

```

### Example 3: Custom MCP Server Development
**Chat Prompt:**
```

Help me build a custom MCP server that integrates with our internal tools:

1. JIRA for issue tracking
2. Jenkins for CI/CD pipeline status
3. Internal documentation system
4. Employee directory API
5. Code quality metrics from SonarQube

```

**Expected AI Response:**
```

I'll help you build a comprehensive custom MCP server for your internal tools integration.

## 1. Project Structure Setup

```
internal-mcp-server/
├── package.json
├── src/
│   ├── index.js
│   ├── server.js
│   ├── services/
│   │   ├── jira.js
│   │   ├── jenkins.js
│   │   ├── docs.js
│   │   ├── directory.js
│   │   └── sonar.js
│   ├── utils/
│   │   ├── auth.js
│   │   ├── cache.js
│   │   └── logger.js
│   └── config/
│       ├── default.json
│       └── production.json
├── .env.example
└── README.md
```

## 2. Base Server Implementation

### package.json

```json
{
  "name": "internal-mcp-server",
  "version": "1.0.0",
  "description": "Custom MCP server for internal tool integration",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "test": "jest"
  },
  "dependencies": {
    "@mcp/server": "^1.0.0",
    "axios": "^1.6.0",
    "node-cache": "^5.1.2",
    "winston": "^3.11.0",
    "joi": "^17.11.0",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.0",
    "jest": "^29.7.0"
  }
}
```

### src/server.js - Main Server Implementation

```javascript
const { MCPServer } = require('@mcp/server');
const JiraService = require('./services/jira');
const JenkinsService = require('./services/jenkins');
const DocsService = require('./services/docs');
const DirectoryService = require('./services/directory');
const SonarService = require('./services/sonar');
const logger = require('./utils/logger');
const config = require('./config/default.json');

class InternalMCPServer extends MCPServer {
  constructor() {
    super({
      name: 'internal-tools',
      version: '1.0.0',
      description: 'Internal tools integration server'
    });
    
    this.services = {
      jira: new JiraService(config.jira),
      jenkins: new JenkinsService(config.jenkins),
      docs: new DocsService(config.docs),
      directory: new DirectoryService(config.directory),
      sonar: new SonarService(config.sonar)
    };
    
    this.registerHandlers();
  }
  
  registerHandlers() {
    // JIRA Integration
    this.addHandler('jira/issues', async (params) => {
      return await this.services.jira.searchIssues(params);
    });
    
    this.addHandler('jira/issue/{id}', async (params) => {
      return await this.services.jira.getIssue(params.id);
    });
    
    this.addHandler('jira/project/{key}/sprint-status', async (params) => {
      return await this.services.jira.getSprintStatus(params.key);
    });
    
    // Jenkins Integration
    this.addHandler('jenkins/jobs', async (params) => {
      return await this.services.jenkins.getJobs(params);
    });
    
    this.addHandler('jenkins/job/{name}/status', async (params) => {
      return await this.services.jenkins.getJobStatus(params.name);
    });
    
    this.addHandler('jenkins/build/{job}/{number}', async (params) => {
      return await this.services.jenkins.getBuildDetails(params.job, params.number);
    });
    
    // Documentation Integration
    this.addHandler('docs/search', async (params) => {
      return await this.services.docs.search(params.query);
    });
    
    this.addHandler('docs/page/{id}', async (params) => {
      return await this.services.docs.getPage(params.id);
    });
    
    // Employee Directory
    this.addHandler('directory/employee/{id}', async (params) => {
      return await this.services.directory.getEmployee(params.id);
    });
    
    this.addHandler('directory/team/{name}', async (params) => {
      return await this.services.directory.getTeam(params.name);
    });
    
    // SonarQube Integration
    this.addHandler('sonar/project/{key}/metrics', async (params) => {
      return await this.services.sonar.getProjectMetrics(params.key);
    });
    
    this.addHandler('sonar/project/{key}/issues', async (params) => {
      return await this.services.sonar.getProjectIssues(params.key);
    });
  }
  
  async start(port = 3000) {
    try {
      await super.start(port);
      logger.info(`Internal MCP Server started on port ${port}`);
    } catch (error) {
      logger.error('Failed to start server:', error);
      throw error;
    }
  }
}

module.exports = InternalMCPServer;
```

## 3. Service Implementations

### src/services/jira.js

```javascript
const axios = require('axios');
const NodeCache = require('node-cache');
const logger = require('../utils/logger');

class JiraService {
  constructor(config) {
    this.config = config;
    this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
    this.client = axios.create({
      baseURL: config.baseUrl,
      auth: {
        username: config.username,
        password: config.apiToken
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }
  
  async searchIssues(params) {
    const cacheKey = `jira-search-${JSON.stringify(params)}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const jql = this.buildJQL(params);
      const response = await this.client.post('/rest/api/3/search', {
        jql,
        fields: ['summary', 'status', 'assignee', 'priority', 'created', 'updated'],
        maxResults: params.maxResults || 50
      });
      
      const result = {
        total: response.data.total,
        issues: response.data.issues.map(issue => ({
          key: issue.key,
          summary: issue.fields.summary,
          status: issue.fields.status.name,
          assignee: issue.fields.assignee?.displayName,
          priority: issue.fields.priority?.name,
          created: issue.fields.created,
          updated: issue.fields.updated
        }))
      };
      
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error('JIRA search failed:', error);
      throw new Error(`JIRA search failed: ${error.message}`);
    }
  }
  
  async getIssue(issueKey) {
    const cacheKey = `jira-issue-${issueKey}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const response = await this.client.get(`/rest/api/3/issue/${issueKey}`);
      const issue = response.data;
      
      const result = {
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description,
        status: issue.fields.status.name,
        assignee: issue.fields.assignee?.displayName,
        reporter: issue.fields.reporter?.displayName,
        priority: issue.fields.priority?.name,
        created: issue.fields.created,
        updated: issue.fields.updated,
        comments: issue.fields.comment?.comments?.slice(-5) || []
      };
      
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error(`JIRA issue fetch failed for ${issueKey}:`, error);
      throw new Error(`Failed to fetch JIRA issue: ${error.message}`);
    }
  }
  
  async getSprintStatus(projectKey) {
    try {
      const response = await this.client.get(`/rest/agile/1.0/board`);
      const boards = response.data.values.filter(board => 
        board.location?.projectKey === projectKey
      );
      
      if (boards.length === 0) {
        throw new Error(`No boards found for project ${projectKey}`);
      }
      
      const boardId = boards[0].id;
      const sprintResponse = await this.client.get(
        `/rest/agile/1.0/board/${boardId}/sprint?state=active`
      );
      
      return {
        project: projectKey,
        activeSprints: sprintResponse.data.values.map(sprint => ({
          id: sprint.id,
          name: sprint.name,
          state: sprint.state,
          startDate: sprint.startDate,
          endDate: sprint.endDate,
          goal: sprint.goal
        }))
      };
    } catch (error) {
      logger.error(`Sprint status fetch failed for ${projectKey}:`, error);
      throw new Error(`Failed to fetch sprint status: ${error.message}`);
    }
  }
  
  buildJQL(params) {
    const conditions = [];
    
    if (params.project) conditions.push(`project = "${params.project}"`);
    if (params.status) conditions.push(`status = "${params.status}"`);
    if (params.assignee) conditions.push(`assignee = "${params.assignee}"`);
    if (params.priority) conditions.push(`priority = "${params.priority}"`);
    if (params.created) conditions.push(`created >= "${params.created}"`);
    
    return conditions.join(' AND ') || 'project is not EMPTY';
  }
}

module.exports = JiraService;
```

### src/services/jenkins.js

```javascript
const axios = require('axios');
const NodeCache = require('node-cache');
const logger = require('../utils/logger');

class JenkinsService {
  constructor(config) {
    this.config = config;
    this.cache = new NodeCache({ stdTTL: 120 }); // 2 minutes cache
    this.client = axios.create({
      baseURL: config.baseUrl,
      auth: {
        username: config.username,
        password: config.apiToken
      }
    });
  }
  
  async getJobs(params = {}) {
    const cacheKey = 'jenkins-jobs';
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const response = await this.client.get('/api/json?tree=jobs[name,url,color,lastBuild[number,result,timestamp]]');
      
      let jobs = response.data.jobs.map(job => ({
        name: job.name,
        url: job.url,
        status: this.parseJobColor(job.color),
        lastBuild: job.lastBuild ? {
          number: job.lastBuild.number,
          result: job.lastBuild.result,
          timestamp: new Date(job.lastBuild.timestamp).toISOString()
        } : null
      }));
      
      // Apply filters
      if (params.status) {
        jobs = jobs.filter(job => job.status === params.status);
      }
      
      if (params.name) {
        jobs = jobs.filter(job => job.name.includes(params.name));
      }
      
      this.cache.set(cacheKey, jobs);
      return jobs;
    } catch (error) {
      logger.error('Jenkins jobs fetch failed:', error);
      throw new Error(`Failed to fetch Jenkins jobs: ${error.message}`);
    }
  }
  
  async getJobStatus(jobName) {
    const cacheKey = `jenkins-job-${jobName}`;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const response = await this.client.get(
        `/job/${encodeURIComponent(jobName)}/api/json?tree=name,url,color,lastBuild[number,result,timestamp,duration],lastSuccessfulBuild[number,timestamp],lastFailedBuild[number,timestamp]`
      );
      
      const job = response.data;
      const result = {
        name: job.name,
        status: this.parseJobColor(job.color),
        lastBuild: job.lastBuild ? {
          number: job.lastBuild.number,
          result: job.lastBuild.result,
          timestamp: new Date(job.lastBuild.timestamp).toISOString(),
          duration: job.lastBuild.duration
        } : null,
        lastSuccessfulBuild: job.lastSuccessfulBuild ? {
          number: job.lastSuccessfulBuild.number,
          timestamp: new Date(job.lastSuccessfulBuild.timestamp).toISOString()
        } : null,
        lastFailedBuild: job.lastFailedBuild ? {
          number: job.lastFailedBuild.number,
          timestamp: new Date(job.lastFailedBuild.timestamp).toISOString()
        } : null
      };
      
      this.cache.set(cacheKey, result);
      return result;
    } catch (error) {
      logger.error(`Jenkins job status fetch failed for ${jobName}:`, error);
      throw new Error(`Failed to fetch job status: ${error.message}`);
    }
  }
  
  async getBuildDetails(jobName, buildNumber) {
    try {
      const response = await this.client.get(
        `/job/${encodeURIComponent(jobName)}/${buildNumber}/api/json?tree=number,result,timestamp,duration,description,changeSet[items[author[fullName],msg,date]],actions[causes[shortDescription]]`
      );
      
      const build = response.data;
      return {
        number: build.number,
        result: build.result,
        timestamp: new Date(build.timestamp).toISOString(),
        duration: build.duration,
        description: build.description,
        changes: build.changeSet?.items?.map(item => ({
          author: item.author?.fullName,
          message: item.msg,
          date: new Date(item.date).toISOString()
        })) || [],
        causes: build.actions?.flatMap(action => 
          action.causes?.map(cause => cause.shortDescription) || []
        ) || []
      };
    } catch (error) {
      logger.error(`Build details fetch failed for ${jobName}/${buildNumber}:`, error);
      throw new Error(`Failed to fetch build details: ${error.message}`);
    }
  }
  
  parseJobColor(color) {
    const statusMap = {
      'blue': 'success',
      'red': 'failed',
      'yellow': 'unstable',
      'grey': 'disabled',
      'disabled': 'disabled',
      'aborted': 'aborted',
      'notbuilt': 'not_built'
    };
    
    // Remove animation suffixes
    const baseColor = color?.replace(/_anime$/, '');
    return statusMap[baseColor] || 'unknown';
  }
}

module.exports = JenkinsService;
```

## 4. Configuration Management

### src/config/default.json

```json
{
  "server": {
    "port": 3000,
    "timeout": 30000
  },
  "jira": {
    "baseUrl": "https://your-company.atlassian.net",
    "username": "${JIRA_USERNAME}",
    "apiToken": "${JIRA_API_TOKEN}"
  },
  "jenkins": {
    "baseUrl": "https://jenkins.your-company.com",
    "username": "${JENKINS_USERNAME}",
    "apiToken": "${JENKINS_API_TOKEN}"
  },
  "docs": {
    "baseUrl": "https://docs.your-company.com",
    "apiKey": "${DOCS_API_KEY}"
  },
  "directory": {
    "baseUrl": "https://directory.your-company.com",
    "apiKey": "${DIRECTORY_API_KEY}"
  },
  "sonar": {
    "baseUrl": "https://sonar.your-company.com",
    "token": "${SONAR_TOKEN}"
  },
  "cache": {
    "defaultTTL": 300,
    "maxKeys": 1000
  },
  "logging": {
    "level": "info",
    "file": "logs/mcp-server.log"
  }
}
```

## 5. Usage Examples

### In Cursor with your custom MCP server

```
@internal-tools
Show me all open JIRA issues assigned to me and their current status, along with any related Jenkins build failures.
```

```
@internal-tools
Get the latest SonarQube metrics for our main application project and suggest code quality improvements based on the findings.
```

```
@internal-tools
Find documentation about our API authentication system and show me which team members are responsible for maintaining it.
```

## 6. Deployment Configuration

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY src/ ./src/
COPY config/ ./config/

EXPOSE 3000

CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  internal-mcp-server:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - JIRA_USERNAME=${JIRA_USERNAME}
      - JIRA_API_TOKEN=${JIRA_API_TOKEN}
      - JENKINS_USERNAME=${JENKINS_USERNAME}
      - JENKINS_API_TOKEN=${JENKINS_API_TOKEN}
      - DOCS_API_KEY=${DOCS_API_KEY}
      - DIRECTORY_API_KEY=${DIRECTORY_API_KEY}
      - SONAR_TOKEN=${SONAR_TOKEN}
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
```

This custom MCP server provides comprehensive integration with your internal tools while maintaining security and performance standards.

```

## Speaker Notes

### Opening (2 minutes)
"Welcome to our final lecture in this Cursor AI Development Course. Today we're exploring the cutting edge of AI integration - MCP servers and enterprise-level implementations. This is where individual productivity meets organizational transformation."

### Introduction to MCP Servers (8 minutes)

#### MCP Fundamentals (3 minutes)
"Model Context Protocol represents the next evolution in AI integration. Unlike static training data, MCP enables real-time access to your organization's live systems..."

**Key Speaking Points:**
- Emphasize the paradigm shift from static to dynamic AI context
- Show how MCP bridges the gap between AI and enterprise systems
- Highlight the standardization benefits of the protocol

#### MCP Architecture (5 minutes)
"Let's explore how MCP servers work and what makes them powerful..."

**Live Demo:**
- Show MCP server architecture diagram
- Demonstrate client-server communication
- Show real-time data access examples

**Key Speaking Points:**
- Explain the client-server model clearly
- Show security and access control mechanisms
- Demonstrate scalability and performance benefits

### Setting Up MCP Servers (10 minutes)

#### Installation and Basic Setup (4 minutes)
"Let's start with a practical example - setting up a database MCP server..."

**Live Demo:**
- Install a PostgreSQL MCP server
- Configure basic connection settings
- Test the integration with Cursor

**Key Speaking Points:**
- Emphasize security-first setup approach
- Show proper credential management
- Demonstrate testing and validation steps

#### Popular MCP Servers (3 minutes)
"There's a growing ecosystem of MCP servers for common enterprise needs..."

**Live Demo:**
- Browse available MCP servers
- Show installation of AWS MCP server
- Demonstrate configuration management

**Key Speaking Points:**
- Highlight the expanding ecosystem
- Show how to evaluate server quality and security
- Demonstrate community contributions

#### Custom Server Development (3 minutes)
"For unique organizational needs, you can build custom MCP servers..."

**Live Demo:**
- Show basic custom server structure
- Demonstrate API integration patterns
- Show deployment considerations

**Key Speaking Points:**
- Explain when custom development is needed
- Show development complexity and resources required
- Highlight maintenance considerations

### Enterprise Integration Strategies (8 minutes)

#### Security and Compliance (4 minutes)
"Enterprise adoption requires careful attention to security and compliance..."

**Live Demo:**
- Show access control configuration
- Demonstrate audit logging setup
- Show compliance reporting features

**Key Speaking Points:**
- Emphasize security as a primary concern
- Show how to meet regulatory requirements
- Demonstrate risk mitigation strategies

#### Infrastructure Integration (2 minutes)
"Successful enterprise adoption requires infrastructure planning..."

**Live Demo:**
- Show CI/CD integration examples
- Demonstrate monitoring setup
- Show scaling considerations

**Key Speaking Points:**
- Highlight infrastructure requirements
- Show integration with existing systems
- Demonstrate operational considerations

#### Team Adoption (2 minutes)
"The human side of AI adoption is as important as the technical side..."

**Key Speaking Points:**
- Emphasize change management importance
- Show training and support strategies
- Demonstrate success measurement

### Advanced Workflows & Future Planning (4 minutes)

#### Automated Workflows (2 minutes)
"MCP enables sophisticated automated development workflows..."

**Live Demo:**
- Show automated code review process
- Demonstrate documentation generation
- Show testing pipeline integration

**Key Speaking Points:**
- Highlight automation opportunities
- Show productivity improvements
- Demonstrate quality improvements

#### Future-Proofing (2 minutes)
"As AI continues to evolve, how do we stay ahead?"

**Key Speaking Points:**
- Discuss emerging AI capabilities
- Show adaptation strategies
- Highlight continuous learning importance

## Hands-On Exercises

### Exercise 1: MCP Server Setup (10 minutes)
Set up a complete MCP integration:
1. Install and configure a database MCP server
2. Set up secure authentication
3. Test integration with sample queries
4. Configure monitoring and logging

### Exercise 2: Custom Integration (10 minutes)
Build a simple custom MCP server:
1. Create basic server structure
2. Implement API integration
3. Add caching and error handling
4. Test with Cursor integration

### Exercise 3: Enterprise Planning (10 minutes)
Develop an enterprise adoption plan:
1. Identify integration opportunities
2. Plan security and compliance requirements
3. Design rollout strategy
4. Create success metrics and monitoring

## Best Practices Covered

1. **Security First**: Always prioritize security in MCP implementations
2. **Start Small**: Begin with low-risk, high-value integrations
3. **Monitor Everything**: Comprehensive logging and monitoring
4. **Plan for Scale**: Design for future growth and adoption
5. **Team Training**: Invest in education and change management

## Common Pitfalls to Avoid

1. **Security Shortcuts**: Compromising on security for convenience
2. **Over-Integration**: Connecting too many systems too quickly
3. **Poor Monitoring**: Inadequate visibility into AI system usage
4. **Insufficient Training**: Not preparing teams for AI integration
5. **Rigid Architecture**: Not planning for future AI capabilities

## Enterprise Considerations

### Scalability Planning
- Design for growth in users and data volume
- Plan for increased AI model capabilities
- Consider geographic distribution needs
- Plan for disaster recovery and business continuity

### Governance and Compliance
- Establish AI usage policies and guidelines
- Implement audit trails and compliance reporting
- Plan for regulatory requirements and changes
- Establish data governance frameworks

### Change Management
- Develop comprehensive training programs
- Create support structures for adoption
- Plan for resistance and concerns
- Measure and communicate success stories

## Course Conclusion and Next Steps

### Key Takeaways from the Full Course
1. **Foundation**: Cursor basics and core features
2. **Advanced Usage**: Chat interface and inline editing mastery
3. **Scale**: Codebase understanding and context management
4. **Team**: Rules, configuration, and collaboration
5. **Enterprise**: MCP servers and organizational integration

### Continuing Your AI Development Journey
- Stay current with Cursor updates and new features
- Engage with the MCP ecosystem and community
- Experiment with custom integrations
- Share knowledge and best practices with your team
- Plan for future AI capabilities and opportunities

### Resources for Ongoing Learning
- Official Cursor documentation and updates
- MCP server ecosystem and community
- AI development best practices and patterns
- Enterprise AI adoption case studies
- Community forums and support channels

**Final Message:**
"You now have the knowledge and tools to transform not just your individual productivity, but your entire organization's development capabilities. The future of software development is AI-assisted, and you're now equipped to lead that transformation."

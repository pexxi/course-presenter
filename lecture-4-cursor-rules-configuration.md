# Lecture 4: Cursor Rules & Configuration

**Duration:** 30 minutes  
**Target Audience:** Senior developers, tech leads, development teams  
**Prerequisites:** Lectures 1-3 completion, team collaboration experience

## Cover Image Prompt

```
Create a beautiful and engaging cartoon-style illustration (800x800px, 1:1 aspect ratio) showing a developer character configuring a control panel with various switches, dials, and settings. The scene should include floating rule cards, configuration icons, and gear symbols around the character. Show elements like code style guides, team badges, and workflow arrows connecting different configuration options. Include a background with subtle circuit patterns and use a professional color scheme with blues, greens, and silver accents. Style: Clean cartoon/vector art with technical precision and organizational themes.
```

## Learning Objectives

By the end of this lecture, participants will be able to:

- Create and implement custom Cursor rules for team consistency
- Configure workspace-specific AI behavior and preferences
- Build custom prompts library for repeated tasks
- Set up team-wide standards and configuration management
- Optimize AI performance through strategic rule configuration

## Lecture Structure

### 1. Understanding Cursor Rules (8 minutes)

#### What are Cursor Rules?

- **Definition**: Configuration files that guide AI behavior
- **Purpose**: Consistent AI responses across team and projects
- **Scope**: Project-level, workspace-level, and global rules
- **Format**: YAML-based configuration with specific syntax

#### Types of Rules

- **Code Style Rules**: Formatting, naming conventions, patterns
- **Behavioral Rules**: How AI should respond to different contexts
- **Context Rules**: What information to include or exclude
- **Team Rules**: Shared standards and practices

#### Rule Hierarchy and Precedence

- **Global Rules**: Apply to all projects
- **Workspace Rules**: Apply to specific workspace
- **Project Rules**: Apply to individual projects
- **Override Mechanisms**: How rules interact and conflict resolution

### 2. Creating Custom Rules (10 minutes)

#### Basic Rule Structure

- **File Location**: `.cursor-rules` file placement
- **YAML Syntax**: Proper formatting and structure
- **Rule Categories**: Organizing different types of rules
- **Comments and Documentation**: Maintaining readable rule files

#### Code Style Configuration

- **Language-Specific Rules**: Python, JavaScript, TypeScript, etc.
- **Formatting Preferences**: Indentation, line length, brackets
- **Naming Conventions**: Variables, functions, classes, files
- **Import Organization**: Import ordering and grouping

#### Behavioral Configuration

- **Response Style**: Formal vs. casual, detailed vs. concise
- **Explanation Level**: Technical depth for different audiences
- **Error Handling**: How AI should handle and explain errors
- **Best Practices**: Enforcement of specific coding practices

### 3. Prompts Library & Templates (7 minutes)

#### Building Custom Prompts

- **Prompt Structure**: Effective prompt design patterns
- **Context Integration**: Using project context in prompts
- **Variable Substitution**: Dynamic prompt content
- **Reusable Templates**: Creating template families

#### Common Prompt Categories

- **Code Generation**: Function, class, and module templates
- **Documentation**: README, API docs, code comments
- **Testing**: Unit tests, integration tests, test scenarios
- **Refactoring**: Modernization, optimization, restructuring

#### Prompt Organization

- **Categorization**: Organizing prompts by function and language
- **Version Control**: Managing prompt evolution and updates
- **Team Sharing**: Distribution and synchronization strategies
- **Quality Assurance**: Testing and validating prompt effectiveness

### 4. Team Configuration Management (5 minutes)

#### Enterprise Setup Strategies

- **Centralized Configuration**: Organization-wide rule management
- **Distributed Configuration**: Team-specific customizations
- **Version Control Integration**: Rules in Git repositories
- **Configuration Deployment**: Automated distribution methods

#### Collaboration Features

- **Shared Rule Libraries**: Common rule repositories
- **Rule Inheritance**: Building on existing rule sets
- **Conflict Resolution**: Managing conflicting team preferences
- **Change Management**: Updating rules across teams

## Example Prompts & Code Snippets

### Example 1: Basic .cursor-rules Configuration

```yaml
# .cursor-rules
version: "1.0"
name: "Team Development Standards"

# Global preferences
ai_behavior:
  response_style: "professional"
  explanation_level: "detailed"
  include_examples: true
  include_alternatives: true

# Code style preferences
code_style:
  general:
    max_line_length: 100
    indent_size: 2
    use_spaces: true
    
  javascript:
    quote_style: "single"
    semicolons: true
    arrow_functions: "prefer"
    destructuring: "prefer"
    
  python:
    quote_style: "double"
    line_length: 88
    imports: "black_style"
    type_hints: "required"

# Naming conventions
naming:
  variables: "camelCase"
  functions: "camelCase"  
  classes: "PascalCase"
  constants: "UPPER_SNAKE_CASE"
  files: "kebab-case"

# Documentation preferences
documentation:
  function_docs: "JSDoc"
  class_docs: "detailed"
  api_docs: "OpenAPI"
  readme_style: "comprehensive"

# Testing preferences
testing:
  framework: "jest"
  coverage_threshold: 80
  test_style: "descriptive"
  mock_preference: "minimal"

# Security preferences
security:
  input_validation: "strict"
  error_exposure: "minimal"
  auth_patterns: "JWT"
  data_sanitization: "always"
```

### Example 2: Advanced Behavioral Rules

```yaml
# Advanced behavioral configuration
ai_responses:
  code_generation:
    include_comments: true
    include_error_handling: true
    include_type_annotations: true
    prefer_functional: false
    
  code_review:
    check_security: true
    check_performance: true
    check_maintainability: true
    suggest_refactoring: true
    
  debugging:
    include_logging: true
    suggest_tests: true
    explain_root_cause: true
    provide_prevention: true

# Context-specific rules
context_rules:
  api_development:
    include_validation: true
    include_documentation: true
    include_error_responses: true
    include_rate_limiting: false
    
  frontend_development:
    include_accessibility: true
    include_responsive_design: true
    include_performance_optimization: true
    prefer_semantic_html: true
    
  database_operations:
    include_transactions: true
    include_indexing_suggestions: true
    include_migration_scripts: true
    prefer_prepared_statements: true

# Team-specific patterns
team_patterns:
  error_handling:
    pattern: "Result<T, Error>"
    include_stack_traces: false
    log_errors: true
    
  logging:
    format: "structured"
    levels: ["error", "warn", "info", "debug"]
    include_context: true
    
  api_design:
    style: "RESTful"
    versioning: "header"
    authentication: "Bearer"
    rate_limiting: true
```

### Example 3: Language-Specific Custom Prompts

```yaml
# Custom prompts library
prompts:
  javascript:
    react_component:
      description: "Generate a React functional component with TypeScript"
      template: |
        Create a React functional component named {component_name} that:
        - Uses TypeScript with proper prop types
        - Includes proper JSDoc documentation
        - Follows our team's naming conventions
        - Includes basic error boundaries
        - Uses our standard CSS-in-JS approach
        - Includes basic accessibility attributes
        
    api_endpoint:
      description: "Generate Express.js API endpoint"
      template: |
        Create an Express.js endpoint for {endpoint_description} that:
        - Includes input validation using Joi
        - Has proper error handling with our standard error format
        - Includes OpenAPI documentation comments
        - Uses async/await pattern
        - Includes appropriate HTTP status codes
        - Follows RESTful conventions
        
  python:
    class_definition:
      description: "Generate Python class with type hints"
      template: |
        Create a Python class {class_name} that:
        - Uses type hints for all methods and properties
        - Includes comprehensive docstrings in Google format
        - Follows PEP 8 conventions
        - Includes __str__ and __repr__ methods
        - Has proper error handling
        - Includes basic validation in __init__
        
    test_suite:
      description: "Generate comprehensive test suite"
      template: |
        Create a pytest test suite for {module_name} that:
        - Tests all public methods and functions
        - Includes edge cases and error conditions
        - Uses appropriate fixtures and mocks
        - Has descriptive test names and docstrings
        - Achieves at least 90% code coverage
        - Includes integration tests where appropriate

  documentation:
    api_documentation:
      description: "Generate API documentation"
      template: |
        Create comprehensive API documentation for {api_name} that includes:
        - Clear endpoint descriptions and purposes
        - Request/response examples with proper formatting
        - Error response documentation
        - Authentication requirements
        - Rate limiting information
        - SDK examples in multiple languages
        
    readme_template:
      description: "Generate project README"
      template: |
        Create a comprehensive README.md for {project_name} that includes:
        - Clear project description and purpose
        - Installation instructions for different environments
        - Usage examples with code snippets
        - API documentation or links
        - Contributing guidelines
        - License information
        - Troubleshooting section
```

### Example 4: Team Configuration Management

**Chat Prompt:**

```
Help me set up a team-wide Cursor configuration that enforces:
1. Consistent code style across JavaScript/TypeScript projects
2. Security-first approach for all API development
3. Comprehensive testing requirements
4. Documentation standards for all functions
5. Git commit message conventions
```

**Expected AI Response:**

```
I'll help you create a comprehensive team configuration. Here's a complete setup:

## 1. Main Team Configuration (.cursor-rules)

```yaml
# Team-wide Cursor Rules Configuration
version: "1.0"
name: "Enterprise Development Standards"
description: "Enforced standards for all team projects"

# Global AI behavior
ai_behavior:
  response_style: "professional"
  security_first: true
  always_include_tests: true
  always_document: true
  
# Code style enforcement
code_style:
  javascript:
    parser: "babel"
    quote_style: "single"
    semicolons: true
    trailing_commas: "es5"
    bracket_spacing: true
    arrow_parens: "avoid"
    
  typescript:
    strict_mode: true
    no_implicit_any: true
    strict_null_checks: true
    no_unused_locals: true
    prefer_interfaces: true

# Security requirements
security_standards:
  input_validation:
    always_validate: true
    sanitize_inputs: true
    use_schemas: true
    
  authentication:
    require_auth_docs: true
    prefer_jwt: true
    token_expiry_required: true
    
  api_security:
    rate_limiting: "required"
    cors_configuration: "explicit"
    helmet_usage: "required"
    input_sanitization: "always"

# Testing requirements
testing_standards:
  coverage_minimum: 85
  test_types:
    unit_tests: "required"
    integration_tests: "required"
    e2e_tests: "api_endpoints"
    
  naming_convention: "describe/it pattern"
  assertion_library: "jest"
  mock_strategy: "minimal_but_effective"

# Documentation requirements
documentation_standards:
  functions:
    jsdoc_required: true
    include_examples: true
    document_parameters: true
    document_returns: true
    
  apis:
    openapi_spec: "required"
    example_requests: "required"
    error_responses: "documented"
    
  readme:
    installation_guide: "required"
    usage_examples: "required"
    api_documentation: "linked"

# Git standards
git_standards:
  commit_format: "conventional"
  branch_naming: "feature/description"
  pr_requirements:
    description_required: true
    tests_required: true
    review_required: true
```

## 2. Project-Specific Overrides

### Frontend Projects (.cursor-rules-frontend)

```yaml
extends: ".cursor-rules"

frontend_specific:
  accessibility:
    wcag_compliance: "AA"
    semantic_html: "required"
    aria_labels: "required"
    
  performance:
    bundle_analysis: "recommended"
    lazy_loading: "images_and_routes"
    code_splitting: "route_based"
    
  styling:
    css_methodology: "BEM"
    responsive_design: "mobile_first"
    css_in_js: "styled_components"
```

### Backend Projects (.cursor-rules-backend)

```yaml
extends: ".cursor-rules"

backend_specific:
  database:
    orm_required: true
    migrations: "versioned"
    connection_pooling: "required"
    
  api_design:
    rest_conventions: "strict"
    versioning_strategy: "url_path"
    pagination: "cursor_based"
    
  monitoring:
    logging: "structured"
    metrics: "prometheus"
    health_checks: "required"
```

## 3. Enforcement Prompts

### Security Review Prompt

```yaml
security_review:
  template: |
    Perform a security review of this code focusing on:
    - Input validation and sanitization
    - Authentication and authorization
    - Data exposure risks
    - SQL injection vulnerabilities
    - XSS prevention
    - CSRF protection
    Provide specific recommendations with code examples.
```

### Code Review Prompt  

```yaml
code_review:
  template: |
    Review this code against our team standards:
    - Code style and formatting compliance
    - Testing coverage and quality
    - Documentation completeness
    - Security considerations
    - Performance implications
    - Maintainability concerns
    Provide actionable feedback with examples.
```

## 4. Team Deployment Strategy

### Repository Structure

```
team-cursor-config/
├── .cursor-rules (main config)
├── .cursor-rules-frontend
├── .cursor-rules-backend
├── prompts/
│   ├── security.yaml
│   ├── testing.yaml
│   └── documentation.yaml
└── scripts/
    ├── deploy-config.sh
    └── validate-config.sh
```

### Deployment Script (deploy-config.sh)

```bash
#!/bin/bash
# Deploy team Cursor configuration

echo "Deploying team Cursor configuration..."

# Copy main configuration
cp .cursor-rules ~/.cursor-rules-global

# Copy project-specific configs
cp .cursor-rules-frontend ~/.cursor-rules-frontend-template
cp .cursor-rules-backend ~/.cursor-rules-backend-template

# Copy prompt libraries
mkdir -p ~/.cursor-prompts
cp -r prompts/* ~/.cursor-prompts/

echo "Configuration deployed successfully!"
echo "Remember to restart Cursor to apply changes."
```

## 5. Validation and Testing

Create validation scripts to ensure configuration compliance:

```javascript
// validate-config.js
const yaml = require('js-yaml');
const fs = require('fs');

function validateCursorRules(configPath) {
  try {
    const config = yaml.load(fs.readFileSync(configPath, 'utf8'));
    
    // Validate required sections
    const requiredSections = [
      'ai_behavior',
      'code_style', 
      'security_standards',
      'testing_standards'
    ];
    
    requiredSections.forEach(section => {
      if (!config[section]) {
        throw new Error(`Missing required section: ${section}`);
      }
    });
    
    console.log('Configuration validation passed!');
    return true;
  } catch (error) {
    console.error('Configuration validation failed:', error.message);
    return false;
  }
}
```

This setup ensures consistent AI behavior across your entire team while maintaining flexibility for project-specific needs.

```

## Speaker Notes

### Opening (2 minutes)  
"Welcome to our fourth lecture on Cursor Rules and Configuration. Today we're moving from individual productivity to team efficiency. By the end of this session, you'll know how to create consistent AI behavior across your entire development team."

### Understanding Cursor Rules (8 minutes)

#### Introduction to Rules (3 minutes)
"Think of Cursor Rules as the DNA of your AI assistant - they define how it behaves, what standards it follows, and how it responds to your team's specific needs..."

**Key Speaking Points:**
- Emphasize the shift from individual to team consistency
- Show how rules solve the problem of inconsistent AI responses
- Demonstrate the hierarchy of rule application

#### Rule Types and Structure (5 minutes)
"Let's explore the different types of rules and how they work together..."

**Live Demo:**
- Show basic .cursor-rules file structure
- Demonstrate different rule categories
- Show rule precedence in action

**Key Speaking Points:**
- Highlight the YAML format and its readability
- Show how rules cascade and override
- Demonstrate the importance of rule organization

### Creating Custom Rules (10 minutes)

#### Basic Configuration (4 minutes)
"Let's start by creating a basic rule file that enforces your team's coding standards..."

**Live Demo:**
- Create a simple .cursor-rules file
- Add code style preferences
- Show immediate effects on AI behavior

**Key Speaking Points:**
- Start simple and build complexity gradually
- Show immediate feedback from rule changes
- Emphasize the importance of team input

#### Advanced Behavioral Rules (6 minutes)
"Now let's explore more sophisticated rules that control AI behavior in different contexts..."

**Live Demo:**
- Add behavioral rules for different scenarios
- Show context-specific rule application
- Demonstrate security and testing enforcement

**Key Speaking Points:**
- Show how rules adapt AI to different development contexts
- Highlight security-first approaches
- Demonstrate testing requirement enforcement

### Prompts Library & Templates (7 minutes)

#### Building Custom Prompts (3 minutes)
"Custom prompts are your secret weapon for consistent, high-quality AI responses..."

**Live Demo:**
- Create a custom prompt template
- Show variable substitution
- Demonstrate prompt organization

**Key Speaking Points:**
- Emphasize reusability and consistency
- Show how templates save time
- Demonstrate the power of parameterized prompts

#### Prompt Categories and Management (4 minutes)
"Let's explore different categories of prompts and how to manage them effectively..."

**Live Demo:**
- Show different prompt categories
- Demonstrate prompt versioning
- Show team sharing strategies

**Key Speaking Points:**
- Highlight the importance of prompt categorization
- Show version control integration
- Demonstrate quality assurance for prompts

### Team Configuration Management (5 minutes)

#### Enterprise Setup (2 minutes)
"For larger teams, we need more sophisticated configuration management..."

**Live Demo:**
- Show centralized configuration approach
- Demonstrate inheritance patterns
- Show deployment strategies

**Key Speaking Points:**
- Emphasize scalability for larger teams
- Show how to balance consistency with flexibility
- Demonstrate automated deployment

#### Collaboration and Change Management (3 minutes)
"Managing configuration changes across a team requires careful planning..."

**Live Demo:**
- Show conflict resolution strategies
- Demonstrate change management workflow
- Show validation and testing approaches

**Key Speaking Points:**
- Highlight the importance of change management
- Show how to handle conflicting preferences
- Demonstrate validation strategies

## Hands-On Exercises

### Exercise 1: Basic Team Rules Setup (8 minutes)
Create a team configuration:
1. Set up basic code style rules for your language
2. Add documentation requirements
3. Configure security preferences
4. Test the configuration with sample code

### Exercise 2: Custom Prompts Library (10 minutes)
Build a prompt library:
1. Create prompts for common development tasks
2. Add parameterization for flexibility
3. Organize prompts by category
4. Test prompts with different scenarios

### Exercise 3: Advanced Configuration (7 minutes)
Implement advanced team features:
1. Set up rule inheritance
2. Create project-specific overrides
3. Implement validation scripts
4. Test deployment workflow

## Best Practices Covered

1. **Start Simple**: Begin with basic rules and add complexity gradually
2. **Team Input**: Involve the entire team in rule creation
3. **Version Control**: Keep rules in version control with your code
4. **Regular Updates**: Review and update rules regularly
5. **Validation**: Always validate configuration changes

## Common Pitfalls to Avoid

1. **Over-Configuration**: Too many rules can slow down AI responses
2. **Conflicting Rules**: Ensure rules don't contradict each other
3. **Rigid Standards**: Allow flexibility where appropriate
4. **Poor Documentation**: Document why rules exist, not just what they do
5. **Infrequent Updates**: Keep rules current with team practices

## Configuration Best Practices

### Rule Organization
- Group related rules together
- Use clear, descriptive names
- Include comments explaining reasoning
- Maintain consistent formatting

### Performance Considerations
- Keep rule files reasonably sized
- Use specific rather than broad rules where possible
- Test rule performance impact
- Monitor AI response times

### Team Adoption Strategies
- Gradual rollout of new rules
- Training sessions for team members
- Clear documentation and examples
- Regular feedback and iteration

## Next Lecture Preview

In Lecture 5, we'll explore:
- MCP (Model Context Protocol) servers and integration
- Enterprise AI integration strategies
- Custom AI workflows and automation
- Advanced team collaboration features
- Future-proofing your AI development setup

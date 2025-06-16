---
slide_type: content
title: "Enterprise Security & Compliance"
---

# Enterprise Security & Compliance

## 🔐 Rule Compliance Framework

```yaml
# Enterprise Security Rule Template
---
description: Apply when handling sensitive data, authentication, or regulatory compliance
globs: **/secure/**/*.ts,**/auth/**/*.ts,**/compliance/**/*.ts
alwaysApply: false
---

## Mandatory Security Practices
- ✅ **GDPR Compliance:** Data anonymization for EU users
- ✅ **SOX Compliance:** Audit logging for financial data
- ✅ **PCI DSS:** Secure payment processing patterns
- ✅ **HIPAA:** Healthcare data protection standards

## Forbidden Patterns
- ❌ Hard-coded secrets or API keys
- ❌ Unencrypted sensitive data storage
- ❌ Direct database queries without sanitization
- ❌ Bypassing authentication/authorization
- ❌ Disabling security headers or CORS
```

## 🔒 Data Protection Standards

### **Data Classification**
- **Public:** No restrictions
- **Internal:** Company use only
- **Confidential:** Requires NDA
- **Restricted:** Regulated data (PII, PHI, PCI)

### **Encryption Requirements**
- TLS 1.2+ for data in transit
- AES-256 for data at rest
- Key management using HSMs or KMS
- Certificate rotation every 90 days

<!-- Speaker Notes:
This slide covers the security and compliance aspects of enterprise rule integration. The compliance framework template provides a starting point for implementing security rules, while the data protection standards outline the minimum requirements for handling different types of sensitive data. These rules help ensure that all code meets the organization's security and compliance requirements.
-->

**Key Points:**
- Follow regulatory requirements
- Implement defense in depth
- Regular security audits
- Document security decisions

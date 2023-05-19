# Package chums-base

This package is designed to be a common backend module for Windows server node.js instances.

See ./lib/index.d.ts

## Required Environment Variables

| ENV Variable Name     | Description                                                |
|-----------------------|------------------------------------------------------------|
| GMAIL_USERNAME        | Required for sending emails                                |
| GMAIL_APP_PASSWORD    | 2FA App Password for gmail account                         |
| ---                   | ---                                                        |
| MYSQL_SERVER          | Domain name for mysql server                               |
| MYSQL_USERNAME        | Username for MySQL access                                  |
| MYSQL_PASSWORD        | Password for MySQL access                                  |
| MYSQL_POOL_LIMIT      | Number of available pools for MySQL<br/>defaults to 5      |
| MYSQL_DB              | Default schema for MySQL connections                       |
| ---                   | ---                                                        |
| JWT_SECRET            | Secret for validating JSON Web Tokens                      |
| JWT_ISSUER            | Issuer Name form JSON Web Tokens                           |
| ---                   | ---                                                        |
| PR_PII_ENCRYPT_KEY    | Encryption key for Payroll PII info stored in MySQL tables |
| ---                   | ---                                                        |
| CHUMS_API_HOST        | CHUMS API Host URL                                         |
| CHUMS_API_USERNAME    | Username for CHUMS API calls                               |
| CHUMS_API_PASSWORD    | Password for CHUMS API calls                               |
| ---                   | ---                                                        |
| SAGE_QUERY_EXECUTABLE | Path and executable filename for SageQuery App             |

# Sector 1: Postman API Data Validation Suite

## Project Overview
This testing suite provides automated quality assurance and contract validation for backend service integrations using the Star Wars API ecosystem (`https://swapi.py4e.com/api/`). 

The objective of this suite is to mitigate data corruption and ensure system resilience by validating live server responses against strict functional specifications.

Star Wars API Data Validation.postman_collection.json: Boundary validation, query parameter behavior, and structural smoke tests.

SWAPI Error Mock.postman_environment.json: Environment configuration mapping server variables, base URLs, and custom error injection simulation states.

## Automated Test Architecture

### Data Integrity & Validation Suite
**Schema enforcement**: validates status 200 OK responses along with exact data type assertions (e.g., validating strings, arrays, integers, and ISO timestamps) across endpoints like /people/ and /planets/.
* **Deep schema and hierarchy checks**: ensures robust validation of nested objects and strict format compliance.
* **Query param parsing**: tests standard behavior against valid, invalid, and empty search conditions.

### Sad Path Traps (Boundary Validation)
Guarantees the backend handles anomalies gracefully without passing silent failures downstream into client applications:
* **Resource Absence:** Targets non-existent resource records (`/people/9999/`) to verify the server correctly issues a `404 Not Found` response code.
* **Error Readability:** Validates that error payloads return a structured JSON object featuring a human-readable `detail` key, preventing unhandled system crashes.
  
### Complex Workflow & Matching Algorithms
**Pilot Verification Flight Log Workflow**: a multi-step dynamic integration test simulating real-world workflows
* Extracts a starship or vehicle from a character payload.
* Dynamically isolates the character URL as a designated pilot.
* Runs a matching logic sequence to verify that the specified vehicle payload explicitly references the exact pilot in its logs, ensuring relational data consistency across asynchronous nodes.

### Fault Tolerance & Negative Testing (HTTP Status Codes)
Using custom configured mock environments to bypass static data restrictions, this suite tests the system's resilience by forcing and validating unexpected error conditions:

* 404 Not Found: Verifies contract structure when referencing non-existent resources.
* 409 Conflict: Validates data injection safety boundaries and resource overlap prevention.
* Secure Resources: Tests authentication gates and payload protections.

### Execution & Setup Instructions
* Prerequisites
Postman Desktop Agent or Newman CLI (for CI/CD execution).

* Local Run Configuration

* Clone this repository locally.

* Import the desired collections and the SWAPI Error Mock environment into your Postman client workspace.

* Select the SWAPI Error Mock environment from your environment dropdown.

* Important Security Checklist: Ensure all highly sensitive operational credentials, local auth headers, or specific instance tokens are placed strictly in the Current Value column of your environment profile before starting execution to keep them locally isolated.

# Sector 2: Data Quality and Database Integrity Validation (SQL)

## Objective
This repository showcases assertions built to audit data pipelines for anomalies, tracking ingestion loops, constraint violations and degradation.

### Core Assertions

#### 1. Windowing Partition Check (Deduplication)
Isolates row duplicates:
```sql
WITH ranked_users AS (
    SELECT 
        user_id,
        email,
        created_at,
        ROW_NUMBER() OVER(PARTITION BY user_id, email ORDER BY created_at) as row_num
    FROM raw_users
)
SELECT user_id, email, created_at 
FROM ranked_users 
WHERE row_num > 1;
```

#### 2. Cross-Table Integrity Audit (Orphan Records)
Identifies downstream leaks where transaction entries decouple from master user catalogs:

```sql
SELECT o.order_id, o.user_id, o.order_amount
FROM raw_orders o
LEFT JOIN raw_users u ON o.user_id = u.user_id
WHERE u.user_id IS NULL;
```

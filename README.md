# Sector 1: Postman API Data Validation Suite

## Project Overview
This testing suite provides automated quality assurance and contract validation for backend service integrations using the Star Wars API ecosystem (`https://swapi.py4e.com/api/`). 

The objective of this suite is to mitigate data corruption and ensure system resilience by validating live server responses against strict functional specifications.

## Automated Test Architecture

### Happy Path Assertions (Data Integrity)
Validates that production endpoints return correctly structured entities, valid HTTP headers, and strict data-type compliance:
* **Network Integrity:** Asserts `200 OK` status responses and enforces performance thresholds (latency < 800ms).
* **Schema Validation:** Verifies text payloads load natively as strings and structural arrays (e.g., historical timelines, related records) preserve data mapping.
* **Property Matching:** Executes deep assertion checks to confirm that live strings align exactly with historical baseline values.

### Sad Path Traps (Boundary Validation)
Guarantees the backend handles anomalies gracefully without passing silent failures downstream into client applications:
* **Resource Absence:** Targets non-existent resource records (`/people/9999/`) to verify the server correctly issues a `404 Not Found` response code.
* **Error Readability:** Validates that error payloads return a structured JSON object featuring a human-readable `detail` key, preventing unhandled system crashes.

## How To Run locally
1. Clone this repository to your local system.
2. Open **Postman Desktop**.
3. Import the `Star Wars API Data Validation.postman_collection.json` file.
4. Execute the collection via the **Postman Collection Runner** to view real-time validation results.# digital-fortress-qa
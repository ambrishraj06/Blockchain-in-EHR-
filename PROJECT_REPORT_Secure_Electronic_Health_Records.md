# TITLE OF PROJECT REPORT

## SECURE ELECTRONIC HEALTH RECORDS USING BLOCKCHAIN AND IPFS

### A PROJECT REPORT

Submitted by

- [Candidate Name 1] ([Register Number])
- [Candidate Name 2] ([Register Number])
- [Candidate Name 3] ([Register Number])

in partial fulfillment for the award of the degree of

## BACHELOR OF TECHNOLOGY

in

## COMPUTING SCIENCE AND ENGINEERING
## (HEALTH INFORMATICS)

SCHOOL OF COMPUTING SCIENCE AND ENGINEERING AND ARTIFICIAL INTELLIGENCE  
VIT BHOPAL UNIVERSITY  
KOTRI KALAN, SEHORE  
MADHYA PRADESH - 466114

MONTH AND YEAR: APRIL 2026

---

# BONAFIDE CERTIFICATE (INTERNAL PROJECT)

Certified that this project report titled "Secure Electronic Health Records Using Blockchain and IPFS" is the bonafide work of:

- [Candidate Name 1] ([Register Number])
- [Candidate Name 2] ([Register Number])
- [Candidate Name 3] ([Register Number])

who carried out the project work under my supervision.

Certified further that, to the best of my knowledge, the work reported in this project report does not form part of any other project report or dissertation on the basis of which a degree or award was conferred earlier on this or any other candidate.

Project Examination held on: ___________________

Guide Signature: ___________________  
Guide Name: ___________________  
Designation: ___________________

Head of Department Signature: ___________________  
HOD Name: ___________________

---

# ACKNOWLEDGEMENT

First and foremost, we thank the Almighty for giving us the strength, health, and patience to complete this project.

We express our sincere gratitude to the Head of the Department, School of Computing Science and Engineering and Artificial Intelligence, VIT Bhopal University, for the encouragement and institutional support provided throughout this project.

We extend our heartfelt thanks to our project guide for continuous mentoring, technical direction, and constructive feedback. Their suggestions helped us transform an initial concept into a functional and deployable system.

We also thank the teaching faculty and technical staff members who supported us directly and indirectly during implementation, testing, and documentation.

Finally, we thank our parents and family members for their constant motivation, trust, and support throughout the project period.

---

# LIST OF SYMBOLS, NOMENCLATURE, AND ABBREVIATIONS

| Abbreviation | Expanded Form |
|---|---|
| EHR | Electronic Health Record |
| IPFS | InterPlanetary File System |
| CID | Content Identifier |
| API | Application Programming Interface |
| UI | User Interface |
| UX | User Experience |
| RBAC | Role Based Access Control |
| HH Number | 6-digit Healthcare Identity Number used in this project |
| ETH | Ether (native unit on Ethereum) |
| RPC | Remote Procedure Call |
| DApp | Decentralized Application |
| ABI | Application Binary Interface |
| HOD | Head of Department |
| CRA | Create React App |

---

# LIST OF FIGURES AND GRAPHS

1. Figure 1. Overall System Architecture of Secure EHR
2. Figure 2. Patient Workflow (Registration to Record Viewing)
3. Figure 3. Doctor Workflow (Access List to Patient Records)
4. Figure 4. Diagnostic Workflow (Report Upload Flow)
5. Figure 5. Sequence Diagram of IPFS Upload and On-chain Linking
6. Figure 6. Smart Contract Interaction Map
7. Figure 7. Permission Grant and Revoke State Flow
8. Figure 8. Deployment Pipeline (Ganache, Truffle, React)
9. Figure 9. Route Structure of Frontend Application
10. Figure 10. Security Risk Heat Map

---

# LIST OF TABLES

1. Table 1. Technology Stack and Version Details
2. Table 2. Role-wise Functional Requirements
3. Table 3. Registration Form Data Fields by Role
4. Table 4. Smart Contracts and Their Responsibilities
5. Table 5. Route Map and Component Mapping
6. Table 6. Functional Testing Checklist
7. Table 7. Security and Privacy Observations
8. Table 8. Performance and Scalability Considerations
9. Table 9. Current Limitations and Improvement Plan
10. Table 10. Future Scope Roadmap

---

# ABSTRACT

**Purpose:**
Electronic Health Record systems in many institutions are still centralized, fragmented, and vulnerable to unauthorized alterations or availability issues. This project presents a decentralized Secure Electronic Health Record (Secure EHR) platform that combines Ethereum smart contracts with IPFS-based file storage to improve integrity, traceability, and patient-controlled data sharing.

**Methodology:**
The proposed solution is implemented using React for the frontend interface, Web3 and MetaMask for blockchain interaction, Solidity contracts for role registration and permission logic, and Pinata over IPFS for decentralized medical file storage. The system supports three user roles: Patient, Doctor, and Diagnostic Center. Patients can register, upload records, and grant doctor access. Doctors can view only listed patient records through the portal workflow. Diagnostic centers can upload report files linked to patient identifiers. Ganache and Truffle are used for local blockchain deployment and contract migration.

**Findings:**
The implementation demonstrates that blockchain and distributed storage can be practically integrated into a healthcare workflow with clear role separation and auditable operations. The project also reveals realistic challenges such as on-chain password handling, missing session hardening, and access-control enhancements required for production-scale deployment. Overall, the outcome validates the feasibility of decentralized EHR management while identifying concrete future improvements for privacy, compliance, and scalability.

---

# TABLE OF CONTENTS

1. Chapter 1: Project Description and Outline  
2. Chapter 2: Related Work Investigation  
3. Chapter 3: Requirement Artifacts  
4. Chapter 4: Design Methodology and Its Novelty  
5. Chapter 5: Technical Implementations and Analysis  
6. Chapter 6: Project Outcome and Applicability  
7. Chapter 7: Conclusions and Recommendation  
8. References  
9. Appendices

---

# CHAPTERS ORGANIZATION

The report is organized in seven chapters. Chapter 1 introduces the problem, motivation, objectives, and scope. Chapter 2 studies related approaches and identifies research gaps. Chapter 3 formalizes functional and non-functional requirements. Chapter 4 explains the architecture, design choices, and novelty. Chapter 5 provides implementation details with direct mapping to source folders and files, followed by technical analysis. Chapter 6 discusses project outcomes and practical applicability. Chapter 7 concludes the work and proposes recommendations. References and appendices are included at the end.

---

# CHAPTER 1: PROJECT DESCRIPTION AND OUTLINE

## 1.1 Introduction

Healthcare data is highly sensitive and needs both privacy and continuity. Traditional EHR systems often depend on centralized databases, where trust is placed in one service boundary. This creates single points of failure and restricted interoperability.

Secure EHR is a blockchain-enabled web application that aims to provide tamper-evident record references and role-driven access control. The project integrates Ethereum smart contracts for identity and permission tracking and IPFS for distributed medical file storage.

## 1.2 Problem Statement

Current EHR workflows in many setups face the following recurring issues:

- Fragmented data access across actors (patient, doctor, diagnostics)
- Limited transparency of who can access records
- Possibility of data silos and central-service outages
- Poor patient ownership over permission management

## 1.3 Proposed Solution

The project introduces a role-based decentralized application where:

- Patient, Doctor, and Diagnostic Center users register via smart contracts
- Medical files are uploaded to Pinata and addressed by IPFS CIDs
- Only record references and metadata (timestamp + CID) are stored on-chain
- Patients can grant doctors access via HH Number-based linkage

## 1.4 Project Objectives

1. Build a decentralized EHR prototype with multi-role support.
2. Store medical file references immutably on-chain while keeping files on IPFS.
3. Enable patient-driven doctor permission grant/revoke flow.
4. Provide practical local deployment with Ganache and Truffle.
5. Deliver a responsive frontend for role-wise workflows.

## 1.5 Scope

### In Scope

- Registration and login flows for three roles
- Patient record upload and retrieval
- Doctor patient-list view and permission revoke action
- Diagnostic report upload linked to patient HH number
- Local blockchain deployment and frontend integration

### Out of Scope

- National health ID integration
- Hospital information system integration APIs
- Insurance workflow integration
- Production-grade compliance controls (HIPAA/GDPR audit layer)

## 1.6 Expected Contributions

- A functional full-stack DApp prototype for decentralized EHR use
- A practical pattern for combining smart contracts and IPFS in healthcare context
- Codebase-driven analysis of security and architectural limitations

## 1.7 Project Folder Snapshot

Major folders and files used in this implementation:

- `src/components/` for UI workflows
- `src/contracts/` for Solidity contracts
- `src/migrations/` for Truffle deployment scripts
- `scripts/start-ganache.js` and `scripts/deploy-contracts.js` for automation
- `src/pinata.js` for Pinata upload and gateway helper methods
- `src/build/contracts/` for compiled ABIs and deployed network metadata

---

# CHAPTER 2: RELATED WORK INVESTIGATION

## 2.1 Conventional EHR Systems

Conventional EHR systems are mostly centralized, with institution-managed access layers. They perform well in controlled deployments but often suffer from interoperability barriers and dependency on organizational trust boundaries.

## 2.2 Blockchain in Healthcare

Blockchain-based healthcare studies focus on immutability, traceability, and distributed trust. However, storing complete medical files directly on-chain is expensive and inefficient. Therefore, practical implementations usually store only references on-chain while keeping large files off-chain.

## 2.3 IPFS-based Medical Data Approaches

IPFS enables distributed content-addressed storage. In medical contexts, it is typically used to store encrypted files or report binaries, while blockchain manages identities, permissions, and audit-linked references.

## 2.4 Gap Analysis

Observed gaps in existing prototypes and demos:

- Many systems are architecture-only with limited runnable implementation.
- Some projects do not include full role workflows in one interface.
- Access control is often coarse and not patient-centric.
- Deployment reproducibility is sometimes weak.

## 2.5 Positioning of This Project

This project contributes a runnable end-to-end prototype with:

- Explicit three-role portal navigation
- Smart contract-driven registration and permission linkage
- File upload to Pinata and reference persistence through `UploadEhr.sol`
- Local deterministic blockchain setup for reproducible demonstration

## 2.6 Comparative Summary

| Criteria | Traditional EHR | Basic Blockchain Demo | This Project |
|---|---|---|---|
| Storage Model | Centralized DB | Mostly on-chain metadata | On-chain metadata + IPFS files |
| User Roles | Usually institution-defined | Often single role | Patient, Doctor, Diagnostic |
| Patient Access Control | Limited in many systems | Partial | Grant/Revoke via role flow |
| Deployment Reproducibility | Depends on vendor stack | Often incomplete | Ganache + Truffle + React scripts |
| Practical UI Flow | Yes | Often minimal | End-to-end role-wise UI |

---

# CHAPTER 3: REQUIREMENT ARTIFACTS

## 3.1 Stakeholders

- Patients
- Doctors
- Diagnostic Centers
- University evaluators and developers

## 3.2 Functional Requirements

### Patient Functions

- Register patient profile
- Login using HH number and password
- View personal profile
- Upload medical files to IPFS
- View uploaded record list
- Grant doctor access

### Doctor Functions

- Register doctor profile
- Login using HH number and password
- View doctor profile
- View patient list who granted access
- Revoke access from the list
- View patient details and record links

### Diagnostic Center Functions

- Register center profile
- Login using HH number and password
- View center profile
- Create report entry and upload diagnostic file

## 3.3 Non-Functional Requirements

- Responsive and user-friendly UI
- Deterministic local test environment
- Smart contract interaction through MetaMask
- Basic input validation in forms
- Maintainable modular code structure

## 3.4 Input Validation Requirements

- HH Number must be 6 digits
- Email must match standard format
- Password minimum length is 8 characters
- Mandatory fields required for all registration flows

## 3.5 Software and Runtime Requirements

| Component | Requirement |
|---|---|
| Node.js | v18 or later |
| Web Browser | Chrome/Edge with MetaMask |
| Blockchain | Ganache on 127.0.0.1:7546 |
| Smart Contract Tooling | Truffle v5 |
| Frontend | React 18, react-router-dom 6 |
| Storage | Pinata Cloud (IPFS) |

## 3.6 Data Artifact Requirements

### Patient Registration Fields

- Wallet Address
- Full Name
- Date of Birth
- Gender
- Blood Group
- Home Address
- Email
- HH Number
- Password

### Doctor Registration Fields

- Wallet Address
- Full Name
- Hospital Name
- Hospital Location (frontend field)
- Date of Birth
- Gender
- Email
- HH Number
- Specialization
- Department
- Designation
- Work Experience
- Password

### Diagnostic Registration Fields

- Wallet Address
- Center Name
- Hospital Name
- Location
- Email
- HH Number
- Password

## 3.7 Use Case Summary

| Actor | Use Case | Result |
|---|---|---|
| Patient | Upload record | CID stored in `UploadEhr` against patient HH |
| Patient | Grant doctor access | Entry added in doctor list mapping |
| Doctor | View patient list | Reads list using doctor HH |
| Doctor | Revoke access | Permission flag false and list entry removed |
| Diagnostic | Upload report | Record linked to patient HH with timestamp |

---

# CHAPTER 4: DESIGN METHODOLOGY AND ITS NOVELTY

## 4.1 Development Methodology

The project followed an iterative build-and-validate approach:

1. Smart contracts were drafted first for user registration and record storage.
2. Frontend role pages were created and mapped to routes.
3. Blockchain calls were integrated using Web3 and MetaMask.
4. IPFS upload utility was added through Pinata APIs.
5. Local deployment scripts were automated for repeatability.

## 4.2 High-Level Architecture

The architecture contains four core layers:

- Presentation Layer: React components under `src/components/`
- Integration Layer: Web3 calls + Pinata helper (`src/pinata.js`)
- Blockchain Layer: Solidity contracts (`src/contracts/`)
- Storage Layer: IPFS (Pinata gateway and pinning APIs)

## 4.3 Route and Module Design

Routing is centralized in `src/BrowseRouter.js` with role-wise pages.

| Route | Component |
|---|---|
| `/` | `LandingPage_1.js` |
| `/AboutPage` | `AboutPage.js` |
| `/register` | `RegisterPage.js` |
| `/login` | `LoginPage.js` |
| `/patient_registration` | `PatientRegistration.js` |
| `/doctor_registration` | `DoctorRegistration.js` |
| `/diagnostic_registration` | `DiagnosticsRegistration.js` |
| `/patient_login` | `PatientLogin.js` |
| `/doctor_login` | `DoctorLogin.js` |
| `/diagnostic_login` | `DiagnosticLogin.js` |
| `/patient/:hhNumber` | `PatientDashBoard.js` |
| `/doctor/:hhNumber` | `DoctorDashBoard.js` |
| `/diagnostic/:hhNumber` | `DiagnosticDashBoard.js` |
| `/patient/:hhNumber/viewprofile` | `ViewProfile.js` |
| `/doctor/:hhNumber/viewdoctorprofile` | `ViewDoctorProfile.js` |
| `/diagnostic/:hhNumber/viewdiagnosticprofile` | `ViewDiagnosticProfile.js` |
| `/patient/:hhNumber/viewrecords` | `ViewPatientRecords.js` |
| `/doctor/:hhNumber/patientlist` | `ViewPatientList.js` |
| `/doctor/:hhNumber/viewpatient/:patientHH` | `DoctorViewRecords.js` |
| `/diagnostic/:hhNumber/diagnosticform` | `DiagnosticForm.js` |

## 4.4 Smart Contract Design

| Contract | File | Purpose |
|---|---|---|
| PatientRegistration | `src/contracts/PatientRegistration.sol` | Patient registration, profile retrieval, password validation, permission data structures |
| DoctorRegistration | `src/contracts/DoctorRegistration.sol` | Doctor registration, profile retrieval, patient list, grant/revoke functions |
| DiagnosticRegistration | `src/contracts/DiagnosticRegistration.sol` | Diagnostic center registration and profile retrieval |
| UploadEhr | `src/contracts/UploadEhr.sol` | Record reference storage by patient HH (`timestamp`, `cid`) |
| DoctorFormContract | `src/contracts/DoctorFormContract.sol` | Additional form contract present in repo (not integrated in current routes) |
| DiagnosticFormContract | `src/contracts/DiagnosticFormContract.sol` | Additional form contract present in repo (not integrated in current routes) |

## 4.5 Novelty of the Proposed Design

Key novelty in this academic prototype:

- Unified role-driven DApp with distinct workflows in a single frontend
- Practical use of IPFS CIDs as blockchain-linked medical record references
- Patient-visible access flow with grant and revoke operations
- Reproducible local blockchain setup using deterministic Ganache accounts

## 4.6 UI and Interaction Design

- Tailwind-based custom theme and utility classes
- Glass-card style component system for role consistency
- Route-first navigation with clear dashboard cards
- Mobile-aware navbar behavior and responsive role selection pages

---

# CHAPTER 5: TECHNICAL IMPLEMENTATIONS AND ANALYSIS

## 5.1 Frontend Implementation

### Application Bootstrapping

- `src/index.js` mounts `App` in strict mode.
- `src/App.js` delegates routing to `BrowseRouter`.

### Wallet and Contract Readiness

In `BrowseRouter`, the app checks `window.ethereum`, requests account permission, and initializes Web3 for blockchain interactions.

### Role Portals

- Patient flow: register -> login -> dashboard -> profile/records/access
- Doctor flow: register -> login -> dashboard -> patient list -> patient records
- Diagnostic flow: register -> login -> dashboard -> report upload

## 5.2 IPFS and Blockchain Integration

### Pinata Utility

`src/pinata.js` provides:

- `uploadToPinata(file)`
- `uploadJSONToPinata(jsonData, name)`
- `getIPFSUrl(cid)`
- `isPinataConfigured()`

### Record Upload Flow

1. User selects medical file.
2. File uploaded to Pinata, response returns CID.
3. CID and timestamp are stored via `UploadEhr.addRecord(hhNumber, timestamp, cid)`.
4. Record list is read using `UploadEhr.getRecords(hhNumber)`.

## 5.3 Permission Management Flow

Current implemented frontend flow uses `DoctorRegistration` contract methods:

- Grant: `grantPermission(patientHH, doctorHH, patientName)` from patient record screen
- List: `getPatientList(doctorHH)` from doctor patient list screen
- Revoke: `revokePermission(patientHH, doctorHH)` from doctor list screen

## 5.4 Deployment and Runtime Implementation

### Ganache Script

`scripts/start-ganache.js` starts a server at:

- Host: `127.0.0.1`
- Port: `7546`
- Network/Chain ID: `5777`
- Accounts: 10 deterministic accounts with 100 ETH each
- Database persistence: `.ganache-db/`

### Contract Deployment Script

`scripts/deploy-contracts.js`:

- Checks deployment existence from ABI artifacts under `src/build/contracts/`
- Skips migration if already deployed on network `5777`
- Supports force redeploy with `--reset`

### Truffle Config

`src/truffle-config.js` targets local development network at `127.0.0.1:7546`.

### Migrations Included

- `src/migrations/1_deploy_migration.js` (DoctorRegistration)
- `src/migrations/2_deploy_migration.js` (PatientRegistration)
- `src/migrations/3_deploy_uploadehr.js` (UploadEhr)
- `src/migrations/6_deploy_migration.js` (DiagnosticRegistration)

## 5.5 Scripts and Build Pipeline

| Command | Purpose |
|---|---|
| `npm run ganache` | Start local blockchain |
| `npm run deploy` | Deploy contracts if needed |
| `npm run deploy:reset` | Force fresh deployment |
| `npm run dev` | Start ganache + deploy + frontend concurrently |
| `npm run dev:reset` | Same as dev with reset deployment |
| `npm start` | Start React frontend |
| `npm run build` | Create production build |

## 5.6 Testing Status

Test files observed:

- `src/test/Doctorregistration.test.js` (Truffle style test)
- `src/App.test.js` (default React test scaffold)

### Observed Test Consistency Issue

`Doctorregistration.test.js` does not match current contract method signatures (for example, input order and lookup key assumptions differ from `DoctorRegistration.sol`). This indicates the test requires updating before it can serve as a reliable validation artifact.

## 5.7 Technical Analysis

### Strengths

- End-to-end demo is runnable with documented scripts
- Modular folder structure and role-segregated components
- Clear integration between IPFS and blockchain references

### Engineering Limitations Observed in Current Code

1. Password values are stored in contract state and validated on-chain using hash comparison. This is not production-grade authentication.
2. Dashboard access is route-parameter based (`/role/:hhNumber`) without strong session guard.
3. Some getters can be called by any account with an HH number.
4. `DoctorFormContract.sol` and `DiagnosticFormContract.sol` are present but not included in migration flow and not wired in active frontend routes.
5. Doctor registration UI captures `hospitalLocation`, but the currently used contract function does not persist that field.
6. Permission mappings exist in both `PatientRegistration` and `DoctorRegistration`; active UI currently uses only `DoctorRegistration` permission path.

## 5.8 Performance and Scalability Notes

- Array-based patient list updates in `revokePermission` involve linear search and shifting, which can become expensive as list size grows.
- CID-only on-chain storage is cost-efficient compared to storing large file blobs on-chain.
- Local Ganache setup is suitable for prototype demonstration but not production throughput assumptions.

---

# CHAPTER 6: PROJECT OUTCOME AND APPLICABILITY

## 6.1 Outcome Summary

The project successfully produced a role-based decentralized EHR prototype that can:

- Register and authenticate three stakeholder roles
- Upload and retrieve medical records through IPFS references
- Enable role-specific dashboards and profile views
- Allow permission actions between patients and doctors
- Run reproducibly in a local development environment

## 6.2 Objective-wise Achievement Matrix

| Objective | Status | Remarks |
|---|---|---|
| Multi-role decentralized EHR prototype | Achieved | Patient, Doctor, Diagnostic workflows implemented |
| Blockchain record reference storage | Achieved | `UploadEhr` stores timestamp + CID |
| Patient-controlled access flow | Partially achieved | Grant and revoke workflow exists; stronger access checks needed |
| Reproducible deployment | Achieved | `ganache`, `deploy`, `dev` scripts available |
| Strong security posture | Partially achieved | Functional demo; production hardening pending |

## 6.3 Applicability

This project is applicable in:

- Academic demonstrations of healthcare blockchain architecture
- Pilot-level prototypes for patient-centric records
- Training environments for Web3-enabled healthcare systems

## 6.4 Practical Relevance in Healthcare Context

- Improves transparency of record-reference updates
- Introduces patient participation in data sharing decisions
- Supports asynchronous report uploads by diagnostics
- Creates a foundation for future interoperability extensions

## 6.5 Compliance and Ethics Note

For real-world deployment, additional controls are required, including formal consent logging, encryption key lifecycle management, legal compliance mapping, and audit reporting.

---

# CHAPTER 7: CONCLUSIONS AND RECOMMENDATION

## 7.1 Conclusion

Secure Electronic Health Records demonstrates a practical decentralized healthcare record prototype by integrating React, Solidity, Web3, Ganache, Truffle, and IPFS/Pinata. The implementation validates the core concept that healthcare record references can be managed immutably with role-oriented user flows and patient-involved permission actions.

The project also highlights that technical feasibility alone is not enough for production readiness. Authentication hardening, privacy-preserving design, and stronger authorization checks must be added before deployment in clinical environments.

## 7.2 Recommendations

1. Replace on-chain password-based login with signed-message challenge authentication.
2. Add access-control modifiers and authorization checks for sensitive read functions.
3. Introduce encrypted file handling and key-exchange strategy before IPFS upload.
4. Align and unify permission logic across contracts to prevent state divergence.
5. Integrate comprehensive automated tests for all contracts and critical UI flows.
6. Add audit event indexing and monitoring dashboards.
7. Expand to interoperability standards such as FHIR in future iterations.

## 7.3 Future Scope

- Hospital admin role and policy dashboards
- Multi-chain or L2 deployment for lower cost
- Role-based analytics and anomaly detection
- E-signature backed consent workflows
- Offline-first and mobile app integration

---

# REFERENCES

1. Nakamoto, S. "Bitcoin: A Peer-to-Peer Electronic Cash System." 2008.
2. Buterin, V. "A Next-Generation Smart Contract and Decentralized Application Platform." Ethereum Whitepaper.
3. Benet, J. "IPFS - Content Addressed, Versioned, P2P File System." arXiv:1407.3561.
4. Ethereum Foundation Documentation. https://ethereum.org/en/developers/docs/
5. Truffle Documentation. https://trufflesuite.com/docs/
6. Ganache Documentation. https://trufflesuite.com/ganache/
7. React Documentation. https://react.dev/
8. Web3.js Documentation. https://web3js.readthedocs.io/
9. Pinata Documentation. https://docs.pinata.cloud/
10. OWASP Top 10 Web Application Security Risks. https://owasp.org/

---

# APPENDICES

## Appendix A: Project Structure (Condensed)

- `scripts/` - Ganache startup and deployment automation
- `src/components/` - Role-based UI and dashboards
- `src/contracts/` - Solidity source contracts
- `src/migrations/` - Truffle migration scripts
- `src/build/contracts/` - ABI and deployment artifacts
- `src/pinata.js` - IPFS helper utilities
- `src/truffle-config.js` - Truffle network/compiler configuration

## Appendix B: Contract Function Catalog

### PatientRegistration

- `registerPatient(...)`
- `isRegisteredPatient(hhNumber)`
- `validatePassword(hhNumber, password)`
- `getPatientDetails(hhNumber)`
- `grantPermission(patientHH, doctorHH, patientName)`
- `isPermissionGranted(patientHH, doctorHH)`
- `getPatientList(doctorHH)`

### DoctorRegistration

- `registerDoctor(...)`
- `isRegisteredDoctor(hhNumber)`
- `getDoctorDetails(hhNumber)`
- `validatePassword(hhNumber, password)`
- `grantPermission(patientHH, doctorHH, patientName)`
- `isPermissionGranted(patientHH, doctorHH)`
- `revokePermission(patientHH, doctorHH)`
- `getPatientList(doctorHH)`

### DiagnosticRegistration

- `registerDiagnostic(...)`
- `isRegisteredDiagnostic(hhNumber)`
- `getDiagnosticDetails(hhNumber)`
- `validatePassword(hhNumber, password)`

### UploadEhr

- `addRecord(hhNumber, timestamp, medicalRecordHash)`
- `getRecords(hhNumber)`

## Appendix C: Environment Variables

Use `.env` with the following keys:

- `REACT_APP_PINATA_API_KEY`
- `REACT_APP_PINATA_SECRET_KEY`
- `REACT_APP_PINATA_GATEWAY`

## Appendix D: Suggested Viva Demonstration Flow

1. Start app using `npm run dev`.
2. Register a patient, doctor, and diagnostic center.
3. Login as patient and upload a sample PDF.
4. Grant access to doctor using HH number.
5. Login as doctor and show patient list and records.
6. Login as diagnostic and upload report linked to patient HH.
7. Show record visibility and final permission revoke action.

## Appendix E: Suggested Figures and Tables Placement

- Figure 1 in Chapter 4 (system architecture)
- Figure 5 in Chapter 5 (upload sequence)
- Table 4 in Chapter 4 (contract mapping)
- Table 6 and Table 7 in Chapter 5 (testing and security)
- Table 9 and Table 10 in Chapter 7 (limitations and roadmap)

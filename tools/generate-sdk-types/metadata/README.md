# `$metadata` snapshot

The files here are what `@mohsinonxrm/dataverse-sdk-actions`, `-functions` and `-messages`, the
metadata package's types and the entity tables of `createEntityReference` (in `-entities-runtime`)
are generated from (#293, #295, #304):

| File                       | What it is                                                                                                   | Written by                |
| -------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------- |
| `dataverse-metadata.xml`   | the Dataverse Web API `$metadata` (CSDL)                                                                     | `snapshot`                |
| `operation-solutions.json` | for each operation in it, the Microsoft-managed solutions it is a component of                               | `snapshot`                |
| `prebuilt-solutions.json`  | every solution in `operation-solutions.json`: the app it belongs to, and whether its operations are prebuilt | a maintainer, by hand     |
| `README.md`                | this file; the [solution table](#which-operations-are-prebuilt) below is rewritten from the two JSON files   | a maintainer, and `regen` |

Regenerating from them needs no org and no credentials:

```bash
pnpm --filter generate-sdk-types regen
```

That rewrites the actions, functions and messages packages' `src/`, the metadata package's
`src/types/` and entities-runtime's `src/generated/` (a purge first, so removed operations and
types disappear), formats them with the repository's prettier config, and updates the operation
lists and `<!-- count:… -->` blocks in the READMEs and `docs/mapping/`, and the solution table
below. CI runs it and fails on any diff, so the committed packages are always what the generator
makes from these files. A generator change therefore comes with the regenerated packages in the
same PR.

## Which operations are prebuilt

The actions, functions and messages packages hold the operations of the **platform** (Dataverse
and the Power Platform solutions every environment has) and of the two core Dynamics 365 apps of a
plain trial: **Sales** and **Customer Service**. Operations of the other apps are left to
[dataverse-gen](../../../docs/getting-started.md#generate-the-rest-with-dataverse-gen), which you
need for your own custom APIs anyway: Contact Center (Omnichannel, unified routing, voice), Field
Service, Project Operations, Universal Resource Scheduling, Customer Insights - Journeys, Customer
Voice, Connected Customer Service (IoT), Power Pages and Process Mining.

The snapshot org has more installed than Sales and Customer Service, so the set is chosen by
**solution membership**, not by what the org happens to have:

- An operation is prebuilt when one of its solutions is prebuilt (`"prebuilt": true` in
  `prebuilt-solutions.json`), or when it has no solution at all. So `WinOpportunity` (in `System`
  and a Sales patch) is in, `CCaaS_GetAgents` (only in `msdyn_OmnichannelCCaaSAPI`) is out, and
  an operation in a Contact Center and a Sales solution is in.
- **No solution** means the operation has no SDK message at all: the 71 query functions of the
  Web API (`LastXDays`, `Between`, `EqualUserId`, …) are built into the OData endpoint. They count
  as platform. So do the supplemental operations the generator adds (`ExportToExcel`, see
  `src/supplemental/`). An operation that has an SDK message in no solution stops `snapshot`
  instead: nothing would say which product it belongs to, and it mustn't be counted as platform
  by accident. (The 2026-11-06 snapshot has none.)
- `System` is the platform's own solution. The classic Sales and Customer Service messages
  (`WinOpportunity`, `CloseIncident`, `QualifyLead`) are in it as well as in their app's
  solutions.
- `regen` fails when an operation has no recorded solutions, when a recorded solution isn't in
  `prebuilt-solutions.json`, or when `prebuilt-solutions.json` names a solution no operation is
  in. A new snapshot can't add an app's operations without someone deciding about them.
- The types under each package's `types/` follow: only the complex, entity and enum types the
  prebuilt operations can reach are generated, so the package root exports only the types (#333)
  and enums those operations use. The metadata package's types and entities-runtime's entity
  tables don't depend on operations and still come from the whole `$metadata`.

### How an operation's solutions are found

`snapshot` reads them read-only through the Web API (`src/solutions.ts`):

1. `sdkmessagerequest.name` is the operation's Web API name, and its `sdkmessagepair` with
   `endpoint` `api/data` leads to the `sdkmessage`. `WinOpportunity` is the request of the `Win`
   message; a custom API or a custom process action has a request named like its message.
2. The message's solutions are the `solutioncomponent` rows that name it: as an SDK message
   (component type 201), through its `customapi` (the CustomAPI component type, read from
   `solutioncomponentdefinition` because it differs between orgs), and through the `workflow` of a
   custom process action (component type 29).
3. Only managed solutions of Microsoft publishers are kept (`MICROSOFT_PUBLISHERS`). The unmanaged
   `Default`, `Active` and `Basic` solutions hold every component and name the org, not the
   product; the org's own solutions and ISV solutions are dropped too. An operation only those
   name is an error: it was made in the org, and its publisher prefix belongs in
   `ORG_SPECIFIC_PREFIXES`.

`solutioncomponent` is used rather than `customapi.solutionid`, because it lists every solution
a component is in (a base solution and its patches), not only the one that installed its current
layer. For the 2026-11-06 snapshot the join was checked against the org: of the 1,798 operations,
416 are found through their SDK message, 776 through their custom API and 561 through a custom
process action (some through more than one), the 71 with no solution have no SDK message, and for
each of the 776 custom APIs the solution `customapi.solutionid` names is among the ones recorded.

`operation-solutions.json` holds operation names and Microsoft solution unique names only: no
ids, no unmanaged or org-made solutions, no org-specific publisher prefixes.
`test/prebuilt.test.ts` checks it.

### Borderline solutions

A solution that isn't plainly platform, Sales or Customer Service is marked `Borderline` in the
table, so the maintainer can review it. The rule for those: **in only when a plain Sales +
Customer Service trial ships it**, out when it belongs to another app or add-on, even if the
snapshot org has it. The assumptions behind the calls:

- "Customer Service" means cases, knowledge, SLAs, entitlements, classic routing rules, the
  Customer Service workspace and its Copilot, not Omnichannel, Contact Center or unified routing
  (licensed separately as Dynamics 365 Contact Center).
- A solution a trial installs is in when it is part of the app (Sales Insights, Copilot in Sales,
  Copilot in Customer Service) and out when it is a separate product or add-on that needs its own
  setup or licence (Connected Customer Service needs Azure IoT; Power Pages, Process Mining and
  Customer Voice are products of their own).
- In the snapshot org nearly every app solution was installed on the same two days, so its
  `installedon` dates can't tell which app installed what; the calls rest on the solutions'
  names, publishers and operations.

The calls:

- **In:** Sales Insights, Copilot in Sales and the sales agents (they come with the Sales trial);
  Copilot in Customer Service and the case and knowledge agents; Copilot Studio, AI Builder, the
  AI test framework, Copilot for Dataverse (`SummarizeRecord`, the `Mcp*` table tools), the
  Dataverse MCP server and the Fabric data tools (installed with the platform solutions); the
  agent guardrail, tuning and onboarding solutions installed with the sales agents; Insights and
  analytics for Dynamics 365, Copilot email assist and the CE foundation insights.
- **Out:** Universal Resource Scheduling (it is Field Service and Project Operations
  scheduling); Connected Customer Service (IoT) and the asset hierarchy it shares with Field
  Service, although Customer Service installs them; Power Pages and Process Mining, although they
  are installed with the platform solutions; Customer Voice; the Channel Integration Framework,
  channel definitions, post-conversation surveys, quality management, the customer intent agent
  and the transformation agent (Contact Center); routing for records (`msdynce_AnyEntityRoutingRule`,
  unified routing).

To change a decision, flip `prebuilt` in `prebuilt-solutions.json` and run `regen`.

<!-- solutions -->

| Solution                                        | App                              | Operations | Prebuilt | Note                                                                                                         |
| ----------------------------------------------- | -------------------------------- | ---------: | -------- | ------------------------------------------------------------------------------------------------------------ |
| _(none: built into the Web API)_                | Platform                         |         71 | yes      |                                                                                                              |
| `AutomaticRecordCreationExtension`              | Customer Service                 |          5 | yes      |                                                                                                              |
| `msdyn_AIPlugins`                               | Customer Service                 |          1 | yes      | Borderline: Copilot in Customer Service                                                                      |
| `msdyn_AppProfileManager`                       | Customer Service                 |          4 | yes      | Customer Service workspace app profiles                                                                      |
| `msdyn_CaseManagementIntelligence`              | Customer Service                 |         30 | yes      | Borderline: Case management agents                                                                           |
| `msdyn_CSAdminCenterApp`                        | Customer Service                 |         12 | yes      | Customer Service admin center                                                                                |
| `msdyn_CSCopilotPlugins`                        | Customer Service                 |          1 | yes      | Borderline: Copilot in Customer Service                                                                      |
| `msdyn_CSIntelligence`                          | Customer Service                 |         40 | yes      | Borderline: Copilot in Customer Service                                                                      |
| `msdyn_CustomerServiceHealth`                   | Customer Service                 |         10 | yes      |                                                                                                              |
| `msdyn_ModernCaseManagement`                    | Customer Service                 |          3 | yes      | Enhanced case experience                                                                                     |
| `msdyn_Swarming`                                | Customer Service                 |          6 | yes      |                                                                                                              |
| `msdynce_ArcMigration`                          | Customer Service                 |          2 | yes      |                                                                                                              |
| `msdynce_KnowledgeManagementFeatures`           | Customer Service                 |         12 | yes      |                                                                                                              |
| `msdynce_KnowledgeManagementHarvestingSolution` | Customer Service                 |          7 | yes      | Borderline: Knowledge harvesting agent                                                                       |
| `msdynce_KnowledgeManagementOnlineFeatures`     | Customer Service                 |          5 | yes      |                                                                                                              |
| `msdynce_KnowledgeManagementPatch`              | Customer Service                 |          1 | yes      |                                                                                                              |
| `msdynce_RoutingRule`                           | Customer Service                 |          4 | yes      | Classic routing rule sets (not unified routing)                                                              |
| `msdynce_Service`                               | Customer Service                 |         29 | yes      |                                                                                                              |
| `msdynce_ServiceLevelAgreementExtension`        | Customer Service                 |          7 | yes      |                                                                                                              |
| `msdynce_ServiceLevelAgreementMigration`        | Customer Service                 |          2 | yes      |                                                                                                              |
| `msdynce_ServiceManagementControlsExtension`    | Customer Service                 |          3 | yes      |                                                                                                              |
| `msdynce_ServicePatch201911`                    | Customer Service                 |          9 | yes      |                                                                                                              |
| `msdynce_ServiceUpgradeScripts`                 | Customer Service                 |          1 | yes      |                                                                                                              |
| `msdyn_cef_core`                                | Dynamics 365 (shared)            |          7 | yes      | Borderline: CE foundation insights, installed with the Sales agents                                          |
| `msdyn_Collaboration`                           | Dynamics 365 (shared)            |         11 | yes      | Embedded Teams collaboration (Sales and Customer Service)                                                    |
| `msdyn_DataInsightsAndAnalytics`                | Dynamics 365 (shared)            |          6 | yes      | Borderline: Insights and analytics for Dynamics 365                                                          |
| `msdyn_EmailIntelligence`                       | Dynamics 365 (shared)            |         18 | yes      | Borderline: Copilot email assist (Sales and Customer Service)                                                |
| `msdyn_GovernanceAgentIntelligence`             | Dynamics 365 (shared)            |          6 | yes      | Borderline: Agent guardrails, installed with the Sales agents                                                |
| `msdyn_IntelligentAgentEnhancer`                | Dynamics 365 (shared)            |          5 | yes      | Borderline: Agent tuning, installed with the Sales agents                                                    |
| `msdyn_TrustCenterAdoptCore`                    | Dynamics 365 (shared)            |          2 | yes      | Borderline: Feature rollout scheduling                                                                       |
| `msdynce_ActivitiesPatch`                       | Dynamics 365 (shared)            |          4 | yes      |                                                                                                              |
| `msdynce_CRMExtensions`                         | Dynamics 365 (shared)            |          1 | yes      |                                                                                                              |
| `msdynce_EmailTemplateConfigSolution`           | Dynamics 365 (shared)            |          2 | yes      |                                                                                                              |
| `msdynce_OfficeProductivity`                    | Dynamics 365 (shared)            |          7 | yes      | SharePoint and Teams integration                                                                             |
| `msdynce_Scheduling`                            | Dynamics 365 (shared)            |          5 | yes      | Service scheduling (classic)                                                                                 |
| `msdynce_SchedulingUpgrade`                     | Dynamics 365 (shared)            |          1 | yes      |                                                                                                              |
| `SolutionUpgradeInfrastructure`                 | Dynamics 365 (shared)            |          1 | yes      |                                                                                                              |
| `AccessTeam`                                    | Platform                         |          4 | yes      |                                                                                                              |
| `ApiMessagesExtension`                          | Platform                         |          7 | yes      |                                                                                                              |
| `AppModule`                                     | Platform                         |          2 | yes      |                                                                                                              |
| `AppModuleMetadataSolution`                     | Platform                         |          1 | yes      |                                                                                                              |
| `AuthorizationCore`                             | Platform                         |         16 | yes      |                                                                                                              |
| `BulkDeleteExtensionSolution`                   | Platform                         |          1 | yes      |                                                                                                              |
| `CanvasAppMetadataExtensionSolution`            | Platform                         |          2 | yes      |                                                                                                              |
| `DataEngineCascading`                           | Platform                         |          5 | yes      |                                                                                                              |
| `DataEngineCascadingXRM`                        | Platform                         |          1 | yes      |                                                                                                              |
| `datalakeworkspaces`                            | Platform                         |          1 | yes      |                                                                                                              |
| `EnvironmentVariables`                          | Platform                         |          8 | yes      |                                                                                                              |
| `EnvironmentVariablesV2`                        | Platform                         |          8 | yes      |                                                                                                              |
| `ExportSolutionUpload`                          | Platform                         |          2 | yes      |                                                                                                              |
| `FileStoreServiceExtension`                     | Platform                         |          3 | yes      |                                                                                                              |
| `LicenseEnforcement`                            | Platform                         |          1 | yes      |                                                                                                              |
| `MCPPlatform_Extensions`                        | Platform                         |          4 | yes      | Borderline: Dataverse MCP server and Work IQ tasks; installed with the platform solutions                    |
| `MetadataExtension`                             | Platform                         |          8 | yes      |                                                                                                              |
| `MicrosoftFlowExtensionsCore`                   | Platform                         |         39 | yes      | Power Automate core components                                                                               |
| `MobileOfflineMembership`                       | Platform                         |          2 | yes      |                                                                                                              |
| `msdyn_AISolution`                              | Platform                         |         33 | yes      | Borderline: AI Builder; installed with the platform solutions                                                |
| `msdyn_AISolutionFullAdditions`                 | Platform                         |          1 | yes      | Borderline: AI Builder; installed with the platform solutions                                                |
| `msdyn_AITestFrameworkSolution`                 | Platform                         |          6 | yes      | Borderline: AI test framework; installed with the platform solutions                                         |
| `msdyn_CDSReportSchemaChanges`                  | Platform                         |          2 | yes      |                                                                                                              |
| `msdyn_ComponentVersioning`                     | Platform                         |          4 | yes      |                                                                                                              |
| `msdyn_ConnectionInstances`                     | Platform                         |          2 | yes      |                                                                                                              |
| `msdyn_Copresence`                              | Platform                         |          1 | yes      |                                                                                                              |
| `msdyn_FeatureControlSettingPlugin`             | Platform                         |          7 | yes      |                                                                                                              |
| `msdyn_InsightsAppPlatform`                     | Platform                         |          5 | yes      | Borderline: Fabric and unstructured-data AI; installed with the platform solutions                           |
| `msdyn_MobileAppsSolution`                      | Platform                         |          5 | yes      |                                                                                                              |
| `msdyn_PowerAIExtensionsBase`                   | Platform                         |          7 | yes      | Borderline: Copilot for Dataverse (SummarizeRecord, Mcp* table tools); installed with the platform solutions |
| `msdyn_PowerAppsChecker`                        | Platform                         |         22 | yes      | Solution checker                                                                                             |
| `msdyn_RelevanceSearch`                         | Platform                         |          7 | yes      | Dataverse search                                                                                             |
| `msdyn_SmartDataImportBase`                     | Platform                         |          3 | yes      |                                                                                                              |
| `msdyn_SourceControlIntegration`                | Platform                         |         18 | yes      | Dataverse Git integration                                                                                    |
| `msdyn_SynapseLink`                             | Platform                         |          1 | yes      |                                                                                                              |
| `msdyn_UCICalendar`                             | Platform                         |          3 | yes      |                                                                                                              |
| `msdyn_userrating`                              | Platform                         |          1 | yes      |                                                                                                              |
| `msdynce_SolutionsFrameworkExtensions`          | Platform                         |         23 | yes      |                                                                                                              |
| `msdynce_SolutionsFrameworkMetadata`            | Platform                         |          5 | yes      |                                                                                                              |
| `msft_ActivitiesInfra_Extensions`               | Platform                         |          3 | yes      |                                                                                                              |
| `msft_authenticationextension`                  | Platform                         |          2 | yes      |                                                                                                              |
| `msft_BackgroundJobs`                           | Platform                         |          1 | yes      |                                                                                                              |
| `msft_ColumnLevelSecurity`                      | Platform                         |          1 | yes      |                                                                                                              |
| `msft_ConnectorProvider`                        | Platform                         |          2 | yes      | Virtual connector provider                                                                                   |
| `msft_ContactAndAccount_Extensions`             | Platform                         |          2 | yes      |                                                                                                              |
| `msft_DataArchivalBaseComponents`               | Platform                         |          5 | yes      |                                                                                                              |
| `msft_DataEngineIndexMgmt`                      | Platform                         |          3 | yes      |                                                                                                              |
| `msft_DelegatedAuthorization`                   | Platform                         |          2 | yes      |                                                                                                              |
| `msft_DVInfoProtectionComponents`               | Platform                         |          1 | yes      |                                                                                                              |
| `msft_PowerAppsCards`                           | Platform                         |          2 | yes      |                                                                                                              |
| `msft_PowerfxRuleSolutionApi`                   | Platform                         |         12 | yes      |                                                                                                              |
| `msft_powerplatformmanagedidentityextension`    | Platform                         |          5 | yes      |                                                                                                              |
| `msft_PrivilegeChecker`                         | Platform                         |          1 | yes      |                                                                                                              |
| `msft_RealTimeCollaboration`                    | Platform                         |          2 | yes      |                                                                                                              |
| `msft_RecycleBinBaseComponents`                 | Platform                         |          3 | yes      |                                                                                                              |
| `msft_RuntimeExtensions`                        | Platform                         |          3 | yes      |                                                                                                              |
| `msft_RuntimeIntegration`                       | Platform                         |          3 | yes      |                                                                                                              |
| `msft_StorageAdvisorComponents`                 | Platform                         |          3 | yes      |                                                                                                              |
| `NonRelationalCustomActions`                    | Platform                         |          2 | yes      |                                                                                                              |
| `PowerPlatformConnectionReferences`             | Platform                         |          1 | yes      |                                                                                                              |
| `PowerVirtualAgents`                            | Platform                         |         15 | yes      | Borderline: Copilot Studio; installed with the platform solutions                                            |
| `SolutionComponentConfiguration`                | Platform                         |          5 | yes      |                                                                                                              |
| `System`                                        | Platform                         |        242 | yes      |                                                                                                              |
| `AutoDataCapture`                               | Sales                            |         18 | yes      | Borderline: Sales Insights                                                                                   |
| `msdyn_acceleratedsales`                        | Sales                            |          6 | yes      | Borderline: Sales accelerator                                                                                |
| `msdyn_AutonomousSQA`                           | Sales                            |          8 | yes      | Borderline: Sales agent (qualification)                                                                      |
| `msdyn_connectiongraph`                         | Sales                            |          4 | yes      | Borderline: Sales Insights (who knows whom)                                                                  |
| `msdyn_DataQualityAgent`                        | Sales                            |         11 | yes      | Borderline: Sales agent (data quality)                                                                       |
| `msdyn_DealClosingAgent`                        | Sales                            |          2 | yes      | Borderline: Sales agent (close)                                                                              |
| `msdyn_entityintelligence`                      | Sales                            |          5 | yes      | Borderline: Sales Insights (field predictions)                                                               |
| `msdyn_Forecasting`                             | Sales                            |          9 | yes      |                                                                                                              |
| `msdyn_leadhygiene`                             | Sales                            |          6 | yes      |                                                                                                              |
| `msdyn_LinkedInExtensions`                      | Sales                            |          3 | yes      |                                                                                                              |
| `msdyn_NextBestActionAgent`                     | Sales                            |          6 | yes      | Borderline: Sales agent (recommended actions)                                                                |
| `msdyn_OnboardingAgent`                         | Sales                            |          8 | yes      | Borderline: Agent onboarding, added by an update after the Sales agents                                      |
| `msdyn_PredictiveScoringCommon`                 | Sales                            |         11 | yes      | Borderline: Sales Insights                                                                                   |
| `msdyn_SalesAgentsCommon`                       | Sales                            |         55 | yes      | Borderline: Sales agents                                                                                     |
| `msdyn_SalesConfigurationAgent`                 | Sales                            |          7 | yes      | Borderline: Sales agents                                                                                     |
| `msdyn_SalesCopilot`                            | Sales                            |         50 | yes      | Borderline: Copilot in Sales                                                                                 |
| `msdyn_SalesLeadResearch`                       | Sales                            |         13 | yes      | Borderline: Sales agent (lead research)                                                                      |
| `msdyn_SalesOpportunityResearch`                | Sales                            |         24 | yes      | Borderline: Sales agent (opportunity research)                                                               |
| `msdyn_SalesProfilerAgent`                      | Sales                            |          7 | yes      | Borderline: Sales agents                                                                                     |
| `msdyn_SalesRouting`                            | Sales                            |         10 | yes      | Assignment rules                                                                                             |
| `msdyn_SalesSequences`                          | Sales                            |          5 | yes      |                                                                                                              |
| `msdyn_segment`                                 | Sales                            |          3 | yes      |                                                                                                              |
| `msdyn_Sequence`                                | Sales                            |         21 | yes      |                                                                                                              |
| `msdyn_TeamsConfigForSales`                     | Sales                            |          2 | yes      |                                                                                                              |
| `msdynce_LeadManagement`                        | Sales                            |          7 | yes      |                                                                                                              |
| `msdynce_LeadManagementPatch`                   | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_Marketing`                             | Sales                            |         22 | yes      | Campaigns and marketing lists, part of Sales (not Customer Insights - Journeys)                              |
| `msdynce_MarketingEntitiesUpdateMetadata`       | Sales                            |          2 | yes      |                                                                                                              |
| `msdynce_MarketingPatch`                        | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_MarketingPatch201905`                  | Sales                            |          6 | yes      |                                                                                                              |
| `msdynce_MarketingSales`                        | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_MarketingSalesPatch`                   | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_MarketingUpdateListMetadata`           | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_Notesanalysis`                         | Sales                            |          2 | yes      | Borderline: Sales Insights                                                                                   |
| `msdynce_ProductManagement`                     | Sales                            |          6 | yes      |                                                                                                              |
| `msdynce_RelationshipAssistantAddOn`            | Sales                            |          2 | yes      | Borderline: Sales Insights                                                                                   |
| `msdynce_Sales`                                 | Sales                            |         31 | yes      |                                                                                                              |
| `msdynce_SalesHealth`                           | Sales                            |          7 | yes      |                                                                                                              |
| `msdynce_SalesPatch`                            | Sales                            |          1 | yes      |                                                                                                              |
| `msdynce_SalesPatch201904`                      | Sales                            |          3 | yes      |                                                                                                              |
| `msdynce_SalesPatch202001`                      | Sales                            |          4 | yes      |                                                                                                              |
| `msdynce_Talkingpoints`                         | Sales                            |          2 | yes      | Borderline: Sales Insights                                                                                   |
| `PredictiveLeadScoring`                         | Sales                            |          8 | yes      | Borderline: Sales Insights                                                                                   |
| `PredictiveOpportunityScoring`                  | Sales                            |          8 | yes      | Borderline: Sales Insights                                                                                   |
| `RelationshipAnalytics`                         | Sales                            |          6 | yes      | Borderline: Sales Insights                                                                                   |
| `Relationshipassistant`                         | Sales                            |         14 | yes      | Borderline: Sales Insights                                                                                   |
| `SICommon`                                      | Sales                            |         52 | yes      | Borderline: Sales Insights                                                                                   |
| `IoTConnector`                                  | Connected Customer Service (IoT) |         22 | no       | Borderline: Installed with Customer Service, but an IoT add-on                                               |
| `IoTProviders`                                  | Connected Customer Service (IoT) |          6 | no       | Borderline: Installed with Customer Service, but an IoT add-on                                               |
| `msdyn_AssetCommon`                             | Connected Customer Service (IoT) |          1 | no       | Borderline: Asset hierarchy, shared with Field Service                                                       |
| `msdyn_ConnectedCustomerService`                | Connected Customer Service (IoT) |          1 | no       | Borderline: Installed with Customer Service, but an IoT add-on                                               |
| `DecisionEngine`                                | Contact Center                   |          1 | no       | Unified routing                                                                                              |
| `msdyn_AgentCoach`                              | Contact Center                   |          3 | no       |                                                                                                              |
| `msdyn_AgentGroupManager`                       | Contact Center                   |          1 | no       |                                                                                                              |
| `msdyn_BulkManagement`                          | Contact Center                   |          1 | no       | Unified routing                                                                                              |
| `msdyn_CIFrameworkPatch`                        | Contact Center                   |          1 | no       | Borderline: Channel Integration Framework                                                                    |
| `msdyn_ContactCenterClientSolution`             | Contact Center                   |          1 | no       |                                                                                                              |
| `msdyn_ConversationOrchestration`               | Contact Center                   |          4 | no       |                                                                                                              |
| `msdyn_CSSurveyBase`                            | Contact Center                   |          4 | no       | Borderline: Post-conversation surveys                                                                        |
| `msdyn_D365ChannelDefinitions`                  | Contact Center                   |          5 | no       | Borderline: Messaging channel definitions (Contact Center and Journeys)                                      |
| `msdyn_IntentEngineCore`                        | Contact Center                   |          4 | no       | Borderline: Customer intent agent                                                                            |
| `msdyn_OCIER`                                   | Contact Center                   |          5 | no       |                                                                                                              |
| `msdyn_OCIntelligence`                          | Contact Center                   |          9 | no       |                                                                                                              |
| `msdyn_OmnichannelAuthenticationAntifraudAgent` | Contact Center                   |         19 | no       |                                                                                                              |
| `msdyn_OmnichannelBotEnablerPatch`              | Contact Center                   |          4 | no       |                                                                                                              |
| `msdyn_OmnichannelCCaaSAnalytics`               | Contact Center                   |          1 | no       |                                                                                                              |
| `msdyn_OmnichannelCCaaSAPI`                     | Contact Center                   |         64 | no       |                                                                                                              |
| `msdyn_OmnichannelCCaaSPESApi`                  | Contact Center                   |         13 | no       |                                                                                                              |
| `msdyn_OmnichannelCCaaSVoiceAPI`                | Contact Center                   |         20 | no       |                                                                                                              |
| `msdyn_OmnichannelEngagementHubPatch`           | Contact Center                   |          1 | no       |                                                                                                              |
| `msdyn_OmnichannelFacebookPatch`                | Contact Center                   |          3 | no       |                                                                                                              |
| `msdyn_OmnichannelRealtimeMonitoring`           | Contact Center                   |          4 | no       |                                                                                                              |
| `msdyn_OmnichannelSharedBase`                   | Contact Center                   |          2 | no       |                                                                                                              |
| `msdyn_OmnichannelSMSPatch`                     | Contact Center                   |          4 | no       |                                                                                                              |
| `msdyn_OmnichannelSocialChannelsPatch`          | Contact Center                   |         21 | no       |                                                                                                              |
| `msdyn_OmnichannelTeamsPatch`                   | Contact Center                   |          3 | no       |                                                                                                              |
| `msdyn_QMS`                                     | Contact Center                   |         12 | no       | Borderline: Quality management (quality evaluation agent)                                                    |
| `msdyn_QMSConversation`                         | Contact Center                   |          1 | no       | Borderline: Quality management                                                                               |
| `msdyn_QMSIntelligence`                         | Contact Center                   |          7 | no       | Borderline: Quality management                                                                               |
| `msdyn_screenrecording_manager`                 | Contact Center                   |          2 | no       |                                                                                                              |
| `msdyn_SimulationAgent`                         | Contact Center                   |         13 | no       |                                                                                                              |
| `msdyn_TransformationAgentUX`                   | Contact Center                   |          7 | no       | Borderline: Transformation agent, installed with Contact Center                                              |
| `msdyn_TransformContactCenter`                  | Contact Center                   |          1 | no       |                                                                                                              |
| `msdyn_UnifiedRoutingFirstPartyIntegration`     | Contact Center                   |          4 | no       | Unified routing                                                                                              |
| `msdyn_UnifiedRoutingForEntity`                 | Contact Center                   |          2 | no       | Unified routing                                                                                              |
| `msdyn_UnifiedRoutingRuleTracker`               | Contact Center                   |          3 | no       | Unified routing                                                                                              |
| `msdynce_AnyEntityRoutingRule`                  | Contact Center                   |          2 | no       | Borderline: Unified routing for records                                                                      |
| `msdynce_EntityRouting`                         | Contact Center                   |          8 | no       | Unified routing core                                                                                         |
| `OCBaseURBase`                                  | Contact Center                   |         10 | no       | Unified routing                                                                                              |
| `OCISBR`                                        | Contact Center                   |          8 | no       | Unified routing                                                                                              |
| `OmnichannelBase`                               | Contact Center                   |         31 | no       |                                                                                                              |
| `OmnichannelBotEnabler`                         | Contact Center                   |          3 | no       |                                                                                                              |
| `OmnichannelChat`                               | Contact Center                   |          2 | no       |                                                                                                              |
| `OmnichannelCommunicationBase`                  | Contact Center                   |         14 | no       |                                                                                                              |
| `OmnichannelOutbound`                           | Contact Center                   |          1 | no       |                                                                                                              |
| `OmnichannelSMS`                                | Contact Center                   |          1 | no       |                                                                                                              |
| `OmnichannelSocialChannels`                     | Contact Center                   |          4 | no       |                                                                                                              |
| `OmnichannelTelephony`                          | Contact Center                   |          9 | no       |                                                                                                              |
| `DynamicsMKT_AnalyticsUx`                       | Customer Insights - Journeys     |          3 | no       |                                                                                                              |
| `DynamicsMKT_BaseSolution`                      | Customer Insights - Journeys     |          1 | no       |                                                                                                              |
| `DynamicsMKT_Consent`                           | Customer Insights - Journeys     |         28 | no       |                                                                                                              |
| `DynamicsMKT_ConsentProvider`                   | Customer Insights - Journeys     |          1 | no       |                                                                                                              |
| `DynamicsMKT_CxpAnalytics`                      | Customer Insights - Journeys     |          2 | no       |                                                                                                              |
| `DynamicsMKT_FeatureConfiguration`              | Customer Insights - Journeys     |          2 | no       |                                                                                                              |
| `DynamicsMKT_MetadataStore`                     | Customer Insights - Journeys     |          5 | no       |                                                                                                              |
| `DynamicsMKT_PersonalizationUI`                 | Customer Insights - Journeys     |          9 | no       |                                                                                                              |
| `DynamicsMKT_SharedChannelExtensions`           | Customer Insights - Journeys     |          1 | no       |                                                                                                              |
| `MicrosoftDynamics_DigitalAssets`               | Customer Insights - Journeys     |          5 | no       |                                                                                                              |
| `MicrosoftFormsPro`                             | Customer Voice                   |          1 | no       | Borderline: Surveys                                                                                          |
| `PowerPages_RuntimeCore`                        | Power Pages                      |          6 | no       | Borderline: Installed with the platform solutions, but not Dataverse itself                                  |
| `PowerPages_RuntimeExtensions`                  | Power Pages                      |          1 | no       | Borderline: Installed with the platform solutions, but not Dataverse itself                                  |
| `ProcessMining`                                 | Process Mining                   |          6 | no       | Borderline: Installed with the platform solutions, but a separate product                                    |
| `MicrosoftDynamicsScheduling`                   | Universal Resource Scheduling    |         50 | no       | Borderline: Shared by Field Service and Project Operations                                                   |
| `MicrosoftDynamicsScheduling3_CumulativePatch`  | Universal Resource Scheduling    |         31 | no       | Borderline: Shared by Field Service and Project Operations                                                   |

<!-- /solutions -->

## Where it comes from

- **Taken:** 2026-11-06.
- **Dataverse:** 9.2.26094.166 (online, Web API v9.2).
- **Dynamics 365 apps:** Sales (with Sales Insights and the sales agents), Customer Service (with
  Omnichannel / Contact Center, unified routing, SLAs and knowledge management), Customer
  Insights - Journeys (marketing), Universal Resource Scheduling, Power Pages and Process Mining.
- **Not installed:** Field Service, Project Operations.

The packages hold only the platform, Sales and Customer Service operations of this org (see
above). The 1.0 packages came from an org that also had Field Service, and held every operation it
had; see `docs/migration-2.0.md`.

## How the XML differs from the raw `$metadata`

Dataverse returns `$metadata` on one line, in an order that changes between fetches. The
generator saves it rewritten (`src/snapshot.ts`), so a refresh shows only real changes:

- one element per line, indented;
- the children of `Schema`, `EntityContainer`, entity types, complex types and entity sets sorted
  by element and `Name`, and enum members by value. Operation parameters, entity keys and
  annotations keep their order;
- elements that mention a table made in the dev org itself (the publisher prefixes in
  `ORG_SPECIFIC_PREFIXES`) left out: such a table isn't part of a product.

Attribute values and text are unchanged. The file holds no hostname, tenant, org or user ids.
`test/snapshot.test.ts` checks that it's in this form and names no org.

## Refreshing it

Only a maintainer does this, by hand. CI never calls an org.

1. Use an org with the apps above (or say in the PR which apps changed). The generator signs in
   with client credentials: set `DATAVERSE_URL` and `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`,
   `AZURE_CLIENT_SECRET` (or `DATAVERSE_TENANT_ID`, `DATAVERSE_CLIENT_ID`,
   `DATAVERSE_CLIENT_SECRET`), in the environment or in `tools/generate-sdk-types/.env`.
2. Fetch and save the snapshot and the operations' solutions (read-only), then regenerate:

   ```bash
   pnpm --filter generate-sdk-types snapshot
   pnpm --filter generate-sdk-types regen
   ```

3. Check the new files for anything that names the org: a new table with the org's own
   publisher prefix belongs in `ORG_SPECIFIC_PREFIXES` (then run both commands again).
4. If `regen` names a solution to classify, add it to `prebuilt-solutions.json` with its app and
   decision (mark a judgment call `Borderline` in its `note`), and remove the ones it says no
   operation is in. Then run `regen` again.
5. Update "Where it comes from", add a changeset, and list the operations added and removed in
   the PR. A removed operation is a breaking change for anyone who uses it.

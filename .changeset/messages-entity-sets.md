---
"@mohsinonxrm/dataverse-sdk-messages": patch
---

Bound messages use the entity set from the CSDL (#76). `CalculateActualValueOpportunityRequest`, `DistributeCampaignActivityRequest`, `RemoveItemCampaignActivityRequest` and `GetRunMapRequest` posted to `/opportunitys(…)`, `/campaignactivitys(…)` and `/businessprocesss(…)`, which don't exist. They now post to `/opportunities(…)`, `/campaignactivities(…)` and `/businessprocesses(…)`, as the actions package does.

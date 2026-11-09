/** The Global Discovery Service of the demo: three environments, one of them disabled. */
import { DEMO_ENVIRONMENT_URL } from "../config";
import { json, odataError, type FakeRequest, type FakeResponse } from "./fakeDataverse";
import { matches, parseFilter } from "./odataQuery";
import { ORGANIZATION_ID, type Row } from "./store";

function instance(
  id: string,
  uniqueName: string,
  friendlyName: string,
  url: string,
  region: string,
  state: number,
  purpose: string
): Row {
  const host = new URL(url).host;
  return {
    Id: id,
    UniqueName: uniqueName,
    UrlName: host.split(".")[0],
    FriendlyName: friendlyName,
    State: state,
    Version: "9.2.26101.161",
    Url: url,
    ApiUrl: url.replace(".crm.", ".api.crm."),
    LastUpdated: "2026-10-01T08:30:00Z",
    EnvironmentId: `Default-${id.slice(0, 8)}`,
    TenantId: "00000000-0000-0000-0000-000000000000",
    Region: region,
    Purpose: purpose,
    IsUserSysAdmin: state === 0,
    OrganizationType: 0,
    DatacenterId: null,
    DatacenterName: null,
    SchemaType: "Full",
    StatusMessage: state === 0 ? 6 : 4,
    TrialExpirationDate: null,
    FinOpsUrl: null,
  };
}

const INSTANCES: Row[] = [
  instance(
    ORGANIZATION_ID,
    "unq_contoso",
    "Contoso (demo)",
    DEMO_ENVIRONMENT_URL,
    "NA",
    0,
    "Production"
  ),
  instance(
    "2f3e4d5c-6b7a-4980-8a1b-2c3d4e5f6a7b",
    "unq_contosodev",
    "Contoso Dev",
    "https://contoso-dev.crm.dynamics.com",
    "NA",
    0,
    "Development"
  ),
  instance(
    "3a4b5c6d-7e8f-4091-9b2c-3d4e5f6a7b8c",
    "unq_fabrikamtest",
    "Fabrikam Test",
    "https://fabrikam-test.crm4.dynamics.com",
    "EUR",
    1,
    "Testing"
  ),
];

export function discoveryResponse(req: FakeRequest): FakeResponse {
  const path = decodeURIComponent(req.url.pathname);
  const m =
    /\/api\/discovery\/v2\.0\/Instances(?:\((?:UniqueName='([^']+)'|([0-9a-f-]{36}))\))?$/i.exec(
      path
    );
  if (!m || req.method !== "GET")
    return odataError(404, "0x80060888", `Resource not found: ${path}`);
  const [, uniqueName, id] = m;
  if (uniqueName || id) {
    const found = INSTANCES.find((i) => i.UniqueName === uniqueName || i.Id === id);
    return found ? json(200, { value: [found] }) : json(200, { value: [] });
  }
  const filter = req.url.searchParams.get("$filter");
  const expr = filter ? parseFilter(filter) : undefined;
  return json(200, {
    value: expr ? INSTANCES.filter((i) => matches(i, expr, (f) => f in i)) : INSTANCES,
  });
}

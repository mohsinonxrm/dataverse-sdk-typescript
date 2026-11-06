/**
 * Query scenarios. Each `#region` is shown on the page as the code that runs.
 */
import {
  buildPagedFetchXml,
  odata,
  parsePagingCookie,
  type PageResponse,
} from "@mohsinonxrm/dataverse-sdk-core";
import type { Sdk } from "../sdk/createSdk";
import type { Account } from "./types";

export interface QueryInput {
  nameContains: string;
  minRevenue: number;
  orderBy: string;
  top: number;
}

// #region select-filter-expand
export async function queryAccounts({ client }: Sdk, input: QueryInput, signal: AbortSignal) {
  // odata.* escapes the values, so user input can't change the expression.
  const filter = odata.and(
    odata.eq("statecode", 0),
    odata.contains("name", input.nameContains),
    odata.ge("revenue", input.minRevenue)
  );

  const page = await client
    .api("accounts")
    .select("name", "address1_city", "revenue")
    .filter(filter)
    // expand() takes the options of the expanded table: $select, $filter, $orderby, $top.
    .expand("primarycontactid", { select: ["fullname", "emailaddress1"] })
    .orderBy(input.orderBy)
    .top(input.top)
    .count()
    // Formatted values: revenue as currency, as Dataverse formats it for the user.
    .prefer((p) => p.formattedValues())
    .get<PageResponse<Account> & { "@odata.count"?: number }>({ signal });

  return { total: page["@odata.count"], accounts: page.value };
}
// #endregion

// #region expand-collection
export async function accountsWithContacts({ client }: Sdk, signal: AbortSignal) {
  const page = await client
    .api("accounts")
    .select("name")
    .filter(odata.eq("statecode", 0))
    .expand("contact_customer_accounts", {
      select: ["fullname", "jobtitle"],
      orderBy: "fullname asc",
      top: 3,
    })
    .orderBy("name asc")
    .top(5)
    .get<PageResponse<Account>>({ signal });

  return page.value.map((a) => ({
    name: a.name,
    contacts: (a.contact_customer_accounts ?? []).map(
      (c) => `${c.fullname ?? ""} (${c.jobtitle ?? "-"})`
    ),
  }));
}
// #endregion

// #region paging
export async function pageThroughAccounts(
  { client }: Sdk,
  input: { pageSize: number; maxItems: number },
  signal: AbortSignal
) {
  const query = client
    .api("accounts")
    .select("name", "address1_city")
    .orderBy("name asc")
    // Ask Dataverse for small pages; iterate() follows @odata.nextLink page by page.
    .prefer((p) => p.maxPageSize(input.pageSize).formattedValues());

  const accounts: Account[] = [];
  for await (const account of query.iterate<Account>({ signal })) {
    accounts.push(account);
    if (accounts.length >= input.maxItems) break; // Stops before asking for the next page.
  }

  // getAll() collects every page into one array, with limits.
  const firstTwoPages = await query.getAll<Account>({ maxPages: 2, signal });

  return { iterated: accounts, firstTwoPagesCount: firstTwoPages.length };
}
// #endregion

// #region fetchxml
export async function runFetchXml(
  { client }: Sdk,
  input: { fetchXml: string },
  signal: AbortSignal
) {
  const first = await client.fetchXml<Account>("accounts", input.fetchXml, { signal });

  // The paging cookie of page 1 asks for page 2.
  const cookie = parsePagingCookie(first.pagingCookie);
  const second =
    first.moreRecords && cookie
      ? await client.fetchXml<Account>(
          "accounts",
          buildPagedFetchXml(input.fetchXml, {
            page: cookie.pageNumber,
            pagingCookie: cookie.pagingCookie,
          }),
          { signal }
        )
      : undefined;

  return {
    totalRecordCount: first.totalRecordCount,
    moreRecords: first.moreRecords,
    page1: first.value,
    page2: second?.value ?? [],
  };
}
// #endregion

// #region list-views
export async function listViews({ client }: Sdk, signal: AbortSignal) {
  const views = await client
    .api("savedqueries")
    .select("savedqueryid", "name")
    .filter(odata.and(odata.eq("returnedtypecode", "account"), odata.eq("querytype", 0)))
    .orderBy("name asc")
    .get<PageResponse<{ savedqueryid: string; name: string }>>({ signal });
  return views.value;
}
// #endregion

// #region saved-query
export async function runView({ client }: Sdk, input: { viewId: string }, signal: AbortSignal) {
  // GET accounts?savedQuery=<id>: Dataverse runs the view's FetchXML.
  const page = await client.savedQuery<Account>("accounts", input.viewId, { signal });
  return page.value;
}
// #endregion

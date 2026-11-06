import { useState } from "react";
import {
  Body1,
  Dropdown,
  Field,
  Input,
  Option,
  SpinButton,
  Textarea,
} from "@fluentui/react-components";
import { RecordsGrid } from "../components/RecordsGrid";
import { Scenario } from "../components/Scenario";
import { ScenarioPage } from "../components/ScenarioPage";
import { spinValue } from "../lib/fields";
import { snippet } from "../lib/snippet";
import * as queries from "../scenarios/queries";
import source from "../scenarios/queries.ts?raw";
import type { Account } from "../scenarios/types";

const ORDER_BY = ["name asc", "revenue desc", "address1_city asc"];

const DEFAULT_FETCHXML = `<fetch count="5" returntotalrecordcount="true">
  <entity name="account">
    <attribute name="name" />
    <attribute name="address1_city" />
    <attribute name="revenue" />
    <order attribute="name" />
    <filter>
      <condition attribute="statecode" operator="eq" value="0" />
    </filter>
  </entity>
</fetch>`;

const accountColumns = [
  { key: "name", label: "Name" },
  { key: "address1_city", label: "City" },
  { key: "revenue", label: "Revenue" },
];

export default function QueriesPage() {
  const [nameContains, setNameContains] = useState("a");
  const [minRevenue, setMinRevenue] = useState(1_000_000);
  const [orderBy, setOrderBy] = useState(ORDER_BY[0] ?? "name asc");
  const [top, setTop] = useState(10);
  const [pageSize, setPageSize] = useState(5);
  const [maxItems, setMaxItems] = useState(12);
  const [fetchXml, setFetchXml] = useState(DEFAULT_FETCHXML);
  const [views, setViews] = useState<Array<{ savedqueryid: string; name: string }>>([]);
  const [viewId, setViewId] = useState("");

  return (
    <ScenarioPage
      title="Queries"
      description="Reading records with the request builder: $select, $filter, $expand with options, $orderby, $top and $count; paging with iterate() and getAll(); FetchXML with paging cookies; and saved views."
    >
      <Scenario
        title="Select, filter and expand"
        description="One request with the query options most reads need. The filter is built with the odata helpers, which escape the values."
        code={snippet(source, "select-filter-expand")}
        run={(sdk, signal) =>
          queries.queryAccounts(sdk, { nameContains, minRevenue, orderBy, top }, signal)
        }
        renderResult={(r) => (
          <>
            <Body1>{r.total ?? r.accounts.length} matching accounts in total.</Body1>
            <RecordsGrid<Account>
              label="Accounts"
              rows={r.accounts}
              getRowId={(a) => a.accountid}
              columns={[
                ...accountColumns,
                {
                  key: "primarycontactid",
                  label: "Primary contact",
                  render: (a) => a.primarycontactid?.fullname ?? "—",
                },
              ]}
            />
          </>
        )}
      >
        <Field label="Name contains">
          <Input value={nameContains} onChange={(_, d) => setNameContains(d.value)} />
        </Field>
        <Field label="Revenue at least">
          <SpinButton
            value={minRevenue}
            min={0}
            step={500_000}
            onChange={(_, d) => setMinRevenue(spinValue(d, 0))}
          />
        </Field>
        <Field label="Order by">
          <Dropdown
            value={orderBy}
            selectedOptions={[orderBy]}
            onOptionSelect={(_, d) => setOrderBy(d.optionValue ?? orderBy)}
          >
            {ORDER_BY.map((o) => (
              <Option key={o} value={o}>
                {o}
              </Option>
            ))}
          </Dropdown>
        </Field>
        <Field label="Top">
          <SpinButton value={top} min={1} max={50} onChange={(_, d) => setTop(spinValue(d, 10))} />
        </Field>
      </Scenario>

      <Scenario
        title="Expand a collection"
        description="A one-to-many navigation property, with its own $select, $orderby and $top."
        code={snippet(source, "expand-collection")}
        run={(sdk, signal) => queries.accountsWithContacts(sdk, signal)}
        renderResult={(rows) => (
          <RecordsGrid
            label="Accounts and contacts"
            rows={rows}
            columns={[
              { key: "name", label: "Account" },
              {
                key: "contacts",
                label: "First contacts",
                render: (r) => r.contacts.join(", ") || "—",
              },
            ]}
          />
        )}
      />

      <Scenario
        title="Paging with iterate() and getAll()"
        description="Prefer: odata.maxpagesize asks for small pages. iterate() yields records page by page and stops asking when you stop reading; getAll() collects pages with limits. Each page is its own request below."
        code={snippet(source, "paging")}
        run={(sdk, signal) => queries.pageThroughAccounts(sdk, { pageSize, maxItems }, signal)}
        renderResult={(r) => (
          <>
            <Body1>
              iterate() read {r.iterated.length} records; getAll({"{ maxPages: 2 }"}) read{" "}
              {r.firstTwoPagesCount}.
            </Body1>
            <RecordsGrid<Account>
              label="Iterated accounts"
              rows={r.iterated}
              getRowId={(a) => a.accountid}
              columns={accountColumns.slice(0, 2)}
            />
          </>
        )}
      >
        <Field label="Page size">
          <SpinButton
            value={pageSize}
            min={1}
            max={50}
            onChange={(_, d) => setPageSize(spinValue(d, 5))}
          />
        </Field>
        <Field label="Stop after (records)">
          <SpinButton
            value={maxItems}
            min={1}
            max={100}
            onChange={(_, d) => setMaxItems(spinValue(d, 12))}
          />
        </Field>
      </Scenario>

      <Scenario
        title="FetchXML"
        description="client.fetchXml() returns one page with moreRecords, the paging cookie and the total count. parsePagingCookie() and buildPagedFetchXml() ask for the next page."
        code={snippet(source, "fetchxml")}
        run={(sdk, signal) => queries.runFetchXml(sdk, { fetchXml }, signal)}
        renderResult={(r) => (
          <>
            <Body1>
              Total: {r.totalRecordCount ?? "not asked for"}. Page 1 has {r.page1.length} records
              {r.moreRecords ? `, page 2 has ${r.page2.length}` : " and is the last"}.
            </Body1>
            <RecordsGrid<Account>
              label="Page 1"
              rows={r.page1}
              getRowId={(a) => a.accountid}
              columns={accountColumns}
            />
            {r.page2.length > 0 && (
              <RecordsGrid<Account>
                label="Page 2"
                rows={r.page2}
                getRowId={(a) => a.accountid}
                columns={accountColumns}
              />
            )}
          </>
        )}
      >
        <Field label="FetchXML" hint="Change count to see more or fewer pages.">
          <Textarea
            value={fetchXml}
            onChange={(_, d) => setFetchXml(d.value)}
            resize="vertical"
            rows={11}
            textarea={{ spellCheck: false }}
          />
        </Field>
      </Scenario>

      <Scenario
        title="Aggregate with $apply"
        description="apply() sends $apply: the server filters, groups and counts, and returns one row per group."
        code={snippet(source, "aggregate")}
        run={(sdk, signal) => queries.accountsPerCity(sdk, signal)}
        renderResult={(rows) => (
          <RecordsGrid
            label="Active accounts per city"
            rows={rows}
            getRowId={(r) => r.address1_city ?? "(none)"}
            columns={[
              { key: "address1_city", label: "City" },
              { key: "count", label: "Active accounts" },
            ]}
          />
        )}
      />

      <Scenario
        title="List the views of a table"
        description="System views are savedquery records. This fills the list of the next scenario."
        code={snippet(source, "list-views")}
        run={(sdk, signal) => queries.listViews(sdk, signal)}
        onResult={(list) => {
          setViews(list);
          if (!list.some((v) => v.savedqueryid === viewId)) setViewId(list[0]?.savedqueryid ?? "");
        }}
        renderResult={(list) => (
          <RecordsGrid
            label="Views"
            rows={list}
            getRowId={(v) => v.savedqueryid}
            columns={[
              { key: "name", label: "View" },
              { key: "savedqueryid", label: "Id" },
            ]}
          />
        )}
      />

      <Scenario
        title="Run a saved view"
        description="client.savedQuery() runs a system view by id, with the view's columns, filter and order."
        code={snippet(source, "saved-query")}
        run={(sdk, signal) => queries.runView(sdk, { viewId }, signal)}
        disabledReason={viewId ? undefined : "List the views first."}
        renderResult={(rows) => (
          <RecordsGrid<Account>
            label="View results"
            rows={rows}
            getRowId={(a) => a.accountid}
            columns={accountColumns}
          />
        )}
      >
        <Field label="View">
          <Dropdown
            placeholder="List the views first"
            disabled={!views.length}
            value={views.find((v) => v.savedqueryid === viewId)?.name ?? ""}
            selectedOptions={viewId ? [viewId] : []}
            onOptionSelect={(_, d) => setViewId(d.optionValue ?? "")}
          >
            {views.map((v) => (
              <Option key={v.savedqueryid} value={v.savedqueryid}>
                {v.name}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </Scenario>
    </ScenarioPage>
  );
}

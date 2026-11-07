/**
 * #342 live: the `queryFunctions` helpers of the functions package write `$filter` expressions
 * that Dataverse accepts, and that select the rows the query function names. Read-only: nothing
 * is created. The org is often slow, so the timeouts are generous.
 *
 * The examples filter accounts, which the test org may have none of, so the row checks use tables
 * every org has rows in: system users, processes (`workflows`) and business units.
 *
 * In 1.0 the query functions were `Executable` classes (`new TodayFunction(...)`), which send
 * `GET /Today(PropertyName=@p1)?@p1='createdon'`: the Web API answers 404, because it runs a
 * query function only inside `$filter` (last test).
 */
import { describe, expect, it } from "vitest";
import { odata, type PageResponse } from "@mohsinonxrm/dataverse-sdk-core";
import { WhoAmIFunction, queryFunctions as q } from "@mohsinonxrm/dataverse-sdk-functions";
import { live, liveClient } from "./env.js";

const TIMEOUT = 300_000;
const DAY = 24 * 60 * 60 * 1000;

type Row = Record<string, unknown>;

/** `<set>?$select=…&$filter=<filter>&$top=<top>`, the rows. */
async function rows(set: string, select: string[], filter: string, top = 50): Promise<Row[]> {
  const { client } = liveClient();
  const page = await client
    .api(set)
    .select(...select)
    .filter(filter)
    .top(top)
    .get<PageResponse<Row>>();
  return page.value;
}

/** Accounts, the table of the examples: the 200 is what counts. */
const accounts = (filter: string): Promise<Row[]> =>
  rows("accounts", ["accountid", "createdon", "_ownerid_value"], filter);
const users = (filter: string): Promise<Row[]> =>
  rows("systemusers", ["systemuserid", "fullname", "createdon"], filter, 5000);
const workflows = (filter: string, top = 500): Promise<Row[]> =>
  rows("workflows", ["workflowid", "_ownerid_value"], filter, top);
const units = (filter: string): Promise<Row[]> =>
  rows("businessunits", ["businessunitid"], filter, 5000);

describe.skipIf(!live)("live: query functions in $filter (#342)", () => {
  it(
    "LastXDays on createdon returns 200 and only rows created in the last days",
    async () => {
      const lastWeek = q.lastXDays({ PropertyName: "createdon", PropertyValue: 7 });
      // A day of margin: LastXDays counts whole days in the user's time zone
      const since = Date.now() - 8 * DAY;
      for (const row of await accounts(lastWeek)) {
        expect(Date.parse(String(row.createdon))).toBeGreaterThanOrEqual(since);
      }
      const recent = await users(lastWeek);
      for (const row of recent) {
        expect(Date.parse(String(row.createdon))).toBeGreaterThanOrEqual(since);
      }
      // The last 7 days are a subset of the last 100 years, which has every user
      const all = await users(q.lastXDays({ PropertyName: "createdon", PropertyValue: 36_500 }));
      expect(all.length).toBeGreaterThan(0);
      expect(all.length).toBeGreaterThanOrEqual(recent.length);
    },
    TIMEOUT
  );

  it(
    "EqualUserId and NotEqualUserId on ownerid return 200 and split the rows by owner",
    async () => {
      const { client } = liveClient();
      const { UserId } = await client.execute(new WhoAmIFunction());
      for (const row of await accounts(q.equalUserId({ PropertyName: "ownerid" }))) {
        expect(row._ownerid_value).toBe(UserId);
      }
      // Processes always exist, owned by SYSTEM and the org's users
      for (const row of await workflows(q.equalUserId({ PropertyName: "ownerid" }))) {
        expect(row._ownerid_value).toBe(UserId);
      }
      const others = await workflows(q.notEqualUserId({ PropertyName: "ownerid" }));
      expect(others.length).toBeGreaterThan(0);
      for (const row of others) expect(row._ownerid_value).not.toBe(UserId);
    },
    TIMEOUT
  );

  it(
    "In with a collection returns 200 and the rows with those values",
    async () => {
      // Tricky literals too: a quote of each kind and a backslash, in the JSON array
      const tricky = `O'Brien "quoted" \\ sdk-int`;
      await accounts(q.in({ PropertyName: "name", PropertyValues: ["Contoso", tricky] }));
      const sample = (await users(odata.ne("fullname", null))).slice(0, 2).map((u) => u.fullname);
      expect(sample.length).toBeGreaterThan(0);
      const names = [...sample.map(String), tricky];
      const found = await users(q.in({ PropertyName: "fullname", PropertyValues: names }));
      for (const row of found) expect(names).toContain(row.fullname);
      for (const name of sample) expect(found.map((r) => r.fullname)).toContain(name);
      // NotIn is the complement
      const notIn = await users(q.notIn({ PropertyName: "fullname", PropertyValues: names }));
      expect(notIn.length).toBeGreaterThan(0);
      for (const row of notIn) expect(names).not.toContain(row.fullname);
    },
    TIMEOUT
  );

  it(
    "Under, UnderOrEqual, Above and AboveOrEqual on a hierarchy return 200 and walk it",
    async () => {
      // The business unit hierarchy: the root has no parent, so every unit is under or equal it
      const [root] = await units("_parentbusinessunitid_value eq null");
      if (!root) throw new Error("No root business unit");
      const id = String(root.businessunitid);
      const has = (list: Row[]): boolean => list.some((r) => r.businessunitid === id);
      const at = { PropertyName: "businessunitid", PropertyValue: id };
      const all = await units("businessunitid ne null");
      // The *OrEqual forms include the record itself; the others don't
      const underOrEqual = await units(q.underOrEqual(at));
      expect(has(underOrEqual)).toBe(true);
      expect(underOrEqual.length).toBe(all.length);
      expect(has(await units(q.under(at)))).toBe(false);
      expect((await units(q.aboveOrEqual(at))).map((r) => r.businessunitid)).toEqual([id]);
      expect(await units(q.above(at))).toEqual([]);
      expect(has(await units(q.notUnder(at)))).toBe(true);
      // And on accounts, the table of the examples
      await accounts(q.under({ PropertyName: "accountid", PropertyValue: id }));
    },
    TIMEOUT
  );

  it(
    "the date, fiscal, range and owner helpers combine with odata.or and odata.and, not odata.not",
    async () => {
      const createdon = { PropertyName: "createdon" };
      const today = new Date().toISOString().slice(0, 10);
      // One request per group: Dataverse parses every expression in it, or answers 400
      const groups = [
        [
          q.today(createdon),
          q.yesterday(createdon),
          q.tomorrow(createdon),
          q.last7Days(createdon),
          q.next7Days(createdon),
          q.lastWeek(createdon),
          q.thisWeek(createdon),
          q.nextWeek(createdon),
          q.lastMonth(createdon),
          q.thisMonth(createdon),
          q.nextMonth(createdon),
          q.lastYear(createdon),
          q.thisYear(createdon),
          q.nextYear(createdon),
        ],
        [
          q.lastXHours({ ...createdon, PropertyValue: 2 }),
          q.nextXHours({ ...createdon, PropertyValue: 2 }),
          q.lastXWeeks({ ...createdon, PropertyValue: 2 }),
          q.nextXWeeks({ ...createdon, PropertyValue: 2 }),
          q.lastXMonths({ ...createdon, PropertyValue: 2 }),
          q.nextXMonths({ ...createdon, PropertyValue: 2 }),
          q.lastXYears({ ...createdon, PropertyValue: 2 }),
          q.nextXYears({ ...createdon, PropertyValue: 2 }),
          q.nextXDays({ ...createdon, PropertyValue: 2 }),
          q.olderThanXMinutes({ ...createdon, PropertyValue: 5 }),
          q.olderThanXHours({ ...createdon, PropertyValue: 5 }),
          q.olderThanXDays({ ...createdon, PropertyValue: 5 }),
          q.olderThanXWeeks({ ...createdon, PropertyValue: 5 }),
          q.olderThanXMonths({ ...createdon, PropertyValue: 5 }),
          q.olderThanXYears({ ...createdon, PropertyValue: 5 }),
        ],
        [
          q.on({ ...createdon, PropertyValue: today }),
          q.onOrAfter({ ...createdon, PropertyValue: today }),
          q.onOrBefore({ ...createdon, PropertyValue: today }),
          q.between({ ...createdon, PropertyValues: ["2020-01-01", today] }),
          q.notBetween({ ...createdon, PropertyValues: ["2020-01-01", today] }),
        ],
        [
          q.thisFiscalYear(createdon),
          q.lastFiscalYear(createdon),
          q.nextFiscalYear(createdon),
          q.thisFiscalPeriod(createdon),
          q.lastFiscalPeriod(createdon),
          q.nextFiscalPeriod(createdon),
          q.inFiscalYear({ ...createdon, PropertyValue: new Date().getFullYear() }),
          q.inFiscalPeriod({ ...createdon, PropertyValue: 1 }),
          q.inFiscalPeriodAndYear({ ...createdon, PropertyValue1: 1, PropertyValue2: 2024 }),
          q.inOrAfterFiscalPeriodAndYear({ ...createdon, PropertyValue1: 1, PropertyValue2: 2024 }),
          q.inOrBeforeFiscalPeriodAndYear({
            ...createdon,
            PropertyValue1: 1,
            PropertyValue2: 2024,
          }),
          q.lastXFiscalYears({ ...createdon, PropertyValue: 2 }),
          q.nextXFiscalYears({ ...createdon, PropertyValue: 2 }),
          q.lastXFiscalPeriods({ ...createdon, PropertyValue: 2 }),
          q.nextXFiscalPeriods({ ...createdon, PropertyValue: 2 }),
        ],
        [
          q.equalBusinessId({ PropertyName: "owningbusinessunit" }),
          q.notEqualBusinessId({ PropertyName: "owningbusinessunit" }),
          q.equalUserTeams({ PropertyName: "ownerid" }),
          q.equalUserOrUserTeams({ PropertyName: "ownerid" }),
          q.equalUserOrUserHierarchy({ PropertyName: "ownerid" }),
          q.equalUserOrUserHierarchyAndTeams({ PropertyName: "ownerid" }),
        ],
      ];
      for (const group of groups) {
        expect(Array.isArray(await workflows(odata.or(...group), 1))).toBe(true);
        expect(Array.isArray(await accounts(odata.or(...group)))).toBe(true);
      }
      // The last 100 years, owned by someone else: SYSTEM owns processes in every org
      const combined = await workflows(
        odata.and(
          q.lastXYears({ ...createdon, PropertyValue: 100 }),
          q.notEqualUserId({ PropertyName: "ownerid" }),
          odata.ne("name", null)
        ),
        1
      );
      expect(combined.length).toBe(1);
      // Dataverse refuses `not` around a query function (with a 405): use its Not* form
      // (NotEqualUserId above)
      await expect(
        workflows(odata.not(q.equalUserId({ PropertyName: "ownerid" })), 1)
      ).rejects.toThrow(/Not operator along with the Custom Named Condition operators/);
    },
    TIMEOUT
  );

  it(
    "a query function called on its own, as the 1.0 classes did, answers 404",
    async () => {
      const { client } = liveClient();
      // What `client.execute(new TodayFunction({ PropertyName: "createdon" }))` sent in 1.0
      await expect(
        client.api("Today(PropertyName=@p1)?@p1='createdon'").get()
      ).rejects.toMatchObject({ status: 404 });
    },
    TIMEOUT
  );
});

/**
 * Live tests for the code generator (@mohsinonxrm/dataverse-sdk-generator, #218).
 * See ./env.ts for configuration. Output goes to a scratch folder that is removed afterwards.
 * These tests read only; they create nothing in the org.
 */
import { readdir } from "node:fs/promises";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { live, liveClient } from "./env.js";
import {
  compileToJs,
  generateLive,
  importGenerated,
  removeGenerated,
  typecheck,
} from "./generated.js";

const SLOW = 120_000;
const GUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type FunctionModule = Record<string, unknown>;

describe.skipIf(!live)("live: generator output", () => {
  let dir = "";

  beforeAll(async () => {
    dir = await generateLive({
      entities: ["account", "contact", "systemuser"],
      actions: ["PublishAllXml", "QualifyLead", "AddMembersTeam"],
      functions: [
        "WhoAmI",
        "RetrieveCurrentOrganization",
        "RetrieveTotalRecordCount",
        "RetrieveUserPrivilegeByPrivilegeName",
        "GetAllTimeZonesWithDisplayName",
        "FetchXmlToQueryExpression",
      ],
    });
  }, SLOW);

  afterAll(async () => {
    await removeGenerated();
  });

  it(
    "generated entities, actions and functions type-check under strict settings",
    async () => {
      const files = await readdir(dir, { recursive: true });
      for (const expected of [
        "entities/Account.ts",
        "entities/Contact.ts",
        "entities/SystemUser.ts",
        "actions/PublishAllXmlAction.ts",
        "actions/QualifyLeadAction.ts",
        "functions/WhoAmIFunction.ts",
      ]) {
        expect(files.map((f) => f.replaceAll("\\", "/"))).toContain(expected);
      }
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  describe("generated functions run against the org", () => {
    let fns: FunctionModule;

    beforeAll(async () => {
      await compileToJs(dir);
      fns = await importGenerated<FunctionModule>(dir, "functions/index.js");
    }, SLOW);

    const run = <T>(name: string, ...args: unknown[]): Promise<T> => {
      const Fn = fns[name] as new (...a: unknown[]) => Executable<T>;
      return liveClient().client.execute(new Fn(...args));
    };

    it("unbound function with no parameters", async () => {
      const me = await run<{ UserId: string }>("WhoAmIFunction");
      expect(me.UserId).toMatch(GUID);
    });

    it("enum parameter", async () => {
      // EndpointAccessType.Default = 0
      const res = await run<{ Detail: unknown }>("RetrieveCurrentOrganizationFunction", {
        AccessType: 0,
      });
      expect(res.Detail).toBeDefined();
    });

    it("collection parameter", async () => {
      const res = await run<{ EntityRecordCountCollection: unknown }>(
        "RetrieveTotalRecordCountFunction",
        { EntityNames: ["account", "contact"] }
      );
      expect(res.EntityRecordCountCollection).toBeDefined();
    });

    it("record-bound function, with and without the optional parameter", async () => {
      const { UserId } = await run<{ UserId: string }>("WhoAmIFunction");
      const omitted = await run<{ RolePrivileges: unknown[] }>(
        "RetrieveUserPrivilegeByPrivilegeNameFunction",
        UserId,
        { PrivilegeName: "prvReadAccount" }
      );
      expect(Array.isArray(omitted.RolePrivileges)).toBe(true);
      const given = await run<{ RolePrivileges: unknown[] }>(
        "RetrieveUserPrivilegeByPrivilegeNameFunction",
        UserId,
        { PrivilegeName: "prvReadAccount", ExcludeTeamBasic: true }
      );
      expect(Array.isArray(given.RolePrivileges)).toBe(true);
    });

    it("collection-bound function", async () => {
      // A collection resolves the array itself, as in the in-repo generator (#300)
      const res = await run<unknown[]>("GetAllTimeZonesWithDisplayNameFunction", {
        LocaleId: 1033,
      });
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBeGreaterThan(0);
    });

    it("string parameter containing a single quote", async () => {
      const res = await run<{ Query: { EntityName: string } }>(
        "FetchXmlToQueryExpressionFunction",
        {
          FetchXml:
            `<fetch><entity name='account'><attribute name='name'/><filter>` +
            `<condition attribute='name' operator='eq' value="O'Brien"/></filter></entity></fetch>`,
        }
      );
      expect(res.Query.EntityName).toBe("account");
    });
  });
});

/**
 * #69: functions bound to an entity collection are called on the entity set,
 * `GET /{entityset}/Microsoft.Dynamics.CRM.{Name}(...)`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import type { Executable } from "@mohsinonxrm/dataverse-sdk-core";
import { TEST_API_URL, createTestClient, jsonResponse } from "@mohsinonxrm/dataverse-sdk-testing";
import * as functions from "../src/index.js";

const SRC: string = fileURLToPath(new URL("../src/", import.meta.url));

/** Every generated function whose binding parameter is a Collection(...). */
function collectionBoundFunctions(): string[] {
  const files: string[] = readdirSync(SRC);
  return files
    .filter((f) => f.endsWith("Function.ts"))
    .filter((f) => {
      const code: string = readFileSync(`${SRC}${f}`, "utf8");
      return /Binding parameter: \w+ \(Collection\([^)]*\)\)/.test(code);
    })
    .map((f) => f.slice(0, -3));
}

type FunctionClass = new (...args: unknown[]) => Executable<unknown>;

/**
 * RetrieveUnpublishedMultiple is bound to many tables; each binding has its own class (#75), and
 * the plain name is a deprecated alias of the one it exported before. [table, entity set]
 */
const RETRIEVE_UNPUBLISHED_MULTIPLE: Array<[string, string]> = [
  ["aiplugin", "aiplugins"],
  ["aipluginconversationstarter", "aipluginconversationstarters"],
  ["aipluginconversationstartermapping", "aipluginconversationstartermappings"],
  ["aipluginoperation", "aipluginoperations"],
  ["aipluginoperationparameter", "aipluginoperationparameters"],
  ["aipluginoperationresponsetemplate", "aipluginoperationresponsetemplates"],
  ["aiplugintitle", "aiplugintitles"],
  ["appconfig", "appconfigs"],
  ["appconfiginstance", "appconfiginstances"],
  ["appmodule", "appmodules"],
  ["customcontroldefaultconfig", "customcontroldefaultconfigs"],
  ["desktopflowbinary", "desktopflowbinaries"],
  ["mobileofflineprofile", "mobileofflineprofiles"],
  ["mobileofflineprofileitem", "mobileofflineprofileitems"],
  ["navigationsetting", "navigationsettings"],
  ["savedquery", "savedqueries"],
  ["savedqueryvisualization", "savedqueryvisualizations"],
  ["sitemap", "sitemaps"],
  ["systemform", "systemforms"],
  ["webresource", "webresourceset"],
  ["workflow", "workflows"],
];

describe("#69: collection-bound functions", () => {
  it("every collection-bound function is called on its entity set", () => {
    const urls: Record<string, string> = {};
    for (const name of collectionBoundFunctions()) {
      const Fn = (functions as unknown as Record<string, FunctionClass | undefined>)[name];
      if (!Fn) throw new Error(`${name} isn't exported`);
      // No arguments: every parameter alias is left out, so the URL is the bare path
      urls[name] = new Fn().toRequestInformation(TEST_API_URL).url.slice(TEST_API_URL.length);
    }
    expect(urls).toEqual({
      GetAllTimeZonesWithDisplayNameFunction:
        "/timezonedefinitions/Microsoft.Dynamics.CRM.GetAllTimeZonesWithDisplayName",
      GetDefaultPriceLevelFunction: "/pricelevels/Microsoft.Dynamics.CRM.GetDefaultPriceLevel",
      RetrieveFilteredFormsFunction: "/systemforms/Microsoft.Dynamics.CRM.RetrieveFilteredForms",
      RetrievePersonalWallFunction: "/posts/Microsoft.Dynamics.CRM.RetrievePersonalWall",
      RetrievePrivilegeSetFunction: "/privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet",
      RetrieveRecordWallFunction: "/posts/Microsoft.Dynamics.CRM.RetrieveRecordWall",
      RetrieveTimelineWallRecordsFunction:
        "/activitypointers/Microsoft.Dynamics.CRM.RetrieveTimelineWallRecords",
      ...Object.fromEntries(
        RETRIEVE_UNPUBLISHED_MULTIPLE.map(([table, set]) => [
          `RetrieveUnpublishedMultiple_${table}_collectionFunction`,
          `/${set}/Microsoft.Dynamics.CRM.RetrieveUnpublishedMultiple`,
        ])
      ),
      SearchByBodyKbArticleFunction: "/kbarticles/Microsoft.Dynamics.CRM.SearchByBodyKbArticle",
      SearchByKeywordsKbArticleFunction:
        "/kbarticles/Microsoft.Dynamics.CRM.SearchByKeywordsKbArticle",
      SearchByTitleKbArticleFunction: "/kbarticles/Microsoft.Dynamics.CRM.SearchByTitleKbArticle",
      UtcTimeFromLocalTimeFunction: "/resourcegroups/Microsoft.Dynamics.CRM.UtcTimeFromLocalTime",
    });
  });

  it("the deprecated plain RetrieveUnpublishedMultipleFunction keeps its old binding", () => {
    // eslint-disable-next-line @typescript-eslint/no-deprecated -- checking the alias itself
    const Fn = functions.RetrieveUnpublishedMultipleFunction;
    expect(Fn).toBe(
      functions.RetrieveUnpublishedMultiple_aipluginoperationparameter_collectionFunction
    );
  });

  it("RetrievePrivilegeSet reaches /privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet", async () => {
    const { client, fake } = createTestClient();
    fake.on("GET", "/privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet", () =>
      jsonResponse({ value: [] })
    );

    await client.execute(new functions.RetrievePrivilegeSetFunction());

    expect(fake.last().method).toBe("GET");
    expect(fake.last().path).toBe("/privileges/Microsoft.Dynamics.CRM.RetrievePrivilegeSet");
  });
});

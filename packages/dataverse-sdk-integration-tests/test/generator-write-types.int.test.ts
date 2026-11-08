/**
 * Live tests for the generator's create and update types (#347): `AccountCreate`,
 * `AccountUpdate`, `ContactCreate`, … have only the columns the org's metadata says a create or an
 * update accepts (`IsValidForCreate` / `IsValidForUpdate`), lookups set with an `EntityReference`.
 * A record written with them is accepted by the org, and the metadata carries the column
 * constraints `validateEntity()` checks.
 * See ./env.ts for configuration. Every record is named with this run's `runId` and deleted in
 * `afterAll`.
 */
import { writeFile } from "node:fs/promises";
import * as path from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createEntityReference,
  formatEntityForWrite,
  type EntityMetadata,
  validateEntity,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { live, liveClient, runId } from "./env.js";
import {
  compileToJs,
  generateLive,
  importGenerated,
  removeGenerated,
  typecheck,
} from "./generated.js";

const SLOW = 120_000;

// Each @ts-expect-error must have an error under it, or the type-check fails.
const USAGE = `
import { createEntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import type {
  AccountCreate,
  AccountUpdate,
  ContactCreate,
  ContactUpdate,
} from "./entities/index.js";

const id = "00000000-0000-0000-0000-000000000001";

export const account: AccountCreate = {
  name: "Contoso",
  creditlimit: 1000,
  primarycontactid: createEntityReference("contact", id),
};
export const accountUpdate: AccountUpdate = { name: "Contoso Ltd", primarycontactid: null };
export const contact: ContactCreate = {
  lastname: "Doe",
  parentcustomerid: createEntityReference("account", id),
};
export const contactUpdate: ContactUpdate = { firstname: "Jane", parentcustomerid: null };

// @ts-expect-error createdon is set by Dataverse
export const c1: AccountCreate = { createdon: "2024-01-01T00:00:00Z" };
// @ts-expect-error versionnumber is set by Dataverse
export const c2: AccountUpdate = { versionnumber: 1 };
// @ts-expect-error a lookup's _value property is read-only
export const c3: AccountCreate = { _primarycontactid_value: id };
// @ts-expect-error the primary key can't be changed
export const c4: AccountUpdate = { accountid: id };
// @ts-expect-error fullname is calculated from the first and last name
export const c5: ContactCreate = { fullname: "Jane Doe" };
`;

interface Generated {
  AccountMetadata: EntityMetadata;
  ContactMetadata: EntityMetadata;
  EntityMetadataCache: Record<string, EntityMetadata>;
}

// Delete order matters: records that point at others go first.
const created: Array<{ set: string; id: string }> = [];

describe.skipIf(!live)("live: generated create and update types (#347)", () => {
  let dir = "";
  let gen: Generated;

  beforeAll(async () => {
    dir = await generateLive({ entities: ["account", "contact"] });
  }, SLOW);

  afterAll(async () => {
    if (!live) return;
    const { client } = liveClient();
    for (const { set, id } of created.reverse()) {
      await client
        .api(`${set}(${id})`)
        .delete()
        .catch(() => undefined);
    }
    await removeGenerated();
  });

  it(
    "leave out the read-only columns of account and contact",
    async () => {
      await writeFile(path.join(dir, "write-usage.ts"), USAGE, "utf-8");
      expect(await typecheck(dir)).toEqual([]);
    },
    SLOW
  );

  it(
    "a create and an update typed with them are accepted",
    async () => {
      await compileToJs(dir);
      gen = {
        ...(await importGenerated<Pick<Generated, "AccountMetadata" | "ContactMetadata">>(
          dir,
          "entities/index.js"
        )),
        ...(await importGenerated<Pick<Generated, "EntityMetadataCache">>(dir, "metadata.js")),
      };
      const { client } = liveClient();
      const options = { metadataCache: gen.EntityMetadataCache };

      // ContactCreate
      const contactId = await client
        .api("contacts")
        .createAndGetId(
          formatEntityForWrite({ lastname: `${runId}-write-types` }, gen.ContactMetadata, options)
        );
      created.push({ set: "contacts", id: contactId });

      // AccountCreate, with a lookup
      const accountId = await client.api("accounts").createAndGetId(
        formatEntityForWrite(
          {
            name: `${runId}-write-types`,
            creditlimit: 1000,
            primarycontactid: createEntityReference("contact", contactId),
          },
          gen.AccountMetadata,
          options
        )
      );
      created.push({ set: "accounts", id: accountId });

      // AccountUpdate: clear the lookup
      await client
        .api(`accounts(${accountId})`)
        .patch(
          formatEntityForWrite(
            { name: `${runId}-write-types-updated`, primarycontactid: null },
            gen.AccountMetadata,
            options
          )
        );

      const read = await client
        .api(`accounts(${accountId})`)
        .select("name", "_primarycontactid_value")
        .get<{ name: string; _primarycontactid_value: string | null }>();
      expect(read.name).toBe(`${runId}-write-types-updated`);
      expect(read._primarycontactid_value).toBeNull();
    },
    SLOW
  );

  it("the metadata carries the org's column constraints for validateEntity", () => {
    // RetrieveMetadataChanges accepted MinValue and MaxValue in the attribute query (the
    // generation above would have failed otherwise), and they reached the metadata.
    const account = gen.AccountMetadata;
    expect(account.attributes?.name.maxLength).toBeGreaterThan(0);
    expect(typeof account.attributes?.numberofemployees.minValue).toBe("number");
    expect(typeof account.attributes?.numberofemployees.maxValue).toBe("number");
    expect(account.attributes?.industrycode.optionValues?.length).toBeGreaterThan(0);
    expect(account.attributes?.createdon).toMatchObject({
      isValidForCreate: false,
      isValidForUpdate: false,
    });
    expect(account.navigation.primarycontactid.lookupAttribute).toBe("primarycontactid");
    expect(gen.ContactMetadata.attributes?.lastname.isRequired).toBe(true);

    const maxLength = account.attributes?.name.maxLength ?? 0;
    expect(
      validateEntity(
        { name: "x".repeat(maxLength + 1), industrycode: -1, createdon: "2024-01-01" },
        account
      ).map((i) => [i.property, i.code])
    ).toEqual([
      ["name", "maxLength"],
      ["industrycode", "invalidOption"],
      ["createdon", "notValidForCreate"],
    ]);
    expect(validateEntity({ firstname: "Jane" }, gen.ContactMetadata)).toContainEqual(
      expect.objectContaining({ property: "lastname", code: "required" })
    );
  });
});

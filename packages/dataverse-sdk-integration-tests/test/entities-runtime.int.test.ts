/**
 * Live tests for @mohsinonxrm/dataverse-sdk-entities-runtime (#218): lookups written through
 * `formatEntityForWrite` using metadata produced by the generator.
 * See ./env.ts for configuration. Every record is named with this run's `runId` and deleted in
 * `afterAll`, so a failed test leaves nothing behind.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  createEntityReference,
  formatEntityForWrite,
  type EntityMetadata,
  type IEntity,
} from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { live, liveClient, runId } from "./env.js";
import { compileToJs, generateLive, importGenerated, removeGenerated } from "./generated.js";

const SLOW = 120_000;

interface Generated {
  AccountMetadata: EntityMetadata;
  ContactMetadata: EntityMetadata;
  EntityMetadataCache: Record<string, EntityMetadata>;
}

// Delete order matters: records that point at others go first.
const created: Array<{ set: string; id: string }> = [];

describe.skipIf(!live)("live: formatEntityForWrite lookup binding", () => {
  let gen: Generated;

  beforeAll(async () => {
    const dir = await generateLive({ entities: ["account", "contact"] });
    await compileToJs(dir);
    const entities = await importGenerated<Pick<Generated, "AccountMetadata" | "ContactMetadata">>(
      dir,
      "entities/index.js"
    );
    const metadata = await importGenerated<Pick<Generated, "EntityMetadataCache">>(
      dir,
      "metadata.js"
    );
    gen = { ...entities, ...metadata };
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

  async function create(
    entity: Partial<IEntity>,
    metadata: EntityMetadata,
    cache: Record<string, EntityMetadata>
  ): Promise<string> {
    const { client } = liveClient();
    const id = await client
      .api(`/${metadata.collectionName}`)
      .createAndGetId(formatEntityForWrite(entity, metadata, { metadataCache: cache }));
    created.push({ set: metadata.collectionName, id });
    return id;
  }

  it(
    "binds a plain lookup and a polymorphic lookup on create",
    async () => {
      const { client } = liveClient();
      const { AccountMetadata, ContactMetadata, EntityMetadataCache: cache } = gen;

      const parentId = await create({ name: `${runId}-parent` }, AccountMetadata, cache);

      // Polymorphic: contact.parentcustomerid -> account is sent as parentcustomerid_account@odata.bind
      // (the account id comes back in _parentcustomerid_value, so the right target was bound).
      const contactId = await create(
        {
          lastname: `${runId}-contact`,
          parentcustomerid: createEntityReference("account", parentId),
        },
        ContactMetadata,
        cache
      );

      // Plain: account.primarycontactid -> contact.
      const childId = await create(
        {
          name: `${runId}-child`,
          primarycontactid: createEntityReference("contact", contactId),
          parentaccountid: createEntityReference("account", parentId),
        },
        AccountMetadata,
        cache
      );

      const contact = await client
        .api(`contacts(${contactId})`)
        .select("_parentcustomerid_value")
        .get<Record<string, unknown>>();
      expect(contact._parentcustomerid_value).toBe(parentId);

      const child = await client
        .api(`accounts(${childId})`)
        .select("_primarycontactid_value", "_parentaccountid_value")
        .get<Record<string, unknown>>();
      expect(child._primarycontactid_value).toBe(contactId);
      expect(child._parentaccountid_value).toBe(parentId);
    },
    SLOW
  );

  it(
    "clears a plain and a polymorphic lookup set to null (#363)",
    async () => {
      const { client } = liveClient();
      const { AccountMetadata, ContactMetadata, EntityMetadataCache: cache } = gen;

      const parentId = await create({ name: `${runId}-clear-parent` }, AccountMetadata, cache);
      const contactId = await create(
        {
          lastname: `${runId}-clear-contact`,
          parentcustomerid: createEntityReference("account", parentId),
        },
        ContactMetadata,
        cache
      );
      const accountId = await create(
        {
          name: `${runId}-clear-account`,
          primarycontactid: createEntityReference("contact", contactId),
        },
        AccountMetadata,
        cache
      );

      await client
        .api(`contacts(${contactId})`)
        .patch(formatEntityForWrite({ parentcustomerid: null }, ContactMetadata));
      await client
        .api(`accounts(${accountId})`)
        .patch(formatEntityForWrite({ primarycontactid: null }, AccountMetadata));

      const contact = await client
        .api(`contacts(${contactId})`)
        .select("_parentcustomerid_value")
        .get<Record<string, unknown>>();
      expect(contact._parentcustomerid_value).toBeNull();
      const account = await client
        .api(`accounts(${accountId})`)
        .select("_primarycontactid_value")
        .get<Record<string, unknown>>();
      expect(account._primarycontactid_value).toBeNull();
    },
    SLOW
  );
});

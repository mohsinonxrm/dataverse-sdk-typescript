import { odataKey, type BindManyExecutor } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "./BatchRequestBuilder.js";

/**
 * Creates a BindManyExecutor that uses batch requests to efficiently associate
 * multiple records with a collection-valued navigation property.
 *
 * Pass the returned executor to `DataverseRequestBuilder.bindMany()`. The `$batch` carries the
 * builder's impersonation and custom headers, as the one-request-per-id default does. An empty
 * list sends nothing, and an id listed twice is associated once.
 *
 * @example
 * ```typescript
 * import { createBindManyExecutor } from '@mohsinonxrm/dataverse-sdk-batch';
 * await client.api('accounts(id)').bindMany('contact_customer_accounts', 'contacts', ids, createBindManyExecutor());
 * ```
 */
export function createBindManyExecutor(): BindManyExecutor {
  return async (client, pathOrUrl, navigationProperty, entitySetName, ids, options) => {
    const unique = [...new Set(ids)];
    if (unique.length === 0) return;
    const batch = new BatchRequestBuilder(client);
    unique.forEach((id, i) => {
      batch.addRequest(
        `assoc-${String(i + 1)}`,
        "POST",
        `${pathOrUrl}/${navigationProperty}/$ref`,
        undefined,
        // Absolute, as core's associate() sends it; keys formatted the same way (odataKey).
        { "@odata.id": `${client.getBaseUrl()}/${entitySetName}(${odataKey(id)})` }
      );
    });
    // Older callers (a hand-written executor call) may not pass options.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    await batch.execute({ headers: options?.headers });
  };
}

import type { BindManyExecutor } from "@mohsinonxrm/dataverse-sdk-core";
import { BatchRequestBuilder } from "./BatchRequestBuilder.js";

/**
 * Creates a BindManyExecutor that uses batch requests to efficiently associate
 * multiple records with a collection-valued navigation property.
 *
 * Pass the returned executor to `DataverseRequestBuilder.bindMany()`.
 *
 * @example
 * ```typescript
 * import { createBindManyExecutor } from '@mohsinonxrm/dataverse-sdk-batch';
 * await client.api('accounts(id)').bindMany('contact_customer_accounts', 'contacts', ids, createBindManyExecutor());
 * ```
 */
export function createBindManyExecutor(): BindManyExecutor {
  return async (client, pathOrUrl, navigationProperty, entitySetName, ids) => {
    const batch = new BatchRequestBuilder(client);
    for (const id of ids) {
      batch.addRequest(
        `assoc-${id}`,
        "POST",
        `${pathOrUrl}/${navigationProperty}/$ref`,
        undefined,
        { "@odata.id": `${client.getBaseUrl()}/${entitySetName}(${id})` }
      );
    }
    await batch.execute();
  };
}

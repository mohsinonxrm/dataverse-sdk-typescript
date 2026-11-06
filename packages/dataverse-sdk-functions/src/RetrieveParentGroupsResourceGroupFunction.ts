import type { Executable, RequestInformation } from '@mohsinonxrm/dataverse-sdk-core';
import { formatParameterAlias } from './internal/odataLiteral.js';
import type { resourcegroup } from './types/index.js';

/**
 * Response from the RetrieveParentGroupsResourceGroup function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type RetrieveParentGroupsResourceGroupResponse = Array<resourcegroup & { "@odata.etag"?: string; "@odata.type"?: string }>;

/**
 * Parameters of the RetrieveParentGroupsResourceGroup function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RetrieveParentGroupsResourceGroupFunctionParameters {
  ResourceGroupId: string;
}

/**
 * RetrieveParentGroupsResourceGroup function
 *
 * Unbound function
 */
export class RetrieveParentGroupsResourceGroupFunction implements Executable<RetrieveParentGroupsResourceGroupResponse> {
  constructor(
    public readonly parameters: RetrieveParentGroupsResourceGroupFunctionParameters,
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/RetrieveParentGroupsResourceGroup`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.ResourceGroupId !== undefined) {
      aliases.push(`ResourceGroupId=@p1`);
      params.append('@p1', formatParameterAlias(this.parameters.ResourceGroupId, 'Edm.Guid'));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(',')})?${params.toString()}`;
    }

    return {
      method: 'GET',
      url,
      headers: {
        'Accept': 'application/json',
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveParentGroupsResourceGroupResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: RetrieveParentGroupsResourceGroupResponse }).value;
  }
}

import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CCaaS_GetDeliveryBatch function
 */
export interface CCaaS_GetDeliveryBatchResponse {
  value: EntityReference[];
}

/**
 * Parameters of the CCaaS_GetDeliveryBatch function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetDeliveryBatchFunctionParameters {
  BatchId: string;
}

/**
 * CCaaS_GetDeliveryBatch function
 *
 * Unbound function
 */
export class CCaaS_GetDeliveryBatchFunction implements Executable<CCaaS_GetDeliveryBatchResponse> {
  constructor(public readonly parameters: CCaaS_GetDeliveryBatchFunctionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetDeliveryBatch`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.BatchId !== undefined) {
      aliases.push(`BatchId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.BatchId, "Edm.Guid"));
    }
    if (aliases.length > 0) {
      url += `(${aliases.join(",")})?${params.toString()}`;
    }

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<CCaaS_GetDeliveryBatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetDeliveryBatchResponse;
    return (await response.json()) as CCaaS_GetDeliveryBatchResponse;
  }
}

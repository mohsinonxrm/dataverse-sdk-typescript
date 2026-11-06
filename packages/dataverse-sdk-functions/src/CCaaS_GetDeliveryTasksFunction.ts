import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";

/**
 * Response from the CCaaS_GetDeliveryTasks function.
 *
 * The collection, read from the `value` of the response body.
 * Each record keeps its annotations. A 204 (an output that wasn't set) is `[]`.
 */
export type CCaaS_GetDeliveryTasksResponse = Array<{
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
}>;

/**
 * Parameters of the CCaaS_GetDeliveryTasks function, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_GetDeliveryTasksFunctionParameters {
  DeliveryTaskId?: string;
}

/**
 * CCaaS_GetDeliveryTasks function
 *
 * Unbound function
 */
export class CCaaS_GetDeliveryTasksFunction implements Executable<CCaaS_GetDeliveryTasksResponse> {
  constructor(public readonly parameters: CCaaS_GetDeliveryTasksFunctionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/CCaaS_GetDeliveryTasks`;

    // Build query parameters using parameter aliases
    const params = new URLSearchParams();
    const aliases: string[] = [];
    if (this.parameters.DeliveryTaskId !== undefined) {
      aliases.push(`DeliveryTaskId=@p1`);
      params.append("@p1", formatParameterAlias(this.parameters.DeliveryTaskId, "Edm.Guid"));
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

  async parseResponse(response: Response): Promise<CCaaS_GetDeliveryTasksResponse> {
    // An output that wasn't set answers 204 No Content: an empty collection
    if (response.status === 204) return [];
    // A collection comes wrapped: { "@odata.context": "…", "value": [ … ] }
    return ((await response.json()) as { value: CCaaS_GetDeliveryTasksResponse }).value;
  }
}

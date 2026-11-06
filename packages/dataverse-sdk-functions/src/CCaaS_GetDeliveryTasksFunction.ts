import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { formatParameterAlias } from "./internal/odataLiteral.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";

/**
 * Response from CCaaS_GetDeliveryTasks function
 */
export interface CCaaS_GetDeliveryTasksResponse {
  value: EntityReference[];
}

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_GetDeliveryTasksResponse;
    return (await response.json()) as CCaaS_GetDeliveryTasksResponse;
  }
}

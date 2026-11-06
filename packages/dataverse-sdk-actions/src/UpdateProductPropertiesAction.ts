import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { dynamicpropertyinstance } from "./types/index.js";

/**
 * Response from UpdateProductProperties action
 */
export interface UpdateProductPropertiesResponse {
  // No content returned
}

/**
 * Parameters of the UpdateProductProperties action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateProductPropertiesActionParameters {
  PropertyInstanceList: (EntityReference | EntityPayload<dynamicpropertyinstance>)[];
}

/**
 * UpdateProductProperties action
 *
 * Unbound action
 */
export class UpdateProductPropertiesAction implements Executable<UpdateProductPropertiesResponse> {
  constructor(public readonly parameters: UpdateProductPropertiesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UpdateProductProperties`;

    const body = requestBody({
      PropertyInstanceList: this.parameters.PropertyInstanceList,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateProductPropertiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateProductPropertiesResponse;
  }
}

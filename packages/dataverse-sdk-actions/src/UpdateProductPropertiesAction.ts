import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { dynamicpropertyinstance } from "./types/index.js";

/**
 * Response from the UpdateProductProperties action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateProductPropertiesResponse = void;

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

  parseResponse(_response: Response): Promise<UpdateProductPropertiesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}

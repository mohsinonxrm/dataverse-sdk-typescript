import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the AutoMapEntity action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type AutoMapEntityResponse = void;

/**
 * Parameters of the AutoMapEntity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface AutoMapEntityActionParameters {
  EntityMapId: string;
}

/**
 * AutoMapEntity action
 *
 * Unbound action
 */
export class AutoMapEntityAction implements Executable<AutoMapEntityResponse> {
  constructor(public readonly parameters: AutoMapEntityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/AutoMapEntity`;

    const body = requestBody({
      EntityMapId: this.parameters.EntityMapId,
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

  parseResponse(_response: Response): Promise<AutoMapEntityResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}

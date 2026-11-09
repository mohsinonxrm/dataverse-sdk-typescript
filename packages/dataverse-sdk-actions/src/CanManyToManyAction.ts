import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CanManyToMany action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanManyToManyResponse {
  "@odata.context"?: string;
  CanManyToMany: boolean;
}

/**
 * Parameters of the CanManyToMany action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanManyToManyActionParameters {
  EntityName: string;
}

/**
 * CanManyToMany action
 *
 * Unbound action
 */
export class CanManyToManyAction implements Executable<CanManyToManyResponse> {
  constructor(public readonly parameters: CanManyToManyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanManyToMany`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
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

  async parseResponse(response: Response): Promise<CanManyToManyResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CanManyToManyResponse;
  }
}

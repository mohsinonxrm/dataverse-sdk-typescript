import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CanManyToMany action
 */
export interface CanManyToManyResponse {
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CanManyToManyResponse;
    return (await response.json()) as CanManyToManyResponse;
  }
}

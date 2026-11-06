import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateRpaBox action
 */
export interface CreateRpaBoxResponse {
  flowMachineId: string;
}

/**
 * Parameters of the CreateRpaBox action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateRpaBoxActionParameters {
  machineDescription?: string;
  machineNetworkId?: EntityReference | AnyEntityPayload;
  machineName: string;
  machineImageVersionId: EntityReference | AnyEntityPayload;
}

/**
 * CreateRpaBox action
 *
 * Unbound action
 */
export class CreateRpaBoxAction implements Executable<CreateRpaBoxResponse> {
  constructor(public readonly parameters: CreateRpaBoxActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateRpaBox`;

    const body = requestBody({
      machineDescription: this.parameters.machineDescription,
      machineNetworkId: this.parameters.machineNetworkId,
      machineName: this.parameters.machineName,
      machineImageVersionId: this.parameters.machineImageVersionId,
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

  async parseResponse(response: Response): Promise<CreateRpaBoxResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CreateRpaBoxResponse;
  }
}

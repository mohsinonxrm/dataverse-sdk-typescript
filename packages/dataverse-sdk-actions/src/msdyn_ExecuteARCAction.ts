import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ExecuteARC action
 */
export interface msdyn_ExecuteARCResponse {
  ErrorMessage: string;
  FlowName: string;
}

/**
 * Parameters of the msdyn_ExecuteARC action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteARCActionParameters {
  CreatedEntityReference: EntityReference | AnyEntityPayload;
  RuleId?: string;
}

/**
 * msdyn_ExecuteARC action
 *
 * Unbound action
 */
export class msdyn_ExecuteARCAction implements Executable<msdyn_ExecuteARCResponse> {
  constructor(public readonly parameters: msdyn_ExecuteARCActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteARC`;

    const body = requestBody({
      CreatedEntityReference: this.parameters.CreatedEntityReference,
      RuleId: this.parameters.RuleId,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteARCResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ExecuteARCResponse;
    return (await response.json()) as msdyn_ExecuteARCResponse;
  }
}

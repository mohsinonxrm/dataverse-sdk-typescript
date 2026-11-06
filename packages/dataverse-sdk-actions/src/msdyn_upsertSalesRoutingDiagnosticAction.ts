import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_upsertSalesRoutingDiagnostic action
 */
export interface msdyn_upsertSalesRoutingDiagnosticResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_upsertSalesRoutingDiagnostic action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_upsertSalesRoutingDiagnosticActionParameters {
  Payload: string;
  TargetObject: EntityReference | AnyEntityPayload;
  EventType: number;
}

/**
 * msdyn_upsertSalesRoutingDiagnostic action
 *
 * Unbound action
 */
export class msdyn_upsertSalesRoutingDiagnosticAction implements Executable<msdyn_upsertSalesRoutingDiagnosticResponse> {
  constructor(public readonly parameters: msdyn_upsertSalesRoutingDiagnosticActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_upsertSalesRoutingDiagnostic`;

    const body = requestBody({
      Payload: this.parameters.Payload,
      TargetObject: this.parameters.TargetObject,
      EventType: this.parameters.EventType,
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

  async parseResponse(response: Response): Promise<msdyn_upsertSalesRoutingDiagnosticResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_upsertSalesRoutingDiagnosticResponse;
    return (await response.json()) as msdyn_upsertSalesRoutingDiagnosticResponse;
  }
}

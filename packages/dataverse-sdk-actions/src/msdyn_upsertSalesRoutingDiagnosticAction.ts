import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
  TargetObject: EntityReference | AnyEntityPayload;
  Payload: string;
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
      TargetObject: this.parameters.TargetObject,
      Payload: this.parameters.Payload,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_upsertSalesRoutingDiagnosticResponse;
  }
}

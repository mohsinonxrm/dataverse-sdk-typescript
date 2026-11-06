import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_upsertSalesRoutingDiagnostic action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_upsertSalesRoutingDiagnosticResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_upsertSalesRoutingDiagnosticResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}

import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_upsertSalesRoutingDiagnostic action
 */
export interface msdyn_upsertSalesRoutingDiagnosticResponse {
  // No content returned
}

/**
 * msdyn_upsertSalesRoutingDiagnostic action
 *
 * Unbound action
 */
export class msdyn_upsertSalesRoutingDiagnosticAction implements Executable<msdyn_upsertSalesRoutingDiagnosticResponse> {
  constructor(
    public readonly targetObject: EntityReference | AnyEntityPayload,
    public readonly payload: string,
    public readonly eventType: number
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_upsertSalesRoutingDiagnostic`;

    const body: Record<string, unknown> = {
      TargetObject: this.targetObject,
      Payload: this.payload,
      EventType: this.eventType,
    };

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
    // No return value (204 No Content)
    return {};
  }
}

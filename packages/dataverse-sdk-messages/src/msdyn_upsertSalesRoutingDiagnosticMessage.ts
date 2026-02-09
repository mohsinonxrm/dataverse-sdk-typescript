import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_upsertSalesRoutingDiagnostic request message
 *
 * Web API Action: msdyn_upsertSalesRoutingDiagnostic
 */
export class msdyn_upsertSalesRoutingDiagnosticRequest
  extends OrganizationRequest
  implements Executable<msdyn_upsertSalesRoutingDiagnosticResponse>
{
  constructor(
    public targetObject: EntityReference,
    public payload: string,
    public eventType: number
  ) {
    super("msdyn_upsertSalesRoutingDiagnostic");
  }

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_upsertSalesRoutingDiagnosticResponse> {
    // No return value (204 No Content)
    return new msdyn_upsertSalesRoutingDiagnosticResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      TargetObject: this.targetObject,
      Payload: this.payload,
      EventType: this.eventType,
    };
  }
}

/**
 * msdyn_upsertSalesRoutingDiagnostic response message
 */
export class msdyn_upsertSalesRoutingDiagnosticResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_upsertSalesRoutingDiagnostic");
  }

  static fromResponse(_data: unknown): msdyn_upsertSalesRoutingDiagnosticResponse {
    return new msdyn_upsertSalesRoutingDiagnosticResponse();
  }
}

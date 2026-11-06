import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_upsertSalesRoutingDiagnostic message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_upsertSalesRoutingDiagnosticRequestParameters {
  TargetObject: EntityReference | AnyEntityPayload;
  Payload: string;
  EventType: number;
}

/**
 * msdyn_upsertSalesRoutingDiagnostic request message
 *
 * Web API Action: msdyn_upsertSalesRoutingDiagnostic
 */
export class msdyn_upsertSalesRoutingDiagnosticRequest
  extends OrganizationRequest
  implements Executable<msdyn_upsertSalesRoutingDiagnosticResponse>
{
  declare readonly Parameters: Readonly<msdyn_upsertSalesRoutingDiagnosticRequestParameters>;

  constructor(parameters: msdyn_upsertSalesRoutingDiagnosticRequestParameters) {
    super("msdyn_upsertSalesRoutingDiagnostic", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_upsertSalesRoutingDiagnostic`;

    const body = requestBody({
      TargetObject: this.Parameters.TargetObject,
      Payload: this.Parameters.Payload,
      EventType: this.Parameters.EventType,
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
    // No return value (204 No Content)
    return new msdyn_upsertSalesRoutingDiagnosticResponse();
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

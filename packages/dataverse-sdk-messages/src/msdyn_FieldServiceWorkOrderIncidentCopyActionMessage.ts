import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceWorkOrderIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderIncidentCopyAction
 */
export class msdyn_FieldServiceWorkOrderIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse>
{
  constructor(
    public msdyn_workorderincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceWorkOrderIncidentCopyAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentCopyAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceWorkOrderIncidentCopyActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_workorderincidentId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceWorkOrderIncidentCopyAction response message
 */
export class msdyn_FieldServiceWorkOrderIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderIncidentCopyActionResponse) {
    super("msdyn_FieldServiceWorkOrderIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderIncidentCopyActionResponse {
    return new msdyn_FieldServiceWorkOrderIncidentCopyActionResponse((data as any).value);
  }
}

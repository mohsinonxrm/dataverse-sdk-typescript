import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceWorkOrderIncidentStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderIncidentStatusAction
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse>
{
  constructor(
    public msdyn_workorderincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceWorkOrderIncidentStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentStatusAction`;

    const body: Record<string, unknown> = {
      Type: this.type,
      InputParameter: this.inputParameter,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceWorkOrderIncidentStatusActionResponse.fromResponse(data);
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
 * msdyn_FieldServiceWorkOrderIncidentStatusAction response message
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderIncidentStatusActionResponse) {
    super("msdyn_FieldServiceWorkOrderIncidentStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderIncidentStatusActionResponse {
    return new msdyn_FieldServiceWorkOrderIncidentStatusActionResponse((data as any).value);
  }
}

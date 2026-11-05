import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceWorkOrderIncidentCopyActionResponse as msdyn_FieldServiceWorkOrderIncidentCopyActionResponseData } from "./types/index.js";

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
        "content-type": "application/json",
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
}

/**
 * msdyn_FieldServiceWorkOrderIncidentCopyAction response message
 */
export class msdyn_FieldServiceWorkOrderIncidentCopyActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderIncidentCopyActionResponseData) {
    super("msdyn_FieldServiceWorkOrderIncidentCopyAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderIncidentCopyActionResponse {
    return new msdyn_FieldServiceWorkOrderIncidentCopyActionResponse(
      responseObject<msdyn_FieldServiceWorkOrderIncidentCopyActionResponseData>(data)
    );
  }
}

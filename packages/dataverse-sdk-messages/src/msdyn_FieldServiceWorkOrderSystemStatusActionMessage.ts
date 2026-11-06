import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceWorkOrderSystemStatusActionResponse as msdyn_FieldServiceWorkOrderSystemStatusActionResponseData } from "./types/index.js";

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderSystemStatusAction
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderSystemStatusActionResponse>
{
  constructor(
    public msdyn_workorderId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceWorkOrderSystemStatusAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorders(${this.msdyn_workorderId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderSystemStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceWorkOrderSystemStatusActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction response message
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderSystemStatusActionResponseData) {
    super("msdyn_FieldServiceWorkOrderSystemStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderSystemStatusActionResponse {
    return new msdyn_FieldServiceWorkOrderSystemStatusActionResponse(
      responseObject<msdyn_FieldServiceWorkOrderSystemStatusActionResponseData>(data)
    );
  }
}

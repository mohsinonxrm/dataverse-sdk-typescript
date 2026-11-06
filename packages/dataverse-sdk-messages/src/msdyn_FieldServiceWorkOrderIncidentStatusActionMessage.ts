import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceWorkOrderIncidentStatusActionResponse as msdyn_FieldServiceWorkOrderIncidentStatusActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceWorkOrderIncidentStatusAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceWorkOrderIncidentStatusActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderIncidentStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderIncidentStatusAction
 *
 * The first argument is the id of the msdyn_workorderincident record to call it on.
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceWorkOrderIncidentStatusActionRequestParameters>;

  constructor(
    public msdyn_workorderincidentId: string,
    parameters: msdyn_FieldServiceWorkOrderIncidentStatusActionRequestParameters
  ) {
    super("msdyn_FieldServiceWorkOrderIncidentStatusAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentStatusAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_FieldServiceWorkOrderIncidentStatusActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceWorkOrderIncidentStatusActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_FieldServiceWorkOrderIncidentStatusAction response message
 */
export class msdyn_FieldServiceWorkOrderIncidentStatusActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceWorkOrderIncidentStatusActionResponseData) {
    super("msdyn_FieldServiceWorkOrderIncidentStatusAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceWorkOrderIncidentStatusActionResponse {
    return new msdyn_FieldServiceWorkOrderIncidentStatusActionResponse(
      responseObject<msdyn_FieldServiceWorkOrderIncidentStatusActionResponseData>(data)
    );
  }
}

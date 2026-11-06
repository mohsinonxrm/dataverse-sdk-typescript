import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceWorkOrderIncidentCopyActionResponse as msdyn_FieldServiceWorkOrderIncidentCopyActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceWorkOrderIncidentCopyAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceWorkOrderIncidentCopyActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderIncidentCopyAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderIncidentCopyAction
 *
 * The first argument is the id of the msdyn_workorderincident record to call it on.
 */
export class msdyn_FieldServiceWorkOrderIncidentCopyActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceWorkOrderIncidentCopyActionRequestParameters>;

  constructor(
    public msdyn_workorderincidentId: string,
    parameters: msdyn_FieldServiceWorkOrderIncidentCopyActionRequestParameters
  ) {
    super("msdyn_FieldServiceWorkOrderIncidentCopyAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderIncidentCopyAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderIncidentCopyActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FieldServiceWorkOrderIncidentCopyActionResponse.fromResponse({});
    return msdyn_FieldServiceWorkOrderIncidentCopyActionResponse.fromResponse(
      await response.json()
    );
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

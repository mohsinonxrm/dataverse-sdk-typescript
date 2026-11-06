import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceWorkOrderSystemStatusActionResponse as msdyn_FieldServiceWorkOrderSystemStatusActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceWorkOrderSystemStatusAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceWorkOrderSystemStatusActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceWorkOrderSystemStatusAction request message
 *
 * Web API Action: msdyn_FieldServiceWorkOrderSystemStatusAction
 *
 * The first argument is the id of the msdyn_workorder record to call it on.
 */
export class msdyn_FieldServiceWorkOrderSystemStatusActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceWorkOrderSystemStatusActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceWorkOrderSystemStatusActionRequestParameters>;

  constructor(
    public msdyn_workorderId: string,
    parameters: msdyn_FieldServiceWorkOrderSystemStatusActionRequestParameters
  ) {
    super("msdyn_FieldServiceWorkOrderSystemStatusAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorders(${this.msdyn_workorderId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceWorkOrderSystemStatusAction`;

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
  ): Promise<msdyn_FieldServiceWorkOrderSystemStatusActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceWorkOrderSystemStatusActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
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

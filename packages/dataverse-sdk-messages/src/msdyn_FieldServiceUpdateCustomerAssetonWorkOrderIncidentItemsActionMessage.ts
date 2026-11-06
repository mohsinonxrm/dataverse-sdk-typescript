import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse as msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction request message
 *
 * Web API Action: msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction
 *
 * The first argument is the id of the msdyn_workorderincident record to call it on.
 */
export class msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequestParameters>;

  constructor(
    public msdyn_workorderincidentId: string,
    parameters: msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequestParameters
  ) {
    super("msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction`;

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
  ): Promise<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction response message
 */
export class msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse extends OrganizationResponse {
  constructor(
    public result: msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponseData
  ) {
    super("msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse {
    return new msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse(
      responseObject<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponseData>(
        data
      )
    );
  }
}

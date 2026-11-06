import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse as msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponseData } from "./types/index.js";

/**
 * msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction request message
 *
 * Web API Action: msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction
 */
export class msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse>
{
  constructor(
    public msdyn_workorderincidentId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_workorderincidents(${this.msdyn_workorderincidentId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsAction`;

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
  ): Promise<msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceUpdateCustomerAssetonWorkOrderIncidentItemsActionResponse.fromResponse(
      data
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

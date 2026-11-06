import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceBookableResourceBookingAssociateActionResponse as msdyn_FieldServiceBookableResourceBookingAssociateActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceBookableResourceBookingAssociateAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceBookableResourceBookingAssociateActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction request message
 *
 * Web API Action: msdyn_FieldServiceBookableResourceBookingAssociateAction
 *
 * The first argument is the id of the bookableresourcebooking record to call it on.
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceBookableResourceBookingAssociateActionRequestParameters>;

  constructor(
    public bookableresourcebookingId: string,
    parameters: msdyn_FieldServiceBookableResourceBookingAssociateActionRequestParameters
  ) {
    super("msdyn_FieldServiceBookableResourceBookingAssociateAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresourcebookings(${this.bookableresourcebookingId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceBookableResourceBookingAssociateAction`;

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
  ): Promise<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_FieldServiceBookableResourceBookingAssociateActionResponse.fromResponse(
      text ? JSON.parse(text) : {}
    );
  }
}

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction response message
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceBookableResourceBookingAssociateActionResponseData) {
    super("msdyn_FieldServiceBookableResourceBookingAssociateAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FieldServiceBookableResourceBookingAssociateActionResponse {
    return new msdyn_FieldServiceBookableResourceBookingAssociateActionResponse(
      responseObject<msdyn_FieldServiceBookableResourceBookingAssociateActionResponseData>(data)
    );
  }
}

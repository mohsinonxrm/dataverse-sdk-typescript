import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction request message
 *
 * Web API Action: msdyn_FieldServiceBookableResourceBookingAssociateAction
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse>
{
  constructor(
    public bookableresourcebookingId: string,
    public type: number,
    public inputParameter: string
  ) {
    super("msdyn_FieldServiceBookableResourceBookingAssociateAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresourcebookings(${this.bookableresourcebookingId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceBookableResourceBookingAssociateAction`;

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
  ): Promise<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse> {
    const data = await response.json();
    return msdyn_FieldServiceBookableResourceBookingAssociateActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.bookableresourcebookingId,
      Type: this.type,
      InputParameter: this.inputParameter,
    };
  }
}

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction response message
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceBookableResourceBookingAssociateActionResponse) {
    super("msdyn_FieldServiceBookableResourceBookingAssociateAction");
  }

  static fromResponse(
    data: unknown
  ): msdyn_FieldServiceBookableResourceBookingAssociateActionResponse {
    return new msdyn_FieldServiceBookableResourceBookingAssociateActionResponse(
      (data as any).value
    );
  }
}

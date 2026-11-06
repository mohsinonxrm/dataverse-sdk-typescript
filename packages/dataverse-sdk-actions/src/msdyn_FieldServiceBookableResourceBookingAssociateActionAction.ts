import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FieldServiceBookableResourceBookingAssociateAction action
 */
export interface msdyn_FieldServiceBookableResourceBookingAssociateActionResponse {
  OutputParameter: string;
}

/**
 * Parameters of the msdyn_FieldServiceBookableResourceBookingAssociateAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceBookableResourceBookingAssociateActionActionParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceBookableResourceBookingAssociateAction action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bookableresourcebooking)
 *
 * The first argument is the id of the bookableresourcebooking record to call it on.
 */
export class msdyn_FieldServiceBookableResourceBookingAssociateActionAction implements Executable<msdyn_FieldServiceBookableResourceBookingAssociateActionResponse> {
  constructor(
    public readonly bookableresourcebookingId: string,
    public readonly parameters: msdyn_FieldServiceBookableResourceBookingAssociateActionActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bookableresourcebookings(${this.bookableresourcebookingId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceBookableResourceBookingAssociateAction`;

    const body = requestBody({
      Type: this.parameters.Type,
      InputParameter: this.parameters.InputParameter,
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
    return (
      text ? JSON.parse(text) : {}
    ) as msdyn_FieldServiceBookableResourceBookingAssociateActionResponse;
  }
}

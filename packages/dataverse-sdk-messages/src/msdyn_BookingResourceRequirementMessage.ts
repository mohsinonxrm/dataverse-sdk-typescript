import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_BookingResourceRequirementResponse as msdyn_BookingResourceRequirementResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BookingResourceRequirement message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookingResourceRequirementRequestParameters {
  ResourceId: string;
  BookingStatusId: string;
  BookingMethod: number;
  BookingType: number;
  StartDateTime: string;
  EndDateTime: string;
  Timeframe?: number;
  Hours?: number;
  Percentage?: number;
}

/**
 * msdyn_BookingResourceRequirement request message
 *
 * Web API Action: msdyn_BookingResourceRequirement
 *
 * The first argument is the id of the msdyn_resourcerequirement record to call it on.
 */
export class msdyn_BookingResourceRequirementRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookingResourceRequirementResponse>
{
  declare readonly Parameters: Readonly<msdyn_BookingResourceRequirementRequestParameters>;

  constructor(
    public msdyn_resourcerequirementId: string,
    parameters: msdyn_BookingResourceRequirementRequestParameters
  ) {
    super("msdyn_BookingResourceRequirement", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_resourcerequirements(${this.msdyn_resourcerequirementId})/Microsoft.Dynamics.CRM.msdyn_BookingResourceRequirement`;

    const body = requestBody({
      ResourceId: this.Parameters.ResourceId,
      BookingStatusId: this.Parameters.BookingStatusId,
      BookingMethod: this.Parameters.BookingMethod,
      BookingType: this.Parameters.BookingType,
      StartDateTime: this.Parameters.StartDateTime,
      EndDateTime: this.Parameters.EndDateTime,
      Timeframe: this.Parameters.Timeframe,
      Hours: this.Parameters.Hours,
      Percentage: this.Parameters.Percentage,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceRequirementResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_BookingResourceRequirementResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_BookingResourceRequirement response message
 */
export class msdyn_BookingResourceRequirementResponse extends OrganizationResponse {
  constructor(public result: msdyn_BookingResourceRequirementResponseData) {
    super("msdyn_BookingResourceRequirement");
  }

  static fromResponse(data: unknown): msdyn_BookingResourceRequirementResponse {
    return new msdyn_BookingResourceRequirementResponse(
      responseObject<msdyn_BookingResourceRequirementResponseData>(data)
    );
  }
}

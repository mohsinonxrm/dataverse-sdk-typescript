import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_LeadSqaResultUserActionResponse as msdyn_LeadSqaResultUserActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_LeadSqaResultUserAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LeadSqaResultUserActionRequestParameters {
  Action: string;
  ActionId: string;
  IsCallFromNba?: boolean;
  LeadId: string;
}

/**
 * msdyn_LeadSqaResultUserAction request message
 *
 * Web API Action: msdyn_LeadSqaResultUserAction
 */
export class msdyn_LeadSqaResultUserActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_LeadSqaResultUserActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_LeadSqaResultUserActionRequestParameters>;

  constructor(parameters: msdyn_LeadSqaResultUserActionRequestParameters) {
    super("msdyn_LeadSqaResultUserAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LeadSqaResultUserAction`;

    const body = requestBody({
      Action: this.Parameters.Action,
      ActionId: this.Parameters.ActionId,
      IsCallFromNba: this.Parameters.IsCallFromNba,
      LeadId: this.Parameters.LeadId,
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

  async parseResponse(response: Response): Promise<msdyn_LeadSqaResultUserActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_LeadSqaResultUserActionResponse.fromResponse({});
    return msdyn_LeadSqaResultUserActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_LeadSqaResultUserAction response message
 */
export class msdyn_LeadSqaResultUserActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_LeadSqaResultUserActionResponseData) {
    super("msdyn_LeadSqaResultUserAction");
  }

  static fromResponse(data: unknown): msdyn_LeadSqaResultUserActionResponse {
    return new msdyn_LeadSqaResultUserActionResponse(
      responseObject<msdyn_LeadSqaResultUserActionResponseData>(data)
    );
  }
}

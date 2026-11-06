import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_SalesOutlookMeetingPreparationResponse as msdyn_SalesOutlookMeetingPreparationResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_SalesOutlookMeetingPreparation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOutlookMeetingPreparationRequestParameters {
  msdyn_type: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesOutlookMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesOutlookMeetingPreparation
 */
export class msdyn_SalesOutlookMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOutlookMeetingPreparationResponse>
{
  declare readonly Parameters: Readonly<msdyn_SalesOutlookMeetingPreparationRequestParameters>;

  constructor(parameters: msdyn_SalesOutlookMeetingPreparationRequestParameters) {
    super("msdyn_SalesOutlookMeetingPreparation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOutlookMeetingPreparation`;

    const body = requestBody({
      msdyn_type: this.Parameters.msdyn_type,
      msdyn_id: this.Parameters.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_SalesOutlookMeetingPreparationResponse.fromResponse({});
    return msdyn_SalesOutlookMeetingPreparationResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SalesOutlookMeetingPreparation response message
 */
export class msdyn_SalesOutlookMeetingPreparationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOutlookMeetingPreparationResponseData) {
    super("msdyn_SalesOutlookMeetingPreparation");
  }

  static fromResponse(data: unknown): msdyn_SalesOutlookMeetingPreparationResponse {
    return new msdyn_SalesOutlookMeetingPreparationResponse(
      responseObject<msdyn_SalesOutlookMeetingPreparationResponseData>(data)
    );
  }
}

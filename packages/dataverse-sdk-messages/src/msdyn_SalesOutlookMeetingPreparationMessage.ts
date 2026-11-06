import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_SalesOutlookMeetingPreparationResponse as msdyn_SalesOutlookMeetingPreparationResponseData } from "./types/index.js";

/**
 * msdyn_SalesOutlookMeetingPreparation request message
 *
 * Web API Action: msdyn_SalesOutlookMeetingPreparation
 */
export class msdyn_SalesOutlookMeetingPreparationRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesOutlookMeetingPreparationResponse>
{
  constructor(
    public msdyn_type: string,
    public msdyn_id: string
  ) {
    super("msdyn_SalesOutlookMeetingPreparation");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOutlookMeetingPreparation`;

    const body: Record<string, unknown> = {
      msdyn_type: this.msdyn_type,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    const data = await response.json();
    return msdyn_SalesOutlookMeetingPreparationResponse.fromResponse(data);
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

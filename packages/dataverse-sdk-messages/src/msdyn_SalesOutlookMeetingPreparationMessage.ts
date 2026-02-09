import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    const data = await response.json();
    return msdyn_SalesOutlookMeetingPreparationResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_type: this.msdyn_type,
      msdyn_id: this.msdyn_id,
    };
  }
}

/**
 * msdyn_SalesOutlookMeetingPreparation response message
 */
export class msdyn_SalesOutlookMeetingPreparationResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesOutlookMeetingPreparationResponse) {
    super("msdyn_SalesOutlookMeetingPreparation");
  }

  static fromResponse(data: unknown): msdyn_SalesOutlookMeetingPreparationResponse {
    return new msdyn_SalesOutlookMeetingPreparationResponse((data as any).value);
  }
}

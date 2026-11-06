import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_LoadCalendarsResponse as msdyn_LoadCalendarsResponseData } from "./types/index.js";

/**
 * msdyn_LoadCalendars request message
 *
 * Web API Action: msdyn_LoadCalendars
 */
export class msdyn_LoadCalendarsRequest
  extends OrganizationRequest
  implements Executable<msdyn_LoadCalendarsResponse>
{
  constructor(public loadCalendarsInput: string) {
    super("msdyn_LoadCalendars");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body: Record<string, unknown> = {
      LoadCalendarsInput: this.loadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    const data = await response.json();
    return msdyn_LoadCalendarsResponse.fromResponse(data);
  }
}

/**
 * msdyn_LoadCalendars response message
 */
export class msdyn_LoadCalendarsResponse extends OrganizationResponse {
  constructor(public result: msdyn_LoadCalendarsResponseData) {
    super("msdyn_LoadCalendars");
  }

  static fromResponse(data: unknown): msdyn_LoadCalendarsResponse {
    return new msdyn_LoadCalendarsResponse(responseObject<msdyn_LoadCalendarsResponseData>(data));
  }
}

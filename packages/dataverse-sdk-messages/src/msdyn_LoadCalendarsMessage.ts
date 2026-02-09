import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    const data = await response.json();
    return msdyn_LoadCalendarsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      LoadCalendarsInput: this.loadCalendarsInput,
    };
  }
}

/**
 * msdyn_LoadCalendars response message
 */
export class msdyn_LoadCalendarsResponse extends OrganizationResponse {
  constructor(public result: msdyn_LoadCalendarsResponse) {
    super("msdyn_LoadCalendars");
  }

  static fromResponse(data: unknown): msdyn_LoadCalendarsResponse {
    return new msdyn_LoadCalendarsResponse((data as any).value);
  }
}

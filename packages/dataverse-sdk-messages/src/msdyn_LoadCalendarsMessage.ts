import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_LoadCalendarsResponse as msdyn_LoadCalendarsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_LoadCalendars message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LoadCalendarsRequestParameters {
  LoadCalendarsInput: string;
}

/**
 * msdyn_LoadCalendars request message
 *
 * Web API Action: msdyn_LoadCalendars
 */
export class msdyn_LoadCalendarsRequest
  extends OrganizationRequest
  implements Executable<msdyn_LoadCalendarsResponse>
{
  declare readonly Parameters: Readonly<msdyn_LoadCalendarsRequestParameters>;

  constructor(parameters: msdyn_LoadCalendarsRequestParameters) {
    super("msdyn_LoadCalendars", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body = requestBody({
      LoadCalendarsInput: this.Parameters.LoadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_LoadCalendarsResponse.fromResponse({});
    return msdyn_LoadCalendarsResponse.fromResponse(await response.json());
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

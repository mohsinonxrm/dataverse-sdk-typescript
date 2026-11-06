import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveActivitiesResponse as msdyn_RetrieveActivitiesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveActivities message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveActivitiesRequestParameters {
  FetchXml: string;
  ClientType: number;
}

/**
 * msdyn_RetrieveActivities request message
 *
 * Web API Action: msdyn_RetrieveActivities
 */
export class msdyn_RetrieveActivitiesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveActivitiesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveActivitiesRequestParameters>;

  constructor(parameters: msdyn_RetrieveActivitiesRequestParameters) {
    super("msdyn_RetrieveActivities", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveActivities`;

    const body = requestBody({
      FetchXml: this.Parameters.FetchXml,
      ClientType: this.Parameters.ClientType,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveActivitiesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrieveActivitiesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrieveActivities response message
 */
export class msdyn_RetrieveActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivitiesResponseData) {
    super("msdyn_RetrieveActivities");
  }

  static fromResponse(data: unknown): msdyn_RetrieveActivitiesResponse {
    return new msdyn_RetrieveActivitiesResponse(
      responseObject<msdyn_RetrieveActivitiesResponseData>(data)
    );
  }
}

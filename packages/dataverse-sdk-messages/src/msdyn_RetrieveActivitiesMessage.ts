import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveActivitiesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveActivities action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveActivitiesResult {
  "@odata.context"?: string;
  ActivityList: string;
}

/**
 * msdyn_RetrieveActivities response message
 *
 * `result` is the value the msdyn_RetrieveActivities action returns (see {@link msdyn_RetrieveActivitiesResult}).
 */
export class msdyn_RetrieveActivitiesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveActivitiesResult) {
    super("msdyn_RetrieveActivities");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveActivitiesResponse {
    return new msdyn_RetrieveActivitiesResponse(data as msdyn_RetrieveActivitiesResult);
  }
}

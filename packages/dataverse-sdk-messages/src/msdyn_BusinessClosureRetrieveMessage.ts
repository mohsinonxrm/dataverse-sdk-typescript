import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * Parameters of the msdyn_BusinessClosureRetrieve message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureRetrieveRequestParameters {
  Id: string;
}

/**
 * msdyn_BusinessClosureRetrieve request message
 *
 * Web API Action: msdyn_BusinessClosureRetrieve
 */
export class msdyn_BusinessClosureRetrieveRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureRetrieveResponse>
{
  declare readonly Parameters: Readonly<msdyn_BusinessClosureRetrieveRequestParameters>;

  constructor(parameters: msdyn_BusinessClosureRetrieveRequestParameters) {
    super("msdyn_BusinessClosureRetrieve", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body = requestBody({
      Id: this.Parameters.Id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_BusinessClosureRetrieveResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_BusinessClosureRetrieve response message
 */
export class msdyn_BusinessClosureRetrieveResponse extends OrganizationResponse {
  constructor(public result: msdyn_businessclosure) {
    super("msdyn_BusinessClosureRetrieve");
  }

  static fromResponse(data: unknown): msdyn_BusinessClosureRetrieveResponse {
    return new msdyn_BusinessClosureRetrieveResponse(responseObject<msdyn_businessclosure>(data));
  }
}

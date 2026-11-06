import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_businessclosure } from "./types/index.js";

/**
 * msdyn_BusinessClosureRetrieve request message
 *
 * Web API Action: msdyn_BusinessClosureRetrieve
 */
export class msdyn_BusinessClosureRetrieveRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureRetrieveResponse>
{
  constructor(public id: string) {
    super("msdyn_BusinessClosureRetrieve");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureRetrieve`;

    const body: Record<string, unknown> = {
      Id: this.id,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureRetrieveResponse> {
    const data = await response.json();
    return msdyn_BusinessClosureRetrieveResponse.fromResponse(data);
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

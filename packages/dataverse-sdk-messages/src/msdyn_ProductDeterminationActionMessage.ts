import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ProductDeterminationActionResponse as msdyn_ProductDeterminationActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ProductDeterminationAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ProductDeterminationActionRequestParameters {
  RequestPayload: string;
  SearchIteration: string;
}

/**
 * msdyn_ProductDeterminationAction request message
 *
 * Web API Action: msdyn_ProductDeterminationAction
 */
export class msdyn_ProductDeterminationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProductDeterminationActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_ProductDeterminationActionRequestParameters>;

  constructor(parameters: msdyn_ProductDeterminationActionRequestParameters) {
    super("msdyn_ProductDeterminationAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationAction`;

    const body = requestBody({
      RequestPayload: this.Parameters.RequestPayload,
      SearchIteration: this.Parameters.SearchIteration,
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

  async parseResponse(response: Response): Promise<msdyn_ProductDeterminationActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ProductDeterminationActionResponse.fromResponse({});
    return msdyn_ProductDeterminationActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ProductDeterminationAction response message
 */
export class msdyn_ProductDeterminationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationActionResponseData) {
    super("msdyn_ProductDeterminationAction");
  }

  static fromResponse(data: unknown): msdyn_ProductDeterminationActionResponse {
    return new msdyn_ProductDeterminationActionResponse(
      responseObject<msdyn_ProductDeterminationActionResponseData>(data)
    );
  }
}

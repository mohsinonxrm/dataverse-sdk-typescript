import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ParseKBResultResponse as msdyn_ParseKBResultResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ParseKBResult message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ParseKBResultRequestParameters {
  DoesKBExistInExternalResult: string;
  ExternalSourceKBSearchResult: string;
}

/**
 * msdyn_ParseKBResult request message
 *
 * Web API Action: msdyn_ParseKBResult
 */
export class msdyn_ParseKBResultRequest
  extends OrganizationRequest
  implements Executable<msdyn_ParseKBResultResponse>
{
  declare readonly Parameters: Readonly<msdyn_ParseKBResultRequestParameters>;

  constructor(parameters: msdyn_ParseKBResultRequestParameters) {
    super("msdyn_ParseKBResult", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ParseKBResult`;

    const body = requestBody({
      DoesKBExistInExternalResult: this.Parameters.DoesKBExistInExternalResult,
      ExternalSourceKBSearchResult: this.Parameters.ExternalSourceKBSearchResult,
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

  async parseResponse(response: Response): Promise<msdyn_ParseKBResultResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_ParseKBResultResponse.fromResponse({});
    return msdyn_ParseKBResultResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_ParseKBResult response message
 */
export class msdyn_ParseKBResultResponse extends OrganizationResponse {
  constructor(public result: msdyn_ParseKBResultResponseData) {
    super("msdyn_ParseKBResult");
  }

  static fromResponse(data: unknown): msdyn_ParseKBResultResponse {
    return new msdyn_ParseKBResultResponse(responseObject<msdyn_ParseKBResultResponseData>(data));
  }
}

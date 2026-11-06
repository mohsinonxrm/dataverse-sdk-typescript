import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetFieldCandidatesResponse as msdyn_GetFieldCandidatesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetFieldCandidates message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFieldCandidatesRequestParameters {
  msdyn_FetchFailed?: boolean;
  msdyn_CorrelationId?: string;
  msdyn_RunId: string;
  msdyn_PublishedMode?: boolean;
}

/**
 * msdyn_GetFieldCandidates request message
 *
 * Web API Action: msdyn_GetFieldCandidates
 */
export class msdyn_GetFieldCandidatesRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFieldCandidatesResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFieldCandidatesRequestParameters>;

  constructor(parameters: msdyn_GetFieldCandidatesRequestParameters) {
    super("msdyn_GetFieldCandidates", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFieldCandidates`;

    const body = requestBody({
      msdyn_FetchFailed: this.Parameters.msdyn_FetchFailed,
      msdyn_CorrelationId: this.Parameters.msdyn_CorrelationId,
      msdyn_RunId: this.Parameters.msdyn_RunId,
      msdyn_PublishedMode: this.Parameters.msdyn_PublishedMode,
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

  async parseResponse(response: Response): Promise<msdyn_GetFieldCandidatesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetFieldCandidatesResponse.fromResponse({});
    return msdyn_GetFieldCandidatesResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetFieldCandidates response message
 */
export class msdyn_GetFieldCandidatesResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetFieldCandidatesResponseData) {
    super("msdyn_GetFieldCandidates");
  }

  static fromResponse(data: unknown): msdyn_GetFieldCandidatesResponse {
    return new msdyn_GetFieldCandidatesResponse(
      responseObject<msdyn_GetFieldCandidatesResponseData>(data)
    );
  }
}

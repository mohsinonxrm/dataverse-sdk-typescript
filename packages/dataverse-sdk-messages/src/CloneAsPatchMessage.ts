import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CloneAsPatchResponse as CloneAsPatchResponseData } from "./types/index.js";

/**
 * Parameters of the CloneAsPatch message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsPatchRequestParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsPatch request message
 *
 * Web API Action: CloneAsPatch
 */
export class CloneAsPatchRequest
  extends OrganizationRequest
  implements Executable<CloneAsPatchResponse>
{
  declare readonly Parameters: Readonly<CloneAsPatchRequestParameters>;

  constructor(parameters: CloneAsPatchRequestParameters) {
    super("CloneAsPatch", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsPatch`;

    const body = requestBody({
      ParentSolutionUniqueName: this.Parameters.ParentSolutionUniqueName,
      DisplayName: this.Parameters.DisplayName,
      VersionNumber: this.Parameters.VersionNumber,
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

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CloneAsPatchResponse.fromResponse({});
    return CloneAsPatchResponse.fromResponse(await response.json());
  }
}

/**
 * CloneAsPatch response message
 */
export class CloneAsPatchResponse extends OrganizationResponse {
  constructor(public result: CloneAsPatchResponseData) {
    super("CloneAsPatch");
  }

  static fromResponse(data: unknown): CloneAsPatchResponse {
    return new CloneAsPatchResponse(responseObject<CloneAsPatchResponseData>(data));
  }
}

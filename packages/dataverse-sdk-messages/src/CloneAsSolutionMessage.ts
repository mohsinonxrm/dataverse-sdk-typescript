import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CloneAsSolutionResponse as CloneAsSolutionResponseData } from "./types/index.js";

/**
 * Parameters of the CloneAsSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CloneAsSolutionRequestParameters {
  ParentSolutionUniqueName: string;
  DisplayName: string;
  VersionNumber: string;
}

/**
 * CloneAsSolution request message
 *
 * Web API Action: CloneAsSolution
 */
export class CloneAsSolutionRequest
  extends OrganizationRequest
  implements Executable<CloneAsSolutionResponse>
{
  declare readonly Parameters: Readonly<CloneAsSolutionRequestParameters>;

  constructor(parameters: CloneAsSolutionRequestParameters) {
    super("CloneAsSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsSolution`;

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

  async parseResponse(response: Response): Promise<CloneAsSolutionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CloneAsSolutionResponse.fromResponse({});
    return CloneAsSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * CloneAsSolution response message
 */
export class CloneAsSolutionResponse extends OrganizationResponse {
  constructor(public result: CloneAsSolutionResponseData) {
    super("CloneAsSolution");
  }

  static fromResponse(data: unknown): CloneAsSolutionResponse {
    return new CloneAsSolutionResponse(responseObject<CloneAsSolutionResponseData>(data));
  }
}

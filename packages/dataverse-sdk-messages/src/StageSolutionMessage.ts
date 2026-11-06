import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { StageSolutionResponse as StageSolutionResponseData } from "./types/index.js";

/**
 * Parameters of the StageSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface StageSolutionRequestParameters {
  CustomizationFile: string;
  StageSolutionUploadId?: string;
}

/**
 * StageSolution request message
 *
 * Web API Action: StageSolution
 */
export class StageSolutionRequest
  extends OrganizationRequest
  implements Executable<StageSolutionResponse>
{
  declare readonly Parameters: Readonly<StageSolutionRequestParameters>;

  constructor(parameters: StageSolutionRequestParameters) {
    super("StageSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageSolution`;

    const body = requestBody({
      CustomizationFile: this.Parameters.CustomizationFile,
      StageSolutionUploadId: this.Parameters.StageSolutionUploadId,
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

  async parseResponse(response: Response): Promise<StageSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return StageSolutionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * StageSolution response message
 */
export class StageSolutionResponse extends OrganizationResponse {
  constructor(public result: StageSolutionResponseData) {
    super("StageSolution");
  }

  static fromResponse(data: unknown): StageSolutionResponse {
    return new StageSolutionResponse(responseObject<StageSolutionResponseData>(data));
  }
}

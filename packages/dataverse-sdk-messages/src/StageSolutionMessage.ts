import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { StageSolutionResponse as StageSolutionResponseData } from "./types/index.js";

/**
 * StageSolution request message
 *
 * Web API Action: StageSolution
 */
export class StageSolutionRequest
  extends OrganizationRequest
  implements Executable<StageSolutionResponse>
{
  constructor(
    public customizationFile: string,
    public stageSolutionUploadId?: string
  ) {
    super("StageSolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/StageSolution`;

    const body: Record<string, unknown> = {
      CustomizationFile: this.customizationFile,
      StageSolutionUploadId: this.stageSolutionUploadId,
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

  async parseResponse(response: Response): Promise<StageSolutionResponse> {
    const data = await response.json();
    return StageSolutionResponse.fromResponse(data);
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

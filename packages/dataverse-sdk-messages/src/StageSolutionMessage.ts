import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
    public stageSolutionUploadId: string
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

  toRequestBody(): Record<string, unknown> {
    return {
      CustomizationFile: this.customizationFile,
      StageSolutionUploadId: this.stageSolutionUploadId,
    };
  }
}

/**
 * StageSolution response message
 */
export class StageSolutionResponse extends OrganizationResponse {
  constructor(public result: StageSolutionResponse) {
    super("StageSolution");
  }

  static fromResponse(data: unknown): StageSolutionResponse {
    return new StageSolutionResponse((data as any).value);
  }
}

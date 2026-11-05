import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CloneAsSolution request message
 *
 * Web API Action: CloneAsSolution
 */
export class CloneAsSolutionRequest
  extends OrganizationRequest
  implements Executable<CloneAsSolutionResponse>
{
  constructor(
    public parentSolutionUniqueName: string,
    public displayName: string,
    public versionNumber: string
  ) {
    super("CloneAsSolution");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsSolution`;

    const body: Record<string, unknown> = {
      ParentSolutionUniqueName: this.parentSolutionUniqueName,
      DisplayName: this.displayName,
      VersionNumber: this.versionNumber,
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

  async parseResponse(response: Response): Promise<CloneAsSolutionResponse> {
    const data = await response.json();
    return CloneAsSolutionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ParentSolutionUniqueName: this.parentSolutionUniqueName,
      DisplayName: this.displayName,
      VersionNumber: this.versionNumber,
    };
  }
}

/**
 * CloneAsSolution response message
 */
export class CloneAsSolutionResponse extends OrganizationResponse {
  constructor(public result: CloneAsSolutionResponse) {
    super("CloneAsSolution");
  }

  static fromResponse(data: unknown): CloneAsSolutionResponse {
    return new CloneAsSolutionResponse((data as any).value);
  }
}

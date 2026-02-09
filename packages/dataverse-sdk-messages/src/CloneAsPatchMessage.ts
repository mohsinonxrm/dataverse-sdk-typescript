import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CloneAsPatch request message
 *
 * Web API Action: CloneAsPatch
 */
export class CloneAsPatchRequest
  extends OrganizationRequest
  implements Executable<CloneAsPatchResponse>
{
  constructor(
    public parentSolutionUniqueName: string,
    public displayName: string,
    public versionNumber: string
  ) {
    super("CloneAsPatch");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CloneAsPatch`;

    const body: Record<string, unknown> = {
      ParentSolutionUniqueName: this.parentSolutionUniqueName,
      DisplayName: this.displayName,
      VersionNumber: this.versionNumber,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    const data = await response.json();
    return CloneAsPatchResponse.fromResponse(data);
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
 * CloneAsPatch response message
 */
export class CloneAsPatchResponse extends OrganizationResponse {
  constructor(public result: CloneAsPatchResponse) {
    super("CloneAsPatch");
  }

  static fromResponse(data: unknown): CloneAsPatchResponse {
    return new CloneAsPatchResponse((data as any).value);
  }
}

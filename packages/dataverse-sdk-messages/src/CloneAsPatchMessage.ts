import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CloneAsPatchResponse as CloneAsPatchResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CloneAsPatchResponse> {
    const data = await response.json();
    return CloneAsPatchResponse.fromResponse(data);
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

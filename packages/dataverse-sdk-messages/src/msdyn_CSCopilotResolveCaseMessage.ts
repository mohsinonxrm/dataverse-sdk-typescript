import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_CSCopilotResolveCaseResponse as msdyn_CSCopilotResolveCaseResponseData } from "./types/index.js";

/**
 * msdyn_CSCopilotResolveCase request message
 *
 * Web API Action: msdyn_CSCopilotResolveCase
 */
export class msdyn_CSCopilotResolveCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCopilotResolveCaseResponse>
{
  constructor(
    public incident: EntityReference,
    public resolutionReason: number,
    public callerIdentifier: string,
    public statusReason: number
  ) {
    super("msdyn_CSCopilotResolveCase");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCopilotResolveCase`;

    const body: Record<string, unknown> = {
      Incident: this.incident,
      ResolutionReason: this.resolutionReason,
      CallerIdentifier: this.callerIdentifier,
      StatusReason: this.statusReason,
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

  async parseResponse(response: Response): Promise<msdyn_CSCopilotResolveCaseResponse> {
    const data = await response.json();
    return msdyn_CSCopilotResolveCaseResponse.fromResponse(data);
  }
}

/**
 * msdyn_CSCopilotResolveCase response message
 */
export class msdyn_CSCopilotResolveCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCopilotResolveCaseResponseData) {
    super("msdyn_CSCopilotResolveCase");
  }

  static fromResponse(data: unknown): msdyn_CSCopilotResolveCaseResponse {
    return new msdyn_CSCopilotResolveCaseResponse(
      responseObject<msdyn_CSCopilotResolveCaseResponseData>(data)
    );
  }
}

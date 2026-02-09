import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CSCopilotResolveCaseResponse> {
    const data = await response.json();
    return msdyn_CSCopilotResolveCaseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Incident: this.incident,
      ResolutionReason: this.resolutionReason,
      CallerIdentifier: this.callerIdentifier,
      StatusReason: this.statusReason,
    };
  }
}

/**
 * msdyn_CSCopilotResolveCase response message
 */
export class msdyn_CSCopilotResolveCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCopilotResolveCaseResponse) {
    super("msdyn_CSCopilotResolveCase");
  }

  static fromResponse(data: unknown): msdyn_CSCopilotResolveCaseResponse {
    return new msdyn_CSCopilotResolveCaseResponse((data as any).value);
  }
}

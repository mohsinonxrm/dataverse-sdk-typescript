import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ResolveTimezone request message
 *
 * Web API Action: msdyn_ResolveTimezone
 */
export class msdyn_ResolveTimezoneRequest
  extends OrganizationRequest
  implements Executable<msdyn_ResolveTimezoneResponse>
{
  constructor(
    public requirementIds: string,
    public userId: string
  ) {
    super("msdyn_ResolveTimezone");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResolveTimezone`;

    const body: Record<string, unknown> = {
      RequirementIds: this.requirementIds,
      UserId: this.userId,
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

  async parseResponse(response: Response): Promise<msdyn_ResolveTimezoneResponse> {
    const data = await response.json();
    return msdyn_ResolveTimezoneResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequirementIds: this.requirementIds,
      UserId: this.userId,
    };
  }
}

/**
 * msdyn_ResolveTimezone response message
 */
export class msdyn_ResolveTimezoneResponse extends OrganizationResponse {
  constructor(public result: msdyn_ResolveTimezoneResponse) {
    super("msdyn_ResolveTimezone");
  }

  static fromResponse(data: unknown): msdyn_ResolveTimezoneResponse {
    return new msdyn_ResolveTimezoneResponse((data as any).value);
  }
}

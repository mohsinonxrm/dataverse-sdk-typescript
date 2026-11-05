import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GeneratePlatformSummary request message
 *
 * Web API Action: msdyn_GeneratePlatformSummary
 */
export class msdyn_GeneratePlatformSummaryRequest
  extends OrganizationRequest
  implements Executable<msdyn_GeneratePlatformSummaryResponse>
{
  constructor(
    public clientContext: string,
    public otherData: string
  ) {
    super("msdyn_GeneratePlatformSummary");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GeneratePlatformSummary`;

    const body: Record<string, unknown> = {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
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

  async parseResponse(response: Response): Promise<msdyn_GeneratePlatformSummaryResponse> {
    const data = await response.json();
    return msdyn_GeneratePlatformSummaryResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      ClientContext: this.clientContext,
      OtherData: this.otherData,
    };
  }
}

/**
 * msdyn_GeneratePlatformSummary response message
 */
export class msdyn_GeneratePlatformSummaryResponse extends OrganizationResponse {
  constructor(public result: msdyn_GeneratePlatformSummaryResponse) {
    super("msdyn_GeneratePlatformSummary");
  }

  static fromResponse(data: unknown): msdyn_GeneratePlatformSummaryResponse {
    return new msdyn_GeneratePlatformSummaryResponse((data as any).value);
  }
}

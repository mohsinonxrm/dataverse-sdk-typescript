import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetSalesMeetings request message
 *
 * Web API Action: msdyn_GetSalesMeetings
 */
export class msdyn_GetSalesMeetingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetSalesMeetingsResponse>
{
  constructor(
    public msdyn_from: string,
    public msdyn_to: string
  ) {
    super("msdyn_GetSalesMeetings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesMeetings`;

    const body: Record<string, unknown> = {
      msdyn_from: this.msdyn_from,
      msdyn_to: this.msdyn_to,
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

  async parseResponse(response: Response): Promise<msdyn_GetSalesMeetingsResponse> {
    const data = await response.json();
    return msdyn_GetSalesMeetingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_from: this.msdyn_from,
      msdyn_to: this.msdyn_to,
    };
  }
}

/**
 * msdyn_GetSalesMeetings response message
 */
export class msdyn_GetSalesMeetingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetSalesMeetingsResponse) {
    super("msdyn_GetSalesMeetings");
  }

  static fromResponse(data: unknown): msdyn_GetSalesMeetingsResponse {
    return new msdyn_GetSalesMeetingsResponse((data as any).value);
  }
}

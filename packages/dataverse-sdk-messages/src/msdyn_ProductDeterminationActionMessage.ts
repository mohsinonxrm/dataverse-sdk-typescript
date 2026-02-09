import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ProductDeterminationAction request message
 *
 * Web API Action: msdyn_ProductDeterminationAction
 */
export class msdyn_ProductDeterminationActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_ProductDeterminationActionResponse>
{
  constructor(
    public requestPayload: string,
    public searchIteration: string
  ) {
    super("msdyn_ProductDeterminationAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ProductDeterminationAction`;

    const body: Record<string, unknown> = {
      RequestPayload: this.requestPayload,
      SearchIteration: this.searchIteration,
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

  async parseResponse(response: Response): Promise<msdyn_ProductDeterminationActionResponse> {
    const data = await response.json();
    return msdyn_ProductDeterminationActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RequestPayload: this.requestPayload,
      SearchIteration: this.searchIteration,
    };
  }
}

/**
 * msdyn_ProductDeterminationAction response message
 */
export class msdyn_ProductDeterminationActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_ProductDeterminationActionResponse) {
    super("msdyn_ProductDeterminationAction");
  }

  static fromResponse(data: unknown): msdyn_ProductDeterminationActionResponse {
    return new msdyn_ProductDeterminationActionResponse((data as any).value);
  }
}

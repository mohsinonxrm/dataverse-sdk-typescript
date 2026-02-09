import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_SalesAdaptiveCardResponse request message
 *
 * Web API Action: msdyn_SalesAdaptiveCardResponse
 */
export class msdyn_SalesAdaptiveCardResponseRequest
  extends OrganizationRequest
  implements Executable<msdyn_SalesAdaptiveCardResponseResponse>
{
  constructor(
    public msdyn_query: string,
    public msdyn_id: string,
    public msdyn_scenario: number
  ) {
    super("msdyn_SalesAdaptiveCardResponse");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAdaptiveCardResponse`;

    const body: Record<string, unknown> = {
      msdyn_query: this.msdyn_query,
      msdyn_id: this.msdyn_id,
      msdyn_scenario: this.msdyn_scenario,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAdaptiveCardResponseResponse> {
    const data = await response.json();
    return msdyn_SalesAdaptiveCardResponseResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_query: this.msdyn_query,
      msdyn_id: this.msdyn_id,
      msdyn_scenario: this.msdyn_scenario,
    };
  }
}

/**
 * msdyn_SalesAdaptiveCardResponse response message
 */
export class msdyn_SalesAdaptiveCardResponseResponse extends OrganizationResponse {
  constructor(public result: msdyn_SalesAdaptiveCardResponseResponse) {
    super("msdyn_SalesAdaptiveCardResponse");
  }

  static fromResponse(data: unknown): msdyn_SalesAdaptiveCardResponseResponse {
    return new msdyn_SalesAdaptiveCardResponseResponse((data as any).value);
  }
}

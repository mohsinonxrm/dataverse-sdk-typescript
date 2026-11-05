import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_FilterInActiveNBACards request message
 *
 * Web API Action: msdyn_FilterInActiveNBACards
 */
export class msdyn_FilterInActiveNBACardsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FilterInActiveNBACardsResponse>
{
  constructor(public msdyn_NBAEntityIds: string) {
    super("msdyn_FilterInActiveNBACards");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FilterInActiveNBACards`;

    const body: Record<string, unknown> = {
      msdyn_NBAEntityIds: this.msdyn_NBAEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_FilterInActiveNBACardsResponse> {
    const data = await response.json();
    return msdyn_FilterInActiveNBACardsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_NBAEntityIds: this.msdyn_NBAEntityIds,
    };
  }
}

/**
 * msdyn_FilterInActiveNBACards response message
 */
export class msdyn_FilterInActiveNBACardsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FilterInActiveNBACardsResponse) {
    super("msdyn_FilterInActiveNBACards");
  }

  static fromResponse(data: unknown): msdyn_FilterInActiveNBACardsResponse {
    return new msdyn_FilterInActiveNBACardsResponse((data as any).value);
  }
}

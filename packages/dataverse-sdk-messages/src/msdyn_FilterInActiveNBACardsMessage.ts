import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FilterInActiveNBACardsResponse as msdyn_FilterInActiveNBACardsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FilterInActiveNBACards message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FilterInActiveNBACardsRequestParameters {
  msdyn_NBAEntityIds: string;
}

/**
 * msdyn_FilterInActiveNBACards request message
 *
 * Web API Action: msdyn_FilterInActiveNBACards
 */
export class msdyn_FilterInActiveNBACardsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FilterInActiveNBACardsResponse>
{
  declare readonly Parameters: Readonly<msdyn_FilterInActiveNBACardsRequestParameters>;

  constructor(parameters: msdyn_FilterInActiveNBACardsRequestParameters) {
    super("msdyn_FilterInActiveNBACards", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FilterInActiveNBACards`;

    const body = requestBody({
      msdyn_NBAEntityIds: this.Parameters.msdyn_NBAEntityIds,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FilterInActiveNBACardsResponse.fromResponse({});
    return msdyn_FilterInActiveNBACardsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FilterInActiveNBACards response message
 */
export class msdyn_FilterInActiveNBACardsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FilterInActiveNBACardsResponseData) {
    super("msdyn_FilterInActiveNBACards");
  }

  static fromResponse(data: unknown): msdyn_FilterInActiveNBACardsResponse {
    return new msdyn_FilterInActiveNBACardsResponse(
      responseObject<msdyn_FilterInActiveNBACardsResponseData>(data)
    );
  }
}

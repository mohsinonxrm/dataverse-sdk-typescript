import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_FilterInActiveNBACardsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_FilterInActiveNBACards action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FilterInActiveNBACardsResult {
  "@odata.context"?: string;
  msdyn_ActiveNBAEntityIds: string;
}

/**
 * msdyn_FilterInActiveNBACards response message
 *
 * `result` is the value the msdyn_FilterInActiveNBACards action returns (see {@link msdyn_FilterInActiveNBACardsResult}).
 */
export class msdyn_FilterInActiveNBACardsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FilterInActiveNBACardsResult) {
    super("msdyn_FilterInActiveNBACards");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_FilterInActiveNBACardsResponse {
    return new msdyn_FilterInActiveNBACardsResponse(data as msdyn_FilterInActiveNBACardsResult);
  }
}

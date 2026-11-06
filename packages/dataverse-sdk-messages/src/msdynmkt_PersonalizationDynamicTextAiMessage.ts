import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PersonalizationDynamicTextAi message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationDynamicTextAiRequestParameters {
  msdynmkt_PersonalizationDynamicTextAiRequest: string;
}

/**
 * msdynmkt_PersonalizationDynamicTextAi request message
 *
 * Web API Action: msdynmkt_PersonalizationDynamicTextAi
 */
export class msdynmkt_PersonalizationDynamicTextAiRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationDynamicTextAiResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationDynamicTextAiRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationDynamicTextAiRequestParameters) {
    super("msdynmkt_PersonalizationDynamicTextAi", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationDynamicTextAi`;

    const body = requestBody({
      msdynmkt_PersonalizationDynamicTextAiRequest:
        this.Parameters.msdynmkt_PersonalizationDynamicTextAiRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationDynamicTextAiResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_PersonalizationDynamicTextAiResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_PersonalizationDynamicTextAi action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationDynamicTextAiResult {
  "@odata.context"?: string;
  msdynmkt_PersonalizationDynamicTextAiResponse: string;
}

/**
 * msdynmkt_PersonalizationDynamicTextAi response message
 *
 * `result` is the value the msdynmkt_PersonalizationDynamicTextAi action returns (see {@link msdynmkt_PersonalizationDynamicTextAiResult}).
 */
export class msdynmkt_PersonalizationDynamicTextAiResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationDynamicTextAiResult) {
    super("msdynmkt_PersonalizationDynamicTextAi");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_PersonalizationDynamicTextAiResponse {
    return new msdynmkt_PersonalizationDynamicTextAiResponse(
      data as msdynmkt_PersonalizationDynamicTextAiResult
    );
  }
}

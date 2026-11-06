import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GenerateKBSearchPrompt message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GenerateKBSearchPromptRequestParameters {
  KBSearchExternalSourcePromptRequest: string;
}

/**
 * msdyn_GenerateKBSearchPrompt request message
 *
 * Web API Action: msdyn_GenerateKBSearchPrompt
 */
export class msdyn_GenerateKBSearchPromptRequest
  extends OrganizationRequest
  implements Executable<msdyn_GenerateKBSearchPromptResponse>
{
  declare readonly Parameters: Readonly<msdyn_GenerateKBSearchPromptRequestParameters>;

  constructor(parameters: msdyn_GenerateKBSearchPromptRequestParameters) {
    super("msdyn_GenerateKBSearchPrompt", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GenerateKBSearchPrompt`;

    const body = requestBody({
      KBSearchExternalSourcePromptRequest: this.Parameters.KBSearchExternalSourcePromptRequest,
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

  async parseResponse(response: Response): Promise<msdyn_GenerateKBSearchPromptResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GenerateKBSearchPromptResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GenerateKBSearchPrompt action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GenerateKBSearchPromptResult {
  "@odata.context"?: string;
  KBSearchExternalSourcePromptResponse: string;
}

/**
 * msdyn_GenerateKBSearchPrompt response message
 *
 * `result` is the value the msdyn_GenerateKBSearchPrompt action returns (see {@link msdyn_GenerateKBSearchPromptResult}).
 */
export class msdyn_GenerateKBSearchPromptResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateKBSearchPromptResult) {
    super("msdyn_GenerateKBSearchPrompt");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GenerateKBSearchPromptResponse {
    return new msdyn_GenerateKBSearchPromptResponse(data as msdyn_GenerateKBSearchPromptResult);
  }
}

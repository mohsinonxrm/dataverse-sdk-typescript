import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GenerateKBSearchPromptResponse as msdyn_GenerateKBSearchPromptResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GenerateKBSearchPromptResponse.fromResponse({});
    return msdyn_GenerateKBSearchPromptResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GenerateKBSearchPrompt response message
 */
export class msdyn_GenerateKBSearchPromptResponse extends OrganizationResponse {
  constructor(public result: msdyn_GenerateKBSearchPromptResponseData) {
    super("msdyn_GenerateKBSearchPrompt");
  }

  static fromResponse(data: unknown): msdyn_GenerateKBSearchPromptResponse {
    return new msdyn_GenerateKBSearchPromptResponse(
      responseObject<msdyn_GenerateKBSearchPromptResponseData>(data)
    );
  }
}

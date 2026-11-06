import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_generateStructuredContentResponse as msdyn_generateStructuredContentResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_generateStructuredContent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_generateStructuredContentRequestParameters {
  knobsConfigurations?: string;
  requestId: string;
  sourceContent: string;
  caller: string;
  structuringPrompt: string;
  copilotOptions?: string;
}

/**
 * msdyn_generateStructuredContent request message
 *
 * Web API Action: msdyn_generateStructuredContent
 */
export class msdyn_generateStructuredContentRequest
  extends OrganizationRequest
  implements Executable<msdyn_generateStructuredContentResponse>
{
  declare readonly Parameters: Readonly<msdyn_generateStructuredContentRequestParameters>;

  constructor(parameters: msdyn_generateStructuredContentRequestParameters) {
    super("msdyn_generateStructuredContent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_generateStructuredContent`;

    const body = requestBody({
      knobsConfigurations: this.Parameters.knobsConfigurations,
      requestId: this.Parameters.requestId,
      sourceContent: this.Parameters.sourceContent,
      caller: this.Parameters.caller,
      structuringPrompt: this.Parameters.structuringPrompt,
      copilotOptions: this.Parameters.copilotOptions,
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

  async parseResponse(response: Response): Promise<msdyn_generateStructuredContentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_generateStructuredContentResponse.fromResponse({});
    return msdyn_generateStructuredContentResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_generateStructuredContent response message
 */
export class msdyn_generateStructuredContentResponse extends OrganizationResponse {
  constructor(public result: msdyn_generateStructuredContentResponseData) {
    super("msdyn_generateStructuredContent");
  }

  static fromResponse(data: unknown): msdyn_generateStructuredContentResponse {
    return new msdyn_generateStructuredContentResponse(
      responseObject<msdyn_generateStructuredContentResponseData>(data)
    );
  }
}

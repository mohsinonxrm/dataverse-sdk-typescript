import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_emailAssistAdjustAPIResponse as msdyn_emailAssistAdjustAPIResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_emailAssistAdjustAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_emailAssistAdjustAPIRequestParameters {
  emailInput: string;
  caller: string;
  knobsConfigurations: string;
  requestId: string;
  copilotOption: string;
}

/**
 * msdyn_emailAssistAdjustAPI request message
 *
 * Web API Action: msdyn_emailAssistAdjustAPI
 */
export class msdyn_emailAssistAdjustAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_emailAssistAdjustAPIResponse>
{
  declare readonly Parameters: Readonly<msdyn_emailAssistAdjustAPIRequestParameters>;

  constructor(parameters: msdyn_emailAssistAdjustAPIRequestParameters) {
    super("msdyn_emailAssistAdjustAPI", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailAssistAdjustAPI`;

    const body = requestBody({
      emailInput: this.Parameters.emailInput,
      caller: this.Parameters.caller,
      knobsConfigurations: this.Parameters.knobsConfigurations,
      requestId: this.Parameters.requestId,
      copilotOption: this.Parameters.copilotOption,
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

  async parseResponse(response: Response): Promise<msdyn_emailAssistAdjustAPIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_emailAssistAdjustAPIResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_emailAssistAdjustAPI response message
 */
export class msdyn_emailAssistAdjustAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_emailAssistAdjustAPIResponseData) {
    super("msdyn_emailAssistAdjustAPI");
  }

  static fromResponse(data: unknown): msdyn_emailAssistAdjustAPIResponse {
    return new msdyn_emailAssistAdjustAPIResponse(
      responseObject<msdyn_emailAssistAdjustAPIResponseData>(data)
    );
  }
}

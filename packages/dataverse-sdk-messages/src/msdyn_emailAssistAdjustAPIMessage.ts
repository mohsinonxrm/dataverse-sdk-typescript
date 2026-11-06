import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_emailAssistAdjustAPIResponse as msdyn_emailAssistAdjustAPIResponseData } from "./types/index.js";

/**
 * msdyn_emailAssistAdjustAPI request message
 *
 * Web API Action: msdyn_emailAssistAdjustAPI
 */
export class msdyn_emailAssistAdjustAPIRequest
  extends OrganizationRequest
  implements Executable<msdyn_emailAssistAdjustAPIResponse>
{
  constructor(
    public emailInput: string,
    public caller: string,
    public knobsConfigurations: string,
    public requestId: string,
    public copilotOption: string
  ) {
    super("msdyn_emailAssistAdjustAPI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_emailAssistAdjustAPI`;

    const body: Record<string, unknown> = {
      emailInput: this.emailInput,
      caller: this.caller,
      knobsConfigurations: this.knobsConfigurations,
      requestId: this.requestId,
      copilotOption: this.copilotOption,
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

  async parseResponse(response: Response): Promise<msdyn_emailAssistAdjustAPIResponse> {
    const data = await response.json();
    return msdyn_emailAssistAdjustAPIResponse.fromResponse(data);
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

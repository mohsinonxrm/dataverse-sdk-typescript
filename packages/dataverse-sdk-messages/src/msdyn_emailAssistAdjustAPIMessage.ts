import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_emailAssistAdjustAPI message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_emailAssistAdjustAPIRequestParameters {
  knobsConfigurations: string;
  emailInput: string;
  requestId: string;
  caller: string;
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
      knobsConfigurations: this.Parameters.knobsConfigurations,
      emailInput: this.Parameters.emailInput,
      requestId: this.Parameters.requestId,
      caller: this.Parameters.caller,
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
    // The body is the complex value, with its @odata.context
    return msdyn_emailAssistAdjustAPIResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_emailAssistAdjustAPI action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_emailAssistAdjustAPIResult {
  "@odata.context"?: string;
  emailAssistAdjustResponse: string;
  status: string;
}

/**
 * msdyn_emailAssistAdjustAPI response message
 *
 * `result` is the value the msdyn_emailAssistAdjustAPI action returns (see {@link msdyn_emailAssistAdjustAPIResult}).
 */
export class msdyn_emailAssistAdjustAPIResponse extends OrganizationResponse {
  constructor(public result: msdyn_emailAssistAdjustAPIResult) {
    super("msdyn_emailAssistAdjustAPI");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_emailAssistAdjustAPIResponse {
    return new msdyn_emailAssistAdjustAPIResponse(data as msdyn_emailAssistAdjustAPIResult);
  }
}

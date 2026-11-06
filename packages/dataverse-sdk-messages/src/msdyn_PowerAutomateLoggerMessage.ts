import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PowerAutomateLoggerResponse as msdyn_PowerAutomateLoggerResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_PowerAutomateLogger message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PowerAutomateLoggerRequestParameters {
  LogMessage: string;
  LogType: string;
}

/**
 * msdyn_PowerAutomateLogger request message
 *
 * Web API Action: msdyn_PowerAutomateLogger
 */
export class msdyn_PowerAutomateLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_PowerAutomateLoggerResponse>
{
  declare readonly Parameters: Readonly<msdyn_PowerAutomateLoggerRequestParameters>;

  constructor(parameters: msdyn_PowerAutomateLoggerRequestParameters) {
    super("msdyn_PowerAutomateLogger", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body = requestBody({
      LogMessage: this.Parameters.LogMessage,
      LogType: this.Parameters.LogType,
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

  async parseResponse(response: Response): Promise<msdyn_PowerAutomateLoggerResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PowerAutomateLoggerResponse.fromResponse({});
    return msdyn_PowerAutomateLoggerResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_PowerAutomateLogger response message
 */
export class msdyn_PowerAutomateLoggerResponse extends OrganizationResponse {
  constructor(public result: msdyn_PowerAutomateLoggerResponseData) {
    super("msdyn_PowerAutomateLogger");
  }

  static fromResponse(data: unknown): msdyn_PowerAutomateLoggerResponse {
    return new msdyn_PowerAutomateLoggerResponse(
      responseObject<msdyn_PowerAutomateLoggerResponseData>(data)
    );
  }
}

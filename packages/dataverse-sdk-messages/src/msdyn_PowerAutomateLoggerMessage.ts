import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_PowerAutomateLoggerResponse as msdyn_PowerAutomateLoggerResponseData } from "./types/index.js";

/**
 * msdyn_PowerAutomateLogger request message
 *
 * Web API Action: msdyn_PowerAutomateLogger
 */
export class msdyn_PowerAutomateLoggerRequest
  extends OrganizationRequest
  implements Executable<msdyn_PowerAutomateLoggerResponse>
{
  constructor(
    public logType: string,
    public logMessage: string
  ) {
    super("msdyn_PowerAutomateLogger");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PowerAutomateLogger`;

    const body: Record<string, unknown> = {
      LogType: this.logType,
      LogMessage: this.logMessage,
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

  async parseResponse(response: Response): Promise<msdyn_PowerAutomateLoggerResponse> {
    const data = await response.json();
    return msdyn_PowerAutomateLoggerResponse.fromResponse(data);
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

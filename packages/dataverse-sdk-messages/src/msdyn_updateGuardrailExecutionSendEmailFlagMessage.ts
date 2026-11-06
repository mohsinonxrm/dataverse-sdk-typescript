import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_updateGuardrailExecutionSendEmailFlag message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateGuardrailExecutionSendEmailFlagRequestParameters {
  msdyn_guardrailexecutioninfoids: string;
}

/**
 * msdyn_updateGuardrailExecutionSendEmailFlag request message
 *
 * Web API Action: msdyn_updateGuardrailExecutionSendEmailFlag
 */
export class msdyn_updateGuardrailExecutionSendEmailFlagRequest
  extends OrganizationRequest
  implements Executable<msdyn_updateGuardrailExecutionSendEmailFlagResponse>
{
  declare readonly Parameters: Readonly<msdyn_updateGuardrailExecutionSendEmailFlagRequestParameters>;

  constructor(parameters: msdyn_updateGuardrailExecutionSendEmailFlagRequestParameters) {
    super("msdyn_updateGuardrailExecutionSendEmailFlag", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateGuardrailExecutionSendEmailFlag`;

    const body = requestBody({
      msdyn_guardrailexecutioninfoids: this.Parameters.msdyn_guardrailexecutioninfoids,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_updateGuardrailExecutionSendEmailFlagResponse> {
    // No return value (204 No Content)
    return new msdyn_updateGuardrailExecutionSendEmailFlagResponse();
  }
}

/**
 * msdyn_updateGuardrailExecutionSendEmailFlag response message
 */
export class msdyn_updateGuardrailExecutionSendEmailFlagResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_updateGuardrailExecutionSendEmailFlag");
  }

  static fromResponse(_data: unknown): msdyn_updateGuardrailExecutionSendEmailFlagResponse {
    return new msdyn_updateGuardrailExecutionSendEmailFlagResponse();
  }
}

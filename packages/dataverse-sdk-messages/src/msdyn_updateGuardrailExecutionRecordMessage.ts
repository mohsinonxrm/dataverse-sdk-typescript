import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_updateGuardrailExecutionRecord message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_updateGuardrailExecutionRecordRequestParameters {
  msdyn_objectid: string;
  msdyn_guardrailexecutioninfoids?: string;
  msdyn_guardrail_runid?: string;
}

/**
 * msdyn_updateGuardrailExecutionRecord request message
 *
 * Web API Action: msdyn_updateGuardrailExecutionRecord
 */
export class msdyn_updateGuardrailExecutionRecordRequest
  extends OrganizationRequest
  implements Executable<msdyn_updateGuardrailExecutionRecordResponse>
{
  declare readonly Parameters: Readonly<msdyn_updateGuardrailExecutionRecordRequestParameters>;

  constructor(parameters: msdyn_updateGuardrailExecutionRecordRequestParameters) {
    super("msdyn_updateGuardrailExecutionRecord", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_updateGuardrailExecutionRecord`;

    const body = requestBody({
      msdyn_objectid: this.Parameters.msdyn_objectid,
      msdyn_guardrailexecutioninfoids: this.Parameters.msdyn_guardrailexecutioninfoids,
      msdyn_guardrail_runid: this.Parameters.msdyn_guardrail_runid,
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

  parseResponse(_response: Response): Promise<msdyn_updateGuardrailExecutionRecordResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_updateGuardrailExecutionRecordResponse());
  }
}

/**
 * msdyn_updateGuardrailExecutionRecord response message
 */
export class msdyn_updateGuardrailExecutionRecordResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_updateGuardrailExecutionRecord");
  }

  static fromResponse(_data?: unknown): msdyn_updateGuardrailExecutionRecordResponse {
    return new msdyn_updateGuardrailExecutionRecordResponse();
  }
}

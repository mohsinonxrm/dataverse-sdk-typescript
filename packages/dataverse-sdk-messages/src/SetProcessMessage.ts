import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the SetProcess message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface SetProcessRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  NewProcess?: EntityReference | AnyEntityPayload;
  NewProcessInstance?: EntityReference | AnyEntityPayload;
}

/**
 * SetProcess request message
 *
 * Web API Action: SetProcess
 */
export class SetProcessRequest
  extends OrganizationRequest
  implements Executable<SetProcessResponse>
{
  declare readonly Parameters: Readonly<SetProcessRequestParameters>;

  constructor(parameters: SetProcessRequestParameters) {
    super("SetProcess", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetProcess`;

    const body = requestBody({
      Target: this.Parameters.Target,
      NewProcess: this.Parameters.NewProcess,
      NewProcessInstance: this.Parameters.NewProcessInstance,
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

  async parseResponse(response: Response): Promise<SetProcessResponse> {
    // No return value (204 No Content)
    return new SetProcessResponse();
  }
}

/**
 * SetProcess response message
 */
export class SetProcessResponse extends OrganizationResponse {
  constructor() {
    super("SetProcess");
  }

  static fromResponse(_data: unknown): SetProcessResponse {
    return new SetProcessResponse();
  }
}

import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * SetProcess request message
 *
 * Web API Action: SetProcess
 */
export class SetProcessRequest
  extends OrganizationRequest
  implements Executable<SetProcessResponse>
{
  constructor(
    public target: EntityReference | AnyEntityPayload,
    public newProcess?: EntityReference | AnyEntityPayload,
    public newProcessInstance?: EntityReference | AnyEntityPayload
  ) {
    super("SetProcess");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/SetProcess`;

    const body: Record<string, unknown> = {
      Target: this.target,
      NewProcess: this.newProcess,
      NewProcessInstance: this.newProcessInstance,
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

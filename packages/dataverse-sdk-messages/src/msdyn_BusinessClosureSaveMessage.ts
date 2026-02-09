import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_BusinessClosureSave request message
 *
 * Web API Action: msdyn_BusinessClosureSave
 */
export class msdyn_BusinessClosureSaveRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureSaveResponse>
{
  constructor(
    public id: string,
    public name: string,
    public start: string,
    public end: string
  ) {
    super("msdyn_BusinessClosureSave");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureSave`;

    const body: Record<string, unknown> = {
      Id: this.id,
      Name: this.name,
      Start: this.start,
      End: this.end,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureSaveResponse> {
    // No return value (204 No Content)
    return new msdyn_BusinessClosureSaveResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Id: this.id,
      Name: this.name,
      Start: this.start,
      End: this.end,
    };
  }
}

/**
 * msdyn_BusinessClosureSave response message
 */
export class msdyn_BusinessClosureSaveResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_BusinessClosureSave");
  }

  static fromResponse(_data: unknown): msdyn_BusinessClosureSaveResponse {
    return new msdyn_BusinessClosureSaveResponse();
  }
}

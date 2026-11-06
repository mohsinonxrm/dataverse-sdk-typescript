import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_BusinessClosureSave message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureSaveRequestParameters {
  Id?: string;
  Name: string;
  Start: string;
  End: string;
}

/**
 * msdyn_BusinessClosureSave request message
 *
 * Web API Action: msdyn_BusinessClosureSave
 */
export class msdyn_BusinessClosureSaveRequest
  extends OrganizationRequest
  implements Executable<msdyn_BusinessClosureSaveResponse>
{
  declare readonly Parameters: Readonly<msdyn_BusinessClosureSaveRequestParameters>;

  constructor(parameters: msdyn_BusinessClosureSaveRequestParameters) {
    super("msdyn_BusinessClosureSave", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureSave`;

    const body = requestBody({
      Id: this.Parameters.Id,
      Name: this.Parameters.Name,
      Start: this.Parameters.Start,
      End: this.Parameters.End,
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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureSaveResponse> {
    // No return value (204 No Content)
    return new msdyn_BusinessClosureSaveResponse();
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

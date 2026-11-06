import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ExecuteRecurringSalesOperation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteRecurringSalesOperationRequestParameters {
  InputData?: string;
  IsRSAV2Entity?: boolean;
  CustomActionName: string;
  TriggerName: string;
}

/**
 * msdyn_ExecuteRecurringSalesOperation request message
 *
 * Web API Action: msdyn_ExecuteRecurringSalesOperation
 */
export class msdyn_ExecuteRecurringSalesOperationRequest
  extends OrganizationRequest
  implements Executable<msdyn_ExecuteRecurringSalesOperationResponse>
{
  declare readonly Parameters: Readonly<msdyn_ExecuteRecurringSalesOperationRequestParameters>;

  constructor(parameters: msdyn_ExecuteRecurringSalesOperationRequestParameters) {
    super("msdyn_ExecuteRecurringSalesOperation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteRecurringSalesOperation`;

    const body = requestBody({
      InputData: this.Parameters.InputData,
      IsRSAV2Entity: this.Parameters.IsRSAV2Entity,
      CustomActionName: this.Parameters.CustomActionName,
      TriggerName: this.Parameters.TriggerName,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteRecurringSalesOperationResponse> {
    // No return value (204 No Content)
    return new msdyn_ExecuteRecurringSalesOperationResponse();
  }
}

/**
 * msdyn_ExecuteRecurringSalesOperation response message
 */
export class msdyn_ExecuteRecurringSalesOperationResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ExecuteRecurringSalesOperation");
  }

  static fromResponse(_data: unknown): msdyn_ExecuteRecurringSalesOperationResponse {
    return new msdyn_ExecuteRecurringSalesOperationResponse();
  }
}

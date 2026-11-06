import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceSystemJobWOShareUnshareActionResponse as msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceSystemJobWOShareUnshareAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSystemJobWOShareUnshareActionRequestParameters {
  InputParameter: string;
  Type: number;
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction request message
 *
 * Web API Action: msdyn_FieldServiceSystemJobWOShareUnshareAction
 *
 * The first argument is the id of the msdyn_fieldservicesystemjob record to call it on.
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceSystemJobWOShareUnshareActionRequestParameters>;

  constructor(
    public msdyn_fieldservicesystemjobId: string,
    parameters: msdyn_FieldServiceSystemJobWOShareUnshareActionRequestParameters
  ) {
    super("msdyn_FieldServiceSystemJobWOShareUnshareAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fieldservicesystemjobs(${this.msdyn_fieldservicesystemjobId})/Microsoft.Dynamics.CRM.msdyn_FieldServiceSystemJobWOShareUnshareAction`;

    const body = requestBody({
      InputParameter: this.Parameters.InputParameter,
      Type: this.Parameters.Type,
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
  ): Promise<msdyn_FieldServiceSystemJobWOShareUnshareActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_FieldServiceSystemJobWOShareUnshareActionResponse.fromResponse({});
    return msdyn_FieldServiceSystemJobWOShareUnshareActionResponse.fromResponse(
      await response.json()
    );
  }
}

/**
 * msdyn_FieldServiceSystemJobWOShareUnshareAction response message
 */
export class msdyn_FieldServiceSystemJobWOShareUnshareActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData) {
    super("msdyn_FieldServiceSystemJobWOShareUnshareAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSystemJobWOShareUnshareActionResponse {
    return new msdyn_FieldServiceSystemJobWOShareUnshareActionResponse(
      responseObject<msdyn_FieldServiceSystemJobWOShareUnshareActionResponseData>(data)
    );
  }
}

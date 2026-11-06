import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FieldServiceSystemActionResponse as msdyn_FieldServiceSystemActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FieldServiceSystemAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FieldServiceSystemActionRequestParameters {
  Type: number;
  InputParameter: string;
}

/**
 * msdyn_FieldServiceSystemAction request message
 *
 * Web API Action: msdyn_FieldServiceSystemAction
 */
export class msdyn_FieldServiceSystemActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_FieldServiceSystemActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_FieldServiceSystemActionRequestParameters>;

  constructor(parameters: msdyn_FieldServiceSystemActionRequestParameters) {
    super("msdyn_FieldServiceSystemAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FieldServiceSystemAction`;

    const body = requestBody({
      Type: this.Parameters.Type,
      InputParameter: this.Parameters.InputParameter,
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

  async parseResponse(response: Response): Promise<msdyn_FieldServiceSystemActionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FieldServiceSystemActionResponse.fromResponse({});
    return msdyn_FieldServiceSystemActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FieldServiceSystemAction response message
 */
export class msdyn_FieldServiceSystemActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_FieldServiceSystemActionResponseData) {
    super("msdyn_FieldServiceSystemAction");
  }

  static fromResponse(data: unknown): msdyn_FieldServiceSystemActionResponse {
    return new msdyn_FieldServiceSystemActionResponse(
      responseObject<msdyn_FieldServiceSystemActionResponseData>(data)
    );
  }
}

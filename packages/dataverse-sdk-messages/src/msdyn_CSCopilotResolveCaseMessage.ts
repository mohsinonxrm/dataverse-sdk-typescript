import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CSCopilotResolveCaseResponse as msdyn_CSCopilotResolveCaseResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CSCopilotResolveCase message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CSCopilotResolveCaseRequestParameters {
  Incident: EntityReference | AnyEntityPayload;
  ResolutionReason: number;
  CallerIdentifier: string;
  StatusReason: number;
}

/**
 * msdyn_CSCopilotResolveCase request message
 *
 * Web API Action: msdyn_CSCopilotResolveCase
 */
export class msdyn_CSCopilotResolveCaseRequest
  extends OrganizationRequest
  implements Executable<msdyn_CSCopilotResolveCaseResponse>
{
  declare readonly Parameters: Readonly<msdyn_CSCopilotResolveCaseRequestParameters>;

  constructor(parameters: msdyn_CSCopilotResolveCaseRequestParameters) {
    super("msdyn_CSCopilotResolveCase", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CSCopilotResolveCase`;

    const body = requestBody({
      Incident: this.Parameters.Incident,
      ResolutionReason: this.Parameters.ResolutionReason,
      CallerIdentifier: this.Parameters.CallerIdentifier,
      StatusReason: this.Parameters.StatusReason,
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

  async parseResponse(response: Response): Promise<msdyn_CSCopilotResolveCaseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CSCopilotResolveCaseResponse.fromResponse({});
    return msdyn_CSCopilotResolveCaseResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CSCopilotResolveCase response message
 */
export class msdyn_CSCopilotResolveCaseResponse extends OrganizationResponse {
  constructor(public result: msdyn_CSCopilotResolveCaseResponseData) {
    super("msdyn_CSCopilotResolveCase");
  }

  static fromResponse(data: unknown): msdyn_CSCopilotResolveCaseResponse {
    return new msdyn_CSCopilotResolveCaseResponse(
      responseObject<msdyn_CSCopilotResolveCaseResponseData>(data)
    );
  }
}

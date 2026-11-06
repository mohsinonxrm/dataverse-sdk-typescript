import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_PredictUserRequestedFields message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PredictUserRequestedFieldsRequestParameters {
  msdyn_Target?: EntityReference | AnyEntityPayload;
  msdyn_FieldsToPredict: string[];
  msdyn_ScenarioName?: number;
  msdyn_Sources?: Record<string, unknown>[];
}

/**
 * msdyn_PredictUserRequestedFields request message
 *
 * Web API Action: msdyn_PredictUserRequestedFields
 */
export class msdyn_PredictUserRequestedFieldsRequest
  extends OrganizationRequest
  implements Executable<msdyn_PredictUserRequestedFieldsResponse>
{
  declare readonly Parameters: Readonly<msdyn_PredictUserRequestedFieldsRequestParameters>;

  constructor(parameters: msdyn_PredictUserRequestedFieldsRequestParameters) {
    super("msdyn_PredictUserRequestedFields", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PredictUserRequestedFields`;

    const body = requestBody({
      msdyn_Target: this.Parameters.msdyn_Target,
      msdyn_FieldsToPredict: this.Parameters.msdyn_FieldsToPredict,
      msdyn_ScenarioName: this.Parameters.msdyn_ScenarioName,
      msdyn_Sources: this.Parameters.msdyn_Sources,
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

  async parseResponse(response: Response): Promise<msdyn_PredictUserRequestedFieldsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PredictUserRequestedFieldsResponse.fromResponse({});
    return msdyn_PredictUserRequestedFieldsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_PredictUserRequestedFields response message
 */
export class msdyn_PredictUserRequestedFieldsResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("msdyn_PredictUserRequestedFields");
  }

  static fromResponse(data: unknown): msdyn_PredictUserRequestedFieldsResponse {
    return new msdyn_PredictUserRequestedFieldsResponse(
      responseObject<Record<string, unknown>>(data)
    );
  }
}

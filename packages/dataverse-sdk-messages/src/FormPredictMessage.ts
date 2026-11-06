import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the FormPredict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormPredictRequestParameters {
  requestedFields: string[];
  predictorFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
  context?: string;
  entityName: string;
}

/**
 * FormPredict request message
 *
 * Web API Action: FormPredict
 */
export class FormPredictRequest
  extends OrganizationRequest
  implements Executable<FormPredictResponse>
{
  declare readonly Parameters: Readonly<FormPredictRequestParameters>;

  constructor(parameters: FormPredictRequestParameters) {
    super("FormPredict", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FormPredict`;

    const body = requestBody({
      requestedFields: this.Parameters.requestedFields,
      predictorFields: this.Parameters.predictorFields,
      recordValues: this.Parameters.recordValues,
      clientPartnerSource: this.Parameters.clientPartnerSource,
      context: this.Parameters.context,
      entityName: this.Parameters.entityName,
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

  async parseResponse(response: Response): Promise<FormPredictResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return FormPredictResponse.fromResponse({});
    return FormPredictResponse.fromResponse(await response.json());
  }
}

/**
 * FormPredict response message
 */
export class FormPredictResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("FormPredict");
  }

  static fromResponse(data: unknown): FormPredictResponse {
    return new FormPredictResponse(responseObject<Record<string, unknown>>(data));
  }
}

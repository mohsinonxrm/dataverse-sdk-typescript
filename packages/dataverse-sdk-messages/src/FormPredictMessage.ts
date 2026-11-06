import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the FormPredict message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormPredictRequestParameters {
  entityName: string;
  predictorFields: string[];
  context?: string;
  requestedFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
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
      entityName: this.Parameters.entityName,
      predictorFields: this.Parameters.predictorFields,
      context: this.Parameters.context,
      requestedFields: this.Parameters.requestedFields,
      recordValues: this.Parameters.recordValues,
      clientPartnerSource: this.Parameters.clientPartnerSource,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return FormPredictResponse.fromResponse(text ? JSON.parse(text) : {});
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

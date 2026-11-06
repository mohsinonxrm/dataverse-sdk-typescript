import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from FormPredict action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface FormPredictResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the FormPredict action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface FormPredictActionParameters {
  entityName: string;
  predictorFields: string[];
  context?: string;
  requestedFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
}

/**
 * FormPredict action
 *
 * Unbound action
 */
export class FormPredictAction implements Executable<FormPredictResponse> {
  constructor(public readonly parameters: FormPredictActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/FormPredict`;

    const body = requestBody({
      entityName: this.parameters.entityName,
      predictorFields: this.parameters.predictorFields,
      context: this.parameters.context,
      requestedFields: this.parameters.requestedFields,
      recordValues: this.parameters.recordValues,
      clientPartnerSource: this.parameters.clientPartnerSource,
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
    return (text ? JSON.parse(text) : {}) as FormPredictResponse;
  }
}

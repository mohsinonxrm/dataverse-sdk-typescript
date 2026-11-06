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
  requestedFields: string[];
  predictorFields: string[];
  recordValues: string;
  clientPartnerSource?: string;
  context?: string;
  entityName: string;
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
      requestedFields: this.parameters.requestedFields,
      predictorFields: this.parameters.predictorFields,
      recordValues: this.parameters.recordValues,
      clientPartnerSource: this.parameters.clientPartnerSource,
      context: this.parameters.context,
      entityName: this.parameters.entityName,
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
    if (response.status === 204) return {} as FormPredictResponse;
    return (await response.json()) as FormPredictResponse;
  }
}

/**
 * Real Dataverse `$batch` responses, recorded from a live org and redacted (host, GUIDs and
 * record names replaced). Line endings are exactly as received (CRLF).
 */

export interface RecordedBatchResponse {
  status: number;
  contentType: string;
  body: string;
}

export const getOnly: RecordedBatchResponse = {
  status: 200,
  contentType: "multipart/mixed; boundary=batchresponse_10000000-0000-0000-0000-000000000001",
  body: '--batchresponse_10000000-0000-0000-0000-000000000001\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 200 OK\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"@odata.context":"https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse","BusinessUnitId":"10000000-0000-0000-0000-000000000002","UserId":"10000000-0000-0000-0000-000000000003","OrganizationId":"10000000-0000-0000-0000-000000000004"}\r\n--batchresponse_10000000-0000-0000-0000-000000000001\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 200 OK\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"@odata.context":"https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#accounts(name)","value":[]}\r\n--batchresponse_10000000-0000-0000-0000-000000000001--\r\n',
};

export const changesetSuccess: RecordedBatchResponse = {
  status: 200,
  contentType: "multipart/mixed; boundary=batchresponse_10000000-0000-0000-0000-000000000005",
  body: '--batchresponse_10000000-0000-0000-0000-000000000005\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 200 OK\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"@odata.context":"https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse","BusinessUnitId":"10000000-0000-0000-0000-000000000002","UserId":"10000000-0000-0000-0000-000000000003","OrganizationId":"10000000-0000-0000-0000-000000000004"}\r\n--batchresponse_10000000-0000-0000-0000-000000000005\r\nContent-Type: multipart/mixed; boundary=changesetresponse_10000000-0000-0000-0000-000000000006\r\n\r\n--changesetresponse_10000000-0000-0000-0000-000000000006\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: acct\r\n\r\nHTTP/1.1 204 No Content\r\nOData-Version: 4.0\r\nLocation: https://contoso.crm.dynamics.com/api/data/v9.2/accounts(10000000-0000-0000-0000-000000000007)\r\nOData-EntityId: https://contoso.crm.dynamics.com/api/data/v9.2/accounts(10000000-0000-0000-0000-000000000007)\r\nX-Content-Type-Options: nosniff\r\n\r\n\r\n--changesetresponse_10000000-0000-0000-0000-000000000006\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: contact\r\n\r\nHTTP/1.1 204 No Content\r\nOData-Version: 4.0\r\nLocation: https://contoso.crm.dynamics.com/api/data/v9.2/contacts(10000000-0000-0000-0000-000000000008)\r\nOData-EntityId: https://contoso.crm.dynamics.com/api/data/v9.2/contacts(10000000-0000-0000-0000-000000000008)\r\nX-Content-Type-Options: nosniff\r\n\r\n\r\n--changesetresponse_10000000-0000-0000-0000-000000000006--\r\n--batchresponse_10000000-0000-0000-0000-000000000005--\r\n',
};

export const changesetFailure: RecordedBatchResponse = {
  status: 404,
  contentType: "multipart/mixed; boundary=batchresponse_10000000-0000-0000-0000-000000000009",
  body: '--batchresponse_10000000-0000-0000-0000-000000000009\r\nContent-Type: multipart/mixed; boundary=changesetresponse_10000000-0000-0000-0000-000000000010\r\n\r\n--changesetresponse_10000000-0000-0000-0000-000000000010\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\nContent-ID: 2\r\n\r\nHTTP/1.1 404 Not Found\r\nREQ_ID: 10000000-0000-0000-0000-000000000011\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"error":{"code":"0x80040217","message":"Entity \'account\' With Id = 00000000-0000-0000-0000-000000000001 Does Not Exist"}}\r\n--changesetresponse_10000000-0000-0000-0000-000000000010--\r\n--batchresponse_10000000-0000-0000-0000-000000000009--\r\n',
};

export const stoppedEarly: RecordedBatchResponse = {
  status: 404,
  contentType: "multipart/mixed; boundary=batchresponse_10000000-0000-0000-0000-000000000012",
  body: '--batchresponse_10000000-0000-0000-0000-000000000012\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 200 OK\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"@odata.context":"https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse","BusinessUnitId":"10000000-0000-0000-0000-000000000002","UserId":"10000000-0000-0000-0000-000000000003","OrganizationId":"10000000-0000-0000-0000-000000000004"}\r\n--batchresponse_10000000-0000-0000-0000-000000000012\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nREQ_ID: 10000000-0000-0000-0000-000000000013\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal; odata.streaming=true\r\nOData-Version: 4.0\r\n\r\n{"error":{"code":"0x80040217","message":"Entity \'Account\' With Id = 00000000-0000-0000-0000-000000000001 Does Not Exist"}}\r\n--batchresponse_10000000-0000-0000-0000-000000000012--\r\n',
};

export const continueOnError: RecordedBatchResponse = {
  status: 200,
  contentType: "multipart/mixed; boundary=batchresponse_10000000-0000-0000-0000-000000000014",
  body: '--batchresponse_10000000-0000-0000-0000-000000000014\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 404 Not Found\r\nREQ_ID: 10000000-0000-0000-0000-000000000015\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal; odata.streaming=true\r\nOData-Version: 4.0\r\n\r\n{"error":{"code":"0x80040217","message":"Entity \'Account\' With Id = 00000000-0000-0000-0000-000000000001 Does Not Exist"}}\r\n--batchresponse_10000000-0000-0000-0000-000000000014\r\nContent-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\nHTTP/1.1 200 OK\r\nX-Content-Type-Options: nosniff\r\nContent-Type: application/json; odata.metadata=minimal\r\nOData-Version: 4.0\r\n\r\n{"@odata.context":"https://contoso.crm.dynamics.com/api/data/v9.2/$metadata#Microsoft.Dynamics.CRM.WhoAmIResponse","BusinessUnitId":"10000000-0000-0000-0000-000000000002","UserId":"10000000-0000-0000-0000-000000000003","OrganizationId":"10000000-0000-0000-0000-000000000004"}\r\n--batchresponse_10000000-0000-0000-0000-000000000014--\r\n',
};

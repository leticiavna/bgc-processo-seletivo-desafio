// evita replicação de código
const DOMAIN = process.env.DOMAIN;

export function success(body) {
  return buildResponse(200, body);
}

export function failure(body) {
  return buildResponse(500, body);
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      "Access-Control-Allow-Origin": DOMAIN,
      'Access-Control-Allow-Headers': 'x-requested-with',
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify(body)
  };
}
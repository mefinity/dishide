// Put your webhook here
const webhookIDs = {
  "John": "DO123412341234/AAAABBBBCCCC",
  "Doe": "DONOT/DO-HTTPS://",
};

// Make your friends less annoying for free!
const TURN_OFF_PINGING = false;
const TURN_OFF_EVERYONE_HERE_PINGING = true;
const CUSTOM_WORDS_BLOCKLIST = "TEST-ONE, TEST-TWO";
const OWOIFY = false;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Change Method Whitelist here
const allowedMethods = ['POST', 'PUT', 'PATCH']

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, PUT, PATCH',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    })
  }

  if (!allowedMethods.includes(request.method)) {
    return new Response('Method Not Allowed', { status: 405 })
  }

  let requestBody = await request.text();

  if (TURN_OFF_PINGING) {
    requestBody = requestBody.replace(/@/g, 'AT');
  } 

  if (TURN_OFF_EVERYONE_HERE_PINGING) {
    requestBody = requestBody.replace(/\b(everyone)\b/gi, 'noone');
    requestBody = requestBody.replace(/\b(here)\b/gi, 'where');
  }

  if (CUSTOM_WORDS_BLOCKLIST) {
    const blockList = CUSTOM_WORDS_BLOCKLIST.split(',').map(word => word.trim());
    blockList.forEach(blockedWord => {
      const regex = new RegExp(`\\b(${blockedWord})\\b`, 'gi');
      requestBody = requestBody.replace(regex, '[BLOCKEDWORD]');
    });
  }

  if (OWOIFY) {
    requestBody = requestBody.replace(/[rl]/gi, 'w');
  }

  const url = new URL(request.url)
  const path = url.pathname.substring(1)
  const webhookID = webhookIDs[path]

  if (!webhookID) {
    return new Response('Webhook ID not found', { status: 404 })
  }

  const webhookURL = `https://discord.com/api/webhooks/${webhookID}`
  const response = await fetch(webhookURL, {
    method: request.method,
    headers: request.headers,
    body: requestBody
  })

  const responseHeaders = new Headers(response.headers)
  responseHeaders.set('Access-Control-Allow-Origin', '*')

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders
  })
}
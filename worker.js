// Put your webhook here
const webhookIDs = {
    "John": "DO123412341234/AAAABBBBCCCC",
    "Doe": "DONOT/DO-HTTPS://",
  };
  
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  // Change Method Whitelist here
  const allowedMethods = ['POST', 'PUT', 'PATCH']
  
  async function handleRequest(request) {
    // Handle preflight requests
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
      body: request.body
    })
  
    const responseHeaders = new Headers(response.headers)
    responseHeaders.set('Access-Control-Allow-Origin', '*')
  
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    })
  }
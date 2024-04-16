# Dishide
Discord webhook but it doesnt get \[DELETE]d the minute its born  
And yes the risk of getting spammed still exists, but not that i care  
this project makes you able to block Methods you dont want interacting with your webhook, Aaand you can store multiple webhooks in ONE project,,,, plus its a great shortener

## How 2 use
```
curl -X POST -H "Content-Type: application/json" -d '{"content":"You could curl"}' https://dishide-using-curl.thisisafakedomain.workers.dev/WebhookNumber50
```

```
const data = {
  content: "Or you could use fetch"
}

fetch('https://dishide-using-js.thisisafakedomain.workers.dev/WebhookNumberJohn', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
});
```
# How 2 deploy
1. Make a cloudflare account
2. Make a cloudflare project
3. paste the contents of [worker.js](worker.js) to the newly created cloudflare project
4. Make sure to change the webhookIDs const, then deploy
5. you should be good

goodbye githubbers, likely just skids  
sad
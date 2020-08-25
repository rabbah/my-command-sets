# QR Code Generator

This example application deploys an API for generating QR Codes.
The API may be used in any of the following ways:

1. As standalone API which accepts a string parameter and returns a link to the generate QR code.
2. Or as Jamstack or single page web application.
3. Or with [Nimbella Commander](https://nimbella.com/commander) to generate QR Codes with a "slash command" from Slack, Mattermost or Microsoft Teams.

## Deploy API and Jamstack app

- The API is implemented by a single function called [`qr`](./packages/qr/qr/qr.js).
- The web UI for the frontend is available in the [`web`](./web) folder.

To deploy this project as an API and as a Jamstack single page app, use the [Nimbella CLI](https://apigcp.nimbella.io/downloads/nim/nim.html).

```
nim project deploy .
```

## 1. How to use the API

You can use the API with Postman or with `curl`.

```
curl `nim action get qr/qr --url` \
     --header 'Content-Type: application/json' \
     --data-raw '{
       "params": "this is the text i want to qr code"
     }'
```

## 2. Jamstack single page app

When this project is deployed, the frontend UI is deployed
to your Nimbella dedicated domain. You can open the app in your
browser.

The command `nim auth current --web` will show you the dedicated
domain for your account. On Mac OS, you can use it to open the app
in your browser.

```
open `nim auth current --web`
```

## 3. Slash Command

This project can also be used as a Slash Command which you can run from a
messaging platform like Slack, using [Nimbella Commander](https://nimbella.com/commander).

### Installation

Run the following command in your Nimbella Commander enabled messaging system (e.g., Slack).

```
/nc csm_install github:rabbah/my-command-sets/qrcode
```

### Usage

The `qr` command expects some text to generate a QR code.
Here is an an example.

```
/nc qr hello world!
```

This will produce the QR code in response.

<img width="280" src="https://user-images.githubusercontent.com/4959922/87235587-7f40d280-c3ab-11ea-9e1d-10d02ce7d1b0.png">

### Uninstall

To uninstall the slash command using Nimbella Commander.

```
/nc csm_uninstall github:rabbah/my-command-sets/qrcode
```

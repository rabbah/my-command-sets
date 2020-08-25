const qrcode = require('qrcode')
const uuid = require('uuid')
const nimbella = require('nim')
const bucket = nimbella.storage(true)

/**
 * Generates QR Code for given text.
 *
 * @param { params : String | Object } either a string to encode or
 *        an object containing the property `varArgs`. When `varArgs`
 *        is present, assumes this is a slash command and does not format
 *        the function result for an HTTP response.
 */
async function main({params}) {
    // generate a unique file name
    const filename = uuid.v4() + '.png'

    // get the text to encode (FIXME: handle malformed input)
    const text = params.varArgs || params

    // determine how to format response
    const format = params.varArgs !== undefined ? slashResponse : apiResponse

    // this is the location of the image in the Nimbella provided web data bucket
    const image_url = `https://${process.env.__OW_NAMESPACE}-apigcp.nimbella.io/${filename}`
    
    return qrcode
        .toFile(filename, text)                            // save qr code to file
        .then(async () => (await bucket).upload(filename)) // upload file to data bucket
        .then(() => format(text, image_url))               // format response and return
}

// For HTTP/API response, nest under property called body
function apiResponse(text, image_url) {
    return {
        body: slashResponse(text, image_url)
    }
}

// Format for rendering in Slack
function slashResponse(alt_text, image_url) {
    return {
	      blocks: [{
			      type: 'image',
			      alt_text,
			      image_url
		    }]
    }
}

exports.main = main

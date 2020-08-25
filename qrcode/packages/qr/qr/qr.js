const qrcode = require('qrcode')
const uuid = require('uuid')
const nimbella = require('nim')
const bucket = nimbella.storage(true)

async function main({params}) {
    const filename = uuid.v4() + '.png'
    const text = params.varArgs || params
    const image_url = `https://${process.env.__OW_NAMESPACE}-apigcp.nimbella.io/${filename}`
    
    return qrcode
        .toFile(filename, text)
        .then(async () => (await bucket).upload(filename))
        .then(() => ({
	          blocks: [{
			          type: 'image',
			          alt_text: text,
			          image_url
		        }]
        }))
}

exports.main = main

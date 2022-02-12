const sendgrid = require("@sendgrid/mail");
const {SENDGRID_API_KEY, SENDGRID_TEMPLATE_ID} = require("../constants");

class Sendgrid {
    invite(to, documentId) {
        sendgrid.setApiKey(SENDGRID_API_KEY);

        return sendgrid.send({
            subject: "An invitation to collaborate",
            to,
            from: {
                email: "peer19@student.bth.se",
                name: "Editor"
            },
            templateId: SENDGRID_TEMPLATE_ID,
            dynamicTemplateData: {
                id: documentId
            }
        });

    }
}

module.exports = Sendgrid;
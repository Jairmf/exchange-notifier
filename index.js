import puppeteer from "puppeteer";
import schedule from "node-schedule";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "pruebasdjmf@gmail.com",
		pass: "pybrmrpjekaysndd",
	},
});

async function sendMail(mailOptions) {
	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Correo enviado con éxito:", info.response);
	} catch (error) {
		console.log("Error al enviar el correo:", error);
	}
}

async function handleDynamicWebPage() {
	const browser = await puppeteer.launch({
		headless: 'new', // false,
		slowMo: 2000,
	});
	const page = await browser.newPage();
	await page.goto("https://tkambio.com/");
	const data = await page.evaluate(async () => {
		const purcharse = document
			.querySelector(".purcharse-content")
			.querySelector("div").innerText;
		const sale = document
			.querySelector(".sale-content")
			.querySelector("div").innerText;
		return {
			purcharse: Number(purcharse),
			sale: Number(sale),
		};
	});
	console.log(data);
	await browser.close();
    return data;
}

// const ruleString = "*/30 * * * * *";
const rule = new schedule.RecurrenceRule();
rule.minute = 0;
const job = schedule.scheduleJob(rule, async () => {
	const dataExchange = await handleDynamicWebPage();
    // { purcharse: 3.694, sale: 3.719 }
    const fechaHoraActual = new Date().toLocaleString();
    console.log(`Fecha y hora actual: ${fechaHoraActual}`);
	if (dataExchange.purcharse > 3.8 || dataExchange.sale < 3.7) {
        console.log("Cumple condición, envía correo");
        const mailOptions = {
            from: `Notificaciones <pruebasdjmf@gmail.com>`,
            to: "emilysalazarcastillo@gmail.com",
            bcc: "jairmf2302@gmail.com",
            subject: `Alerta de Tipo de Cambio - Compra: ${dataExchange.purcharse || ""} Venta: ${dataExchange.sale || ""}`,
            // text: "Contenido del correo",
            html: `
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                    min-width: 100% !important;
                    color: #4d4b4b;
                    font-family: Arial, sans-serif;
                    font-size: 12px;
                }

                .content {
                    width: 100%;
                    max-width: 600px;
                }

                .content tr td {
                    padding: 5px;
                }

                .content tr td span {
                    display: block;
                    margin: 5px 0px;
                }
            </style>
            <table cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                    <tr>
                        <td style="padding: 30px 30px 30px 30px; text-align: center;">
                            <img src="https://tkambio.com/wp-content/uploads/2022/06/Logo-TKambio-200-x-200.png" alt="TKambio" width="100" height="100">
                            <h2>NOTIFICACIÓN DE TIPO DE CAMBIO</h2>
                            <h3>${fechaHoraActual || ""}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 25px;" valign="top">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="content" style="margin-left: calc(18%); width: 69%;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style="text-align: center;"><span style="font-size: 13px;"><strong><span style="font-family: Arial, Helvetica, sans-serif;">Compra: </span></strong></span></div>
                                            <div style="text-align: center;"><span style="font-size: 13px; font-family: Arial, Helvetica, sans-serif;">${dataExchange.purcharse || ""} </span></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style="text-align: center;"><span style="font-size: 13px;"><strong><span style="font-family: Arial, Helvetica, sans-serif;">Venta: </span></strong></span></div>
                                            <div style="text-align: center;"><span style="font-size: 13px; font-family: Arial, Helvetica, sans-serif;">${dataExchange.sale || ""} </span></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px 30px 30px 30px; text-align: center;"><strong>&nbsp;<a href="https://jairmf.github.io/" target="_blank">Divad Jair Masgo Ferreyra</a>&nbsp;</strong> ${(new Date()).getFullYear()}</td>
                    </tr>
                </tbody>
            </table>`
        };
		sendMail(mailOptions);
	} else {
        console.log("No se envía correo");
    }
	// job.cancel();
});

module.exports = {
  apps : [{
    name: "exchange-notifier",
    script: "./index.js",
    env: {
      NODE_ENV: "development",
      EMAIL_USER: "YOUR_EMAIL",
      EMAIL_PASS: "YOUR_PASSWORD",
      MAIL_SENDER: "YOUR_EMAIL",
      MAIL_RECEIVER: "RECEIVER_EMAIL",
      MAIL_RECEIVER_2: "RECEIVER_EMAIL_2",
    },
    env_production: {
      NODE_ENV: "production",
      EMAIL_USER: "YOUR_EMAIL",
      EMAIL_PASS: "YOUR_PASSWORD",
      MAIL_SENDER: "YOUR_EMAIL",
      MAIL_RECEIVER: "RECEIVER_EMAIL",
      MAIL_RECEIVER_2: "RECEIVER_EMAIL_2",
    }
  }]
}
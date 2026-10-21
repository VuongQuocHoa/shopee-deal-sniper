require("dotenv").config();
module.exports = {
    telegram: {
        token: process.env.TELEGRAM_BOT_TOKEN || "",
        chatId: process.env.TELEGRAM_CHAT_ID || ""
    },
    // Từ khóa tập trung vào đồ ăn vặt và các dạng combo/xả kho
    keywords: ["đồ ăn vặt", "khô gà lá chanh", "bánh tráng trộn", "combo ăn vặt", "snack xả kho"],
    checkIntervalMs: 30000
};

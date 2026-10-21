const TelegramBot = require("node-telegram-bot-api");
const config = require("../config");
const bot = new TelegramBot(config.telegram.token, { polling: false });
async function sendDealAlert(deal) {
    if (!config.telegram.token || !config.telegram.chatId) { console.log(`[Deal Hời] ${deal.name} - Giá: ${deal.price}đ`); return; }
    const msg = `🚨 <b>DEAL HỜI SHOPEE!</b>\n📦 ${deal.name}\n💰 ${deal.price.toLocaleString()}đ\n⭐ Điểm: ${deal.score}\n🔗 ${deal.url}`;
    try { await bot.sendMessage(config.telegram.chatId, msg, { parse_mode: "HTML" }); } catch(e) { console.error(e.message); }
}
module.exports = { sendDealAlert };

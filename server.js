const express = require("express");
const path = require("path");
const config = require("./config");
const { searchShopee } = require("./modules/scraper");
const { filterAndScoreItems } = require("./modules/filter");
const { sendDealAlert } = require("./modules/notifier");

const app = express();
const PORT = process.env.PORT || 3000;

// Phục vụ giao diện tĩnh từ thư mục public
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Bộ nhớ tạm lưu trữ danh sách deal hời mới nhất
const recentDeals = [];
const notifiedIds = new Set();

async function runScraperJob() {
    console.log(`[${new Date().toLocaleTimeString()}] Đang chạy chu kỳ quét Shopee...`);
    for (const keyword of config.keywords) {
        const items = await searchShopee(keyword);
        const hotDeals = filterAndScoreItems(items, 60); // Ngưỡng duyệt trên web

        for (const deal of hotDeals) {
            if (!notifiedIds.has(deal.id)) {
                notifiedIds.add(deal.id);
                recentDeals.unshift(deal); // Đưa deal mới lên đầu danh sách
                
                // Giới hạn lưu trữ 100 deal gần nhất tránh tràn RAM
                if (recentDeals.length > 100) recentDeals.pop();

                // Bắn thông báo về Telegram
                await sendDealAlert(deal);
            }
        }
    }
}

// REST API cho Front-end lấy danh sách deal
app.get("/api/deals", (req, res) => {
    res.json({ success: true, deals: recentDeals });
});

// API thủ công kích hoạt quét ngay lập tức
app.post("/api/scan", async (req, res) => {
    await runScraperJob();
    res.json({ success: true, message: "Đã quét xong!" });
});

// Khởi động Server
app.listen(PORT, () => {
    console.log("==================================================");
    console.log(`  WEB DASHBOARD ĐÃ SẴN SÀNG TẠI: http://localhost:${PORT}`);
    console.log("==================================================");

    // Chạy ngay lần đầu và thiết lập vòng lặp theo thời gian cấu hình
    runScraperJob();
    setInterval(runScraperJob, config.checkIntervalMs);
});

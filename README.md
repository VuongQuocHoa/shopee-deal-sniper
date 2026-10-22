# 🎯 Shopee Deal Sniper & Price Scraper

<div align="center">

[![Live Demo on Render](https://img.shields.io/badge/🌐_Live_Demo-Render-00f0ff?style=for-the-badge&logo=render&logoColor=white)](https://vuongquochoa-shopee-deal-sniper.onrender.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/VuongQuocHoa/shopee-deal-sniper)

</div>

> **Hệ thống bot tự động cào dữ liệu TMĐT, chấm điểm độ hời và cảnh báo tức thời qua Telegram Webhook**

Hệ thống bot Node.js đa luồng liên tục quét các sản phẩm giảm giá chớp nhoáng (Flash Sale) trên sàn thương mại điện tử Shopee, tự động tính điểm hời sản phẩm và gửi thông báo qua Telegram Webhook kèm ảnh, giá gốc, giá sale và link mua trực tiếp.

---

## 🌟 Tính Năng Cốt Lõi

- **Thuật toán chấm điểm:** `filterAndScoreItems` tính toán % giảm giá kết hợp đánh giá mức độ uy tín của shop (Shop Mall, Shop Yêu Thích).
- **Cơ chế chống Rate-limit:** Tự động điều tiết tần suất polling và lọc trùng lặp ID bộ nhớ tránh bị chặn IP.
- **Bảo vệ tài nguyên RAM:** Bộ nhớ tạm dạng buffer vòng tròn (Ring buffer) lưu trữ 100 deal mới nhất.
- **Cảnh báo tức thời:** Bắn thông báo về Telegram trong vòng < 3 giây sau khi deal mở.
- **Web Dashboard:** Giao diện điều khiển giám sát deal trực quan thời gian thực.

---

## 🚀 Hướng Dẫn Vận Hành

```powershell
npm install
npm start
```
Truy cập dashboard: **http://localhost:3000**

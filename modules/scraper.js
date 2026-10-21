const axios = require("axios");

async function searchShopee(keyword) {
    try {
        const url = `https://shopee.vn/api/v4/search/search_items?keyword=${encodeURIComponent(keyword)}&limit=20&by=relevancy&page_type=search`;
        
        // Bổ sung Cookie giả lập và đầy đủ Headers để vượt qua WAF 403
        const res = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7",
                "Referer": `https://shopee.vn/search?keyword=${encodeURIComponent(keyword)}`,
                "X-Requested-With": "XMLHttpRequest",
                "X-Shopee-Language": "vi",
                "Cookie": "SPC_CDS=403c403c-403c-403c-403c-403c403c403c; SPC_CDS_VER=2; REC_T_ID=12345678-1234-1234-1234-1234567890ab;"
            },
            timeout: 10000
        });

        if (res.data && res.data.items) {
            return res.data.items.map(i => {
                const item = i.item_basic;
                const rawPrice = item.price / 100000;
                return {
                    id: item.itemid,
                    shopId: item.shopid,
                    name: item.name,
                    price: rawPrice,
                    historicalPrice: item.price_max ? (item.price_max / 100000) : rawPrice * 1.3,
                    sold: item.historical_sold || 0,
                    rating: item.item_rating ? item.item_rating.rating_star : 0,
                    url: `https://shopee.vn/product/${item.shopid}/${item.itemid}`
                };
            });
        }
        return [];
    } catch (e) {
        console.error("Lỗi cào:", e.response ? `HTTP ${e.response.status}` : e.message);
        return [];
    }
}

module.exports = { searchShopee };

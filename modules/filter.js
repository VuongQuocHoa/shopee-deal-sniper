function evaluateDeal(item) {
    // 1. Loại bỏ ngay nếu giá trên 500k (không phù hợp tiêu chí ăn vặt cá nhân)
    if (item.price > 500000) return null;

    let score = 50;
    const ratio = (item.historicalPrice - item.price) / item.historicalPrice;
    
    // 2. Chấm điểm theo độ hời của giá
    if (ratio > 0.3) score += 30; else if (ratio > 0.15) score += 15;

    // 3. Ưu tiên các từ khóa số lượng lớn, combo, xả kho
    const lowerName = item.name.toLowerCase();
    const snackKeywords = ["combo", "kg", "hũ", "thùng", "xả kho", "túi lớn", "1kg"];
    if (snackKeywords.some(kw => lowerName.includes(kw))) {
        score += 20; // Cộng điểm mạnh cho các deal nhiều đồ / hời về lượng
    }

    return { 
        ...item, 
        score: Math.min(Math.max(score, 0), 100), 
        discountPercentage: Math.round(ratio * 100) 
    };
}

function filterAndScoreItems(items, minScore = 60) {
    return items
        .map(evaluateDeal)
        .filter(item => item !== null && item.score >= minScore);
}

module.exports = { filterAndScoreItems };

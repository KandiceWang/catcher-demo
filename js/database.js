/**
 * 資料庫管理模組
 * 使用 localStorage 進行本地存儲
 * 支援創作者和作品的 CRUD 操作
 */

class Database {
    constructor() {
        this.CREATORS_KEY = 'catcher_creators';
        this.PORTFOLIOS_KEY = 'catcher_portfolios';
        this.CURRENT_LANG = 'zh'; // 預設語言
        
        // 初始化資料
        this.initializeData();
    }

    /**
     * 初始化資料 - 如果 localStorage 沒有資料，載入預設資料
     */
    async initializeData() {
        if (!localStorage.getItem(this.CREATORS_KEY)) {
            try {
                const creatorsResponse = await fetch('./data/creators.json');
                const creators = await creatorsResponse.json();
                localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
            } catch (error) {
                console.error('載入創作者資料失敗:', error);
                localStorage.setItem(this.CREATORS_KEY, JSON.stringify([]));
            }
        }

        if (!localStorage.getItem(this.PORTFOLIOS_KEY)) {
            try {
                const portfoliosResponse = await fetch('./data/portfolios.json');
                const portfolios = await portfoliosResponse.json();
                localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify(portfolios));
            } catch (error) {
                console.error('載入作品資料失敗:', error);
                localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify([]));
            }
        }
    }

    /**
     * 設定當前語言
     */
    setLanguage(lang) {
        this.CURRENT_LANG = lang;
    }

    /**
     * 獲取多語言文字
     */
    getLocalizedText(textObj) {
        if (typeof textObj === 'string') return textObj;
        return textObj[this.CURRENT_LANG] || textObj['zh'] || textObj['en'] || '';
    }

    /**
     * 生成新的 ID
     */
    generateId(items) {
        if (items.length === 0) return 1;
        return Math.max(...items.map(item => item.id)) + 1;
    }

    // ==================== 創作者相關操作 ====================

    /**
     * 獲取所有創作者
     */
    getAllCreators() {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        return creators.map(creator => ({
            ...creator,
            displayName: this.getLocalizedText(creator.name),
            displayBio: this.getLocalizedText(creator.bio)
        }));
    }

    /**
     * 根據 ID 獲取創作者
     */
    getCreatorById(id) {
        const creators = this.getAllCreators();
        const creator = creators.find(c => c.id === parseInt(id));
        if (!creator) return null;

        // 獲取創作者的作品
        const portfolios = this.getPortfoliosByCreatorId(id);
        const pinnedPortfolios = portfolios.filter(p => 
            creator.pinnedPortfolioIds.includes(p.id)
        ).slice(0, 3);
        const otherPortfolios = portfolios.filter(p => 
            !creator.pinnedPortfolioIds.includes(p.id)
        );

        return {
            ...creator,
            portfolios,
            pinnedPortfolios,
            otherPortfolios
        };
    }

    /**
     * 創建新創作者
     */
    createCreator(creatorData) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const newCreator = {
            id: this.generateId(creators),
            name: creatorData.name,
            avatar: creatorData.avatar || '',
            bio: creatorData.bio,
            portfolioIds: [],
            pinnedPortfolioIds: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        creators.push(newCreator);
        localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
        return newCreator;
    }

    /**
     * 更新創作者資料
     */
    updateCreator(id, updateData) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const index = creators.findIndex(c => c.id === parseInt(id));
        
        if (index === -1) return null;

        creators[index] = {
            ...creators[index],
            ...updateData,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
        return creators[index];
    }

    /**
     * 刪除創作者
     */
    deleteCreator(id) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const filteredCreators = creators.filter(c => c.id !== parseInt(id));
        
        if (filteredCreators.length === creators.length) return false;

        localStorage.setItem(this.CREATORS_KEY, JSON.stringify(filteredCreators));
        
        // 同時刪除該創作者的所有作品
        const portfolios = JSON.parse(localStorage.getItem(this.PORTFOLIOS_KEY) || '[]');
        const filteredPortfolios = portfolios.filter(p => p.creatorId !== parseInt(id));
        localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify(filteredPortfolios));
        
        return true;
    }

    // ==================== 作品相關操作 ====================

    /**
     * 獲取所有作品
     */
    getAllPortfolios() {
        const portfolios = JSON.parse(localStorage.getItem(this.PORTFOLIOS_KEY) || '[]');
        return portfolios.map(portfolio => ({
            ...portfolio,
            displayTitle: this.getLocalizedText(portfolio.title),
            displayDescription: this.getLocalizedText(portfolio.description)
        }));
    }

    /**
     * 根據創作者 ID 獲取作品
     */
    getPortfoliosByCreatorId(creatorId) {
        const portfolios = this.getAllPortfolios();
        return portfolios.filter(p => p.creatorId === parseInt(creatorId));
    }

    /**
     * 根據 ID 獲取作品
     */
    getPortfolioById(id) {
        const portfolios = this.getAllPortfolios();
        const portfolio = portfolios.find(p => p.id === parseInt(id));
        if (!portfolio) return null;

        // 獲取創作者資訊
        const creator = this.getCreatorById(portfolio.creatorId);
        
        return {
            ...portfolio,
            creator: creator ? {
                id: creator.id,
                name: creator.displayName,
                avatar: creator.avatar
            } : null
        };
    }

    /**
     * 創建新作品
     */
    createPortfolio(portfolioData) {
        const portfolios = JSON.parse(localStorage.getItem(this.PORTFOLIOS_KEY) || '[]');
        const newPortfolio = {
            id: this.generateId(portfolios),
            creatorId: parseInt(portfolioData.creatorId),
            title: portfolioData.title,
            coverImage: portfolioData.coverImage || '',
            description: portfolioData.description,
            images: portfolioData.images || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        portfolios.push(newPortfolio);
        localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify(portfolios));

        // 更新創作者的作品列表
        this.addPortfolioToCreator(portfolioData.creatorId, newPortfolio.id);

        return newPortfolio;
    }

    /**
     * 更新作品資料
     */
    updatePortfolio(id, updateData) {
        const portfolios = JSON.parse(localStorage.getItem(this.PORTFOLIOS_KEY) || '[]');
        const index = portfolios.findIndex(p => p.id === parseInt(id));
        
        if (index === -1) return null;

        portfolios[index] = {
            ...portfolios[index],
            ...updateData,
            updatedAt: new Date().toISOString()
        };

        localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify(portfolios));
        return portfolios[index];
    }

    /**
     * 刪除作品
     */
    deletePortfolio(id) {
        const portfolios = JSON.parse(localStorage.getItem(this.PORTFOLIOS_KEY) || '[]');
        const portfolio = portfolios.find(p => p.id === parseInt(id));
        
        if (!portfolio) return false;

        const filteredPortfolios = portfolios.filter(p => p.id !== parseInt(id));
        localStorage.setItem(this.PORTFOLIOS_KEY, JSON.stringify(filteredPortfolios));
        
        // 從創作者的作品列表中移除
        this.removePortfolioFromCreator(portfolio.creatorId, parseInt(id));
        
        return true;
    }

    /**
     * 將作品加入創作者的作品列表
     */
    addPortfolioToCreator(creatorId, portfolioId) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const creatorIndex = creators.findIndex(c => c.id === parseInt(creatorId));
        
        if (creatorIndex === -1) return false;

        if (!creators[creatorIndex].portfolioIds.includes(portfolioId)) {
            creators[creatorIndex].portfolioIds.push(portfolioId);
            creators[creatorIndex].updatedAt = new Date().toISOString();
            localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
        }
        
        return true;
    }

    /**
     * 從創作者的作品列表中移除作品
     */
    removePortfolioFromCreator(creatorId, portfolioId) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const creatorIndex = creators.findIndex(c => c.id === parseInt(creatorId));
        
        if (creatorIndex === -1) return false;

        creators[creatorIndex].portfolioIds = creators[creatorIndex].portfolioIds.filter(
            id => id !== portfolioId
        );
        creators[creatorIndex].pinnedPortfolioIds = creators[creatorIndex].pinnedPortfolioIds.filter(
            id => id !== portfolioId
        );
        creators[creatorIndex].updatedAt = new Date().toISOString();
        
        localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
        return true;
    }

    /**
     * 釘選/取消釘選作品
     */
    togglePinnedPortfolio(creatorId, portfolioId) {
        const creators = JSON.parse(localStorage.getItem(this.CREATORS_KEY) || '[]');
        const creatorIndex = creators.findIndex(c => c.id === parseInt(creatorId));
        
        if (creatorIndex === -1) return false;

        const pinnedIds = creators[creatorIndex].pinnedPortfolioIds;
        const portfolioIdInt = parseInt(portfolioId);
        
        if (pinnedIds.includes(portfolioIdInt)) {
            // 取消釘選
            creators[creatorIndex].pinnedPortfolioIds = pinnedIds.filter(id => id !== portfolioIdInt);
        } else {
            // 釘選（最多3個）
            if (pinnedIds.length < 3) {
                creators[creatorIndex].pinnedPortfolioIds.push(portfolioIdInt);
            } else {
                return false; // 已達到釘選上限
            }
        }
        
        creators[creatorIndex].updatedAt = new Date().toISOString();
        localStorage.setItem(this.CREATORS_KEY, JSON.stringify(creators));
        return true;
    }

    // ==================== 搜尋功能 ====================

    /**
     * 搜尋創作者
     */
    searchCreators(keyword) {
        const creators = this.getAllCreators();
        const lowerKeyword = keyword.toLowerCase();
        
        return creators.filter(creator => 
            creator.displayName.toLowerCase().includes(lowerKeyword) ||
            creator.displayBio.toLowerCase().includes(lowerKeyword)
        );
    }

    /**
     * 搜尋作品
     */
    searchPortfolios(keyword) {
        const portfolios = this.getAllPortfolios();
        const lowerKeyword = keyword.toLowerCase();
        
        return portfolios.filter(portfolio => 
            portfolio.displayTitle.toLowerCase().includes(lowerKeyword) ||
            portfolio.displayDescription.toLowerCase().includes(lowerKeyword)
        );
    }

    // ==================== 工具函數 ====================

    /**
     * YouTube URL 轉換為嵌入碼
     */
    static extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    /**
     * 驗證檔案大小
     */
    static validateFileSize(file, maxSizeMB) {
        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        return file.size <= maxSizeBytes;
    }

    /**
     * 驗證文字長度
     */
    static validateTextLength(text, maxLength) {
        return text.length <= maxLength;
    }
}

// 全域資料庫實例
window.CatcherDB = new Database();

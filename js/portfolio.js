/**
 * 作品相關功能模組
 * 處理作品頁面的渲染和互動
 */

class PortfolioManager {
    constructor() {
        this.db = window.CatcherDB;
        this.currentPortfolio = null;
    }

    /**
     * 渲染作品九宮格
     */
    renderPortfolioGrid(containerId, portfolios = null, gridSize = 3) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const portfoliosToRender = portfolios || this.db.getAllPortfolios();
        
        const html = `
            <div class="portfolio-grid grid-${gridSize}">
                ${portfoliosToRender.map(portfolio => `
                    <div class="portfolio-item" data-portfolio-id="${portfolio.id}">
                        <div class="portfolio-item-container">
                            <img src="${portfolio.coverImage || '/images/default-portfolio.png'}" 
                                 alt="${portfolio.displayTitle}"
                                 class="portfolio-image">
                            <div class="portfolio-overlay">
                                <div class="portfolio-info">
                                    <h4 class="portfolio-title">${portfolio.displayTitle}</h4>
                                    <p class="portfolio-creator">${portfolio.creator.displayName}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        container.innerHTML = html;

        // 綁定點擊事件
        container.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.navigateToPortfolioPage(portfolioId);
            });
        });
    }

    /**
     * 渲染作品詳細頁面
     */
    renderPortfolioDetail(containerId, portfolioId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const portfolio = this.db.getPortfolioById(portfolioId);
        if (!portfolio) {
            container.innerHTML = '<div class="error">作品不存在</div>';
            return;
        }

        this.currentPortfolio = portfolio;

        const html = `
            <div class="portfolio-detail">
                <!-- 作品頭部 -->
                <div class="portfolio-header">
                    <div class="creator-info-bar">
                        <div class="creator-avatar-small">
                            <img src="${portfolio.creator.avatar}" 
                                 alt="${portfolio.creator.displayName}"
                                 class="avatar-img-small">
                        </div>
                        <div class="creator-details-small">
                            <h3 class="creator-name-small">${portfolio.creator.displayName}</h3>
                            <span class="portfolio-category">${portfolio.displayCategory}</span>
                        </div>
                        <button class="btn-follow" data-creator-id="${portfolio.creator.id}">
                            ${portfolio.creator.isFollowing ? '已追蹤' : '追蹤'}
                        </button>
                    </div>
                </div>

                <!-- 作品媒體內容 -->
                <div class="portfolio-media">
                    ${this.renderPortfolioMedia(portfolio)}
                </div>

                <!-- 作品資訊 -->
                <div class="portfolio-info-section">
                    <div class="portfolio-actions">
                        <button class="btn-like ${portfolio.isLiked ? 'liked' : ''}" 
                                data-portfolio-id="${portfolio.id}">
                            <i class="icon-heart">${portfolio.isLiked ? '❤️' : '🤍'}</i>
                            <span class="like-count">${portfolio.likes}</span>
                        </button>
                        <button class="btn-share" data-portfolio-id="${portfolio.id}">
                            <i class="icon-share">📤</i>
                        </button>
                        ${portfolio.creator.isOwner ? `
                        <button class="btn-edit" data-portfolio-id="${portfolio.id}">
                            <i class="icon-edit">✏️</i>
                        </button>
                        ` : ''}
                    </div>

                    <div class="portfolio-description">
                        <h1 class="portfolio-title-large">${portfolio.displayTitle}</h1>
                        <p class="portfolio-desc">${portfolio.displayDescription}</p>
                        
                        ${portfolio.tags && portfolio.tags.length > 0 ? `
                        <div class="portfolio-tags">
                            ${portfolio.tags.map(tag => `
                                <span class="tag">#${tag}</span>
                            `).join('')}
                        </div>
                        ` : ''}

                        <div class="portfolio-meta">
                            <span class="created-date">建立於 ${this.formatDate(portfolio.createdAt)}</span>
                        </div>
                    </div>
                </div>

                <!-- 相關作品 -->
                <div class="related-portfolios-section">
                    <h2 class="section-title">更多來自 ${portfolio.creator.displayName} 的作品</h2>
                    <div id="relatedPortfolios" class="related-portfolios-grid"></div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.bindPortfolioDetailEvents(container);
        this.loadRelatedPortfolios(portfolio.creator.id, portfolioId);
    }

    /**
     * 渲染作品媒體內容
     */
    renderPortfolioMedia(portfolio) {
        if (portfolio.type === 'video') {
            if (portfolio.videoUrl.includes('youtube.com') || portfolio.videoUrl.includes('youtu.be')) {
                const embedUrl = Database.getYouTubeEmbedUrl(portfolio.videoUrl);
                return `
                    <div class="video-container">
                        <iframe src="${embedUrl}" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                        </iframe>
                    </div>
                `;
            } else {
                return `
                    <div class="video-container">
                        <video controls>
                            <source src="${portfolio.videoUrl}" type="video/mp4">
                            您的瀏覽器不支援影片播放
                        </video>
                    </div>
                `;
            }
        } else {
            // 圖片類型
            const images = Array.isArray(portfolio.images) ? portfolio.images : [portfolio.coverImage];
            
            if (images.length === 1) {
                return `
                    <div class="single-image-container">
                        <img src="${images[0]}" alt="${portfolio.displayTitle}" class="portfolio-main-image">
                    </div>
                `;
            } else {
                return `
                    <div class="image-gallery">
                        <div class="main-image-container">
                            <img src="${images[0]}" alt="${portfolio.displayTitle}" 
                                 class="portfolio-main-image" id="mainImage">
                        </div>
                        <div class="thumbnail-container">
                            ${images.map((img, index) => `
                                <img src="${img}" alt="縮圖 ${index + 1}" 
                                     class="thumbnail ${index === 0 ? 'active' : ''}"
                                     data-index="${index}">
                            `).join('')}
                        </div>
                    </div>
                `;
            }
        }
    }

    /**
     * 綁定作品詳細頁面事件
     */
    bindPortfolioDetailEvents(container) {
        // 圖片庫切換
        const thumbnails = container.querySelectorAll('.thumbnail');
        const mainImage = container.querySelector('#mainImage');
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                const images = this.currentPortfolio.images || [this.currentPortfolio.coverImage];
                
                // 更新主圖
                if (mainImage) {
                    mainImage.src = images[index];
                }
                
                // 更新縮圖狀態
                thumbnails.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // 按讚功能
        const likeBtn = container.querySelector('.btn-like');
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.toggleLike(portfolioId, e.currentTarget);
            });
        }

        // 分享功能
        const shareBtn = container.querySelector('.btn-share');
        if (shareBtn) {
            shareBtn.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.sharePortfolio(portfolioId);
            });
        }

        // 編輯功能
        const editBtn = container.querySelector('.btn-edit');
        if (editBtn) {
            editBtn.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.showEditPortfolioModal(portfolioId);
            });
        }

        // 追蹤功能
        const followBtn = container.querySelector('.btn-follow');
        if (followBtn) {
            followBtn.addEventListener('click', (e) => {
                const creatorId = e.currentTarget.dataset.creatorId;
                this.toggleFollow(creatorId, e.currentTarget);
            });
        }

        // 創作者頭像點擊
        const creatorAvatar = container.querySelector('.creator-avatar-small');
        if (creatorAvatar) {
            creatorAvatar.addEventListener('click', () => {
                this.navigateToCreatorPage(this.currentPortfolio.creator.id);
            });
        }
    }

    /**
     * 載入相關作品
     */
    loadRelatedPortfolios(creatorId, excludePortfolioId) {
        const creatorPortfolios = this.db.getPortfoliosByCreator(creatorId)
            .filter(p => p.id !== excludePortfolioId)
            .slice(0, 6);
        
        this.renderPortfolioGrid('relatedPortfolios', creatorPortfolios, 3);
    }

    /**
     * 切換按讚狀態
     */
    toggleLike(portfolioId, button) {
        // 這裡應該與後端 API 整合
        const portfolio = this.db.getPortfolioById(portfolioId);
        if (!portfolio) return;

        const isLiked = !portfolio.isLiked;
        const newLikes = isLiked ? portfolio.likes + 1 : portfolio.likes - 1;

        // 更新本地資料
        const updatedPortfolio = this.db.updatePortfolio(portfolioId, {
            isLiked: isLiked,
            likes: newLikes
        });

        if (updatedPortfolio) {
            // 更新按鈕狀態
            const icon = button.querySelector('.icon-heart');
            const count = button.querySelector('.like-count');
            
            icon.textContent = isLiked ? '❤️' : '🤍';
            count.textContent = newLikes;
            button.classList.toggle('liked', isLiked);
        }
    }

    /**
     * 分享作品
     */
    sharePortfolio(portfolioId) {
        const portfolio = this.db.getPortfolioById(portfolioId);
        if (!portfolio) return;

        const shareUrl = `${window.location.origin}/portfolio.html?id=${portfolioId}`;
        const shareText = `查看 ${portfolio.creator.displayName} 的作品：${portfolio.displayTitle}`;

        if (navigator.share) {
            navigator.share({
                title: portfolio.displayTitle,
                text: shareText,
                url: shareUrl
            });
        } else {
            // 複製到剪貼簿
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('連結已複製到剪貼簿');
            });
        }
    }

    /**
     * 切換追蹤狀態
     */
    toggleFollow(creatorId, button) {
        // 這裡應該與後端 API 整合
        const creator = this.db.getCreatorById(creatorId);
        if (!creator) return;

        const isFollowing = !creator.isFollowing;
        
        // 更新本地資料
        const updatedCreator = this.db.updateCreator(creatorId, {
            isFollowing: isFollowing
        });

        if (updatedCreator) {
            button.textContent = isFollowing ? '已追蹤' : '追蹤';
            button.classList.toggle('following', isFollowing);
        }
    }

    /**
     * 顯示編輯作品彈窗
     */
    showEditPortfolioModal(portfolioId) {
        const portfolio = this.db.getPortfolioById(portfolioId);
        if (!portfolio) return;

        // 這裡可以實作編輯功能的彈窗
        alert('編輯功能開發中...');
    }

    /**
     * 格式化日期
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * 導航到創作者頁面
     */
    navigateToCreatorPage(creatorId) {
        window.location.href = `./creator.html?id=${creatorId}`;
    }

    /**
     * 導航到作品頁面
     */
    navigateToPortfolioPage(portfolioId) {
        window.location.href = `./portfolio.html?id=${portfolioId}`;
    }

    /**
     * 搜尋作品
     */
    searchPortfolios(keyword, containerId) {
        const results = this.db.searchPortfolios(keyword);
        this.renderPortfolioGrid(containerId, results);
        return results;
    }

    /**
     * 按分類篩選作品
     */
    filterByCategory(category, containerId) {
        const results = this.db.getPortfoliosByCategory(category);
        this.renderPortfolioGrid(containerId, results);
        return results;
    }
}

// 全域作品管理實例
window.PortfolioManager = new PortfolioManager();

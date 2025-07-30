/**
 * 創作者相關功能模組
 * 處理創作者頁面的渲染和互動
 */

class CreatorManager {
    constructor() {
        this.db = window.CatcherDB;
        this.currentCreator = null;
    }

    /**
     * 渲染創作者列表
     */
    renderCreatorList(containerId, creators = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const creatorsToRender = creators || this.db.getAllCreators();
        
        const html = creatorsToRender.map(creator => `
            <div class="creator-card" data-creator-id="${creator.id}">
                <div class="creator-avatar">
                    <img src="${creator.avatar || '/images/default-avatar.png'}" 
                         alt="${creator.displayName}" 
                         class="avatar-img">
                </div>
                <div class="creator-info">
                    <h3 class="creator-name">${creator.displayName}</h3>
                    <p class="creator-bio">${this.truncateText(creator.displayBio, 100)}</p>
                    <div class="creator-stats">
                        <span class="portfolio-count">${creator.portfolioIds.length} 作品</span>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = html;

        // 綁定點擊事件
        container.querySelectorAll('.creator-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const creatorId = e.currentTarget.dataset.creatorId;
                this.navigateToCreatorPage(creatorId);
            });
        });
    }

    /**
     * 渲染創作者詳細頁面（仿 IG 個人頁面）
     */
    renderCreatorProfile(containerId, creatorId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const creator = this.db.getCreatorById(creatorId);
        if (!creator) {
            container.innerHTML = '<div class="error">創作者不存在</div>';
            return;
        }

        this.currentCreator = creator;

        const html = `
            <div class="creator-profile">
                <!-- 創作者頭部資訊 -->
                <div class="creator-header">
                    <div class="creator-avatar-large">
                        <img src="${creator.avatar || '/images/default-avatar.png'}" 
                             alt="${creator.displayName}" 
                             class="avatar-img-large">
                    </div>
                    <div class="creator-details">
                        <div class="creator-name-section">
                            <h1 class="creator-name-large">${creator.displayName}</h1>
                            <button class="btn-edit-profile" ${creator.isOwner ? '' : 'style="display:none"'}>
                                編輯個人檔案
                            </button>
                        </div>
                        <div class="creator-stats-large">
                            <span class="stat-item">
                                <strong>${creator.portfolios.length}</strong> 作品
                            </span>
                            <span class="stat-item">
                                <strong>${creator.pinnedPortfolios.length}</strong> 釘選
                            </span>
                        </div>
                        <div class="creator-bio-large">
                            <p>${creator.displayBio}</p>
                        </div>
                    </div>
                </div>

                <!-- 釘選作品區域 -->
                ${creator.pinnedPortfolios.length > 0 ? `
                <div class="pinned-portfolios-section">
                    <h2 class="section-title">釘選作品</h2>
                    <div class="pinned-portfolios-grid">
                        ${creator.pinnedPortfolios.map(portfolio => `
                            <div class="pinned-portfolio-item" data-portfolio-id="${portfolio.id}">
                                <img src="${portfolio.coverImage}" 
                                     alt="${portfolio.displayTitle}"
                                     class="pinned-portfolio-image">
                                <div class="pinned-portfolio-overlay">
                                    <span class="portfolio-title">${portfolio.displayTitle}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- 作品九宮格 -->
                <div class="portfolios-section">
                    <div class="portfolios-grid">
                        ${creator.portfolios.map(portfolio => `
                            <div class="portfolio-grid-item" data-portfolio-id="${portfolio.id}">
                                <img src="${portfolio.coverImage}" 
                                     alt="${portfolio.displayTitle}"
                                     class="portfolio-grid-image">
                                <div class="portfolio-grid-overlay">
                                    <div class="portfolio-grid-info">
                                        <span class="portfolio-title">${portfolio.displayTitle}</span>
                                        ${creator.pinnedPortfolioIds.includes(portfolio.id) ? 
                                            '<i class="pin-icon">📌</i>' : ''}
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
        this.bindCreatorProfileEvents(container);
    }

    /**
     * 綁定創作者頁面事件
     */
    bindCreatorProfileEvents(container) {
        // 釘選作品點擊
        container.querySelectorAll('.pinned-portfolio-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.navigateToPortfolioPage(portfolioId);
            });
        });

        // 作品九宮格點擊
        container.querySelectorAll('.portfolio-grid-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const portfolioId = e.currentTarget.dataset.portfolioId;
                this.navigateToPortfolioPage(portfolioId);
            });
        });

        // 編輯個人檔案按鈕
        const editBtn = container.querySelector('.btn-edit-profile');
        if (editBtn) {
            editBtn.addEventListener('click', () => {
                this.showEditProfileModal();
            });
        }
    }

    /**
     * 顯示編輯個人檔案彈窗
     */
    showEditProfileModal() {
        if (!this.currentCreator) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-container">
                <div class="modal-header">
                    <h3>編輯個人檔案</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="editCreatorForm">
                        <div class="form-group">
                            <label>頭像</label>
                            <input type="file" id="avatarInput" accept="image/*">
                            <div class="avatar-preview">
                                <img src="${this.currentCreator.avatar}" id="avatarPreview" class="avatar-preview-img">
                            </div>
                        </div>
                        <div class="form-group">
                            <label>名稱 (中文)</label>
                            <input type="text" id="nameZh" value="${this.currentCreator.name.zh}" maxlength="50" required>
                        </div>
                        <div class="form-group">
                            <label>名稱 (English)</label>
                            <input type="text" id="nameEn" value="${this.currentCreator.name.en || ''}" maxlength="50">
                        </div>
                        <div class="form-group">
                            <label>自我介紹 (中文)</label>
                            <textarea id="bioZh" maxlength="500" rows="4">${this.currentCreator.bio.zh}</textarea>
                        </div>
                        <div class="form-group">
                            <label>自我介紹 (English)</label>
                            <textarea id="bioEn" maxlength="500" rows="4">${this.currentCreator.bio.en || ''}</textarea>
                        </div>
                        <div class="form-actions">
                            <button type="button" class="btn-cancel">取消</button>
                            <button type="submit" class="btn-save">儲存</button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.bindEditProfileEvents(modal);
    }

    /**
     * 綁定編輯個人檔案事件
     */
    bindEditProfileEvents(modal) {
        const form = modal.querySelector('#editCreatorForm');
        const avatarInput = modal.querySelector('#avatarInput');
        const avatarPreview = modal.querySelector('#avatarPreview');
        const closeBtn = modal.querySelector('.modal-close');
        const cancelBtn = modal.querySelector('.btn-cancel');

        // 頭像預覽
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                if (!Database.validateFileSize(file, 2)) {
                    alert('頭像檔案大小不能超過 2MB');
                    return;
                }

                const reader = new FileReader();
                reader.onload = (e) => {
                    avatarPreview.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // 關閉彈窗
        const closeModal = () => document.body.removeChild(modal);
        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // 表單提交
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCreatorProfile(modal);
        });
    }

    /**
     * 儲存創作者個人檔案
     */
    saveCreatorProfile(modal) {
        const formData = {
            name: {
                zh: modal.querySelector('#nameZh').value,
                en: modal.querySelector('#nameEn').value
            },
            bio: {
                zh: modal.querySelector('#bioZh').value,
                en: modal.querySelector('#bioEn').value
            },
            avatar: modal.querySelector('#avatarPreview').src
        };

        // 驗證
        if (!Database.validateTextLength(formData.name.zh, 50)) {
            alert('中文名稱不能超過 50 字');
            return;
        }

        if (!Database.validateTextLength(formData.bio.zh, 500)) {
            alert('中文自我介紹不能超過 500 字');
            return;
        }

        // 更新資料
        const updatedCreator = this.db.updateCreator(this.currentCreator.id, formData);
        if (updatedCreator) {
            alert('個人檔案更新成功');
            document.body.removeChild(modal);
            // 重新載入頁面
            location.reload();
        } else {
            alert('更新失敗');
        }
    }

    /**
     * 截斷文字
     */
    truncateText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
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
     * 搜尋創作者
     */
    searchCreators(keyword, containerId) {
        const results = this.db.searchCreators(keyword);
        this.renderCreatorList(containerId, results);
        return results;
    }
}

// 全域創作者管理實例
window.CreatorManager = new CreatorManager();

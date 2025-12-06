// Main application JavaScript
class SurgeTestApp {
    constructor() {
        this.clickCount = 0;
        this.colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        this.currentColorIndex = 0;
        
        this.init();
    }

    init() {
        console.log('🚀 Surge Test App Initialized!');
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }

    setupApp() {
        this.updateFileStatus();
        this.setupEventListeners();
        this.updateTimestamp();
        
        // Simulate resource loading
        this.simulateResourceLoading();
    }

    updateFileStatus() {
        // Update status indicators
        this.updateStatus('html-status', '✅ Loaded', 'loaded');
        this.updateStatus('css-status', '✅ Loaded', 'loaded');
        this.updateStatus('js-status', '✅ Loaded', 'loaded');
    }

    updateStatus(elementId, text, className) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = text;
            element.className = `status ${className}`;
        }
    }

    setupEventListeners() {
        // CTA Button
        const ctaButton = document.getElementById('click-btn');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                this.handleCtaClick();
            });
        }

        // Color change buttons
        const changeColorBtn = document.getElementById('change-color');
        const resetColorBtn = document.getElementById('reset-color');
        const colorBox = document.getElementById('color-box');

        if (changeColorBtn && resetColorBtn && colorBox) {
            changeColorBtn.addEventListener('click', () => {
                this.changeColor(colorBox);
            });

            resetColorBtn.addEventListener('click', () => {
                this.resetColor(colorBox);
            });
        }

        // Click counter
        document.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') {
                this.incrementClickCount();
            }
        });
    }

    handleCtaClick() {
        this.clickCount += 3; // Extra points for CTA clicks
        this.updateClickCount();
        
        // Show confirmation
        this.showNotification('🎉 Awesome! Surge.sh is working perfectly!');
        
        // Add some fun animation
        const button = document.getElementById('click-btn');
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    }

    changeColor(colorBox) {
        this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
        const newColor = this.colors[this.currentColorIndex];
        
        colorBox.style.backgroundColor = newColor;
        colorBox.style.transform = 'scale(1.1) rotate(5deg)';
        
        setTimeout(() => {
            colorBox.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
        
        this.showNotification(`Color changed to ${newColor}`);
    }

    resetColor(colorBox) {
        this.currentColorIndex = 0;
        colorBox.style.backgroundColor = this.colors[0];
        colorBox.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            colorBox.style.transform = 'scale(1)';
        }, 300);
        
        this.showNotification('Color reset to default');
    }

    incrementClickCount() {
        this.clickCount++;
        this.updateClickCount();
    }

    updateClickCount() {
        const clickCountElement = document.getElementById('click-count');
        if (clickCountElement) {
            clickCountElement.textContent = this.clickCount;
            
            // Add animation
            clickCountElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                clickCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }

    updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        if (timestampElement) {
            const now = new Date();
            timestampElement.textContent = `Last updated: ${now.toLocaleString()}`;
        }
    }

    simulateResourceLoading() {
        // Simulate async operations
        setTimeout(() => {
            this.showNotification('📦 All resources loaded successfully from Surge!');
        }, 1000);

        // Update timestamp every minute
        setInterval(() => {
            this.updateTimestamp();
        }, 60000);
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #48bb78;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-weight: bold;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Utility functions
const utils = {
    // Generate random color
    getRandomColor: () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    // Format file size
    formatFileSize: (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Initialize the app when the script loads
const app = new SurgeTestApp();

// Export for global access (if needed)
window.SurgeTestApp = app;
window.SurgeUtils = utils;

console.log('✅ app.js loaded successfully from Surge.sh!');
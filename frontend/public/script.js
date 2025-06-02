// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Enhanced form submission handling with secret access
document.getElementById('applicationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Check for secret access
    if (data.firstName.toLowerCase() === 'secret' && data.lastName.toLowerCase() === 'room') {
        // Secret access detected!
        showSecretAccessSequence();
        return;
    }
    
    // Simple validation for normal applications
    const requiredFields = ['firstName', 'lastName', 'email', 'position', 'experience'];
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!data[field]) {
            isValid = false;
            const input = document.getElementById(field);
            input.style.borderColor = '#ff6b6b';
            input.addEventListener('input', function() {
                this.style.borderColor = '#e2e8f0';
            });
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        showNotification('Application submitted successfully! We\'ll be in touch soon.', 'success');
        this.reset();
    }, 2000);
});

// Secret access sequence with animations
function showSecretAccessSequence() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = 'secretOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #000000, #1a1a1a, #333333);
        z-index: 100000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: secretFadeIn 1s ease-out forwards;
    `;
    
    document.body.appendChild(overlay);
    
    // Add CSS for secret animations
    if (!document.getElementById('secretStyles')) {
        const style = document.createElement('style');
        style.id = 'secretStyles';
        style.textContent = `
            @keyframes secretFadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes lockUnlock {
                0% { transform: scale(1) rotate(0deg); }
                25% { transform: scale(1.2) rotate(-10deg); }
                50% { transform: scale(1.1) rotate(10deg); }
                75% { transform: scale(1.3) rotate(-5deg); color: #ffd700; }
                100% { transform: scale(2) rotate(0deg); color: #00ff00; }
            }
            
            @keyframes textGlow {
                0%, 100% { text-shadow: 0 0 10px #ff0000; }
                25% { text-shadow: 0 0 20px #ff6600; }
                50% { text-shadow: 0 0 30px #ffff00; }
                75% { text-shadow: 0 0 20px #00ff00; }
            }
            
            @keyframes matrixRain {
                0% { transform: translateY(-100px); opacity: 0; }
                50% { opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
            
            @keyframes secretPulse {
                0%, 100% { transform: scale(1); filter: brightness(1); }
                50% { transform: scale(1.05); filter: brightness(1.3); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Phase 1: Matrix-style background
    createMatrixEffect(overlay);
    
    // Phase 2: Show lock after 2 seconds
    setTimeout(() => {
        showAnimatedLock(overlay);
    }, 2000);
    
    // Phase 3: Play music and show warning after 4 seconds
    setTimeout(() => {
        playSecretMusic();
        showSecretWarning(overlay);
    }, 4000);
}

function createMatrixEffect(container) {
    const matrixDiv = document.createElement('div');
    matrixDiv.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
    `;
    
    // Create falling text
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    for (let i = 0; i < 50; i++) {
        const span = document.createElement('span');
        span.textContent = characters.charAt(Math.floor(Math.random() * characters.length));
        span.style.cssText = `
            position: absolute;
            top: -50px;
            left: ${Math.random() * 100}%;
            color: #00ff00;
            font-family: 'Courier New', monospace;
            font-size: ${Math.random() * 20 + 10}px;
            animation: matrixRain ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        matrixDiv.appendChild(span);
    }
    
    container.appendChild(matrixDiv);
}

function showAnimatedLock(container) {
    const lockContainer = document.createElement('div');
    lockContainer.style.cssText = `
        text-align: center;
        z-index: 10;
    `;
    
    const lockIcon = document.createElement('div');
    lockIcon.innerHTML = '🔒';
    lockIcon.style.cssText = `
        font-size: 150px;
        margin-bottom: 30px;
        animation: lockUnlock 3s ease-in-out forwards;
    `;
    
    const lockText = document.createElement('h1');
    lockText.textContent = 'ACCESS GRANTED';
    lockText.style.cssText = `
        color: #ffffff;
        font-family: 'Orbitron', monospace;
        font-size: 48px;
        margin: 0;
        animation: textGlow 2s ease-in-out infinite;
    `;
    
    lockContainer.appendChild(lockIcon);
    lockContainer.appendChild(lockText);
    container.appendChild(lockContainer);
    
    // Change lock to unlocked after animation
    setTimeout(() => {
        lockIcon.innerHTML = '🔓';
        lockIcon.style.color = '#00ff00';
    }, 2000);
}

function playSecretMusic() {
    // Create epic entrance music using Web Audio API
    if (!window.secretAudioContext) {
        window.secretAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    const audioContext = window.secretAudioContext;
    
    // Epic chord progression
    const playNote = (frequency, startTime, duration) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.1, startTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    };
    
    const now = audioContext.currentTime;
    
    // Epic progression: C - Am - F - G
    playNote(261.63, now, 1); // C
    playNote(329.63, now, 1); // E
    playNote(392.00, now, 1); // G
    
    playNote(220.00, now + 1, 1); // A
    playNote(261.63, now + 1, 1); // C
    playNote(329.63, now + 1, 1); // E
    
    playNote(174.61, now + 2, 1); // F
    playNote(220.00, now + 2, 1); // A
    playNote(261.63, now + 2, 1); // C
    
    playNote(196.00, now + 3, 2); // G
    playNote(246.94, now + 3, 2); // B
    playNote(293.66, now + 3, 2); // D
}

function showSecretWarning(container) {
    setTimeout(() => {
        container.innerHTML = '';
        
        const warningDiv = document.createElement('div');
        warningDiv.style.cssText = `
            text-align: center;
            max-width: 800px;
            padding: 40px;
            background: rgba(255, 0, 0, 0.1);
            border: 3px solid #ff0000;
            border-radius: 20px;
            animation: secretPulse 2s ease-in-out infinite;
        `;
        
        warningDiv.innerHTML = `
            <div style="font-size: 100px; margin-bottom: 20px;">⚠️</div>
            <h1 style="color: #ff0000; font-family: 'Orbitron', monospace; font-size: 36px; margin-bottom: 20px; animation: textGlow 1.5s ease-in-out infinite;">
                WARNING: ROAST ZONE AHEAD
            </h1>
            <p style="color: #ffffff; font-size: 18px; margin-bottom: 30px;">
                You have discovered the SECRET ROAST CHAMBER where Abubakar unleashes legendary roasts on his classmates!
            </p>
            <p style="color: #ffff00; font-size: 16px; margin-bottom: 40px;">
                <strong>⚡ EPIC MODE ACTIVATED ⚡</strong><br>
                Prepare for MAXIMUM ROAST POWER!
            </p>
            
            <div style="display: flex; gap: 20px; justify-content: center;">
                <button onclick="enterRoastZoneEpic()" style="
                    background: linear-gradient(45deg, #ff0000, #ff6600);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    animation: secretPulse 1s ease-in-out infinite;
                ">
                    🔥 ENTER THE ROAST ZONE 🔥
                </button>
                
                <button onclick="escapeToSafety()" style="
                    background: linear-gradient(45deg, #666666, #999999);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 10px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                ">
                    🛡️ ESCAPE TO SAFETY 🛡️
                </button>
            </div>
        `;
        
        container.appendChild(warningDiv);
    }, 1000);
}

// Functions for secret warning buttons
function enterRoastZoneEpic() {
    const overlay = document.getElementById('secretOverlay');
    
    // Epic transition effect
    overlay.style.animation = 'none';
    overlay.style.background = 'radial-gradient(circle, #ff0000, #000000)';
    overlay.style.transform = 'scale(10)';
    overlay.style.transition = 'all 1s ease-out';
    
    setTimeout(() => {
        window.location.href = 'secret-roast.html';
    }, 1000);
}

function escapeToSafety() {
    const overlay = document.getElementById('secretOverlay');
    overlay.style.animation = 'secretFadeIn 0.5s ease-out reverse forwards';
    
    setTimeout(() => {
        overlay.remove();
        showNotification('You have escaped the roast zone... for now! 😏', 'info');
    }, 500);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            max-width: 400px;
            padding: 15px 20px;
            border-radius: 10px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .notification-success {
            background: linear-gradient(135deg, #10b981, #059669);
        }
        
        .notification-error {
            background: linear-gradient(135deg, #ef4444, #dc2626);
        }
        
        .notification-info {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            margin-left: auto;
            opacity: 0.8;
            transition: opacity 0.2s;
        }
        
        .notification-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.team-card, .job-card, .resource-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue + '+';
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    window.requestAnimationFrame(step);
}

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat h3');
            stats.forEach((stat, index) => {
                const values = [50, 15, 5];
                animateCounter(stat, 0, values[index], 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background img');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Hover effects for interactive elements
document.querySelectorAll('.team-card, .job-card, .resource-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Legacy secret access function (keeping for backward compatibility)
function secretAccess() {
    const userInput = prompt("🔥 Enter the secret code to access the roast zone (Hint: Think of Abubakar's favorite number):").toLowerCase();
    
    if (userInput === "42" || userInput === "abubakar" || userInput === "roast" || userInput === "fire") {
        showSecretAccessSequence();
    } else {
        alert("🚫 Access denied! Nice try though 😏");
    }
}
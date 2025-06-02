// Secret Roast Zone JavaScript - ENHANCED EPIC EDITION

// Enhanced entrance music system
class RoastMusicPlayer {
    constructor() {
        this.audioContext = null;
        this.isPlaying = false;
    }
    
    async init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            return true;
        } catch (error) {
            console.log('Audio context not available');
            return false;
        }
    }
    
    playEpicEntrance() {
        if (!this.audioContext) return;
        
        const now = this.audioContext.currentTime;
        
        // Epic orchestral-style entrance
        this.playChord([261.63, 329.63, 392.00], now, 2); // C Major
        this.playChord([293.66, 369.99, 440.00], now + 0.5, 1.5); // D Major
        this.playChord([329.63, 415.30, 493.88], now + 1, 1.5); // E Major
        this.playChord([349.23, 440.00, 523.25], now + 1.5, 2); // F Major
        
        // Add bass line
        this.playNote(130.81, now, 0.5, 'sawtooth', 0.3); // C bass
        this.playNote(146.83, now + 0.5, 0.5, 'sawtooth', 0.3); // D bass
        this.playNote(164.81, now + 1, 0.5, 'sawtooth', 0.3); // E bass
        this.playNote(174.61, now + 1.5, 0.5, 'sawtooth', 0.3); // F bass
        
        // Add dramatic drums
        this.playDrum(now);
        this.playDrum(now + 0.5);
        this.playDrum(now + 1);
        this.playDrum(now + 1.5);
    }
    
    playChord(frequencies, startTime, duration) {
        frequencies.forEach(freq => {
            this.playNote(freq, startTime, duration, 'triangle', 0.1);
        });
    }
    
    playNote(frequency, startTime, duration, type = 'sine', volume = 0.1) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    }
    
    playDrum(startTime) {
        // Create drum sound using noise
        const bufferSize = this.audioContext.sampleRate * 0.1;
        const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = buffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        const noise = this.audioContext.createBufferSource();
        const filter = this.audioContext.createBiquadFilter();
        const gainNode = this.audioContext.createGain();
        
        noise.buffer = buffer;
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, startTime);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        gainNode.gain.setValueAtTime(0.5, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
        
        noise.start(startTime);
        noise.stop(startTime + 0.1);
    }
}

const musicPlayer = new RoastMusicPlayer();

// Enhanced warning screen management
function enterRoastZone() {
    document.getElementById('warningScreen').classList.remove('active');
    
    // Initialize music player
    musicPlayer.init().then(success => {
        if (success) {
            musicPlayer.playEpicEntrance();
        }
    });
    
    // Create crazy entrance effects
    createCrazyEntrance();
    
    // Show achievement
    showAchievement('EPIC MODE ACTIVATED!', 'Welcome to the ultimate roast chamber! 🔥');
    
    // Add dramatic entrance effects to cards
    document.querySelectorAll('.roast-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.animation = 'epicCardEntrance 1.2s ease-out forwards';
            card.style.opacity = '0';
            card.style.transform = 'translateY(100px) rotateX(-20deg)';
        }, index * 300);
    });
    
    // Start continuous background effects
    startContinuousEffects();
}

function createCrazyEntrance() {
    const entrance = document.getElementById('crazyEntrance');
    if (!entrance) return;
    
    entrance.classList.add('active');
    
    // Create explosion effect
    const explosionContainer = entrance.querySelector('.explosion-effects');
    for (let i = 0; i < 20; i++) {
        const explosion = document.createElement('div');
        explosion.className = 'explosion-particle';
        explosion.style.cssText = `
            position: absolute;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: ${['#ff0000', '#ff6600', '#ffff00', '#ff3300'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: explode ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        explosionContainer.appendChild(explosion);
        
        setTimeout(() => explosion.remove(), 3000);
    }
    
    // Create roast rain effect
    const rainContainer = entrance.querySelector('.roast-rain');
    const roastEmojis = ['🔥', '💀', '😂', '⚡', '💥', '🤯', '😎', '🎯'];
    
    for (let i = 0; i < 30; i++) {
        const drop = document.createElement('div');
        drop.textContent = roastEmojis[Math.floor(Math.random() * roastEmojis.length)];
        drop.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 20}px;
            left: ${Math.random() * 100}%;
            top: -50px;
            animation: roastRain ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        rainContainer.appendChild(drop);
    }
    
    // Remove entrance effects after 5 seconds
    setTimeout(() => {
        entrance.classList.remove('active');
        entrance.innerHTML = '<div class="explosion-effects"></div><div class="roast-rain"></div>';
    }, 5000);
}

function startContinuousEffects() {
    // Add floating emojis
    setInterval(() => {
        createFloatingEmoji();
    }, 2000);
    
    // Add screen shake on roast interactions
    document.querySelectorAll('.roast-card').forEach(card => {
        card.addEventListener('click', () => {
            document.body.style.animation = 'screenShake 0.5s ease-in-out';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        });
    });
}

function createFloatingEmoji() {
    const emojis = ['🔥', '💀', '😂', '⚡', '💥', '🤯'];
    const emoji = document.createElement('div');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.cssText = `
        position: fixed;
        font-size: 30px;
        left: ${Math.random() * window.innerWidth}px;
        top: 100vh;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 4s ease-out forwards;
    `;
    
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 4000);
}

function goBack() {
    window.location.href = 'index.html';
}

// Enhanced roast sound effects
function playRoastSound(victim) {
    // Create enhanced audio context for roast sound effects
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Play different epic sound for each victim
    switch(victim) {
        case 'jawad':
            playNerdyBeeps(audioContext);
            break;
        case 'zulkernain':
            playSleepySnores(audioContext);
            break;
        case 'abdi':
            playOverconfidentFanfare(audioContext);
            break;
        case 'nasir':
            playOverthinkingWobble(audioContext);
            break;
        case 'aanane':
            playRespectfulApplause(audioContext);
            break;
    }
    
    // Enhanced visual feedback
    const button = event.target.closest('.roast-btn');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-fire"></i> ROASTED! 🔥';
    button.style.background = 'linear-gradient(45deg, #ff6b35, #ff8c42)';
    button.style.transform = 'scale(1.1)';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = 'linear-gradient(45deg, #ff4500, #ff6b35)';
        button.style.transform = 'scale(1)';
    }, 2000);
    
    // Create enhanced roast particles
    createEnhancedRoastParticles(button);
    
    // Show roast reaction
    showRoastReaction(victim);
    
    // Screen effects
    flashScreen();
}

function playNerdyBeeps(audioContext) {
    const times = [0, 0.1, 0.2, 0.3, 0.4];
    const frequencies = [800, 1000, 800, 1200, 600];
    
    times.forEach((time, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(frequencies[index], audioContext.currentTime + time);
        osc.type = 'square';
        
        gain.gain.setValueAtTime(0.1, audioContext.currentTime + time);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + time + 0.1);
        
        osc.start(audioContext.currentTime + time);
        osc.stop(audioContext.currentTime + time + 0.1);
    });
}

function playSleepySnores(audioContext) {
    for (let i = 0; i < 3; i++) {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(150, audioContext.currentTime + i * 0.5);
        osc.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + i * 0.5 + 0.4);
        osc.type = 'sawtooth';
        
        gain.gain.setValueAtTime(0, audioContext.currentTime + i * 0.5);
        gain.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + i * 0.5 + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + i * 0.5 + 0.4);
        
        osc.start(audioContext.currentTime + i * 0.5);
        osc.stop(audioContext.currentTime + i * 0.5 + 0.4);
    }
}

function playOverconfidentFanfare(audioContext) {
    const notes = [523, 659, 784, 1047]; // C, E, G, C octave
    
    notes.forEach((freq, index) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        
        osc.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.15);
        osc.type = 'triangle';
        
        gain.gain.setValueAtTime(0.12, audioContext.currentTime + index * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.15 + 0.3);
        
        osc.start(audioContext.currentTime + index * 0.15);
        osc.stop(audioContext.currentTime + index * 0.15 + 0.3);
    });
}

function playOverthinkingWobble(audioContext) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    
    // Setup wobble effect
    lfo.frequency.setValueAtTime(5, audioContext.currentTime);
    lfoGain.gain.setValueAtTime(50, audioContext.currentTime);
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.frequency.setValueAtTime(440, audioContext.currentTime);
    osc.type = 'sine';
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    
    lfo.start(audioContext.currentTime);
    osc.start(audioContext.currentTime);
    lfo.stop(audioContext.currentTime + 1);
    osc.stop(audioContext.currentTime + 1);
}

function playRespectfulApplause(audioContext) {
    // Create applause-like sound
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const bufferSize = audioContext.sampleRate * 0.05;
            const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
            const output = buffer.getChannelData(0);
            
            for (let j = 0; j < bufferSize; j++) {
                output[j] = (Math.random() * 2 - 1) * 0.1;
            }
            
            const noise = audioContext.createBufferSource();
            const filter = audioContext.createBiquadFilter();
            const gain = audioContext.createGain();
            
            noise.buffer = buffer;
            filter.type = 'highpass';
            filter.frequency.setValueAtTime(1000, audioContext.currentTime);
            
            noise.connect(filter);
            filter.connect(gain);
            gain.connect(audioContext.destination);
            
            gain.gain.setValueAtTime(0.3, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            
            noise.start();
            noise.stop(audioContext.currentTime + 0.05);
        }, i * 50);
    }
}

function flashScreen() {
    const flash = document.createElement('div');
    flash.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        pointer-events: none;
        z-index: 10000;
        animation: flashEffect 0.2s ease-out;
    `;
    
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 200);
}

// Create enhanced roast particle effect
function createEnhancedRoastParticles(button) {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width/2;
    const centerY = rect.top + rect.height/2;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const emojis = ['🔥', '💀', '😂', '⚡', '💥', '🤯', '⭐', '💫'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: ${Math.random() * 20 + 15}px;
            pointer-events: none;
            z-index: 10000;
            animation: enhancedRoastParticle ${Math.random() * 2 + 2}s ease-out forwards;
        `;
        
        const angle = (i / 15) * Math.PI * 2;
        const distance = Math.random() * 150 + 100;
        const endX = centerX + Math.cos(angle) * distance;
        const endY = centerY + Math.sin(angle) * distance;
        
        particle.style.setProperty('--endX', endX + 'px');
        particle.style.setProperty('--endY', endY + 'px');
        particle.style.setProperty('--rotation', Math.random() * 720 + 'deg');
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 4000);
    }
}

// Enhanced roast reactions
function showRoastReaction(victim) {
    const reactions = {
        jawad: [
            '🤓 "Actually, that\'s not entirely accurate..."', 
            '📚 *pushes glasses up nervously*', 
            '💻 "Let me Google that real quick..."',
            '🤔 "But the documentation says..."'
        ],
        zulkernain: [
            '😴 "Huh? What happened?"', 
            '☕ "Need more coffee to process this..."', 
            '💤 *snores through the roast*',
            '📱 "Sorry, was checking Instagram..."'
        ],
        abdi: [
            '😎 "I\'m still the best though"', 
            '💪 "That\'s not even my final form"', 
            '🚀 "Watch me code!"',
            '🎯 "Stack Overflow never failed me!"'
        ],
        nasir: [
            '🤔 "Wait, what was the question?"', 
            '📖 "I can make this more efficient..."', 
            '💡 "What if we add machine learning to this?"',
            '🔧 "I need to refactor this entire roast..."'
        ],
        aanane: [
            '👨‍🏫 "Class, please focus on the lesson..."',
            '☕ "I need another coffee break..."',
            '📚 "Let me explain this one more time..."',
            '😅 "You kids are going to give me gray hair!"'
        ]
    };
    
    const victimReactions = reactions[victim];
    const randomReaction = victimReactions[Math.floor(Math.random() * victimReactions.length)];
    
    const reactionPopup = document.createElement('div');
    reactionPopup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, rgba(0, 0, 0, 0.9), rgba(50, 50, 50, 0.9));
        color: white;
        padding: 30px 40px;
        border-radius: 20px;
        font-size: 1.4rem;
        z-index: 10001;
        border: 3px solid #ff4500;
        animation: enhancedReactionPop 4s ease-in-out forwards;
        box-shadow: 0 0 30px rgba(255, 69, 0, 0.5);
        text-align: center;
        max-width: 400px;
    `;
    
    reactionPopup.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 15px;">💬</div>
        <div>${randomReaction}</div>
    `;
    
    document.body.appendChild(reactionPopup);
    
    setTimeout(() => reactionPopup.remove(), 4000);
}

// Enhanced achievement system
function showAchievement(title, description) {
    const popup = document.getElementById('roastAchievement');
    document.getElementById('roastAchievementTitle').textContent = title;
    document.getElementById('roastAchievementText').textContent = description;
    
    popup.classList.add('show');
    
    // Add celebration effect
    createCelebrationParticles();
    
    setTimeout(() => popup.classList.remove('show'), 5000);
}

function createCelebrationParticles() {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['🎉', '🎊', '⭐', '💫', '🔥'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * window.innerWidth}px;
            top: ${Math.random() * window.innerHeight}px;
            font-size: ${Math.random() * 30 + 20}px;
            pointer-events: none;
            z-index: 10002;
            animation: celebrationPop ${Math.random() * 2 + 1}s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 3000);
    }
}

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced hover sound effects to cards
    document.querySelectorAll('.roast-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Enhanced hover sound
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            
            // Enhanced visual effect
            this.style.filter = 'brightness(1.2) saturate(1.3)';
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(255, 69, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Enhanced click effects
    document.querySelectorAll('.roast-card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.animation = 'roastCardClick 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });
    
    // Animate roast meters with enhanced effects
    setTimeout(() => {
        document.querySelectorAll('.roast-level').forEach((meter, index) => {
            const width = meter.style.width;
            meter.style.width = '0%';
            meter.style.transition = 'width 2s ease-out';
            meter.style.background = 'linear-gradient(45deg, #ff0000, #ff6600, #ffff00)';
            
            setTimeout(() => {
                meter.style.width = width;
                
                // Add pulsing effect when full
                setTimeout(() => {
                    meter.style.animation = 'roastMeterPulse 2s ease-in-out infinite';
                }, 2000);
            }, 200 + index * 300);
        });
    }, 1000);
    
    // Enhanced typing effect for quotes
    document.querySelectorAll('.roast-quote').forEach((quote, index) => {
        const text = quote.textContent;
        quote.textContent = '';
        quote.style.borderRight = '2px solid #ff4500';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    quote.textContent += text.charAt(i);
                    i++;
                    
                    // Add random typing sounds
                    if (Math.random() > 0.8) {
                        playTypingSound();
                    }
                } else {
                    clearInterval(typeInterval);
                    quote.style.borderRight = 'none';
                    
                    // Add completion glow effect
                    quote.style.animation = 'textGlow 2s ease-in-out 3';
                }
            }, 30);
        }, index * 2000 + 2000);
    });
    
    // Auto-play entrance if coming from secret access
    if (document.referrer.includes('index.html') || 
        sessionStorage.getItem('secretAccess') === 'true') {
        
        setTimeout(() => {
            if (document.getElementById('warningScreen').classList.contains('active')) {
                sessionStorage.removeItem('secretAccess');
                showAchievement('SECRET ACCESS DETECTED!', 'Epic entrance mode activated! 🔥');
            }
        }, 1000);
    }
});

function playTypingSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800 + Math.random() * 400, audioContext.currentTime);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
}

// Add enhanced CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes epicCardEntrance {
        from {
            opacity: 0;
            transform: translateY(100px) rotateX(-20deg) scale(0.8);
            filter: blur(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg) scale(1);
            filter: blur(0);
        }
    }
    
    @keyframes enhancedRoastParticle {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(var(--endX) - var(--startX, 0px)), 
                calc(var(--endY) - var(--startY, 0px))
            ) scale(0) rotate(var(--rotation));
            opacity: 0;
        }
    }
    
    @keyframes enhancedReactionPop {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(-10deg);
            opacity: 0;
        }
        10% {
            transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
            opacity: 1;
        }
        20% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
        }
        80% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(0) rotate(10deg);
            opacity: 0;
        }
    }
    
    @keyframes roastCardClick {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(0.95); }
    }
    
    @keyframes roastMeterPulse {
        0%, 100% { 
            box-shadow: 0 0 10px rgba(255, 69, 0, 0.5);
            filter: brightness(1);
        }
        50% { 
            box-shadow: 0 0 20px rgba(255, 69, 0, 0.8);
            filter: brightness(1.2);
        }
    }
    
    @keyframes celebrationPop {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes explode {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.8;
        }
        100% {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes roastRain {
        0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes screenShake {
        0%, 100% { transform: translateX(0); }
        10% { transform: translateX(-5px); }
        20% { transform: translateX(5px); }
        30% { transform: translateX(-5px); }
        40% { transform: translateX(5px); }
        50% { transform: translateX(-5px); }
        60% { transform: translateX(5px); }
        70% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
        90% { transform: translateX(-5px); }
    }
    
    @keyframes flashEffect {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
    
    @keyframes textGlow {
        0%, 100% { 
            text-shadow: 
                0 0 5px #ff4500,
                0 0 10px #ff4500,
                0 0 15px #ff4500;
        }
        25% { 
            text-shadow: 
                0 0 5px #ff6600,
                0 0 10px #ff6600,
                0 0 15px #ff6600,
                0 0 20px #ff6600;
        }
        50% { 
            text-shadow: 
                0 0 5px #ffff00,
                0 0 10px #ffff00,
                0 0 15px #ffff00,
                0 0 20px #ffff00,
                0 0 25px #ffff00;
        }
        75% { 
            text-shadow: 
                0 0 5px #ff6600,
                0 0 10px #ff6600,
                0 0 15px #ff6600,
                0 0 20px #ff6600;
        }
    }
    
    .crazy-entrance.active {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    }
    
    .crazy-entrance {
        display: none;
    }
`;
document.head.appendChild(style);

// Enhanced Konami code for ultimate roast mode
let konamiSequence = [];
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiSequence.push(e.code);
    
    if (konamiSequence.length > konamiCode.length) {
        konamiSequence.shift();
    }
    
    if (konamiSequence.length === konamiCode.length && 
        konamiSequence.every((code, index) => code === konamiCode[index])) {
        
        // ULTIMATE ROAST MODE ACTIVATED!
        document.body.style.animation = 'ultimateRoast 5s ease-in-out infinite';
        
        showAchievement('🔥💀 ULTIMATE ROAST MODE UNLOCKED! 💀🔥', 'You discovered the legendary Konami roast code! MAXIMUM POWER!');
        
        // Make all roast meters go to maximum
        document.querySelectorAll('.roast-level').forEach(meter => {
            meter.style.width = '100%';
            meter.style.background = 'linear-gradient(45deg, #ff0000, #ff4500, #ff6b35, #ffff00)';
            meter.style.animation = 'roastMeterPulse 0.5s ease-in-out infinite';
        });
        
        // Ultimate music
        musicPlayer.init().then(() => {
            musicPlayer.playEpicEntrance();
            setTimeout(() => musicPlayer.playEpicEntrance(), 2000);
        });
        
        // Create rainbow particles everywhere
        for (let i = 0; i < 50; i++) {
            setTimeout(() => createCelebrationParticles(), i * 100);
        }
        
        konamiSequence = [];
    }
});

// Add ultimate roast animation
const ultimateStyle = document.createElement('style');
ultimateStyle.textContent = `
    @keyframes ultimateRoast {
        0%, 100% { 
            filter: hue-rotate(0deg) brightness(1) saturate(1); 
            transform: scale(1);
        }
        20% { 
            filter: hue-rotate(72deg) brightness(1.3) saturate(1.5); 
            transform: scale(1.01);
        }
        40% { 
            filter: hue-rotate(144deg) brightness(1.1) saturate(1.3); 
            transform: scale(0.99);
        }
        60% { 
            filter: hue-rotate(216deg) brightness(1.4) saturate(1.6); 
            transform: scale(1.02);
        }
        80% { 
            filter: hue-rotate(288deg) brightness(1.2) saturate(1.4); 
            transform: scale(0.98);
        }
    }
`;
document.head.appendChild(ultimateStyle);
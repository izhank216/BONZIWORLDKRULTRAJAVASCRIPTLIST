// 1. Trigger the initial dialog box
Dialog.alert('[](){}!');

try {
  // 2. DOM Targeting
  const d = document;
  const alertElement = Array.from(d.querySelectorAll('div')).find(
    el => el.className.includes('alert_text') && el.textContent.trim() === '[](){}!'
  );
  const headerElement = Array.from(d.querySelectorAll('div')).find(
    el => el.className.includes('window_header')
  );
  const windowContainer = headerElement ? headerElement.closest('.window') : null;
  const contentContainer = d.getElementById('content');

  // --- SAVE THE FORMER TITLE ---
  const originalTitle = d.title;

  // --- SEAMLESS AUDIO ENGINE ---
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  function playSeamlessGlitchTrack() {
    const now = audioCtx.currentTime;
    
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const mainGain = audioCtx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(697, now);
    if (osc2.frequency.setValueAtTime) {
      osc2.frequency.setValueAtTime(1209, now);
    } else {
      osc2.frequency.value = 1209;
    }

    // DELAYLESS & FAST VOLUME RAMP
    mainGain.gain.setValueAtTime(0.01, now);
    mainGain.gain.exponentialRampToValueAtTime(0.35, now + 3.0);

    // Chaos Modulation
    for (let i = 0; i <= 300; i++) {
      const timeOffset = i * 0.01;
      if (Math.random() < 0.3) {
        const randomFreq1 = [697, 770, 852, 941][Math.floor(Math.random() * 4)];
        const randomFreq2 = [1209, 1336, 1477][Math.floor(Math.random() * 3)];
        osc1.frequency.setValueAtTime(randomFreq1, now + timeOffset);
        osc2.frequency.setValueAtTime(randomFreq2, now + timeOffset);
      }
    }

    osc1.connect(mainGain);
    osc2.connect(mainGain);
    mainGain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);
    
    osc1.stop(now + 3.0);
    osc2.stop(now + 3.0);
  }

  function playBoomSound() {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine'; 
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(0.001, now + 3.0);

    gainNode.gain.setValueAtTime(0.8, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 3.0);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 3.0);
  }

  // --- INJECT CUSTOM CSS FOR THE HYPER-SLOWOUT OUTRO ---
  const style = d.createElement('style');
  style.textContent = `
    @keyframes eventBoomSlow {
      0% { opacity: 1; transform: translate(-50%, -50%) scale(2.5); filter: blur(0px); }
      75% { opacity: 0.9; transform: translate(-50%, -50%) scale(1.2); filter: blur(1px); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(0.2); filter: blur(12px); }
    }
    .event-999-overlay {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      color: #ff0000; font-family: 'Courier New', monospace; font-weight: bold; font-size: 5rem;
      letter-spacing: 8px; z-index: 99999; pointer-events: none; text-shadow: 0 0 20px #ff0000;
      animation: eventBoomSlow 3.0s cubic-bezier(0.05, 0.9, 0.2, 1) forwards;
    }
  `;
  d.head.appendChild(style);

  if (alertElement) {
    // 3. Phase 1: Immediate Text Overwrite
    alertElement.textContent = 'ERROR: Uncaught SyntaxError: Unexpected identifier \'999\' (at VM9999 :9:99)';
    
    // --- OBLITERATE X AND OK BUTTONS AT THE START ---
    if (windowContainer) {
      windowContainer.style.transition = 'transform 0.01s linear';
      
      const elementsToRemove = windowContainer.querySelectorAll(
        'button, .window_close, .window_btn, .btn, [class*="close"], [class*="btn"], [class*="button"]'
      );
      elementsToRemove.forEach(el => el.remove());
    }

    // Phase 2: Wait 3 seconds before initiating chaos
    setTimeout(() => {
      if (audioCtx.state === 'suspended') audioCtx.resume();

      // Fire up seamless, delayless wall of sound track instantly
      playSeamlessGlitchTrack();

      const totalTicks = 300; // EXACTLY 3 SECONDS TOTAL AT 10MS INTERVALS
      let currentTick = 0;

      const chaosInterval = setInterval(() => {
        // Phase 3: 3-second mark reached -> Obliterate and Reset
        if (currentTick >= totalTicks) {
          clearInterval(chaosInterval);
          
          let spawnX = window.innerWidth / 2;
          let spawnY = window.innerHeight / 2;
          
          if (windowContainer) {
            const rect = windowContainer.getBoundingClientRect();
            spawnX = rect.left + rect.width / 2;
            spawnY = rect.top + rect.height / 2;
            windowContainer.remove();
          } else {
            alertElement.remove();
            if (headerElement) headerElement.remove();
          }

          if (contentContainer) {
            contentContainer.style.filter = 'none';
          }

          // Trigger Effects
          playBoomSound();

          // --- SET TITLE WHEN PAYLOAD ENDS ---
          d.title = "THE EVENT BEGINS";

          const overlay = d.createElement('div');
          overlay.className = 'event-999-overlay';
          overlay.style.left = `${spawnX}px`;
          overlay.style.top = `${spawnY}px`;
          overlay.textContent = '999 EVENT...';
          d.body.appendChild(overlay);

          // --- RESET TITLE AFTER TEXT SHRINK / OVERLAY REMOVAL ---
          setTimeout(() => {
            overlay.remove();
            d.title = originalTitle; // Title restored to original state
          }, 3000);
          return;
        }

        currentTick++;
        const progression = currentTick / totalTicks;
        
        // --- FAST CONTRAST RAMP ---
        if (contentContainer) {
          const targetContrast = 100 + (Math.pow(progression, 2) * 900);
          contentContainer.style.filter = `contrast(${targetContrast}%)`;
        }

        // --- FULL TEXT & DOCUMENT TITLE MANIPULATION DYNAMICS ---
        let currentText = alertElement.textContent;
        let currentLength = currentText.length;

        if (currentLength > 0) {
          if (Math.random() < 0.5 && currentLength > 50) {
            currentText = currentText.slice(0, -1);
            currentLength--;
          }

          if (Math.random() < 0.9) {
            const randomIndex = Math.floor(Math.random() * currentLength);
            currentText = currentText.substring(0, randomIndex) + '999 ' + currentText.substring(randomIndex + 1);
          }

          const glitchedText = currentText.substring(0, 99);
          alertElement.textContent = glitchedText;
          
          // Apply a matching corrupt variant to the document browser title bar
          if (Math.random() < 0.7) {
            d.title = glitchedText.substring(0, 25) + '...';
          }
        }

        // --- EXPONENTIAL SCREEN SHAKE LOOP ---
        if (windowContainer) {
          const severity = currentTick * 1.2;
          const xShift = (Math.random() - 0.5) * severity;
          const yShift = (Math.random() - 0.5) * severity;
          const skewDeg = (Math.random() - 0.5) * (severity * 0.25);
          const rotDeg = (Math.random() - 0.5) * (severity * 0.15);

          windowContainer.style.transform = `translate(${xShift}px, ${yShift}px) skew(${skewDeg}deg) rotate(${rotDeg}deg)`;
        }
      }, 10);
    }, 3000);
  }
} catch (error) {
  console.error('Glitch script error:', error);
}

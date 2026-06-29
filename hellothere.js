(function() {
    // 1. Store original styles to revert later
    const originalStyle = document.body.style.cssText;

    // 2. Apply CSS injection for the animation and distortion
    const styleBlock = document.createElement('style');
    styleBlock.innerHTML = `
        @keyframes extremeDistort {
            0% {
                transform: scale(1) rotate(0deg) skewX(0deg);
                filter: contrast(100%) hue-rotate(0deg);
            }
            25% {
                transform: scale(1.1) rotate(180deg) skewX(15deg);
                filter: contrast(150%) hue-rotate(45deg);
            }
            50% {
                transform: scale(0.9) rotate(0deg) skewY(-15deg);
                filter: contrast(180%) saturate(1.5);
            }
            75% {
                transform: scale(1.05) rotate(-180deg) skewX(-10deg);
                filter: contrast(160%) blur(1px);
            }
            100% {
                transform: scale(1) rotate(360deg) skewX(0deg);
                filter: contrast(130%);
            }
        }
        .test-distort-active {
            animation: extremeDistort 3s infinite linear;
            transition: all 0.3s ease;
            transform-origin: center center;
            overflow: hidden;
        }
    `;
    document.head.appendChild(styleBlock);

    // 3. Activate the distortion effect
    document.body.classList.add('test-distort-active');

    // 4. Trigger the initial alert dialog using Dialog.alert
    setTimeout(() => {
        Dialog.alert('HELLO THERE');
    }, 100);

    // 5. Set a 15-second timer to clear everything and revert to normal
    setTimeout(() => {
        // Remove the class and the injected style block
        document.body.classList.remove('test-distort-active');
        styleBlock.remove();
        
        // Revert body styles to original
        document.body.style.cssText = originalStyle;
    }, 15000); // 15 seconds
})();

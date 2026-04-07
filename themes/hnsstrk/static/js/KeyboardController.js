export class KeyboardController {
  constructor(rotator) {
    this.rotator = rotator;
    document.addEventListener('keydown', (e) => this._handleKey(e));
  }

  _handleKey(e) {
    // Don't capture when typing in input fields
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        this.rotator.next();
        break;

      case 'ArrowRight':
        e.preventDefault();
        this.rotator.next();
        break;

      case 'ArrowLeft':
        e.preventDefault();
        this.rotator.prev();
        break;

      case 'f':
      case 'F':
        e.preventDefault();
        this._toggleFullscreen();
        break;

      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        // Also hide shortcuts overlay
        const overlay = document.querySelector('.shortcuts-overlay');
        if (overlay) overlay.classList.remove('visible');
        break;
    }
  }

  _toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }
}

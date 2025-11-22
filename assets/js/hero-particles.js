// Floating particles animation for hero section
class HeroParticles {
  constructor() {
    this.canvas = document.getElementById('hero-particles');
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 40;
    this.animationId = null;
    this.isDarkMode = false;

    this.init();
  }

  init() {
    this.resizeCanvas();
    this.checkTheme();
    this.createParticles();
    this.animate();

    // Handle resize
    window.addEventListener('resize', () => this.resizeCanvas());

    // Watch for theme changes
    const observer = new MutationObserver(() => this.checkTheme());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  checkTheme() {
    const theme = document.documentElement.getAttribute('data-theme');
    this.isDarkMode = theme === 'dark';
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 2,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.4 + 0.3,
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  updateParticles() {
    this.particles.forEach(particle => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Pulse effect
      particle.pulse += 0.02;
      const pulseFactor = Math.sin(particle.pulse) * 0.2 + 1;

      // Wrap around edges
      if (particle.x < -10) particle.x = this.canvas.width + 10;
      if (particle.x > this.canvas.width + 10) particle.x = -10;
      if (particle.y < -10) particle.y = this.canvas.height + 10;
      if (particle.y > this.canvas.height + 10) particle.y = -10;

      // Apply pulse to size
      particle.currentSize = particle.size * pulseFactor;
    });
  }

  drawParticles() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Get computed styles for theme-aware colors
    const styles = getComputedStyle(document.documentElement);
    const brandColor = styles.getPropertyValue('--color-fillBrand-strong');

    this.particles.forEach(particle => {
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.currentSize || particle.size, 0, Math.PI * 2);

      // Adjust opacity based on theme
      const opacity = this.isDarkMode ? particle.opacity * 0.5 : particle.opacity;

      // Create gradient for each particle with purple/teal colors
      const gradient = this.ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.currentSize || particle.size
      );
      // Alternate between purple and teal particles
      const colors = [
        [139, 92, 246],   // Purple
        [20, 184, 166],   // Teal
        [168, 85, 247],   // Violet
        [6, 182, 212]     // Cyan
      ];
      const color = colors[Math.floor(particle.x * particle.y) % colors.length];
      gradient.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);

      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    });

    // Draw connections between nearby particles
    this.drawConnections();
  }

  drawConnections() {
    const maxDistance = 120;
    const styles = getComputedStyle(document.documentElement);

    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const opacity = (1 - distance / maxDistance) * 0.08;
          const finalOpacity = this.isDarkMode ? opacity * 0.5 : opacity;

          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          // Use purple for connections
          this.ctx.strokeStyle = `rgba(139, 92, 246, ${finalOpacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }
  }

  animate() {
    this.updateParticles();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing hero particles...');
  const particles = new HeroParticles();
  console.log('Hero particles initialized:', particles);
});
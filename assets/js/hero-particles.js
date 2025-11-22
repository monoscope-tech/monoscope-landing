// Network Topology & Monitoring Animation for Monoscope
class ObservabilityAnimation {
  constructor() {
    this.canvas = document.getElementById('hero-particles');
    console.log('Canvas element found:', this.canvas);
    if (!this.canvas) {
      console.error('Hero particles canvas not found!');
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.dataPackets = [];
    this.nodeCount = 25;
    this.animationId = null;
    this.isDarkMode = false;
    this.radarAngle = 0;
    this.time = 0;

    console.log('Starting observability animation...');
    this.init();
  }

  init() {
    this.resizeCanvas();
    this.checkTheme();
    this.createNetworkNodes();
    this.createConnections();
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

  createNetworkNodes() {
    this.nodes = [];
    for (let i = 0; i < this.nodeCount; i++) {
      const node = {
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2,

        // Service health states: healthy, normal, warning, critical
        health: this.getRandomHealth(),
        healthTransition: 0,

        // Node types: service, database, api, cache
        type: ['service', 'database', 'api', 'cache'][Math.floor(Math.random() * 4)],

        // Activity level (0-1)
        activity: Math.random() * 0.5 + 0.5,
        activityPulse: Math.random() * Math.PI * 2
      };
      this.nodes.push(node);
    }
  }

  getRandomHealth() {
    const rand = Math.random();
    if (rand < 0.7) return 'healthy';
    if (rand < 0.9) return 'normal';
    if (rand < 0.97) return 'warning';
    return 'critical';
  }

  createConnections() {
    this.connections = [];
    const maxDistance = 150;

    for (let i = 0; i < this.nodes.length; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance && Math.random() < 0.3) {
          this.connections.push({
            from: i,
            to: j,
            strength: 1 - (distance / maxDistance)
          });
        }
      }
    }
  }

  updateNodes() {
    this.nodes.forEach((node, index) => {
      // Gentle floating motion
      node.x += node.vx;
      node.y += node.vy;

      // Pulse animation
      node.pulse += 0.03;
      node.activityPulse += 0.05 * node.activity;

      // Occasionally change health status
      if (Math.random() < 0.001) {
        node.health = this.getRandomHealth();
      }

      // Boundary check with soft bounce
      if (node.x < 0 || node.x > this.canvas.width) node.vx *= -0.8;
      if (node.y < 0 || node.y > this.canvas.height) node.vy *= -0.8;

      // Keep nodes on screen
      node.x = Math.max(10, Math.min(this.canvas.width - 10, node.x));
      node.y = Math.max(10, Math.min(this.canvas.height - 10, node.y));
    });

    // Update connections when nodes move
    if (this.time % 60 === 0) {
      this.createConnections();
    }
  }

  createDataPacket(connection) {
    const fromNode = this.nodes[connection.from];
    const toNode = this.nodes[connection.to];

    this.dataPackets.push({
      x: fromNode.x,
      y: fromNode.y,
      targetX: toNode.x,
      targetY: toNode.y,
      progress: 0,
      speed: 0.02 + Math.random() * 0.02,
      size: 2 + Math.random() * 2
    });
  }

  updateDataPackets() {
    // Create new data packets occasionally
    this.connections.forEach(conn => {
      if (Math.random() < 0.005) {
        this.createDataPacket(conn);
      }
    });

    // Update existing packets
    this.dataPackets = this.dataPackets.filter(packet => {
      packet.progress += packet.speed;

      if (packet.progress >= 1) {
        return false; // Remove completed packets
      }

      // Update position along path
      packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 2;
      packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 2;

      return true;
    });
  }

  getHealthColor(health, opacity = 1) {
    const colors = {
      healthy: { r: 34, g: 197, b: 94 },    // Green
      normal: { r: 20, g: 184, b: 166 },    // Teal
      warning: { r: 251, g: 191, b: 36 },   // Amber
      critical: { r: 239, g: 68, b: 68 }    // Red
    };

    const color = colors[health] || colors.normal;
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  }

  drawNodes() {
    this.nodes.forEach(node => {
      const pulseScale = 1 + Math.sin(node.pulse) * 0.2;
      const activityGlow = 1 + Math.sin(node.activityPulse) * 0.3 * node.activity;
      const size = node.size * pulseScale;

      // Outer glow based on health
      const glowSize = size * activityGlow * 3;
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, glowSize
      );

      const baseOpacity = this.isDarkMode ? 0.3 : 0.2;
      gradient.addColorStop(0, this.getHealthColor(node.health, baseOpacity));
      gradient.addColorStop(1, this.getHealthColor(node.health, 0));

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Core node
      this.ctx.fillStyle = this.getHealthColor(node.health, 0.8);
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Inner bright spot
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      this.ctx.beginPath();
      this.ctx.arc(node.x - size * 0.3, node.y - size * 0.3, size * 0.3, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawConnections() {
    this.connections.forEach(conn => {
      const fromNode = this.nodes[conn.from];
      const toNode = this.nodes[conn.to];

      if (!fromNode || !toNode) return;

      const opacity = conn.strength * (this.isDarkMode ? 0.15 : 0.1);

      // Draw connection line
      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);
      this.ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    });
  }

  drawDataPackets() {
    this.dataPackets.forEach(packet => {
      // Data packet glow
      const gradient = this.ctx.createRadialGradient(
        packet.x, packet.y, 0,
        packet.x, packet.y, packet.size * 2
      );
      gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size * 2, 0, Math.PI * 2);
      this.ctx.fill();

      // Data packet core
      this.ctx.fillStyle = 'rgba(147, 197, 253, 0.9)';
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawRadarSweep() {
    // Subtle radar sweep effect
    this.radarAngle += 0.01;

    const centerX = this.canvas.width * 0.8;
    const centerY = this.canvas.height * 0.2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.3;

    // Radar sweep gradient
    const gradient = this.ctx.createConicGradient(this.radarAngle, centerX, centerY);
    gradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
    gradient.addColorStop(0.1, 'rgba(20, 184, 166, 0.1)');
    gradient.addColorStop(0.3, 'rgba(20, 184, 166, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Radar circles
    for (let i = 1; i <= 3; i++) {
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius * i / 3, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(20, 184, 166, ${0.05 / i})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }

  animate() {
    this.time++;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw in order: radar, connections, packets, nodes
    if (this.canvas.width > 768) { // Only show radar on larger screens
      this.drawRadarSweep();
    }
    this.drawConnections();
    this.drawDataPackets();
    this.drawNodes();

    // Update animations
    this.updateNodes();
    this.updateDataPackets();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize animation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing observability animation...');
  const animation = new ObservabilityAnimation();
  console.log('Observability animation initialized:', animation);
});
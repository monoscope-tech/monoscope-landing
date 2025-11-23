// Network Topology & Monitoring Animation for Monoscope
class ObservabilityAnimation {
  constructor() {
    // Detect mobile devices and skip animation
    this.isMobile = this.detectMobile();

    this.canvas = document.getElementById('hero-particles');
    console.log('Canvas element found:', this.canvas);
    if (!this.canvas) {
      console.error('Hero particles canvas not found!');
      return;
    }

    // Disable animation on mobile for better performance
    if (this.isMobile) {
      console.log('Mobile device detected - disabling hero animation for better performance');
      this.canvas.style.display = 'none';
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.dataPackets = [];
    this.nodeCount = 12; // Reduced from 25 for cleaner visualization
    this.maxNodes = 15; // Maximum node limit
    this.maxConnections = 30; // Maximum connection limit
    this.maxDataPackets = 20; // Maximum data packet limit
    this.animationId = null;
    this.isDarkMode = false;
    this.radarAngle = 0;
    this.time = 0;
    this.cleanupInterval = 0;

    console.log('Starting observability animation...');
    this.init();
  }

  detectMobile() {
    // Check for mobile devices
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check for small screen size
    const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 600;

    // Check for touch support
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Check for low-end device indicators
    const isLowPowerMode = navigator.connection?.saveData ||
                           navigator.connection?.effectiveType === 'slow-2g' ||
                           navigator.connection?.effectiveType === '2g';

    return isMobileDevice || (isSmallScreen && isTouchDevice) || isLowPowerMode;
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
    const radarCenterX = this.canvas.width * 0.8;
    const radarCenterY = this.canvas.height * 0.2;
    const radarClusterRadius = Math.min(this.canvas.width, this.canvas.height) * 0.2;

    // Enforce maximum node limit
    const actualNodeCount = Math.min(this.nodeCount, this.maxNodes);

    for (let i = 0; i < actualNodeCount; i++) {
      let x, y;

      // 40% of nodes cluster around the radar
      if (i < this.nodeCount * 0.4) {
        // Position nodes around the radar with some randomness
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radarClusterRadius + radarClusterRadius * 0.3;
        x = radarCenterX + Math.cos(angle) * distance;
        y = radarCenterY + Math.sin(angle) * distance;

        // Keep within canvas bounds
        x = Math.max(10, Math.min(this.canvas.width - 10, x));
        y = Math.max(10, Math.min(this.canvas.height - 10, y));
      } else {
        // Rest of nodes are randomly distributed
        x = Math.random() * this.canvas.width;
        y = Math.random() * this.canvas.height;
      }

      const node = {
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 1.5, // Reduced from 2-5 to 1.5-3.5
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
      // Stop if we've reached max connections
      if (this.connections.length >= this.maxConnections) break;

      for (let j = i + 1; j < this.nodes.length; j++) {
        // Stop if we've reached max connections
        if (this.connections.length >= this.maxConnections) break;

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
      size: 1.5 + Math.random() * 1.5 // Reduced from 2-4 to 1.5-3
    });
  }

  updateDataPackets() {
    // Only create new packets if below limit
    if (this.dataPackets.length < this.maxDataPackets) {
      this.connections.forEach(conn => {
        // Further limit creation if approaching max
        const creationProbability = this.dataPackets.length > this.maxDataPackets * 0.8
          ? 0.002
          : 0.005;

        if (Math.random() < creationProbability) {
          this.createDataPacket(conn);
        }
      });
    }

    // Update existing packets with cleanup
    const updatedPackets = [];
    for (let i = 0; i < this.dataPackets.length; i++) {
      const packet = this.dataPackets[i];
      packet.progress += packet.speed;

      if (packet.progress >= 1) {
        // Cleanup packet properties before removal
        packet.x = null;
        packet.y = null;
        packet.targetX = null;
        packet.targetY = null;
        continue; // Skip - effectively removes the packet
      }

      // Update position along path
      packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 2;
      packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 2;

      updatedPackets.push(packet);
    }

    this.dataPackets = updatedPackets;
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
      const pulseScale = 1 + Math.sin(node.pulse) * 0.15; // Reduced pulse effect
      const activityGlow = 1 + Math.sin(node.activityPulse) * 0.2 * node.activity;
      const size = node.size * pulseScale * (this.isDarkMode ? 1 : 1.15); // Smaller multiplier for light mode

      // Outer glow based on health
      const glowSize = size * activityGlow * 2.5; // Reduced glow size
      const gradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, glowSize
      );

      // Much bolder glow in light mode
      const baseOpacity = this.isDarkMode ? 0.3 : 0.5;
      gradient.addColorStop(0, this.getHealthColor(node.health, baseOpacity));
      gradient.addColorStop(0.5, this.getHealthColor(node.health, baseOpacity * 0.4));
      gradient.addColorStop(1, this.getHealthColor(node.health, 0));

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Core node - more opaque in light mode
      this.ctx.fillStyle = this.getHealthColor(node.health, this.isDarkMode ? 0.8 : 0.95);
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      this.ctx.fill();

      // Inner bright spot - more prominent in light mode
      this.ctx.fillStyle = this.isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.8)';
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

      // Bolder in light mode
      const opacity = conn.strength * (this.isDarkMode ? 0.15 : 0.25);

      // Draw connection line
      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);
      this.ctx.strokeStyle = `rgba(20, 184, 166, ${opacity})`;
      this.ctx.lineWidth = this.isDarkMode ? 1 : 1.5; // Thicker lines in light mode
      this.ctx.stroke();
    });
  }

  drawDataPackets() {
    this.dataPackets.forEach(packet => {
      // Data packet glow - more prominent in light mode
      const glowMultiplier = this.isDarkMode ? 2 : 2.5;
      const gradient = this.ctx.createRadialGradient(
        packet.x, packet.y, 0,
        packet.x, packet.y, packet.size * glowMultiplier
      );
      const glowOpacity = this.isDarkMode ? 0.8 : 1;
      gradient.addColorStop(0, `rgba(59, 130, 246, ${glowOpacity})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${glowOpacity * 0.4})`);
      gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size * glowMultiplier, 0, Math.PI * 2);
      this.ctx.fill();

      // Data packet core - more vibrant in light mode
      const coreOpacity = this.isDarkMode ? 0.9 : 1;
      this.ctx.fillStyle = `rgba(147, 197, 253, ${coreOpacity})`;
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size * (this.isDarkMode ? 1 : 1.2), 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  performMemoryCleanup() {
    // Periodic cleanup every 300 frames (roughly 5 seconds at 60fps)
    if (this.cleanupInterval % 300 === 0) {
      // Clean up connections array - remove invalid references
      this.connections = this.connections.filter(conn => {
        return conn.from < this.nodes.length && conn.to < this.nodes.length;
      });

      // Trim excess nodes if somehow exceeded
      if (this.nodes.length > this.maxNodes) {
        this.nodes = this.nodes.slice(0, this.maxNodes);
      }

      // Force garbage collection hint by nullifying removed packets
      if (this.dataPackets.length === 0) {
        this.dataPackets = []; // Create new array reference
      }

      // Re-validate connections if nodes changed
      if (this.connections.length > this.maxConnections) {
        this.connections = this.connections.slice(0, this.maxConnections);
      }

      console.log(`Cleanup performed - Nodes: ${this.nodes.length}, Connections: ${this.connections.length}, Packets: ${this.dataPackets.length}`);
    }
    this.cleanupInterval++;
  }

  drawRadarSweep() {
    // Enhanced radar sweep effect
    this.radarAngle += 0.015; // Slower, smoother rotation

    const centerX = this.canvas.width * 0.8;
    const centerY = this.canvas.height * 0.2;
    const radius = Math.min(this.canvas.width, this.canvas.height) * 0.35; // Slightly larger

    // More prominent radar sweep gradient
    const gradient = this.ctx.createConicGradient(this.radarAngle, centerX, centerY);
    const sweepOpacity = this.isDarkMode ? 0.25 : 0.35; // More visible, especially in light mode
    gradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
    gradient.addColorStop(0.05, `rgba(20, 184, 166, ${sweepOpacity})`);
    gradient.addColorStop(0.15, `rgba(20, 184, 166, ${sweepOpacity * 0.6})`);
    gradient.addColorStop(0.3, 'rgba(20, 184, 166, 0)');

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // More visible radar circles
    for (let i = 1; i <= 4; i++) { // Added 4th circle for better effect
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius * i / 4, 0, Math.PI * 2);
      const circleOpacity = this.isDarkMode ? 0.08 : 0.12; // More transparent circles
      this.ctx.strokeStyle = `rgba(20, 184, 166, ${circleOpacity / (i * 0.7)})`;
      this.ctx.lineWidth = this.isDarkMode ? 1 : 2; // Bolder lines in light mode
      this.ctx.stroke();
    }

    // Add center dot for radar origin
    this.ctx.fillStyle = this.isDarkMode ? 'rgba(20, 184, 166, 0.5)' : 'rgba(20, 184, 166, 0.7)';
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    this.ctx.fill();
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

    // Perform periodic memory cleanup
    this.performMemoryCleanup();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    // Stop animation loop
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // Clear canvas
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Remove event listeners
    window.removeEventListener('resize', this.resizeCanvas);

    // Clear all data structures
    if (this.nodes) {
      this.nodes.forEach(node => {
        // Nullify all node properties for garbage collection
        Object.keys(node).forEach(key => {
          node[key] = null;
        });
      });
      this.nodes = [];
    }

    if (this.connections) {
      this.connections = [];
    }

    if (this.dataPackets) {
      this.dataPackets.forEach(packet => {
        // Nullify all packet properties
        Object.keys(packet).forEach(key => {
          packet[key] = null;
        });
      });
      this.dataPackets = [];
    }

    // Clear canvas references
    this.canvas = null;
    this.ctx = null;

    console.log('ObservabilityAnimation destroyed and cleaned up');
  }
}

// Initialize animation when DOM is ready
let heroAnimation = null;

document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing observability animation...');
  heroAnimation = new ObservabilityAnimation();
  console.log('Observability animation initialized:', heroAnimation);
});

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
  if (heroAnimation && typeof heroAnimation.destroy === 'function') {
    heroAnimation.destroy();
    heroAnimation = null;
  }
});

// Also cleanup on visibility change for better performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden && heroAnimation && heroAnimation.animationId) {
    // Pause animation when page is hidden
    cancelAnimationFrame(heroAnimation.animationId);
    heroAnimation.animationId = null;
  } else if (!document.hidden && heroAnimation && !heroAnimation.animationId && !heroAnimation.isMobile) {
    // Resume animation when page is visible (only if not mobile)
    heroAnimation.animate();
  }
});
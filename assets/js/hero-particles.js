// Polished Network Topology & Trace Tree Animation for Monoscope
class ObservabilityAnimation {
  constructor() {
    this.isMobile = this.detectMobile();
    this.canvas = document.getElementById('hero-particles');
    if (!this.canvas) return;

    if (this.isMobile) {
      this.canvas.style.display = 'none';
      return;
    }

    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.dataPackets = [];
    this.animationId = null;
    this.isDarkMode = false;
    this.radarAngle = 0;
    this.time = 0;
    this.dpr = window.devicePixelRatio || 1;

    // Trace tree state
    this.traceTree = new TraceTreeOverlay(this);

    this.init();
  }

  detectMobile() {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 600;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
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

    window.addEventListener('resize', () => this.resizeCanvas());

    const observer = new MutationObserver(() => this.checkTheme());
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
  }

  resizeCanvas() {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
    this.ctx.scale(this.dpr, this.dpr);
    this.logicalWidth = rect.width;
    this.logicalHeight = rect.height;

    // Recreate nodes on resize
    if (this.nodes.length > 0) {
      this.createNetworkNodes();
      this.createConnections();
    }
  }

  checkTheme() {
    const theme = document.body.getAttribute('data-theme');
    this.isDarkMode = theme === 'dark';
  }

  // Easing functions for premium motion
  easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
  easeInOutQuart(t) { return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2; }

  createNetworkNodes() {
    this.nodes = [];
    const radarCenterX = this.logicalWidth * 0.75;
    const radarCenterY = this.logicalHeight * 0.25;
    const radarClusterRadius = Math.min(this.logicalWidth, this.logicalHeight) * 0.2;

    // Depth layers for parallax effect
    const depthLayers = [
      { z: 0.6, count: 4, sizeMultiplier: 0.7, opacity: 0.5 },
      { z: 0.8, count: 4, sizeMultiplier: 0.85, opacity: 0.75 },
      { z: 1.0, count: 4, sizeMultiplier: 1.0, opacity: 1.0 }
    ];

    depthLayers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        let x, y;

        // Cluster some nodes around radar
        if (i < layer.count * 0.5) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * radarClusterRadius + radarClusterRadius * 0.3;
          x = radarCenterX + Math.cos(angle) * distance;
          y = radarCenterY + Math.sin(angle) * distance;
        } else {
          x = Math.random() * this.logicalWidth;
          y = Math.random() * this.logicalHeight;
        }

        x = Math.max(20, Math.min(this.logicalWidth - 20, x));
        y = Math.max(20, Math.min(this.logicalHeight - 20, y));

        this.nodes.push({
          x, y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          targetX: x,
          targetY: y,
          size: (Math.random() * 1.5 + 1.5) * layer.sizeMultiplier,
          pulse: Math.random() * Math.PI * 2,
          phase: Math.random() * Math.PI * 2,
          driftRadius: 15 + Math.random() * 20,
          health: this.getRandomHealth(),
          type: ['service', 'database', 'api', 'cache'][Math.floor(Math.random() * 4)],
          activity: Math.random() * 0.5 + 0.5,
          activityPulse: Math.random() * Math.PI * 2,
          z: layer.z,
          opacityMultiplier: layer.opacity
        });
      }
    });

    // Sort by z for proper render order
    this.nodes.sort((a, b) => a.z - b.z);
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
    const maxDistance = 120;

    for (let i = 0; i < this.nodes.length; i++) {
      if (this.connections.length >= 25) break;

      for (let j = i + 1; j < this.nodes.length; j++) {
        if (this.connections.length >= 25) break;

        const dx = this.nodes[i].x - this.nodes[j].x;
        const dy = this.nodes[i].y - this.nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance && Math.random() < 0.35) {
          this.connections.push({
            from: i,
            to: j,
            strength: 1 - (distance / maxDistance),
            phase: Math.random() * Math.PI * 2
          });
        }
      }
    }
  }

  updateNodes() {
    const damping = 0.96;
    const springStrength = 0.0008;

    this.nodes.forEach(node => {
      // Calculate drift target using sine wave for smooth, organic motion
      node.targetX = node.baseX + Math.sin(this.time * 0.0008 + node.phase) * node.driftRadius;
      node.targetY = node.baseY + Math.cos(this.time * 0.0008 + node.phase * 1.3) * node.driftRadius * 0.6;

      // Spring physics toward target
      node.vx += (node.targetX - node.x) * springStrength;
      node.vy += (node.targetY - node.y) * springStrength;
      node.vx *= damping;
      node.vy *= damping;
      node.x += node.vx;
      node.y += node.vy;

      // Pulse animations
      node.pulse += 0.025;
      node.activityPulse += 0.04 * node.activity;

      // Rare health changes
      if (Math.random() < 0.0008) {
        node.health = this.getRandomHealth();
      }

      // Soft bounds
      node.x = Math.max(15, Math.min(this.logicalWidth - 15, node.x));
      node.y = Math.max(15, Math.min(this.logicalHeight - 15, node.y));
    });

    // Recreate connections periodically
    if (this.time % 120 === 0) {
      this.createConnections();
    }
  }

  createDataPacket(connection) {
    const fromNode = this.nodes[connection.from];
    const toNode = this.nodes[connection.to];

    this.dataPackets.push({
      x: fromNode.x,
      y: fromNode.y,
      startX: fromNode.x,
      startY: fromNode.y,
      targetX: toNode.x,
      targetY: toNode.y,
      progress: 0,
      speed: 0.012 + Math.random() * 0.008,
      size: 1.2 + Math.random() * 1,
      trail: []
    });
  }

  updateDataPackets() {
    // Create new packets sparingly
    if (this.dataPackets.length < 15) {
      this.connections.forEach(conn => {
        if (Math.random() < 0.003) {
          this.createDataPacket(conn);
        }
      });
    }

    this.dataPackets = this.dataPackets.filter(packet => {
      // Store trail position
      packet.trail.push({ x: packet.x, y: packet.y });
      if (packet.trail.length > 8) packet.trail.shift();

      // Smooth eased progress
      packet.progress += packet.speed;
      const easedProgress = this.easeInOutQuart(Math.min(packet.progress, 1));

      packet.x = packet.startX + (packet.targetX - packet.startX) * easedProgress;
      packet.y = packet.startY + (packet.targetY - packet.startY) * easedProgress;

      return packet.progress < 1;
    });
  }

  getHealthColor(health, opacity = 1) {
    const colors = {
      healthy: { r: 34, g: 197, b: 94 },
      normal: { r: 20, g: 184, b: 166 },
      warning: { r: 251, g: 191, b: 36 },
      critical: { r: 239, g: 68, b: 68 }
    };
    const color = colors[health] || colors.normal;
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
  }

  drawNodes() {
    this.nodes.forEach(node => {
      const pulseScale = 1 + Math.sin(node.pulse) * 0.1;
      const activityGlow = 1 + Math.sin(node.activityPulse) * 0.15 * node.activity;
      const size = node.size * pulseScale;
      const baseOpacity = node.opacityMultiplier * (this.isDarkMode ? 0.85 : 1);

      // Layer 1: Wide outer glow
      const outerGlowSize = size * activityGlow * 3;
      const outerGradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, outerGlowSize
      );
      outerGradient.addColorStop(0, this.getHealthColor(node.health, 0.15 * baseOpacity));
      outerGradient.addColorStop(0.5, this.getHealthColor(node.health, 0.05 * baseOpacity));
      outerGradient.addColorStop(1, this.getHealthColor(node.health, 0));

      this.ctx.fillStyle = outerGradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, outerGlowSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Layer 2: Inner glow
      const innerGlowSize = size * 2;
      const innerGradient = this.ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, innerGlowSize
      );
      innerGradient.addColorStop(0, this.getHealthColor(node.health, 0.4 * baseOpacity));
      innerGradient.addColorStop(0.6, this.getHealthColor(node.health, 0.15 * baseOpacity));
      innerGradient.addColorStop(1, this.getHealthColor(node.health, 0));

      this.ctx.fillStyle = innerGradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, innerGlowSize, 0, Math.PI * 2);
      this.ctx.fill();

      // Layer 3: Core with specular highlight
      const coreGradient = this.ctx.createRadialGradient(
        node.x - size * 0.25, node.y - size * 0.25, 0,
        node.x, node.y, size
      );
      coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.9 * baseOpacity})`);
      coreGradient.addColorStop(0.3, this.getHealthColor(node.health, 0.95 * baseOpacity));
      coreGradient.addColorStop(1, this.getHealthColor(node.health, 0.8 * baseOpacity));

      this.ctx.fillStyle = coreGradient;
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawConnections() {
    this.connections.forEach(conn => {
      const fromNode = this.nodes[conn.from];
      const toNode = this.nodes[conn.to];
      if (!fromNode || !toNode) return;

      const avgZ = (fromNode.z + toNode.z) / 2;
      const baseOpacity = conn.strength * avgZ * (this.isDarkMode ? 0.12 : 0.2);

      // Gradient along connection
      const gradient = this.ctx.createLinearGradient(
        fromNode.x, fromNode.y, toNode.x, toNode.y
      );
      gradient.addColorStop(0, this.getHealthColor(fromNode.health, baseOpacity * 0.6));
      gradient.addColorStop(0.5, `rgba(20, 184, 166, ${baseOpacity})`);
      gradient.addColorStop(1, this.getHealthColor(toNode.health, baseOpacity * 0.6));

      this.ctx.beginPath();
      this.ctx.moveTo(fromNode.x, fromNode.y);
      this.ctx.lineTo(toNode.x, toNode.y);
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = avgZ * (this.isDarkMode ? 0.8 : 1.2);
      this.ctx.lineCap = 'round';
      this.ctx.stroke();

      // Subtle pulse along line
      const pulsePosition = (Math.sin(this.time * 0.015 + conn.phase) + 1) / 2;
      const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulsePosition;
      const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulsePosition;

      const pulseGradient = this.ctx.createRadialGradient(
        pulseX, pulseY, 0, pulseX, pulseY, 12
      );
      pulseGradient.addColorStop(0, `rgba(20, 184, 166, ${baseOpacity * 1.5})`);
      pulseGradient.addColorStop(1, 'transparent');

      this.ctx.fillStyle = pulseGradient;
      this.ctx.beginPath();
      this.ctx.arc(pulseX, pulseY, 12, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawDataPackets() {
    this.dataPackets.forEach(packet => {
      // Motion blur trail
      packet.trail.forEach((point, i) => {
        const trailOpacity = (i / packet.trail.length) * 0.25;
        const trailSize = packet.size * (0.3 + (i / packet.trail.length) * 0.7);

        this.ctx.fillStyle = `rgba(59, 130, 246, ${trailOpacity})`;
        this.ctx.beginPath();
        this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
        this.ctx.fill();
      });

      // Outer glow
      const glowGradient = this.ctx.createRadialGradient(
        packet.x, packet.y, 0,
        packet.x, packet.y, packet.size * 3
      );
      const glowOpacity = this.isDarkMode ? 0.6 : 0.8;
      glowGradient.addColorStop(0, `rgba(59, 130, 246, ${glowOpacity})`);
      glowGradient.addColorStop(0.4, `rgba(59, 130, 246, ${glowOpacity * 0.3})`);
      glowGradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

      this.ctx.fillStyle = glowGradient;
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size * 3, 0, Math.PI * 2);
      this.ctx.fill();

      // Bright core with highlight
      const coreGradient = this.ctx.createRadialGradient(
        packet.x, packet.y, 0,
        packet.x, packet.y, packet.size
      );
      coreGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGradient.addColorStop(0.4, 'rgba(147, 197, 253, 1)');
      coreGradient.addColorStop(1, 'rgba(59, 130, 246, 0.9)');

      this.ctx.fillStyle = coreGradient;
      this.ctx.beginPath();
      this.ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawRadarSweep() {
    this.radarAngle += 0.01;

    const centerX = this.logicalWidth * 0.75;
    const centerY = this.logicalHeight * 0.25;
    const radius = Math.min(this.logicalWidth, this.logicalHeight) * 0.32;

    // Multiple sweep layers for depth
    for (let layer = 0; layer < 3; layer++) {
      const layerOffset = layer * 0.12;
      const layerOpacity = (3 - layer) / 3 * (this.isDarkMode ? 0.12 : 0.18);

      const gradient = this.ctx.createConicGradient(
        this.radarAngle + layerOffset, centerX, centerY
      );
      gradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
      gradient.addColorStop(0.02, `rgba(20, 184, 166, ${layerOpacity})`);
      gradient.addColorStop(0.08, `rgba(20, 184, 166, ${layerOpacity * 0.4})`);
      gradient.addColorStop(0.15, 'rgba(20, 184, 166, 0)');

      this.ctx.fillStyle = gradient;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius * (1 - layer * 0.12), 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Refined concentric circles
    for (let i = 1; i <= 4; i++) {
      const ringRadius = radius * i / 4;
      const ringOpacity = (0.02 + (0.015 * (5 - i) / 4)) * (this.isDarkMode ? 0.8 : 1.2);

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(20, 184, 166, ${ringOpacity})`;
      this.ctx.lineWidth = this.isDarkMode ? 0.5 : 0.8;
      this.ctx.stroke();
    }

    // Crosshairs with gradient fade
    const crossGradient = this.ctx.createLinearGradient(
      centerX - radius, centerY, centerX + radius, centerY
    );
    crossGradient.addColorStop(0, 'rgba(20, 184, 166, 0)');
    crossGradient.addColorStop(0.3, 'rgba(20, 184, 166, 0.04)');
    crossGradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.06)');
    crossGradient.addColorStop(0.7, 'rgba(20, 184, 166, 0.04)');
    crossGradient.addColorStop(1, 'rgba(20, 184, 166, 0)');

    this.ctx.strokeStyle = crossGradient;
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.moveTo(centerX - radius, centerY);
    this.ctx.lineTo(centerX + radius, centerY);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY - radius);
    this.ctx.lineTo(centerX, centerY + radius);
    this.ctx.stroke();

    // Glowing center point
    const centerGlow = this.ctx.createRadialGradient(
      centerX, centerY, 0, centerX, centerY, 8
    );
    centerGlow.addColorStop(0, this.isDarkMode ? 'rgba(20, 184, 166, 0.8)' : 'rgba(20, 184, 166, 1)');
    centerGlow.addColorStop(0.5, 'rgba(20, 184, 166, 0.3)');
    centerGlow.addColorStop(1, 'rgba(20, 184, 166, 0)');

    this.ctx.fillStyle = centerGlow;
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 8, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.fillStyle = this.isDarkMode ? 'rgba(20, 184, 166, 0.9)' : 'rgba(20, 184, 166, 1)';
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  animate() {
    this.time++;
    this.ctx.save();
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);

    // Draw in order: radar, connections, packets, nodes, trace tree
    if (this.logicalWidth > 768) {
      this.drawRadarSweep();
    }
    this.drawConnections();
    this.drawDataPackets();
    this.drawNodes();

    // Draw trace tree overlay (only on larger screens)
    if (this.logicalWidth > 1024) {
      this.traceTree.update(this.time);
      this.traceTree.draw(this.ctx);
    }

    this.ctx.restore();

    this.updateNodes();
    this.updateDataPackets();

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    this.nodes = [];
    this.connections = [];
    this.dataPackets = [];
    this.canvas = null;
    this.ctx = null;
  }
}

// Trace Tree Overlay - Shows unified trace/log view
class TraceTreeOverlay {
  constructor(animation) {
    this.animation = animation;
    this.currentTraceIndex = 0;
    this.visibleLines = [];
    this.cycleLength = 1320; // ~22 seconds at 60fps
    this.state = 'hidden'; // hidden, typing, visible, fading
    this.stateStartTime = 0;
    this.globalOpacity = 0;

    this.traces = [
      // Example 1: E-commerce checkout
      {
        lines: [
          { depth: 0, type: 'http', method: 'POST', path: '/api/checkout', duration: '234ms', status: 'success' },
          { depth: 1, type: 'grpc', service: 'payment.Charge', duration: '89ms', status: 'success' },
          { depth: 2, type: 'http', method: 'POST', path: 'stripe.com/v1/charges', duration: '67ms', status: 'success' },
          { depth: 2, type: 'log', level: 'info', message: 'Payment $49.99 processed' },
          { depth: 1, type: 'sql', query: 'UPDATE orders SET status=\'paid\'', duration: '12ms', status: 'success' },
          { depth: 1, type: 'log', level: 'info', message: 'Order #1234 completed' }
        ]
      },
      // Example 2: User authentication
      {
        lines: [
          { depth: 0, type: 'http', method: 'POST', path: '/api/auth/login', duration: '156ms', status: 'success' },
          { depth: 1, type: 'sql', query: 'SELECT * FROM users WHERE email=?', duration: '8ms', status: 'success' },
          { depth: 1, type: 'grpc', service: 'auth.ValidatePassword', duration: '45ms', status: 'success' },
          { depth: 2, type: 'log', level: 'info', message: 'Password validated' },
          { depth: 1, type: 'cache', action: 'SET session:abc123', duration: '3ms', status: 'success' },
          { depth: 1, type: 'log', level: 'info', message: 'Session created for user@example.com' }
        ]
      },
      // Example 3: Dashboard with cache
      {
        lines: [
          { depth: 0, type: 'http', method: 'GET', path: '/api/dashboard/stats', duration: '89ms', status: 'success' },
          { depth: 1, type: 'cache', action: 'GET stats:daily', result: 'MISS', duration: '2ms', status: 'warning' },
          { depth: 1, type: 'sql', query: 'SELECT COUNT(*) FROM events...', duration: '67ms', status: 'success' },
          { depth: 2, type: 'log', level: 'debug', message: 'Aggregating 50k rows' },
          { depth: 1, type: 'cache', action: 'SET stats:daily', duration: '3ms', status: 'success' },
          { depth: 1, type: 'log', level: 'info', message: 'Dashboard stats computed' }
        ]
      }
    ];

    this.typeColors = {
      http: { color: '#14b8a6', label: 'HTTP' },
      grpc: { color: '#a855f7', label: 'gRPC' },
      sql: { color: '#f59e0b', label: 'SQL' },
      cache: { color: '#06b6d4', label: 'CACHE' },
      log: { color: '#6b7280', label: 'LOG' }
    };

    this.logLevelColors = {
      info: '#22c55e',
      debug: '#6b7280',
      warn: '#f59e0b',
      error: '#ef4444'
    };

  }

  update(time) {
    const cycleTime = time % this.cycleLength;

    // State machine for animation cycle (slowed down)
    if (cycleTime < 240) {
      // 0-4s: Hidden (radar only)
      this.state = 'hidden';
      this.globalOpacity = 0;
      this.visibleLines = [];
    } else if (cycleTime < 720) {
      // 4-12s: Typing in lines (slower)
      this.state = 'typing';
      const typingProgress = (cycleTime - 240) / 480; // Even slower typing
      const trace = this.traces[this.currentTraceIndex];
      const linesToShow = Math.floor(typingProgress * trace.lines.length);
      this.visibleLines = trace.lines.slice(0, linesToShow + 1);
      this.globalOpacity = Math.min(1, (cycleTime - 240) / 50);

      // Typing effect on current line
      if (linesToShow < trace.lines.length) {
        const lineProgress = (typingProgress * trace.lines.length) % 1;
        this.currentLineProgress = lineProgress;
      } else {
        this.currentLineProgress = 1;
      }
    } else if (cycleTime < 1020) {
      // 12-17s: Fully visible
      this.state = 'visible';
      this.visibleLines = this.traces[this.currentTraceIndex].lines;
      this.globalOpacity = 1;
      this.currentLineProgress = 1;
    } else if (cycleTime < 1200) {
      // 17-20s: Fading out
      this.state = 'fading';
      this.globalOpacity = 1 - ((cycleTime - 1020) / 180);
    } else {
      // 20-22s: Hidden, prepare next trace
      this.state = 'hidden';
      this.globalOpacity = 0;
      this.visibleLines = [];

      // Switch to next trace at end of cycle
      if (cycleTime > this.cycleLength - 10) {
        this.currentTraceIndex = (this.currentTraceIndex + 1) % this.traces.length;
      }
    }
  }

  draw(ctx) {
    if (this.globalOpacity <= 0 || this.visibleLines.length === 0) return;

    // Check dark mode from body attribute (where theme is set)
    const theme = document.body.getAttribute('data-theme');
    const isDark = theme === 'dark';

    // Position near the radar, aligned with hero heading
    const radarCenterX = this.animation.logicalWidth * 0.75;
    const startX = radarCenterX - 180; // Center the panel on radar
    const startY = this.animation.logicalHeight * 0.18; // ~18% from top to align with hero text
    const lineHeight = 26;
    const indentWidth = 18;

    // Panel dimensions
    const panelPadding = 14;
    const panelWidth = 360;
    const panelHeight = this.visibleLines.length * lineHeight + panelPadding * 2;

    // Frosted glass effect using theme's bgBase colors
    // Light: oklch(99.1% 0.002 247) ≈ rgb(252, 252, 253)
    // Dark: oklch(14% 0.025 263) ≈ rgb(28, 31, 40)
    const bgOpacity = 0.65 * this.globalOpacity;

    // Outer subtle glow
    ctx.fillStyle = isDark
      ? `rgba(28, 31, 40, ${0.4 * this.globalOpacity})`
      : `rgba(252, 252, 253, ${0.4 * this.globalOpacity})`;
    ctx.beginPath();
    ctx.roundRect(startX - panelPadding - 4, startY - panelPadding - 4, panelWidth + 8, panelHeight + 8, 12);
    ctx.fill();

    // Main frosted panel
    ctx.fillStyle = isDark
      ? `rgba(28, 31, 40, ${bgOpacity})`
      : `rgba(252, 252, 253, ${bgOpacity})`;
    ctx.beginPath();
    ctx.roundRect(startX - panelPadding, startY - panelPadding, panelWidth, panelHeight, 10);
    ctx.fill();

    // Subtle border
    ctx.strokeStyle = isDark
      ? `rgba(71, 85, 105, ${0.3 * this.globalOpacity})`
      : `rgba(203, 213, 225, ${0.4 * this.globalOpacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw each line
    this.visibleLines.forEach((line, index) => {
      const x = startX + line.depth * indentWidth;
      const y = startY + index * lineHeight;
      const isCurrentLine = index === this.visibleLines.length - 1 && this.state === 'typing';
      const lineOpacity = this.globalOpacity * (isCurrentLine ? this.currentLineProgress : 1);

      // Draw indent connector lines
      if (line.depth > 0) {
        ctx.strokeStyle = isDark
          ? `rgba(71, 85, 105, ${0.25 * lineOpacity})`
          : `rgba(148, 163, 184, ${0.4 * lineOpacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - indentWidth + 6, y - lineHeight + 8);
        ctx.lineTo(x - indentWidth + 6, y + 6);
        ctx.lineTo(x - 4, y + 6);
        ctx.stroke();
      }

      // Draw the line content
      this.drawTraceLine(ctx, line, x, y + 10, lineOpacity, isDark);
    });
  }

  drawTraceLine(ctx, line, x, y, opacity, isDark) {
    const typeInfo = this.typeColors[line.type];
    ctx.font = '12px ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace';

    let currentX = x;

    // Arrow/bullet
    ctx.fillStyle = isDark
      ? `rgba(148, 163, 184, ${opacity})`
      : `rgba(100, 116, 139, ${opacity})`;
    ctx.fillText('→', currentX, y);
    currentX += 18;

    if (line.type === 'log') {
      // Log line format: [LEVEL] message
      const levelColor = this.logLevelColors[line.level] || this.logLevelColors.info;

      // Level badge
      ctx.fillStyle = `rgba(${this.hexToRgb(levelColor)}, ${opacity * 0.15})`;
      const levelText = line.level.toUpperCase();
      const levelWidth = ctx.measureText(levelText).width + 8;
      ctx.beginPath();
      ctx.roundRect(currentX, y - 10, levelWidth, 14, 3);
      ctx.fill();

      ctx.fillStyle = `rgba(${this.hexToRgb(levelColor)}, ${opacity})`;
      ctx.fillText(levelText, currentX + 4, y);
      currentX += levelWidth + 8;

      // Message
      ctx.fillStyle = isDark
        ? `rgba(226, 232, 240, ${opacity * 0.9})`
        : `rgba(51, 65, 85, ${opacity * 0.9})`;
      ctx.fillText(line.message, currentX, y);
    } else {
      // Type badge
      ctx.fillStyle = `rgba(${this.hexToRgb(typeInfo.color)}, ${opacity * 0.15})`;
      const typeWidth = ctx.measureText(typeInfo.label).width + 8;
      ctx.beginPath();
      ctx.roundRect(currentX, y - 10, typeWidth, 14, 3);
      ctx.fill();

      ctx.fillStyle = `rgba(${this.hexToRgb(typeInfo.color)}, ${opacity})`;
      ctx.fillText(typeInfo.label, currentX + 4, y);
      currentX += typeWidth + 8;

      // Method/action
      if (line.method) {
        ctx.fillStyle = isDark
          ? `rgba(167, 139, 250, ${opacity})`
          : `rgba(124, 58, 237, ${opacity})`;
        ctx.fillText(line.method, currentX, y);
        currentX += ctx.measureText(line.method).width + 6;
      }
      if (line.service) {
        ctx.fillStyle = isDark
          ? `rgba(226, 232, 240, ${opacity})`
          : `rgba(51, 65, 85, ${opacity})`;
        ctx.fillText(line.service, currentX, y);
        currentX += ctx.measureText(line.service).width + 6;
      }
      if (line.action) {
        ctx.fillStyle = isDark
          ? `rgba(226, 232, 240, ${opacity})`
          : `rgba(51, 65, 85, ${opacity})`;
        ctx.fillText(line.action, currentX, y);
        currentX += ctx.measureText(line.action).width + 6;
      }

      // Path/query
      if (line.path) {
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${opacity * 0.8})`
          : `rgba(100, 116, 139, ${opacity * 0.8})`;
        const displayPath = line.path.length > 28 ? line.path.slice(0, 28) + '...' : line.path;
        ctx.fillText(displayPath, currentX, y);
        currentX += ctx.measureText(displayPath).width + 8;
      }
      if (line.query) {
        ctx.fillStyle = isDark
          ? `rgba(148, 163, 184, ${opacity * 0.8})`
          : `rgba(100, 116, 139, ${opacity * 0.8})`;
        const displayQuery = line.query.length > 25 ? line.query.slice(0, 25) + '...' : line.query;
        ctx.fillText(displayQuery, currentX, y);
        currentX += ctx.measureText(displayQuery).width + 8;
      }
      if (line.result) {
        const resultColor = line.result === 'MISS' ? '#f59e0b' : '#22c55e';
        ctx.fillStyle = `rgba(${this.hexToRgb(resultColor)}, ${opacity})`;
        ctx.fillText(line.result, currentX, y);
        currentX += ctx.measureText(line.result).width + 8;
      }

      // Duration badge
      if (line.duration) {
        ctx.fillStyle = isDark
          ? `rgba(100, 116, 139, ${opacity * 0.7})`
          : `rgba(148, 163, 184, ${opacity * 0.7})`;
        ctx.fillText(line.duration, currentX, y);
      }
    }
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
      : '255, 255, 255';
  }
}

// Initialize
let heroAnimation = null;

document.addEventListener('DOMContentLoaded', () => {
  heroAnimation = new ObservabilityAnimation();
});

window.addEventListener('beforeunload', () => {
  if (heroAnimation?.destroy) {
    heroAnimation.destroy();
    heroAnimation = null;
  }
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden && heroAnimation?.animationId) {
    cancelAnimationFrame(heroAnimation.animationId);
    heroAnimation.animationId = null;
  } else if (!document.hidden && heroAnimation && !heroAnimation.animationId && !heroAnimation.isMobile) {
    heroAnimation.animate();
  }
});

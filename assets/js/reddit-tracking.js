// Reddit Pixel Conversion Tracking
(function() {
  'use strict';

  // Wait for DOM and Reddit Pixel to be ready
  function initRedditTracking() {
    if (typeof window.rdt !== 'function') {
      // Reddit Pixel not loaded yet, retry
      setTimeout(initRedditTracking, 100);
      return;
    }

    // Track CTA button clicks
    function trackCTAClick(eventName, metadata) {
      try {
        // Send custom event to Reddit
        window.rdt('track', eventName, metadata);

        // Also send to other analytics if needed
        if (window.amplitude) {
          window.amplitude.track(eventName, metadata);
        }
        if (window.posthog) {
          window.posthog.capture(eventName, metadata);
        }
        if (window.fbq) {
          window.fbq('track', 'Lead', metadata);
        }
        console.log('Reddit Pixel Event:', eventName, metadata);
      } catch (error) {
        console.error('Error tracking Reddit event:', error);
      }
    }

    // Add click tracking to all CTAs
    function attachCTATracking() {
      // Navigation CTAs
      const navCTAs = [
        {
          selector: 'a[href*="app.monoscope.tech"]',
          event: 'SignUp',
          label: 'Navigation Sign Up'
        },
        {
          selector: 'a[href*="calendar.app.google"]',
          event: 'ScheduleDemo',
          label: 'Navigation Book Demo'
        }
      ];

      // Hero section CTAs
      const heroCTAs = [
        {
          selector: '.hero-section a[href*="app.monoscope.tech"]',
          event: 'SignUp',
          label: 'Hero Start Free'
        },
        {
          selector: '.hero-section a[href*="calendar.app.google"]',
          event: 'ScheduleDemo',
          label: 'Hero Get Demo'
        }
      ];

      // Footer CTAs
      const footerCTAs = [
        {
          selector: 'footer a[href*="app.monoscope.tech"]',
          event: 'SignUp',
          label: 'Footer Start Trial'
        },
        {
          selector: 'footer a[href*="calendar.app.google"]',
          event: 'ScheduleDemo',
          label: 'Footer Book Demo'
        }
      ];

      // Docs page CTAs
      const docsCTAs = [
        {
          selector: 'a[href*="app.monoscope.tech?utm_source=docs"]',
          event: 'SignUp',
          label: 'Docs Sign Up'
        }
      ];

      // Playground/Interactive CTAs
      const playgroundCTAs = [
        {
          selector: '[data-tracking="playground"]',
          event: 'ViewContent',
          label: 'Launch Playground'
        },
        {
          selector: '.playground-button',
          event: 'ViewContent',
          label: 'Try Playground'
        }
      ];

      // Combine all CTA configs
      const allCTAs = [...navCTAs, ...heroCTAs, ...footerCTAs, ...docsCTAs, ...playgroundCTAs];

      // Attach event listeners
      allCTAs.forEach(cta => {
        const elements = document.querySelectorAll(cta.selector);
        elements.forEach(element => {
          // Skip if already tracked
          if (element.dataset.redditTracked) return;

          element.addEventListener('click', function(e) {
            const href = element.getAttribute('href') || '';
            const text = element.textContent.trim();

            trackCTAClick(cta.event, {
              label: cta.label,
              button_text: text,
              url: href,
              page: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          });

          // Mark as tracked to avoid duplicate listeners
          element.dataset.redditTracked = 'true';
        });
      });

      // Special handling for "Getting Started" buttons with different text variations
      const gettingStartedSelectors = [
        'a:contains("Get Started")',
        'button:contains("Get Started")',
        'a:contains("Getting Started")',
        'button:contains("Getting Started")',
        '[data-tracking*="getting-started"]'
      ];

      // Use a more compatible selector approach
      document.querySelectorAll('a, button').forEach(element => {
        const text = element.textContent.toLowerCase();
        if ((text.includes('get started') || text.includes('getting started')) && !element.dataset.redditTracked) {
          element.addEventListener('click', function() {
            trackCTAClick('InitiateCheckout', {
              label: 'Getting Started Button',
              button_text: element.textContent.trim(),
              url: element.getAttribute('href') || '',
              page: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          });
          element.dataset.redditTracked = 'true';
        }
      });
    }

    // Track contact form submissions
    function attachContactFormTracking() {
      // Crisp Chat interactions
      if (window.$crisp) {
        window.$crisp.push(['on', 'message:sent', function() {
          trackCTAClick('Contact', {
            label: 'Crisp Chat Message',
            type: 'chat',
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        }]);
      }

      // ConvertKit newsletter form
      const newsletterForms = document.querySelectorAll('[data-uid="e05f719e6e"], .formkit-form');
      newsletterForms.forEach(form => {
        if (form.dataset.redditTracked) return;

        form.addEventListener('submit', function(e) {
          trackCTAClick('CompleteRegistration', {
            label: 'Newsletter Signup',
            type: 'newsletter',
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });

        form.dataset.redditTracked = 'true';
      });

      // Generic contact forms
      const contactForms = document.querySelectorAll('form[action*="contact"], form#contact-form, .contact-form');
      contactForms.forEach(form => {
        if (form.dataset.redditTracked) return;

        form.addEventListener('submit', function(e) {
          trackCTAClick('Contact', {
            label: 'Contact Form Submit',
            type: 'form',
            page: window.location.pathname,
            timestamp: new Date().toISOString()
          });
        });

        form.dataset.redditTracked = 'true';
      });
    }

    // Track page engagement (scroll depth)
    function trackScrollDepth() {
      let scrollTracked = { 25: false, 50: false, 75: false, 90: false };

      function checkScroll() {
        const scrollPercent = Math.round((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100);

        Object.keys(scrollTracked).forEach(depth => {
          if (scrollPercent >= depth && !scrollTracked[depth]) {
            scrollTracked[depth] = true;
            trackCTAClick('ViewContent', {
              label: `Scroll Depth ${depth}%`,
              depth: depth,
              page: window.location.pathname,
              timestamp: new Date().toISOString()
            });
          }
        });
      }

      // Throttle scroll event
      let scrollTimer;
      window.addEventListener('scroll', function() {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(checkScroll, 100);
      });
    }

    // Initialize all tracking
    function init() {
      attachCTATracking();
      attachContactFormTracking();
      trackScrollDepth();

      // Re-attach tracking after HTMX swaps (for dynamic content)
      if (window.htmx) {
        document.body.addEventListener('htmx:afterSwap', function() {
          setTimeout(() => {
            attachCTATracking();
            attachContactFormTracking();
          }, 100);
        });
      }

      // Also re-attach on DOM changes (for dynamic content)
      const observer = new MutationObserver(function(mutations) {
        let shouldReattach = false;
        mutations.forEach(mutation => {
          if (mutation.addedNodes.length > 0) {
            shouldReattach = true;
          }
        });
        if (shouldReattach) {
          attachCTATracking();
          attachContactFormTracking();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    // Start tracking
    init();

    // Track initial page view with additional metadata
    trackCTAClick('PageView', {
      page: window.location.pathname,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRedditTracking);
  } else {
    initRedditTracking();
  }
})();
// Globe component configuration
export const globeConfig = {
  // Default configuration - uses the built-in globe
  default: {
    type: "builtin"
  },

  // Three.js examples configurations
  examples: {
    ultrahdr: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_loader_texture_ultrahdr.html"
      }
    },
    animation_keyframes: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_animation_keyframes.html"
      }
    },
    particles: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_points_waves.html"
      }
    },
    galaxy: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_points_sprites.html"
      }
    }
  },

  // Custom configurations can be added here
  custom: {
    // Add your custom Three.js scene URLs here
  }
};

// Helper function to get configuration by name
export const getGlobeConfig = (configName = 'default') => {
  // Check if it's a direct config name
  if (globeConfig[configName]) {
    return globeConfig[configName];
  }
  
  // Check in examples
  if (globeConfig.examples[configName]) {
    return globeConfig.examples[configName];
  }
  
  // Check in custom
  if (globeConfig.custom[configName]) {
    return globeConfig.custom[configName];
  }
  
  // Default to builtin
  return globeConfig.default;
};
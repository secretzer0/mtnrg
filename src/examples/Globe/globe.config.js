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
        // url: "https://threejs.org/examples/webgl_loader_texture_ultrahdr.html"
        // url: "https://threejs.org/examples/webgl_points_dynamic.html"
        url: "https://threejs.org/examples/webgpu_tsl_galaxy"
      },
      scale: 5.5,  // Adjust this value to zoom in/out (1.0 = 100%, 1.5 = 150%, etc.)
      opacity: 0.3,  // Transparency level (0.0 = fully transparent, 1.0 = fully opaque)
      aspectRatio: "16:9"  // Aspect ratio (e.g., "16:9", "4:3", "1:1", or null for natural ratio)
    },
    animation_keyframes: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_animation_keyframes.html"
      },
      scale: 1.0  // Default scale
    },
    particles: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_points_waves.html"
      },
      scale: 1.0  // Default scale
    },
    galaxy: {
      type: "external",
      source: {
        url: "https://threejs.org/examples/webgl_points_sprites.html"
      },
      scale: 1.0  // Default scale
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

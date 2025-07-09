import { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

function ExternalViewer({ config, canvasStyle, ...rest }) {
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    const handleLoad = () => {
      setLoading(false);
      setError(null);
    };

    const handleError = () => {
      setLoading(false);
      setError("Failed to load external content");
    };

    if (iframe) {
      iframe.addEventListener("load", handleLoad);
      iframe.addEventListener("error", handleError);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleLoad);
        iframe.removeEventListener("error", handleError);
      }
    };
  }, [config.source.url]);

  // Apply sandbox permissions
  const sandboxPermissions = config.sandbox?.permissions?.join(" ") || "allow-scripts allow-same-origin";
  
  // Merge styles - make it responsive and behind other content
  const iframeStyles = {
    width: "100%",
    height: "100%",
    minWidth: "700px",
    minHeight: "600px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    pointerEvents: "auto",
    ...canvasStyle,
    ...config.sandbox?.styles,
  };

  if (error && config.fallback?.enabled) {
    return (
      <VuiBox {...rest}>
        <div style={{
          ...iframeStyles,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid #ff0000",
        }}>
          <VuiTypography variant="body2" color="error" textAlign="center">
            {error}
            <br />
            <small>{config.fallback?.useBuiltin ? "Falling back to builtin Globe" : ""}</small>
          </VuiTypography>
        </div>
      </VuiBox>
    );
  }

  return (
    <VuiBox 
      {...rest} 
      sx={{ 
        width: "700px", 
        height: "600px",
        position: "relative",
        overflow: "hidden",
        ...rest.sx 
      }}
    >
      {loading && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: "8px",
          zIndex: 10,
        }}>
          <VuiTypography variant="body2" color="white">
            Loading...
          </VuiTypography>
        </div>
      )}
      <iframe
        ref={iframeRef}
        src={config.source.url}
        title="External Three.js Example"
        sandbox={sandboxPermissions}
        style={iframeStyles}
      />
    </VuiBox>
  );
}

ExternalViewer.propTypes = {
  config: PropTypes.shape({
    source: PropTypes.shape({
      url: PropTypes.string.isRequired,
      proxy: PropTypes.bool,
    }).isRequired,
    fallback: PropTypes.shape({
      enabled: PropTypes.bool,
      useBuiltin: PropTypes.bool,
    }),
    sandbox: PropTypes.shape({
      permissions: PropTypes.arrayOf(PropTypes.string),
      styles: PropTypes.objectOf(PropTypes.any),
    }),
  }).isRequired,
  canvasStyle: PropTypes.objectOf(PropTypes.any),
};

ExternalViewer.defaultProps = {
  canvasStyle: {},
};

export default ExternalViewer;
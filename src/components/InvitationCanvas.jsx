import React, { forwardRef } from 'react';

/**
 * High-performance Canvas wrapper component.
 * Renders the HTML5 Canvas inside a fluid wrapper that fills the viewport.
 */
export const InvitationCanvas = forwardRef((props, ref) => {
  return (
    <div className="canvas-wrapper">
      <canvas
        ref={ref}
        className="invitation-canvas"
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
});

InvitationCanvas.displayName = 'InvitationCanvas';

export default InvitationCanvas;

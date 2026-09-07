import React, { useEffect, useRef } from 'react';

interface CitySceneProps {
  interactive?: boolean;
  className?: string;
  onSelectNode?: (nodeType: string) => void;
}

export const CityScene: React.FC<CitySceneProps> = ({
  interactive = true,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / width - 0.5;
      const y = (e.clientY - rect.top) / height - 0.5;
      mousePos.current.targetX = x * 35; // Parallax range
      mousePos.current.targetY = y * 25;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // City Building Blocks (Isometric projection coordinates)
    const buildings: {
      x: number;
      y: number;
      w: number;
      h: number;
      depth: number;
      color: string;
      glow?: boolean;
    }[] = [
      { x: -280, y: -60, w: 70, h: 120, depth: 140, color: '#0f1c3f' },
      { x: -180, y: -90, w: 90, h: 150, depth: 220, color: '#0c1833', glow: true },
      { x: -70, y: -40, w: 65, h: 95, depth: 160, color: '#11224d' },
      { x: 30, y: -120, w: 80, h: 180, depth: 260, color: '#09152b', glow: true },
      { x: 140, y: -70, w: 75, h: 110, depth: 170, color: '#0d1a36' },
      { x: 240, y: -30, w: 60, h: 90, depth: 130, color: '#101d3a' },
      // Secondary tier
      { x: -220, y: 70, w: 50, h: 60, depth: 90, color: '#0a1329' },
      { x: -110, y: 50, w: 60, h: 80, depth: 110, color: '#0c1730' },
      { x: 10, y: 60, w: 55, h: 70, depth: 100, color: '#0d1833' },
      { x: 120, y: 50, w: 70, h: 85, depth: 120, color: '#0a142c' },
      { x: 210, y: 70, w: 55, h: 65, depth: 95, color: '#0e1b38' },
    ];

    // Data Pulses traveling along arterials
    const pulses = Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 400,
      vx: (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random() * 1.5),
      vy: (Math.random() - 0.5) * 0.5,
      size: 1.5 + Math.random() * 2,
      color: Math.random() > 0.4 ? '#00f0ff' : '#ff6b35',
      alpha: 0.2 + Math.random() * 0.8,
    }));

    // Issue Beacon Nodes hovering over the city
    const issueNodes = [
      { x: -180, y: -160, label: 'CRITICAL: Pothole', color: '#ff3366', pulse: 0 },
      { x: 30, y: -190, label: 'CRITICAL: Live Wire', color: '#ff3366', pulse: 1.5 },
      { x: 140, y: -120, label: 'HIGH: Refuse Overflow', color: '#ff6b35', pulse: 0.8 },
      { x: -70, y: -80, label: 'RESOLVED: Water Main', color: '#00e599', pulse: 2.2 },
    ];

    let time = 0;

    const render = () => {
      time += 0.02;

      // Mouse smooth interpolation
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + mousePos.current.x;
      const centerY = height * 0.58 + mousePos.current.y;

      // Draw Perspective Grid Floor
      ctx.save();
      ctx.translate(centerX, centerY);

      // Radial dark background glow
      const bgGlow = ctx.createRadialGradient(0, 0, 50, 0, 0, width * 0.6);
      bgGlow.addColorStop(0, 'rgba(0, 240, 255, 0.06)');
      bgGlow.addColorStop(0.5, 'rgba(11, 17, 32, 0.4)');
      bgGlow.addColorStop(1, 'rgba(5, 8, 17, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(-width, -height, width * 2, height * 2);

      // Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.07)';

      const gridSize = 45;
      const gridCount = 14;

      for (let i = -gridCount; i <= gridCount; i++) {
        // Lateral lines
        ctx.beginPath();
        ctx.moveTo(i * gridSize, -height * 0.4);
        ctx.lineTo(i * gridSize * 1.8, height * 0.4);
        ctx.stroke();

        // Horizontal lines with perspective depth
        ctx.beginPath();
        const yOffset = i * 22;
        ctx.moveTo(-width * 0.45, yOffset);
        ctx.lineTo(width * 0.45, yOffset);
        ctx.stroke();
      }

      // Draw Arterial Road Lines with cyan/orange gradient glow
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.25)';
      ctx.beginPath();
      ctx.moveTo(-width * 0.4, 0);
      ctx.lineTo(width * 0.4, 0);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(255, 107, 53, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, -height * 0.35);
      ctx.lineTo(0, height * 0.35);
      ctx.stroke();

      // Render 3D Wireframe / Shaded Buildings
      buildings.forEach((b) => {
        // Isometric block
        const bx = b.x;
        const by = b.y;

        // Front Face
        ctx.fillStyle = b.color;
        ctx.strokeStyle = b.glow ? 'rgba(0, 240, 255, 0.35)' : 'rgba(51, 65, 85, 0.4)';
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.rect(bx - b.w / 2, by - b.depth, b.w, b.depth);
        ctx.fill();
        ctx.stroke();

        // Roof Face
        ctx.fillStyle = b.glow ? '#13284d' : '#14223f';
        ctx.beginPath();
        ctx.moveTo(bx - b.w / 2, by - b.depth);
        ctx.lineTo(bx - b.w / 2 + 15, by - b.depth - 15);
        ctx.lineTo(bx + b.w / 2 + 15, by - b.depth - 15);
        ctx.lineTo(bx + b.w / 2, by - b.depth);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Side Face
        ctx.fillStyle = '#0a1426';
        ctx.beginPath();
        ctx.moveTo(bx + b.w / 2, by - b.depth);
        ctx.lineTo(bx + b.w / 2 + 15, by - b.depth - 15);
        ctx.lineTo(bx + b.w / 2 + 15, by - 15);
        ctx.lineTo(bx + b.w / 2, by);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Window grid data lights
        if (b.glow) {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
          for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 3; col++) {
              if ((row + col + Math.floor(time)) % 3 === 0) {
                ctx.fillRect(
                  bx - b.w / 2 + 10 + col * 16,
                  by - b.depth + 15 + row * 24,
                  5,
                  8
                );
              }
            }
          }
        }
      });

      // Render Data Pulses
      pulses.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x > 450) p.x = -450;
        if (p.x < -450) p.x = 450;
        if (p.y > 200) p.y = -200;
        if (p.y < -200) p.y = 200;

        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Render Issue Beacons
      issueNodes.forEach((node) => {
        const pulseVal = Math.sin(time * 2 + node.pulse);
        const radius = 6 + pulseVal * 2;

        // Vertical laser drop line
        ctx.strokeStyle = `${node.color}55`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(node.x, node.y + 70);
        ctx.stroke();

        // Pulsing rings
        ctx.strokeStyle = `${node.color}88`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y + 70, 12 + pulseVal * 6, 0, Math.PI * 2);
        ctx.stroke();

        // Node circle
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Badge pill
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.strokeStyle = `${node.color}99`;
        ctx.lineWidth = 1;
        const textWidth = ctx.measureText(node.label).width + 16;
        ctx.beginPath();
        ctx.roundRect(node.x - textWidth / 2, node.y - 28, textWidth, 20, 10);
        ctx.fill();
        ctx.stroke();

        // Label text
        ctx.fillStyle = '#ffffff';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 14);
      });

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle bottom fade gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-civic-dark to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-civic-dark to-transparent" />
    </div>
  );
};

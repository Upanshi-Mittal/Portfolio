import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function PixelBanner() {
  const containerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── 1. Scene & Rich Atmospheric Sky ──
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0a1118"); // Deep mountain sky
    scene.fog = new THREE.FogExp2("#0c1520", 0.009);

    const width = container.clientWidth || 900;
    const height = container.clientHeight || 360;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 450);
    camera.position.set(0, 14, 46);
    camera.lookAt(0, 2, 0);

    // ── 2. Pixelated Low-Res WebGL Renderer ──
    const PIXEL_RATIO = 2.2;
    const lowWidth = Math.floor(width / PIXEL_RATIO);
    const lowHeight = Math.floor(height / PIXEL_RATIO);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(lowWidth, lowHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.imageRendering = "pixelated";
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    container.appendChild(renderer.domElement);

    // ── 3. Rich Colorful Cinematic Lighting (Warm Sun + Cool Sky) ──
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 1.4); // Cool cyan ambient
    scene.add(ambientLight);

    // Warm golden sunlight breaking through clouds from the upper right
    const sunLight = new THREE.DirectionalLight(0xfef08a, 3.4);
    sunLight.position.set(35, 45, 25);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 512;
    sunLight.shadow.mapSize.height = 512;
    scene.add(sunLight);

    // Vibrant forest emerald rim light from the left
    const emeraldLight = new THREE.DirectionalLight(0x22c55e, 1.2);
    emeraldLight.position.set(-30, 20, -15);
    scene.add(emeraldLight);

    // Subtle water reflection bounce light
    const waterBounce = new THREE.PointLight(0x38bdf8, 1.5, 40);
    waterBounce.position.set(0, -1, 4);
    scene.add(waterBounce);

    // ── 4. Diorama World Group ──
    const world = new THREE.Group();
    scene.add(world);

    const boxGeo = new THREE.BoxGeometry(1, 1, 1);

    // ── 5. Vibrant Nature Color Palette (Ghibli / Retro 3D) ──
    const matRockDark = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const matRockMid = new THREE.MeshLambertMaterial({ color: 0x334155 });
    const matRockLight = new THREE.MeshLambertMaterial({ color: 0x475569 });
    const matMossDark = new THREE.MeshLambertMaterial({ color: 0x14532d });
    const matMossLush = new THREE.MeshLambertMaterial({ color: 0x16a34a });
    const matGrassBright = new THREE.MeshLambertMaterial({ color: 0x4ade80 });
    const matSnow = new THREE.MeshLambertMaterial({ color: 0xf8fafc });

    const matWood = new THREE.MeshLambertMaterial({ color: 0x451a03 });
    const matFoliageDeep = new THREE.MeshLambertMaterial({ color: 0x14532d });
    const matFoliageMid = new THREE.MeshLambertMaterial({ color: 0x15803d });
    const matFoliageBright = new THREE.MeshLambertMaterial({ color: 0x22c55e });
    const matFoliageSun = new THREE.MeshLambertMaterial({ color: 0x86efac });

    const matWater = new THREE.MeshLambertMaterial({ color: 0x0284c7, emissive: 0x0369a1, emissiveIntensity: 0.4 });
    const matWaterCyan = new THREE.MeshLambertMaterial({ color: 0x38bdf8, emissive: 0x0ea5e9, emissiveIntensity: 0.5 });
    const matFoam = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const matCloud = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x93c5fd, emissiveIntensity: 0.15 });

    const addBlock = (mat, x, y, z, sx = 1, sy = 1, sz = 1) => {
      const mesh = new THREE.Mesh(boxGeo, mat);
      mesh.position.set(x, y, z);
      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      world.add(mesh);
      return mesh;
    };

    // ── 6. Solid Ground Base (Connected Corner-to-Corner, No Floating Void) ──
    // Continuous bedrock from x = -60 to +60 and z = -25 to +20
    for (let x = -58; x <= 58; x += 3.0) {
      for (let z = -22; z <= 20; z += 3.0) {
        // Deep foundation blocks below the camera cut
        addBlock(matRockDark, x, -5.5, z, 3.2, 3.0, 3.2);
      }
    }

    // ── 7. Panoramic Mountain Range Connected to Horizon Edges ──
    const addMountain = (centerX, centerZ, peakH, baseRadius) => {
      for (let y = 0; y <= peakH; y += 1.8) {
        const radiusAtY = (1 - y / peakH) * baseRadius;
        for (let x = -radiusAtY; x <= radiusAtY; x += 1.8) {
          for (let z = -radiusAtY; z <= radiusAtY; z += 1.8) {
            if (x * x + z * z <= radiusAtY * radiusAtY) {
              const isSnowPeak = y >= peakH - 3.2;
              const isMidMoss = y < peakH * 0.4;
              const mat = isSnowPeak ? matSnow : (isMidMoss ? matMossDark : matRockMid);
              addBlock(mat, centerX + x, y - 2, centerZ + z, 1.8, 1.8, 1.8);
            }
          }
        }
      }
    };

    // Connected mountain spine from far left corner to far right corner
    addMountain(-52, -24, 19, 12);
    addMountain(-36, -22, 23, 13);
    addMountain(-20, -20, 25, 14);
    addMountain(-3, -25, 20, 11);
    addMountain(14, -22, 26, 14);
    addMountain(32, -21, 24, 13);
    addMountain(50, -23, 20, 12);

    // ── 8. Continuous Canyon Walls (Seamlessly Anchored to Left & Right Corners) ──
    // Left Ridge: Reaches all the way past the left edge (x = -58 to -3.5)
    for (let x = -56; x <= -3.5; x += 1.8) {
      // Natural cliff height curve that rises high at the left corner and drops to central gorge
      const distToCenter = Math.abs(x);
      const cliffH = Math.sin(x * 0.22) * 2.5 + Math.min(13, distToCenter * 0.5) + 3;
      for (let y = -4; y <= cliffH; y += 1.6) {
        for (let z = -12; z <= 10; z += 1.8) {
          const isTop = y >= cliffH - 1.6;
          const mat = isTop ? (Math.random() > 0.4 ? matMossLush : matGrassBright) : (y > 3 ? matRockMid : matRockDark);
          addBlock(mat, x + (Math.random() - 0.5) * 0.3, y, z, 1.8, 1.6, 1.8);
        }
      }
    }

    // Right Ridge: Reaches all the way past the right edge (x = 3.5 to 56)
    for (let x = 3.5; x <= 56; x += 1.8) {
      const distToCenter = Math.abs(x);
      const cliffH = Math.cos(x * 0.2) * 2.5 + Math.min(13, distToCenter * 0.5) + 3.5;
      for (let y = -4; y <= cliffH; y += 1.6) {
        for (let z = -12; z <= 10; z += 1.8) {
          const isTop = y >= cliffH - 1.6;
          const mat = isTop ? (Math.random() > 0.4 ? matMossLush : matGrassBright) : (y > 3 ? matRockMid : matRockDark);
          addBlock(mat, x + (Math.random() - 0.5) * 0.3, y, z, 1.8, 1.6, 1.8);
        }
      }
    }

    // Central Canyon Backwall
    for (let x = -9; x <= 9; x += 1.8) {
      for (let y = 3; y <= 14; y += 1.6) {
        addBlock(matRockDark, x, y, -6, 1.8, 1.6, 2.4);
      }
    }

    // ── 9. Lush Forest Groves with Tiered Vibrant Leaves ──
    const addTree = (rootX, rootY, rootZ, scale = 1) => {
      const trunkH = 4.5 * scale;
      addBlock(matWood, rootX, rootY + trunkH / 2, rootZ, 0.8 * scale, trunkH, 0.8 * scale);

      const layers = [
        { y: rootY + trunkH, r: 2.6 * scale, mat: matFoliageDeep },
        { y: rootY + trunkH + 1.2 * scale, r: 2.1 * scale, mat: matFoliageMid },
        { y: rootY + trunkH + 2.2 * scale, r: 1.5 * scale, mat: matFoliageBright },
        { y: rootY + trunkH + 3.0 * scale, r: 0.9 * scale, mat: matFoliageSun },
      ];

      layers.forEach((l) => {
        const step = 0.9 * scale;
        for (let lx = -l.r; lx <= l.r; lx += step) {
          for (let lz = -l.r; lz <= l.r; lz += step) {
            if (lx * lx + lz * lz <= l.r * l.r) {
              addBlock(l.mat, rootX + lx, l.y, rootZ + lz, step, step * 1.1, step);
            }
          }
        }
      });
    };

    // Trees populated from left corner all the way to center gorge
    addTree(-46, 14, -2, 1.35);
    addTree(-38, 13.5, 1, 1.25);
    addTree(-30, 12, -3, 1.15);
    addTree(-22, 11, -1, 1.1);
    addTree(-16, 9.5, -2, 0.95);
    addTree(-10, 8, -1, 0.85);
    addTree(-6, 6.5, -3, 0.75);
    addTree(-34, 11, 4, 1.2);
    addTree(-20, 8.5, 5, 1.0);

    // Trees populated from right corner all the way to center gorge
    addTree(46, 14, -2, 1.35);
    addTree(38, 13.5, 1, 1.25);
    addTree(30, 12, -3, 1.15);
    addTree(22, 11, -1, 1.1);
    addTree(16, 9.5, -2, 0.95);
    addTree(10, 8, -1, 0.85);
    addTree(6, 6.5, -3, 0.75);
    addTree(34, 11, 4, 1.2);
    addTree(20, 8.5, 5, 1.0);

    // ── 10. Colorful Animated Cascading Waterfall & Winding River ──
    const WATERFALL_COUNT = 160;
    const waterBlocks = [];

    // Falling water column down the center
    for (let i = 0; i < WATERFALL_COUNT; i++) {
      const isFoam = Math.random() > 0.55;
      const x = (Math.random() - 0.5) * 5.6;
      const y = Math.random() * 16 - 3;
      const z = -2.2 + (Math.random() - 0.5) * 1.2;
      const speed = Math.random() * 0.25 + 0.18;

      const mat = isFoam ? matFoam : (Math.random() > 0.5 ? matWaterCyan : matWater);
      const mesh = addBlock(mat, x, y, z, 0.65, 1.3, 0.65);
      waterBlocks.push({ mesh, x, y, z, speed, isFoam });
    }

    // Lower River flowing forward into lake
    const riverBlocks = [];
    for (let rx = -7; rx <= 7; rx += 1.1) {
      for (let rz = -2; rz <= 16; rz += 1.1) {
        const riverCenter = Math.sin(rz * 0.22) * 3.8;
        if (Math.abs(rx - riverCenter) < 3.4) {
          const isCrest = Math.random() > 0.6;
          const mat = isCrest ? matFoam : (Math.random() > 0.4 ? matWaterCyan : matWater);
          const mesh = addBlock(mat, rx, -3.9, rz, 1.1, 0.5, 1.1);
          riverBlocks.push({ mesh, baseX: rx, baseZ: rz, phase: rz * 0.7 + rx * 0.35 });
        }
      }
    }

    // ── 11. Colorful Sky Clouds, Waterfall Spray & Glowing Fireflies ──
    // Fluffy White & Pale Gold Sky Clouds
    const cloudGroup = new THREE.Group();
    const createCloud = (cx, cy, cz, s = 1) => {
      const grp = new THREE.Group();
      for (let dx = -3.5 * s; dx <= 3.5 * s; dx += 1.3 * s) {
        for (let dy = -1.2 * s; dy <= 1.2 * s; dy += 1.1 * s) {
          for (let dz = -1.8 * s; dz <= 1.8 * s; dz += 1.3 * s) {
            if ((dx * dx) * 0.4 + (dy * dy) * 1.5 + (dz * dz) * 0.8 < 3.8 * s * s) {
              const b = new THREE.Mesh(boxGeo, matCloud);
              b.position.set(dx, dy, dz);
              b.scale.set(1.3 * s, 1.1 * s, 1.3 * s);
              grp.add(b);
            }
          }
        }
      }
      grp.position.set(cx, cy, cz);
      cloudGroup.add(grp);
      return grp;
    };

    const clouds = [
      createCloud(-36, 18, -14, 1.2),
      createCloud(-14, 21, -17, 1.1),
      createCloud(12, 19, -15, 1.0),
      createCloud(38, 20, -12, 1.3),
    ];
    world.add(cloudGroup);

    // Waterfall Mist Spray
    const SPRAY_COUNT = 55;
    const sprayParticles = [];
    const sprayGeo = new THREE.BoxGeometry(0.35, 0.35, 0.35);
    const sprayMat = new THREE.MeshBasicMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.85 });

    for (let i = 0; i < SPRAY_COUNT; i++) {
      const mesh = new THREE.Mesh(sprayGeo, sprayMat);
      mesh.position.set((Math.random() - 0.5) * 8, -3 + Math.random() * 3, -1 + Math.random() * 5);
      world.add(mesh);
      sprayParticles.push({
        mesh,
        baseY: -3.8,
        speedY: Math.random() * 0.06 + 0.03,
        driftX: (Math.random() - 0.5) * 0.04,
        driftZ: Math.random() * 0.03 + 0.01,
      });
    }

    // Glowing Golden Fireflies / Stardust in the Canyon
    const FIREFLY_COUNT = 25;
    const fireflyGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const fireflyMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const fireflies = [];
    for (let i = 0; i < FIREFLY_COUNT; i++) {
      const mesh = new THREE.Mesh(fireflyGeo, fireflyMat);
      const fx = (Math.random() - 0.5) * 35;
      const fy = Math.random() * 10 - 1;
      const fz = (Math.random() - 0.5) * 15;
      mesh.position.set(fx, fy, fz);
      world.add(mesh);
      fireflies.push({ mesh, baseX: fx, baseY: fy, baseZ: fz, speed: Math.random() * 1.5 + 0.8 });
    }

    // ── 12. Mouse Tilt & Drag Interaction ──
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let curRotY = 0;
    let curRotX = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.0035;
        // Keep bounds comfortable so the corner-anchoring stays intact
        targetRotX = Math.max(-0.18, Math.min(0.35, targetRotX));
        targetRotY = Math.max(-0.4, Math.min(0.4, targetRotY));
      } else {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotY = normX * 0.18;
        targetRotX = normY * 0.1;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onMouseLeave = () => {
      isDragging = false;
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("mouseleave", onMouseLeave);

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
        targetRotY += deltaX * 0.008;
        targetRotX += deltaY * 0.004;
        targetRotX = Math.max(-0.18, Math.min(0.35, targetRotX));
        targetRotY = Math.max(-0.4, Math.min(0.4, targetRotY));
      }
    };
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);

    // ── 13. Animation Loop ──
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      curRotY += (targetRotY - curRotY) * 0.08;
      curRotX += (targetRotX - curRotX) * 0.08;

      world.rotation.y = curRotY;
      world.rotation.x = curRotX;

      // Animate waterfall blocks
      for (let i = 0; i < WATERFALL_COUNT; i++) {
        const wb = waterBlocks[i];
        wb.y -= wb.speed;
        if (wb.y < -3.7) {
          wb.y = 13 + Math.random() * 2;
          wb.x = (Math.random() - 0.5) * 5.6;
        }
        wb.mesh.position.y = wb.y;
        wb.mesh.position.x = wb.x + Math.sin(time * 7 + i) * 0.12;
      }

      // Animate river waves
      for (let i = 0; i < riverBlocks.length; i++) {
        const rb = riverBlocks[i];
        rb.mesh.position.y = -3.9 + Math.sin(time * 3.5 + rb.phase) * 0.16;
      }

      // Animate mist spray
      for (let i = 0; i < SPRAY_COUNT; i++) {
        const sp = sprayParticles[i];
        sp.mesh.position.y += sp.speedY;
        sp.mesh.position.x += sp.driftX;
        sp.mesh.position.z += sp.driftZ;
        if (sp.mesh.position.y > 2.2) {
          sp.mesh.position.y = sp.baseY;
          sp.mesh.position.x = (Math.random() - 0.5) * 7.5;
          sp.mesh.position.z = -1 + Math.random() * 4;
        }
      }

      // Animate fireflies bobbing & flickering
      for (let i = 0; i < FIREFLY_COUNT; i++) {
        const ff = fireflies[i];
        ff.mesh.position.y = ff.baseY + Math.sin(time * ff.speed + i) * 0.8;
        ff.mesh.position.x = ff.baseX + Math.cos(time * 0.7 * ff.speed + i) * 0.6;
      }

      // Slowly drift clouds across the horizon
      clouds.forEach((cloud, idx) => {
        cloud.position.x += 0.018 * (idx % 2 === 0 ? 1 : 0.85);
        if (cloud.position.x > 48) cloud.position.x = -48;
      });

      renderer.render(scene, camera);
    };

    animate();

    // ── 14. Resize Handler ──
    const handleResize = () => {
      const newW = container.clientWidth || 900;
      const newH = container.clientHeight || 360;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();

      const newLowW = Math.floor(newW / PIXEL_RATIO);
      const newLowH = Math.floor(newH / PIXEL_RATIO);
      renderer.setSize(newLowW, newLowH, false);
    };
    window.addEventListener("resize", handleResize);

    // ── 15. Cleanup ──
    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("resize", handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      boxGeo.dispose();
      sprayGeo.dispose();
      fireflyGeo.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full px-6 sm:px-10 md:px-12 mb-8">
      <div
        ref={containerRef}
        className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a1118] shadow-2xl cursor-grab active:cursor-grabbing transition-all duration-300 hover:border-zinc-700 select-none"
        style={{
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Top Badges */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-200 pointer-events-none">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="tracking-wider">3D PIXEL NATURE DIORAMA</span>
        </div>

        <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 font-mono text-[11px] text-zinc-400 pointer-events-none">
          <span>DRAG TO ROTATE</span>
        </div>

        {/* Ambient bottom gradient blend */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

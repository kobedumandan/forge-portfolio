import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import anvilUrl from '../../glb/anvil.glb?url';
import '../styles/ForgeCanvas.css';

// ===========================================================================
// CAMERA FRAMING — tweak these to taste.
//   *_POS  = where the camera sits, as (x, y, z). Smaller numbers = closer.
//   *_LOOK = the point the camera aims at (e.g. y ≈ 1.0 looks at the anvil face).
// The camera smoothly animates from the INTRO framing to the HERO framing
// when the user taps "enter". Field of view is set on the PerspectiveCamera
// below (the `40` in `new THREE.PerspectiveCamera(40, ...)`).
// ===========================================================================
const INTRO_POS = new THREE.Vector3(1.81, 0.18, 0.84); // intro: low eye, looking UP at the anvil
const INTRO_LOOK = new THREE.Vector3(0, 0.7, 0); // aim at the top of the grounded anvil
const HERO_POS = new THREE.Vector3(1.5, 1.8, 3.5); // landing: pulled back into the box
const HERO_LOOK = new THREE.Vector3(0, 0.2, 0);

// ===========================================================================
// FLOOR — the ground disc the anvil sits on.
//   FLOOR_COLOR  = its color (hex). Change to taste.
//   FLOOR_RADIUS = how far the disc spreads.
// The disc fades to transparent toward its rim, so it never blanks out the
// backdrop text showing through the (transparent) canvas.
// ===========================================================================
const FLOOR_COLOR = 0x1a1411;
const FLOOR_RADIUS = 2.4;

export default function ForgeCanvas({ entered = false }) {
  const mountRef = useRef(null);
  const enteredRef = useRef(entered);

  // keep the latest `entered` readable inside the render loop without
  // re-running the heavy setup effect
  useEffect(() => {
    enteredRef.current = entered;
    // only show the grab cursor once the model is interactive (post-intro)
    if (mountRef.current) {
      mountRef.current.style.cursor = entered ? 'grab' : 'default';
    }
  }, [entered]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let stopped = false;
    let rafId = 0;
    let resumeTimer = 0;

    const w = mount.clientWidth;
    const h = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x0e0c0b, 0.025);

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.copy(INTRO_POS);
    camera.lookAt(INTRO_LOOK);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    mount.appendChild(renderer.domElement);

    // ===== LIGHTING =====
    scene.add(new THREE.AmbientLight(0x2a1f1a, 0.6));

    const keyLight = new THREE.DirectionalLight(0xfff1d6, 0.5);
    keyLight.position.set(5, 7, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -5;
    keyLight.shadow.camera.right = 5;
    keyLight.shadow.camera.top = 5;
    keyLight.shadow.camera.bottom = -5;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xff5520, 0.6);
    rimLight.position.set(-4, 3, -3);
    scene.add(rimLight);

    // warm forge glow near the anvil face
    const emberLight = new THREE.PointLight(0xff5e1a, 4, 8, 1.5);
    emberLight.position.set(0.6, 1.05, 0.3);
    scene.add(emberLight);

    // ===== GROUP (everything rotates around y) =====
    const rig = new THREE.Group();
    scene.add(rig);

    // ===== GROUND PLATE =====
    // a soft radial alpha fades the disc to transparent toward its rim, so the
    // backdrop text behind the (transparent) canvas is never blanked out by a
    // hard opaque circle. CircleGeometry UVs put the center at (0.5, 0.5), so
    // a centered radial gradient lines up with the disc exactly.
    const floorFade = document.createElement('canvas');
    floorFade.width = floorFade.height = 256;
    const fctx = floorFade.getContext('2d');
    const fgrad = fctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    fgrad.addColorStop(0, 'rgba(255,255,255,1)');
    fgrad.addColorStop(0.28, 'rgba(255,255,255,1)');
    fgrad.addColorStop(0.62, 'rgba(255,255,255,0)');
    fgrad.addColorStop(1, 'rgba(255,255,255,0)');
    fctx.fillStyle = fgrad;
    fctx.fillRect(0, 0, 256, 256);
    const floorAlpha = new THREE.CanvasTexture(floorFade);

    const groundGeo = new THREE.CircleGeometry(FLOOR_RADIUS, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: FLOOR_COLOR,
      roughness: 0.95,
      metalness: 0.1,
      transparent: true,
      alphaMap: floorAlpha,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    ground.visible = false; // hidden during the intro so it can't cover the text
    rig.add(ground);

    // ===== ANVIL (loaded from glb/anvil.glb) =====
    // Tunables: where the model sits + how it's oriented. Adjust if the
    // anvil lands off-center, points the wrong way, or sits oddly.
    const ANVIL_HEIGHT = 0.62; // world height
    const ANVIL_ROT_Y = 0; // spin the model so the horn faces +x (radians)

    // filled in once the model loads
    let anvilObj = null;

    // crossfade between the intro "skeleton" (glowing edges) and the docked
    // solid model — these collect the materials we animate each frame
    const meshMats = []; // solid surfaces: opacity 0 (intro) -> 1 (docked)
    const edgeMats = []; // edge skeleton: opacity 1 (intro) -> 0 (docked)

    const loader = new GLTFLoader();
    loader.load(
      anvilUrl,
      (gltf) => {
        if (stopped) return; // component unmounted before load finished
        const anvil = gltf.scene;
        anvil.rotation.y = ANVIL_ROT_Y;

        // auto-fit: scale to a known height, center on x/z
        const box = new THREE.Box3().setFromObject(anvil);
        const size = new THREE.Vector3();
        box.getSize(size);
        if (size.y > 0) anvil.scale.setScalar(ANVIL_HEIGHT / size.y);

        box.setFromObject(anvil);
        const center = new THREE.Vector3();
        box.getCenter(center);
        anvil.position.x -= center.x;
        anvil.position.z -= center.z;
        anvil.position.y += -box.min.y; // base rests on the floor (y = 0)

        anvilObj = anvil;

        const startSolid = enteredRef.current ? 1 : 0;

        // collect meshes FIRST — we can't add the edge lines during traverse:
        // LineSegments2 extends Mesh (o.isMesh === true), so traversing into a
        // freshly-added line would re-process it and break the loader.
        const meshes = [];
        anvil.traverse((o) => {
          if (o.isMesh) meshes.push(o);
        });

        for (const o of meshes) {
          o.castShadow = true;
          o.receiveShadow = true;
          if (o.material) {
            o.material.envMapIntensity = 1;
            // let the solid surface fade in/out over the skeleton
            o.material.transparent = true;
            o.material.opacity = startSolid;
            meshMats.push(o.material);
          }
          // edge skeleton: only silhouette + sharp feature edges (>30°),
          // so the dense mesh reads as a clean technical wireframe.
          // LineSegments2 gives genuinely antialiased, pixel-width lines
          // (plain THREE.LineSegments can't be AA'd and shimmer).
          const edges = new THREE.EdgesGeometry(o.geometry, 30);
          const lineGeo = new LineSegmentsGeometry().fromEdgesGeometry(edges);
          const em = new LineMaterial({
            color: 0xDB124B,
            linewidth: 1.5, // in screen pixels
            transparent: true,
            opacity: 1 - startSolid,
            alphaToCoverage: true, // smooth, MSAA-friendly edges
          });
          em.resolution.set(mount.clientWidth, mount.clientHeight);
          // child of the mesh, so it inherits the same local transform
          const lineSeg = new LineSegments2(lineGeo, em);
          // instanced line geometry has no valid bounding sphere from
          // fromEdgesGeometry, so it would otherwise be frustum-culled away
          lineSeg.frustumCulled = false;
          o.add(lineSeg);
          edgeMats.push(em);
          edges.dispose();
        }

        rig.add(anvil);
      },
      undefined,
      (err) => console.error('Failed to load anvil.glb', err)
    );

    // ===== ORBIT / DRAG controls =====
    let rotY = -0.3;
    let rotX = 0.0;
    let targetRotY = -0.3;
    let autoRotate = true;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onDown = (e) => {
      if (!enteredRef.current) return; // not draggable during the intro
      dragging = true;
      autoRotate = false;
      mount.style.cursor = 'grabbing';
      const pt = e.touches ? e.touches[0] : e;
      lastX = pt.clientX;
      lastY = pt.clientY;
    };
    const onMove = (e) => {
      if (!dragging) return;
      const pt = e.touches ? e.touches[0] : e;
      const dx = pt.clientX - lastX;
      const dy = pt.clientY - lastY;
      targetRotY += dx * 0.008;
      rotX = Math.max(-0.6, Math.min(0.6, rotX + dy * 0.005));
      lastX = pt.clientX;
      lastY = pt.clientY;
    };
    const onUp = () => {
      dragging = false;
      mount.style.cursor = 'grab';
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        autoRotate = true;
      }, 2500);
    };
    mount.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    mount.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    // keep the renderer matched to the wrapper as it docks / resizes
    const resize = () => {
      const W = mount.clientWidth;
      const H = mount.clientHeight;
      if (!W || !H) return;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
      // LineMaterial needs the viewport size to compute pixel-accurate width
      for (const m of edgeMats) m.resolution.set(W, H);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);
    window.addEventListener('resize', resize);

    // ===== ANIMATE =====
    const camPos = INTRO_POS.clone();
    const camLook = INTRO_LOOK.clone();
    const clock = new THREE.Clock();
    const tick = () => {
      if (stopped) return;
      const dt = Math.min(clock.getDelta(), 0.05);

      // hold still during the intro; auto-rotate only once docked
      if (enteredRef.current && autoRotate && !dragging) {
        targetRotY += dt * 0.18;
      }
      rotY += (targetRotY - rotY) * 0.08;
      rig.rotation.y = rotY;
      rig.rotation.x = rotX * 0.4;

      // the floor only exists in the docked (post-intro) forge scene
      ground.visible = enteredRef.current;

      // dolly the camera between the intro and hero framings
      const tgtPos = enteredRef.current ? HERO_POS : INTRO_POS;
      const tgtLook = enteredRef.current ? HERO_LOOK : INTRO_LOOK;
      const a = 1 - Math.exp(-dt * 3);
      camPos.lerp(tgtPos, a);
      camLook.lerp(tgtLook, a);
      camera.position.copy(camPos);
      camera.lookAt(camLook);

      // crossfade skeleton (intro) <-> solid (docked).
      if (anvilObj) {
        // intro: edges gently "breathe"; docked: the wireframe fades fully out
        // so the landing shows only the clean solid anvil.
        const solid = enteredRef.current ? 1 : 0;
        const breathe = 0.82 + Math.sin(clock.elapsedTime * 1.6) * 0.18;
        const edgeTarget = enteredRef.current ? 0 : breathe;
        for (const m of meshMats) m.opacity += (solid - m.opacity) * a;
        for (const m of edgeMats) {
          m.opacity += (edgeTarget - m.opacity) * a;
          // stop drawing the wireframe entirely once it's effectively gone,
          // so no faint shimmering edge points remain on the docked model
          m.visible = m.opacity > 0.01;
        }
      }

      // ember light flicker
      const t = clock.elapsedTime;
      emberLight.intensity =
        3.5 + Math.sin(t * 7.2) * 0.7 + Math.sin(t * 13.1) * 0.4;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(tick);
    };
    tick();

    // ===== CLEANUP =====
    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      ro.disconnect();
      mount.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      mount.removeEventListener('touchstart', onDown);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      window.removeEventListener('resize', resize);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => {
            if (m.map) m.map.dispose();
            m.dispose();
          });
        }
      });
      floorAlpha.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div ref={mountRef} className="forge-canvas" />
  );
}

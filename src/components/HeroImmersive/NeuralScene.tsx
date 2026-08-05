/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck -- Cena Three.js portada com shaders e geometrias de atributos dinâmicos.
"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "motion/react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

import { HERO_SOLUTIONS } from "./heroImmersive.data";
import type {
  HeroPhase,
  HeroSolutionId,
  SolutionPortalPositions,
} from "./heroImmersive.types";
import styles from "./NeuralScene.module.css";

type NeuralSceneProps = {
  cameraProgress: MotionValue<number>;
  phase: HeroPhase;
  activePortalId?: HeroSolutionId | null;
  selectedPortalId?: HeroSolutionId | null;
  onPortalPositions?: (positions: SolutionPortalPositions) => void;
};

export function NeuralScene({
  cameraProgress,
  phase,
  activePortalId = null,
  selectedPortalId = null,
  onPortalPositions,
}: NeuralSceneProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(phase);
  const activePortalIdRef = useRef(activePortalId);
  const selectedPortalIdRef = useRef(selectedPortalId);
  const onPortalPositionsRef = useRef(onPortalPositions);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    activePortalIdRef.current = activePortalId;
  }, [activePortalId]);

  useEffect(() => {
    selectedPortalIdRef.current = selectedPortalId;
  }, [selectedPortalId]);

  useEffect(() => {
    onPortalPositionsRef.current = onPortalPositions;
  }, [onPortalPositions]);

  useEffect(() => {
        const rootElement = rootRef.current;
        if (!rootElement) return;

        const themeStyles = window.getComputedStyle(rootElement);
        const themeColor = (variableName, fallback) =>
            new THREE.Color(
                themeStyles.getPropertyValue(variableName).trim() || fallback,
            );
        const canvasBackgroundColor = themeColor(
            "--hero-canvas-background",
            "#ffffff",
        );
        const networkPalette = [
            themeColor("--hero-network-1", "#090b0e"),
            themeColor("--hero-network-2", "#2d3239"),
            themeColor("--hero-network-3", "#5f6771"),
            themeColor("--hero-network-4", "#9299a3"),
            themeColor("--hero-network-5", "#c3c8ce"),
        ];
        const starColor = themeColor("--hero-stars", "#515862");
        const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const config = {
            paused: false,
            activePaletteIndex: 0,
            currentFormation: 0,
            numFormations: 4,
            densityFactor: isCoarsePointer ? 0.7 : 1
        };
        const connectionSegmentCount = 14;

        const colorPalettes = Array.from({ length: 4 }, () =>
            networkPalette.map((color) => color.clone()),
        );

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(canvasBackgroundColor, 0.0015);

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1200);
        camera.position.set(0, 5, 22);

        const canvasElement = canvasRef.current;
        if (!canvasElement) return;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true, powerPreference: "high-performance" });
        } catch {
            rootRef.current?.setAttribute("data-webgl-fallback", "true");
            return;
        }
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, isCoarsePointer ? 1.25 : 1.75)
        );
        renderer.setClearColor(canvasBackgroundColor);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        function createStarfield() {
            const count = isCoarsePointer ? 2500 : 5000, pos = [];
            for (let i = 0; i < count; i++) {
                const r = THREE.MathUtils.randFloat(40, 120);
                const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
                const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
                pos.push(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                );
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
            const mat = new THREE.PointsMaterial({
                color: starColor,
                size: 0.15,
                sizeAttenuation: true,
                depthWrite: false,
                opacity: 0.34,
                transparent: true
            });
            return new THREE.Points(geo, mat);
        }
        const starField = createStarfield();
        scene.add(starField);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.5;
        controls.minDistance = 2.8;
        controls.maxDistance = 100;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.15;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableRotate = !isCoarsePointer;
        renderer.domElement.style.touchAction = "pan-y";

        let targetCameraProgress = THREE.MathUtils.clamp(cameraProgress.get(), 0, 1);
        let currentCameraProgress = targetCameraProgress;
        const stopCameraProgress = cameraProgress.on("change", (value) => {
            targetCameraProgress = THREE.MathUtils.clamp(value, 0, 1);
        });

        const initialCameraDistance = camera.position.distanceTo(controls.target);
        const cameraDirection = new THREE.Vector3();
        const desiredTarget = new THREE.Vector3();
        let pointerTargetX = 0;
        let pointerTargetY = 0;
        let pointerX = 0;
        let pointerY = 0;

        function handlePointerMove(event) {
            if (isCoarsePointer) return;
            const bounds = renderer.domElement.getBoundingClientRect();
            pointerTargetX = THREE.MathUtils.clamp(
                ((event.clientX - bounds.left) / bounds.width) * 2 - 1,
                -1,
                1,
            );
            pointerTargetY = THREE.MathUtils.clamp(
                ((event.clientY - bounds.top) / bounds.height) * 2 - 1,
                -1,
                1,
            );
        }

        function handlePointerLeave() {
            pointerTargetX = 0;
            pointerTargetY = 0;
        }

        if (!isCoarsePointer) {
            renderer.domElement.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });
            renderer.domElement.addEventListener("pointerleave", handlePointerLeave);
        }

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.18,
            0.24,
            1.01,
        );
        composer.addPass(bloomPass);

        const filmPass = new FilmPass(0.08, false);
        composer.addPass(filmPass);

        composer.addPass(new OutputPass());

        const pulseUniforms = {
            uTime: { value: 0.0 },
            uPulsePositions: { value: [new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3), new THREE.Vector3(1e3, 1e3, 1e3)] },
            uPulseTimes: { value: [-1e3, -1e3, -1e3] },
            uPulseColors: { value: [networkPalette[0].clone(), networkPalette[2].clone(), networkPalette[4].clone()] },
            uPulseSpeed: { value: 15.0 },
            uBaseNodeSize: { value: 0.5 },
            uMaxPointSize: { value: isCoarsePointer ? 44 : 70 },
            uActivePalette: { value: 0 },
            uLayerOpacity: { value: 0.0 },
            uGlobalDim: { value: 1.0 },
            uFocusedPortal: { value: -10.0 }
        };

        const noiseFunctions = `
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);
            vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
            vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
            vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m*=m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
        float fbm(vec3 p,float time){
            float value=0.0;float amplitude=0.5;float frequency=1.0;int octaves=3;
            for(int i=0;i<octaves;i++){
                value+=amplitude*snoise(p*frequency+time*0.2*frequency);
                amplitude*=0.5;frequency*=2.0;
            }
            return value;
        }`;

        const nodeShader = {
            vertexShader: `${noiseFunctions}
            attribute float nodeSize;attribute float nodeType;attribute vec3 nodeColor;attribute vec3 connectionIndices;attribute float distanceFromRoot;attribute float portalIndex;
            uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;uniform float uBaseNodeSize;uniform float uMaxPointSize;uniform float uFocusedPortal;
            varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;varying float vPortalIndex;varying float vPortalFocus;

            float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
                if (pulseTime < 0.0) return 0.0;
                float timeSinceClick = uTime - pulseTime;
                if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;

                float pulseRadius = timeSinceClick * uPulseSpeed;
                float distToClick = distance(worldPos, pulsePos);
                float pulseThickness = 2.0;
                float waveProximity = abs(distToClick - pulseRadius);

                return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
            }

            void main() {
                vNodeType = nodeType;
                vColor = nodeColor;
                vDistanceFromRoot = distanceFromRoot;
                vPortalIndex = portalIndex;
                vPortalFocus = portalIndex > -0.5
                    ? 1.0 - step(0.25, abs(portalIndex - uFocusedPortal))
                    : 0.0;

                vec3 worldPos = (modelMatrix * vec4(position, 1.0)).xyz;
                vPosition = worldPos;

                float totalPulseIntensity = 0.0;
                for (int i = 0; i < 3; i++) {
                    totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
                }
                vPulseIntensity = min(totalPulseIntensity, 1.0);

                float timeScale = 0.5 + 0.5 * sin(uTime * 0.8 + distanceFromRoot * 0.2);
                float baseSize = nodeSize * (0.8 + 0.2 * timeScale);
                float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.0);
                pulseSize *= 1.0 + vPortalFocus * 1.25;
                if (portalIndex > -0.5 && uFocusedPortal < -0.5) {
                    pulseSize *= 1.18;
                }

                vec3 modifiedPosition = position;
                if (nodeType > 0.5) {
                    float noise = fbm(position * 0.1, uTime * 0.1);
                    vec3 direction = length(position) > 0.0001
                        ? normalize(position)
                        : vec3(0.0, 1.0, 0.0);
                    modifiedPosition += direction * noise * 0.2;
                }

                vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
                float projectedSize = pulseSize * uBaseNodeSize * (800.0 / -mvPosition.z);
                gl_PointSize = clamp(projectedSize, 0.0, uMaxPointSize);
                gl_Position = projectionMatrix * mvPosition;
            }`,

            fragmentShader: `
            uniform float uTime;uniform vec3 uPulseColors[3];uniform int uActivePalette;uniform float uLayerOpacity;uniform float uGlobalDim;
            varying vec3 vColor;varying float vNodeType;varying vec3 vPosition;varying float vPulseIntensity;varying float vDistanceFromRoot;varying float vPortalIndex;varying float vPortalFocus;

            void main() {
                vec2 center = 2.0 * gl_PointCoord - 1.0;
                float dist = length(center);
                if (dist > 1.0) discard;

                float glowStrength = 1.0 - smoothstep(0.0, 1.0, dist);
                glowStrength = pow(glowStrength, 1.4);

                vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.5 + vDistanceFromRoot * 0.3));
                vec3 finalColor = baseColor;

                if (vPulseIntensity > 0.0) {
                    vec3 pulseColor = mix(vec3(0.04), uPulseColors[0], 0.78);
                    finalColor = mix(baseColor, pulseColor, vPulseIntensity);
                    finalColor *= (1.0 - vPulseIntensity * 0.18);
                }

                float alpha = glowStrength * (0.9 - 0.5 * dist);

                float camDistance = length(vPosition - cameraPosition);
                float distanceFade = smoothstep(80.0, 10.0, camDistance);

                if (vNodeType > 0.5) {
                    alpha *= 0.85;
                } else {
                    finalColor *= 0.88;
                }

                float portalGlow = step(-0.5, vPortalIndex);
                float portalDarkening = clamp(
                    portalGlow * 0.34 + vPortalFocus * 0.48,
                    0.0,
                    0.82
                );
                finalColor = mix(finalColor, vec3(0.025), portalDarkening);
                float focusVisibility = mix(uGlobalDim, 1.0, vPortalFocus);
                gl_FragColor = vec4(
                    finalColor,
                    alpha * distanceFade * uLayerOpacity * focusVisibility
                );
            }`
        };

        const connectionShader = {
            vertexShader: `${noiseFunctions}
            attribute vec3 startPoint;attribute vec3 endPoint;attribute float connectionStrength;attribute float pathIndex;attribute vec3 connectionColor;
            uniform float uTime;uniform vec3 uPulsePositions[3];uniform float uPulseTimes[3];uniform float uPulseSpeed;
            varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;

            float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
                if (pulseTime < 0.0) return 0.0;
                float timeSinceClick = uTime - pulseTime;
                if (timeSinceClick < 0.0 || timeSinceClick > 3.0) return 0.0;
                float pulseRadius = timeSinceClick * uPulseSpeed;
                float distToClick = distance(worldPos, pulsePos);
                float pulseThickness = 2.0;
                float waveProximity = abs(distToClick - pulseRadius);
                return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(3.0, 0.0, timeSinceClick);
            }

            void main() {
                float t = position.x;
                vPathPosition = t;

                vec3 midPoint = mix(startPoint, endPoint, 0.5);
                float pathOffset = sin(t * 3.14159) * 0.1;
                vec3 connectionDirection = endPoint - startPoint;
                vec3 perpendicular = vec3(1.0, 0.0, 0.0);
                if (length(connectionDirection) >= 0.0001) {
                    perpendicular = cross(normalize(connectionDirection), vec3(0.0, 1.0, 0.0));
                }
                if (length(perpendicular) < 0.0001) {
                    perpendicular = vec3(1.0, 0.0, 0.0);
                } else {
                    perpendicular = normalize(perpendicular);
                }
                midPoint += perpendicular * pathOffset;

                vec3 p0 = mix(startPoint, midPoint, t);
                vec3 p1 = mix(midPoint, endPoint, t);
                vec3 finalPos = mix(p0, p1, t);

                float noiseTime = uTime * 0.2;
                float noise = fbm(vec3(pathIndex * 0.1, t * 0.5, noiseTime), noiseTime);
                finalPos += perpendicular * noise * 0.1;

                vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;

                float totalPulseIntensity = 0.0;
                for (int i = 0; i < 3; i++) {
                    totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
                }
                vPulseIntensity = min(totalPulseIntensity, 1.0);

                vColor = connectionColor;
                vConnectionStrength = connectionStrength;

                gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
            }`,

            fragmentShader: `
            uniform float uTime;uniform vec3 uPulseColors[3];uniform float uLayerOpacity;uniform float uGlobalDim;
            varying vec3 vColor;varying float vConnectionStrength;varying float vPulseIntensity;varying float vPathPosition;

            void main() {
                vec3 baseColor = vColor * (0.7 + 0.3 * sin(uTime * 0.5 + vPathPosition * 10.0));

                float flowPattern = sin(vPathPosition * 20.0 - uTime * 3.0) * 0.5 + 0.5;
                float flowIntensity = 0.3 * flowPattern * vConnectionStrength;

                vec3 finalColor = baseColor;

                if (vPulseIntensity > 0.0) {
                    vec3 pulseColor = mix(vec3(0.04), uPulseColors[0], 0.78);
                    finalColor = mix(baseColor, pulseColor, vPulseIntensity);
                    flowIntensity += vPulseIntensity * 0.5;
                }

                finalColor *= (0.6 + flowIntensity + vConnectionStrength * 0.4);
                finalColor *= (1.0 - vPulseIntensity * 0.16);

                float alpha = 0.32 * vConnectionStrength + 0.08 * flowPattern;
                alpha = mix(alpha, min(1.0, alpha * 2.0), vPulseIntensity);

                gl_FragColor = vec4(finalColor, alpha * uLayerOpacity * uGlobalDim);
            }`
        };

        class Node {
            constructor(position, level = 0, type = 0) {
                this.position = position;
                this.connections = [];
                this.level = level;
                this.type = type;
                this.size = type === 0 ? THREE.MathUtils.randFloat(0.7, 1.2) : THREE.MathUtils.randFloat(0.4, 0.9);
                this.distanceFromRoot = 0;
            }

            addConnection(node, strength = 1.0) {
                if (!this.isConnectedTo(node)) {
                    this.connections.push({ node, strength });
                    node.connections.push({ node: this, strength });
                }
            }

            isConnectedTo(node) {
                return this.connections.some(conn => conn.node === node);
            }
        }

        function generateNeuralNetwork(formationIndex, densityFactor = 1.0) {
            let nodes = [];
            let rootNode;

            function generateQuantumCortex() {
                rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.5; nodes.push(rootNode);
                const primaryAxes = 6, nodesPerAxis = 8, axisLength = 20;
                const axisEndpoints = [];

                for (let a = 0; a < primaryAxes; a++) {
                    const phi = Math.acos(-1 + (2 * a) / primaryAxes);
                    const theta = Math.PI * (1 + Math.sqrt(5)) * a;
                    const dirVec = new THREE.Vector3(
                        Math.sin(phi) * Math.cos(theta),
                        Math.sin(phi) * Math.sin(theta),
                        Math.cos(phi)
                    );

                    let prevNode = rootNode;
                    for (let i = 1; i <= nodesPerAxis; i++) {
                        const t = i / nodesPerAxis;
                        const distance = axisLength * Math.pow(t, 0.8);
                        const pos = new THREE.Vector3().copy(dirVec).multiplyScalar(distance);
                        const nodeType = (i === nodesPerAxis) ? 1 : 0;
                        const newNode = new Node(pos, i, nodeType);
                        newNode.distanceFromRoot = distance;
                        nodes.push(newNode);
                        prevNode.addConnection(newNode, 1.0 - (t * 0.3));
                        prevNode = newNode;
                        if (i === nodesPerAxis) axisEndpoints.push(newNode);
                    }
                }

                const ringDistances = [5, 10, 15];
                const ringNodes = [];
                for (const ringDist of ringDistances) {
                    const nodesInRing = Math.floor(ringDist * 3 * densityFactor);
                    const ringLayer = [];
                    for (let i = 0; i < nodesInRing; i++) {
                        const t = i / nodesInRing;
                        const ringPhi = Math.acos(2 * Math.random() - 1);
                        const ringTheta = 2 * Math.PI * t;
                        const pos = new THREE.Vector3(
                            ringDist * Math.sin(ringPhi) * Math.cos(ringTheta),
                            ringDist * Math.sin(ringPhi) * Math.sin(ringTheta),
                            ringDist * Math.cos(ringPhi)
                        );
                        const level = Math.ceil(ringDist / 5);
                        const nodeType = Math.random() < 0.4 ? 1 : 0;
                        const newNode = new Node(pos, level, nodeType);
                        newNode.distanceFromRoot = ringDist;
                        nodes.push(newNode);
                        ringLayer.push(newNode);
                    }
                    ringNodes.push(ringLayer);

                    for (let i = 0; i < ringLayer.length; i++) {
                        const node = ringLayer[i];
                        const nextNode = ringLayer[(i + 1) % ringLayer.length];
                        node.addConnection(nextNode, 0.7);
                        if (i % 4 === 0 && ringLayer.length > 5) {
                            const jumpIdx = (i + Math.floor(ringLayer.length / 2)) % ringLayer.length;
                            node.addConnection(ringLayer[jumpIdx], 0.4);
                        }
                    }
                }

                for (const ring of ringNodes) {
                    for (const node of ring) {
                        let closestAxisNode = null; let minDist = Infinity;
                        for (const n of nodes) {
                            if (n === rootNode || n === node) continue;
                            if (n.level === 0 || n.type !== 0) continue;
                            const dist = node.position.distanceTo(n.position);
                            if (dist < minDist) { minDist = dist; closestAxisNode = n; }
                        }
                        if (closestAxisNode && minDist < 8) {
                            const strength = 0.5 + (1 - minDist / 8) * 0.5;
                            node.addConnection(closestAxisNode, strength);
                        }
                    }
                }

                for (let r = 0; r < ringNodes.length - 1; r++) {
                    const innerRing = ringNodes[r];
                    const outerRing = ringNodes[r + 1];
                    const connectionsCount = Math.floor(innerRing.length * 0.5);
                    for (let i = 0; i < connectionsCount; i++) {
                        const innerNode = innerRing[Math.floor(Math.random() * innerRing.length)];
                        const outerNode = outerRing[Math.floor(Math.random() * outerRing.length)];
                        if (!innerNode.isConnectedTo(outerNode)) {
                            innerNode.addConnection(outerNode, 0.6);
                        }
                    }
                }

                 for (let i = 0; i < axisEndpoints.length; i++) {
                    const startNode = axisEndpoints[i];
                    const endNode = axisEndpoints[(i + 2) % axisEndpoints.length];
                    const numIntermediates = 3;
                    let prevNode = startNode;
                    for (let j = 1; j <= numIntermediates; j++) {
                        const t = j / (numIntermediates + 1);
                        const pos = new THREE.Vector3().lerpVectors(startNode.position, endNode.position, t);
                        pos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(3),
                            THREE.MathUtils.randFloatSpread(3),
                            THREE.MathUtils.randFloatSpread(3)
                        ));
                        const newNode = new Node(pos, startNode.level, 0);
                        newNode.distanceFromRoot = rootNode.position.distanceTo(pos);
                        nodes.push(newNode);
                        prevNode.addConnection(newNode, 0.5);
                        prevNode = newNode;
                    }
                    prevNode.addConnection(endNode, 0.5);
                }
            }

            function generateHyperdimensionalMesh() {
                rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.5; nodes.push(rootNode);
                const dimensions = 4;
                const nodesPerDimension = Math.floor(40 * densityFactor);
                const maxRadius = 20;

                const dimensionVectors = [
                    new THREE.Vector3(1, 1, 1).normalize(),
                    new THREE.Vector3(-1, 1, -1).normalize(),
                    new THREE.Vector3(1, -1, -1).normalize(),
                    new THREE.Vector3(-1, -1, 1).normalize()
                ];

                const dimensionNodes = [];

                for (let d = 0; d < dimensions; d++) {
                    const dimNodes = [];
                    const dimVec = dimensionVectors[d];
                    for (let i = 0; i < nodesPerDimension; i++) {
                        const distance = maxRadius * Math.pow(Math.random(), 0.7);
                        const randomVec = new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(1),
                            THREE.MathUtils.randFloatSpread(1),
                            THREE.MathUtils.randFloatSpread(1)
                        ).normalize();
                        const biasedVec = new THREE.Vector3().addVectors(
                            dimVec.clone().multiplyScalar(0.6 + Math.random() * 0.4),
                            randomVec.clone().multiplyScalar(0.3)
                        ).normalize();

                        const pos = biasedVec.clone().multiplyScalar(distance);
                        const isLeaf = Math.random() < 0.4 || distance > maxRadius * 0.8;
                        const level = Math.floor(distance / (maxRadius / 4)) + 1;
                        const newNode = new Node(pos, level, isLeaf ? 1 : 0);
                        newNode.distanceFromRoot = distance;
                        newNode.dimension = d;
                        nodes.push(newNode);
                        dimNodes.push(newNode);
                        if (distance < maxRadius * 0.3) rootNode.addConnection(newNode, 0.7);
                    }
                    dimensionNodes.push(dimNodes);
                }

                for (let d = 0; d < dimensions; d++) {
                    const dimNodes = dimensionNodes[d];
                    dimNodes.sort((a, b) => a.distanceFromRoot - b.distanceFromRoot);

                    const layers = 4;
                    const nodesPerLayer = Math.ceil(dimNodes.length / layers);
                    for (let layer = 0; layer < layers; layer++) {
                        const startIdx = layer * nodesPerLayer;
                        const endIdx = Math.min(startIdx + nodesPerLayer, dimNodes.length);
                        for (let i = startIdx; i < endIdx; i++) {
                            const node = dimNodes[i];
                            const connectionsCount = 1 + Math.floor(Math.random() * 3);
                            const nearbyNodes = dimNodes.slice(startIdx, endIdx).filter(n => n !== node)
                                .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position));
                            for (let j = 0; j < Math.min(connectionsCount, nearbyNodes.length); j++) {
                                if (!node.isConnectedTo(nearbyNodes[j])) {
                                    node.addConnection(nearbyNodes[j], 0.4 + Math.random() * 0.4);
                                }
                            }
                            if (layer > 0) {
                                const prevLayer = dimNodes.slice((layer - 1) * nodesPerLayer, layer * nodesPerLayer)
                                    .sort((a, b) => node.position.distanceTo(a.position) - node.position.distanceTo(b.position));
                                if (prevLayer.length > 0 && !node.isConnectedTo(prevLayer[0])) {
                                    node.addConnection(prevLayer[0], 0.8);
                                }
                            }
                        }
                    }
                }

                 for (let d1 = 0; d1 < dimensions; d1++) {
                    for (let d2 = d1 + 1; d2 < dimensions; d2++) {
                        const connectionsCount = Math.floor(5 * densityFactor);
                        for (let i = 0; i < connectionsCount; i++) {
                            const n1 = dimensionNodes[d1][Math.floor(Math.random() * dimensionNodes[d1].length)];
                            const n2 = dimensionNodes[d2][Math.floor(Math.random() * dimensionNodes[d2].length)];
                            if (!n1.isConnectedTo(n2)) {
                                const midPos = new THREE.Vector3().lerpVectors(n1.position, n2.position, 0.5);
                                midPos.add(new THREE.Vector3(
                                    THREE.MathUtils.randFloatSpread(2),
                                    THREE.MathUtils.randFloatSpread(2),
                                    THREE.MathUtils.randFloatSpread(2)
                                ));
                                const interNode = new Node(midPos, Math.max(n1.level, n2.level), 0);
                                interNode.distanceFromRoot = rootNode.position.distanceTo(midPos);
                                nodes.push(interNode);
                                n1.addConnection(interNode, 0.5);
                                interNode.addConnection(n2, 0.5);
                            }
                        }
                    }
                }

                const jumpConnections = Math.floor(10 * densityFactor);
                for (let i = 0; i < jumpConnections; i++) {
                    const startDim = Math.floor(Math.random() * dimensions);
                    const endDim = (startDim + 2) % dimensions;
                    const startNode = dimensionNodes[startDim][Math.floor(Math.random() * dimensionNodes[startDim].length)];
                    const endNode = dimensionNodes[endDim][Math.floor(Math.random() * dimensionNodes[endDim].length)];
                    if (!startNode.isConnectedTo(endNode)) {
                        const numPoints = 3 + Math.floor(Math.random() * 3);
                        let prevNode = startNode;
                        for (let j = 1; j < numPoints; j++) {
                            const t = j / numPoints;
                            const pos = new THREE.Vector3().lerpVectors(startNode.position, endNode.position, t);
                            pos.add(new THREE.Vector3(
                                THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI),
                                THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI),
                                THREE.MathUtils.randFloatSpread(8) * Math.sin(t * Math.PI)
                            ));
                            const jumpNode = new Node(pos, Math.max(startNode.level, endNode.level), 0);
                            jumpNode.distanceFromRoot = rootNode.position.distanceTo(pos);
                            nodes.push(jumpNode);
                            prevNode.addConnection(jumpNode, 0.4);
                            prevNode = jumpNode;
                        }
                        prevNode.addConnection(endNode, 0.4);
                    }
                }
            }

            function generateNeuralVortex() {
                rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.8; nodes.push(rootNode);
                const numSpirals = 6;
                const totalHeight = 30;
                const maxRadius = 16;
                const nodesPerSpiral = Math.floor(30 * densityFactor);
                const spiralNodes = [];

                for (let s = 0; s < numSpirals; s++) {
                    const spiralPhase = (s / numSpirals) * Math.PI * 2;
                    const spiralArray = [];
                    for (let i = 0; i < nodesPerSpiral; i++) {
                        const t = i / (nodesPerSpiral - 1);

                        const height = (t - 0.5) * totalHeight;
                        const radiusCurve = Math.sin(t * Math.PI);
                        const radius = maxRadius * radiusCurve;

                        const revolutions = 2.5;
                        const angle = spiralPhase + t * Math.PI * 2 * revolutions;

                        const pos = new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle));
                        pos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(1.5),
                            THREE.MathUtils.randFloatSpread(1.5),
                            THREE.MathUtils.randFloatSpread(1.5)
                        ));

                        const level = Math.floor(t * 5) + 1;
                        const isLeaf = Math.random() < 0.3 || i > nodesPerSpiral - 3;
                        const newNode = new Node(pos, level, isLeaf ? 1 : 0);
                        newNode.distanceFromRoot = Math.sqrt(radius * radius + height * height);
                        newNode.spiralIndex = s;
                        newNode.spiralPosition = t;
                        nodes.push(newNode);
                        spiralArray.push(newNode);
                    }
                    spiralNodes.push(spiralArray);
                }

                for (const spiral of spiralNodes) {
                    rootNode.addConnection(spiral[0], 1.0);
                    for (let i = 0; i < spiral.length - 1; i++) {
                        spiral[i].addConnection(spiral[i + 1], 0.9);
                    }
                }

                for (let s = 0; s < numSpirals; s++) {
                    const currentSpiral = spiralNodes[s];
                    const nextSpiral = spiralNodes[(s + 1) % numSpirals];
                    const connectionPoints = 5;
                    for (let c = 0; c < connectionPoints; c++) {
                        const t = c / (connectionPoints - 1);
                        const idx1 = Math.floor(t * (currentSpiral.length - 1));
                        const idx2 = Math.floor(t * (nextSpiral.length - 1));
                        currentSpiral[idx1].addConnection(nextSpiral[idx2], 0.7);
                    }
                }

                for (let s = 0; s < numSpirals; s++) {
                    const currentSpiral = spiralNodes[s];
                    const jumpSpiral = spiralNodes[(s + 2) % numSpirals];
                    const connections = 3;
                    for (let c = 0; c < connections; c++) {
                        const t1 = (c + 0.5) / connections;
                        const t2 = (c + 1.0) / connections;
                        const idx1 = Math.floor(t1 * (currentSpiral.length - 1));
                        const idx2 = Math.floor(t2 * (jumpSpiral.length - 1));
                        const start = currentSpiral[idx1];
                        const end = jumpSpiral[idx2];

                        const midPoint = new THREE.Vector3().lerpVectors(start.position, end.position, 0.5).multiplyScalar(0.7);
                        const bridgeNode = new Node(midPoint, Math.max(start.level, end.level), 0);
                        bridgeNode.distanceFromRoot = rootNode.position.distanceTo(midPoint);
                        nodes.push(bridgeNode);
                        start.addConnection(bridgeNode, 0.6);
                        bridgeNode.addConnection(end, 0.6);
                    }
                }

                const ringLevels = 5;
                for (let r = 0; r < ringLevels; r++) {
                    const height = (r / (ringLevels - 1) - 0.5) * totalHeight * 0.7;
                    const ringNodes = nodes.filter(n => n !== rootNode && Math.abs(n.position.y - height) < 2);
                    ringNodes.sort((a, b) => Math.atan2(a.position.z, a.position.x) - Math.atan2(b.position.z, b.position.x));
                    if (ringNodes.length > 3) {
                        for (let i = 0; i < ringNodes.length; i++) {
                            ringNodes[i].addConnection(ringNodes[(i + 1) % ringNodes.length], 0.5);
                        }
                    }
                }

                const radialConnections = Math.floor(10 * densityFactor);
                const candidates = nodes.filter(n => n !== rootNode && n.position.length() > 5)
                                        .sort(() => Math.random() - 0.5)
                                        .slice(0, radialConnections);
                for (const node of candidates) {
                    const numSegments = 1 + Math.floor(Math.random() * 2);
                    let prevNode = node;
                    for (let i = 1; i <= numSegments; i++) {
                        const t = i / (numSegments + 1);
                        const segPos = node.position.clone().multiplyScalar(1 - t);
                        segPos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(2),
                            THREE.MathUtils.randFloatSpread(2),
                            THREE.MathUtils.randFloatSpread(2)
                        ));
                        const newNode = new Node(segPos, Math.floor(node.level * (1 - t)), 0);
                        newNode.distanceFromRoot = rootNode.position.distanceTo(segPos);
                        nodes.push(newNode);
                        prevNode.addConnection(newNode, 0.7);
                        prevNode = newNode;
                    }
                    prevNode.addConnection(rootNode, 0.8);
                }
            }

            function generateSynapticCloud() {
                rootNode = new Node(new THREE.Vector3(0, 0, 0), 0, 0); rootNode.size = 1.5; nodes.push(rootNode);
                const numClusters = 6;
                const maxDist = 18;
                const clusterNodes = [];

                for (let c = 0; c < numClusters; c++) {
                    const phi = Math.acos(2 * Math.random() - 1);
                    const theta = 2 * Math.PI * Math.random();
                    const distance = maxDist * (0.3 + 0.7 * Math.random());
                    const pos = new THREE.Vector3(
                        distance * Math.sin(phi) * Math.cos(theta),
                        distance * Math.sin(phi) * Math.sin(theta),
                        distance * Math.cos(phi)
                    );
                    const clusterNode = new Node(pos, 1, 0);
                    clusterNode.size = 1.2;
                    clusterNode.distanceFromRoot = distance;
                    nodes.push(clusterNode);
                    clusterNodes.push(clusterNode);
                    rootNode.addConnection(clusterNode, 0.9);
                }

                for (let i = 0; i < clusterNodes.length; i++) {
                    for (let j = i + 1; j < clusterNodes.length; j++) {
                        const dist = clusterNodes[i].position.distanceTo(clusterNodes[j].position);
                        const probability = 1.0 - (dist / (maxDist * 2));
                        if (Math.random() < probability) {
                            const strength = 0.5 + 0.5 * (1 - dist / (maxDist * 2));
                            clusterNodes[i].addConnection(clusterNodes[j], strength);
                        }
                    }
                }

                for (const cluster of clusterNodes) {
                    const clusterSize = Math.floor(20 * densityFactor);
                    const cloudRadius = 7 + Math.random() * 3;
                    for (let i = 0; i < clusterSize; i++) {
                        const radius = cloudRadius * Math.pow(Math.random(), 0.5);
                        const dir = new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(2),
                            THREE.MathUtils.randFloatSpread(2),
                            THREE.MathUtils.randFloatSpread(2)
                        ).normalize();
                        const pos = new THREE.Vector3().copy(cluster.position).add(dir.multiplyScalar(radius));

                        const distanceFromCluster = radius;
                        const distanceFromRoot = rootNode.position.distanceTo(pos);
                        const level = 2 + Math.floor(distanceFromCluster / 3);
                        const isLeaf = Math.random() < 0.5;
                        const newNode = new Node(pos, level, isLeaf ? 1 : 0);
                        newNode.distanceFromRoot = distanceFromRoot;
                        newNode.clusterRef = cluster;
                        nodes.push(newNode);

                        const strength = 0.7 * (1 - distanceFromCluster / cloudRadius);
                        cluster.addConnection(newNode, strength);

                        const nearbyNodes = nodes.filter(n =>
                            n !== newNode && n !== cluster && n.clusterRef === cluster &&
                            n.position.distanceTo(pos) < cloudRadius * 0.4
                        );
                        const connectionsCount = Math.floor(Math.random() * 3);
                        nearbyNodes.sort((a, b) => pos.distanceTo(a.position) - pos.distanceTo(b.position));
                        for (let j = 0; j < Math.min(connectionsCount, nearbyNodes.length); j++) {
                            const dist = pos.distanceTo(nearbyNodes[j].position);
                            const connStrength = 0.4 * (1 - dist / (cloudRadius * 0.4));
                            newNode.addConnection(nearbyNodes[j], connStrength);
                        }
                    }
                }

                 const interClusterCount = Math.floor(15 * densityFactor);
                for (let i = 0; i < interClusterCount; i++) {
                    const cluster1 = clusterNodes[Math.floor(Math.random() * clusterNodes.length)];
                    let cluster2;
                    do { cluster2 = clusterNodes[Math.floor(Math.random() * clusterNodes.length)]; } while (cluster2 === cluster1);

                    const bridgePos = new THREE.Vector3().lerpVectors(cluster1.position, cluster2.position, 0.3 + Math.random() * 0.4);
                    bridgePos.add(new THREE.Vector3(
                        THREE.MathUtils.randFloatSpread(5),
                        THREE.MathUtils.randFloatSpread(5),
                        THREE.MathUtils.randFloatSpread(5)
                    ));
                    const bridgeNode = new Node(bridgePos, 2, 0);
                    bridgeNode.distanceFromRoot = rootNode.position.distanceTo(bridgePos);
                    nodes.push(bridgeNode);

                    cluster1.addConnection(bridgeNode, 0.5);
                    cluster2.addConnection(bridgeNode, 0.5);

                    const nearbyNodes = nodes.filter(n => n !== bridgeNode && n !== cluster1 && n !== cluster2 && n.position.distanceTo(bridgePos) < 8);
                    if (nearbyNodes.length > 0) {
                        const target = nearbyNodes[Math.floor(Math.random() * nearbyNodes.length)];
                        bridgeNode.addConnection(target, 0.4);
                    }
                }

                 const longRangeCount = Math.floor(10 * densityFactor);
                const outerNodes = nodes.filter(n => n.distanceFromRoot > maxDist * 0.6)
                                        .sort(() => Math.random() - 0.5)
                                        .slice(0, longRangeCount);
                for (const outerNode of outerNodes) {
                    const numSegments = 2 + Math.floor(Math.random() * 2);
                    let prevNode = outerNode;
                    for (let i = 1; i <= numSegments; i++) {
                        const t = i / (numSegments + 1);
                        const segPos = outerNode.position.clone().multiplyScalar(1 - t * 0.8);
                        segPos.add(new THREE.Vector3(
                            THREE.MathUtils.randFloatSpread(4),
                            THREE.MathUtils.randFloatSpread(4),
                            THREE.MathUtils.randFloatSpread(4)
                        ));
                        const newNode = new Node(segPos, outerNode.level, 0);
                        newNode.distanceFromRoot = rootNode.position.distanceTo(segPos);
                        nodes.push(newNode);
                        prevNode.addConnection(newNode, 0.6);
                        prevNode = newNode;
                    }
                    const innerNodes = nodes.filter(n => n.distanceFromRoot < maxDist * 0.4 && n !== rootNode);
                    if (innerNodes.length > 0) {
                        const targetNode = innerNodes[Math.floor(Math.random() * innerNodes.length)];
                        prevNode.addConnection(targetNode, 0.5);
                    }
                }
            }

            switch (formationIndex % 4) {
                case 0: generateQuantumCortex(); break;
                case 1: generateHyperdimensionalMesh(); break;
                case 2: generateNeuralVortex(); break;
                case 3: generateSynapticCloud(); break;
            }

             if (densityFactor < 1.0) {
                nodes = nodes.filter((node, index) => {
                    if (node === rootNode) return true;
                    const hash = (index * 31 + Math.floor(densityFactor * 100)) % 100;
                    return hash < (densityFactor * 100);
                });

                nodes.forEach(node => {
                    node.connections = node.connections.filter(conn => nodes.includes(conn.node));
                });
            }

            return { nodes, rootNode };
        }

        let neuralNetwork = null, nodesMesh = null, connectionsMesh = null;
        let portalNodeIndices = new Map();

        function choosePortalNodes() {
            portalNodeIndices = new Map();
            if (!neuralNetwork?.nodes?.length) return;

            camera.updateMatrixWorld();
            const usedNodeIndices = new Set();
            const projected = new THREE.Vector3();
            const mobileLayout = window.innerWidth <= 760 || isCoarsePointer;

            HERO_SOLUTIONS.forEach((solution) => {
                if (solution.featured) {
                    portalNodeIndices.set(solution.id, 0);
                    usedNodeIndices.add(0);
                    return;
                }

                const fallback = mobileLayout
                    ? solution.fallback.mobile
                    : solution.fallback.desktop;
                const targetX = fallback.x / 50 - 1;
                const targetY = 1 - fallback.y / 50;
                let bestIndex = -1;
                let bestScore = Number.POSITIVE_INFINITY;

                neuralNetwork.nodes.forEach((node, nodeIndex) => {
                    if (usedNodeIndices.has(nodeIndex) || nodeIndex === 0) return;

                    projected.copy(node.position).project(camera);
                    if (
                        projected.z < -1 ||
                        projected.z > 1 ||
                        Math.abs(projected.x) > 1.25 ||
                        Math.abs(projected.y) > 1.25
                    ) {
                        return;
                    }

                    const screenDistance =
                        Math.pow(projected.x - targetX, 2) +
                        Math.pow(projected.y - targetY, 2);
                    const centerPenalty =
                        Math.max(0, 0.2 - Math.hypot(projected.x, projected.y)) *
                        0.8;
                    const depthPenalty = Math.abs(projected.z) * 0.035;
                    const score = screenDistance + centerPenalty + depthPenalty;

                    if (score < bestScore) {
                        bestScore = score;
                        bestIndex = nodeIndex;
                    }
                });

                if (bestIndex < 0) {
                    bestIndex =
                        solution.nodeIndex % Math.max(neuralNetwork.nodes.length, 1);
                }

                portalNodeIndices.set(solution.id, bestIndex);
                usedNodeIndices.add(bestIndex);
            });
        }

        function createNetworkVisualization(formationIndex, densityFactor = 1.0) {
            if (nodesMesh) {
                scene.remove(nodesMesh);
                nodesMesh.geometry.dispose();
                nodesMesh.material.dispose();
                nodesMesh = null;
            }
            if (connectionsMesh) {
                scene.remove(connectionsMesh);
                connectionsMesh.geometry.dispose();
                connectionsMesh.material.dispose();
                connectionsMesh = null;
            }

            neuralNetwork = generateNeuralNetwork(formationIndex, densityFactor);
            if (!neuralNetwork || neuralNetwork.nodes.length === 0) {
                return;
            }

            choosePortalNodes();

            const nodesGeometry = new THREE.BufferGeometry();
            const nodePositions = [], nodeTypes = [], nodeSizes = [], nodeColors = [], connectionIndices = [], distancesFromRoot = [], portalIndices = [];
            const portalIndexByNode = new Map(
                HERO_SOLUTIONS.map((solution, solutionIndex) => [
                    portalNodeIndices.get(solution.id),
                    solutionIndex,
                ]),
            );

            neuralNetwork.nodes.forEach((node, nodeIndex) => {
                nodePositions.push(node.position.x, node.position.y, node.position.z);
                nodeTypes.push(node.type);
                nodeSizes.push(node.size);
                distancesFromRoot.push(node.distanceFromRoot);
                portalIndices.push(portalIndexByNode.get(nodeIndex) ?? -1);

                const indices = node.connections.slice(0, 3).map(conn => neuralNetwork.nodes.indexOf(conn.node));
                while (indices.length < 3) indices.push(-1);
                connectionIndices.push(...indices);

                const palette = colorPalettes[config.activePaletteIndex];
                const colorIndex = Math.min(node.level, palette.length - 1);
                const baseColor = palette[colorIndex % palette.length].clone();
                baseColor.offsetHSL(
                    0,
                    0,
                    THREE.MathUtils.randFloatSpread(0.08)
                );
                nodeColors.push(baseColor.r, baseColor.g, baseColor.b);
            });

            nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
            nodesGeometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeTypes, 1));
            nodesGeometry.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeSizes, 1));
            nodesGeometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeColors, 3));
            nodesGeometry.setAttribute('connectionIndices', new THREE.Float32BufferAttribute(connectionIndices, 3));
            nodesGeometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(distancesFromRoot, 1));
            nodesGeometry.setAttribute('portalIndex', new THREE.Float32BufferAttribute(portalIndices, 1));

            const nodesMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                vertexShader: nodeShader.vertexShader,
                fragmentShader: nodeShader.fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending
            });

            nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
            scene.add(nodesMesh);

            const connectionsGeometry = new THREE.BufferGeometry();
            const connectionColors = [], connectionStrengths = [], connectionPositions = [], startPoints = [], endPoints = [], pathIndices = [];
            const processedConnections = new Set();
            let pathIndex = 0;

            neuralNetwork.nodes.forEach((node, nodeIndex) => {
                node.connections.forEach(connection => {
                    const connectedNode = connection.node;
                    const connectedIndex = neuralNetwork.nodes.indexOf(connectedNode);
                    if (connectedIndex === -1) return;

                    const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join('-');
                    if (!processedConnections.has(key)) {
                        processedConnections.add(key);

                        const startPoint = node.position;
                        const endPoint = connectedNode.position;
                        for (let i = 0; i < connectionSegmentCount; i++) {
                            const segmentPoints = [
                                i / connectionSegmentCount,
                                (i + 1) / connectionSegmentCount,
                            ];

                            segmentPoints.forEach((t) => {
                                connectionPositions.push(t, 0, 0);
                                startPoints.push(startPoint.x, startPoint.y, startPoint.z);
                                endPoints.push(endPoint.x, endPoint.y, endPoint.z);
                                pathIndices.push(pathIndex);
                                connectionStrengths.push(connection.strength);

                                const palette = colorPalettes[config.activePaletteIndex];
                                const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
                                const baseColor = palette[avgLevel % palette.length].clone();
                                baseColor.offsetHSL(
                                    0,
                                    0,
                                    THREE.MathUtils.randFloatSpread(0.08)
                                );
                                connectionColors.push(baseColor.r, baseColor.g, baseColor.b);
                            });
                        }
                        pathIndex++;
                    }
                });
            });

            connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
            connectionsGeometry.setAttribute('startPoint', new THREE.Float32BufferAttribute(startPoints, 3));
            connectionsGeometry.setAttribute('endPoint', new THREE.Float32BufferAttribute(endPoints, 3));
            connectionsGeometry.setAttribute('connectionStrength', new THREE.Float32BufferAttribute(connectionStrengths, 1));
            connectionsGeometry.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connectionColors, 3));
            connectionsGeometry.setAttribute('pathIndex', new THREE.Float32BufferAttribute(pathIndices, 1));

            const connectionsMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                vertexShader: connectionShader.vertexShader,
                fragmentShader: connectionShader.fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.NormalBlending
            });

            connectionsMesh = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
            scene.add(connectionsMesh);

            const palette = colorPalettes[config.activePaletteIndex];
            connectionsMaterial.uniforms.uPulseColors.value[0].copy(palette[0]);
            connectionsMaterial.uniforms.uPulseColors.value[1].copy(palette[1]);
            connectionsMaterial.uniforms.uPulseColors.value[2].copy(palette[2]);
            nodesMaterial.uniforms.uPulseColors.value[0].copy(palette[0]);
            nodesMaterial.uniforms.uPulseColors.value[1].copy(palette[1]);
            nodesMaterial.uniforms.uPulseColors.value[2].copy(palette[2]);
            nodesMaterial.uniforms.uActivePalette.value = config.activePaletteIndex;
        }

        function updateTheme(paletteIndex) {
            config.activePaletteIndex = paletteIndex;
            if (!nodesMesh || !connectionsMesh) return;

            const palette = colorPalettes[paletteIndex];

            const nodeColorsAttr = nodesMesh.geometry.attributes.nodeColor;
            for (let i = 0; i < nodeColorsAttr.count; i++) {
                const node = neuralNetwork.nodes[i];
                if (!node) continue;

                const colorIndex = Math.min(node.level, palette.length - 1);
                const baseColor = palette[colorIndex % palette.length].clone();
                baseColor.offsetHSL(
                    0,
                    0,
                    THREE.MathUtils.randFloatSpread(0.08)
                );
                nodeColorsAttr.setXYZ(i, baseColor.r, baseColor.g, baseColor.b);
            }
            nodeColorsAttr.needsUpdate = true;

            const connectionColors = [];
            const processedConnections = new Set();
            neuralNetwork.nodes.forEach((node, nodeIndex) => {
                 node.connections.forEach(connection => {
                    const connectedNode = connection.node;
                    const connectedIndex = neuralNetwork.nodes.indexOf(connectedNode);
                    if (connectedIndex === -1) return;

                    const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join('-');
                    if (!processedConnections.has(key)) {
                        processedConnections.add(key);
                        for (let i = 0; i < connectionSegmentCount * 2; i++) {
                             const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
                             const baseColor = palette[avgLevel % palette.length].clone();
                             baseColor.offsetHSL(
                                 0,
                                 0,
                                 THREE.MathUtils.randFloatSpread(0.08)
                             );
                             connectionColors.push(baseColor.r, baseColor.g, baseColor.b);
                        }
                    }
                 });
            });
            connectionsMesh.geometry.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connectionColors, 3));
            connectionsMesh.geometry.attributes.connectionColor.needsUpdate = true;

            nodesMesh.material.uniforms.uPulseColors.value.forEach((c, i) => c.copy(palette[i % palette.length]));
            connectionsMesh.material.uniforms.uPulseColors.value.forEach((c, i) => c.copy(palette[i % palette.length]));
            nodesMesh.material.uniforms.uActivePalette.value = paletteIndex;
        }

        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const interactionPoint = new THREE.Vector3();
        const portalWorldPosition = new THREE.Vector3();
        const portalProjectedPosition = new THREE.Vector3();
        let lastPulseIndex = 0;

        function getPortalWorldPosition(portalId, target) {
            const nodeIndex = portalNodeIndices.get(portalId);
            const node = neuralNetwork?.nodes?.[nodeIndex];
            if (!node || !nodesMesh) return null;

            target.copy(node.position);
            nodesMesh.localToWorld(target);
            return target;
        }

        function emitPulseAt(worldPosition, colorIndex = 0) {
            if (!nodesMesh || !connectionsMesh) return;

            const time = clock.getElapsedTime();
            lastPulseIndex = (lastPulseIndex + 1) % 3;

            nodesMesh.material.uniforms.uPulsePositions.value[lastPulseIndex].copy(worldPosition);
            nodesMesh.material.uniforms.uPulseTimes.value[lastPulseIndex] = time;
            connectionsMesh.material.uniforms.uPulsePositions.value[lastPulseIndex].copy(worldPosition);
            connectionsMesh.material.uniforms.uPulseTimes.value[lastPulseIndex] = time;

            const palette = colorPalettes[config.activePaletteIndex];
            const pulseColor = palette[colorIndex % palette.length];
            nodesMesh.material.uniforms.uPulseColors.value[lastPulseIndex].copy(pulseColor);
            connectionsMesh.material.uniforms.uPulseColors.value[lastPulseIndex].copy(pulseColor);
        }

        function triggerPulse(clientX, clientY) {
            const canvasBounds = renderer.domElement.getBoundingClientRect();
            pointer.x = ((clientX - canvasBounds.left) / canvasBounds.width) * 2 - 1;
            pointer.y = -((clientY - canvasBounds.top) / canvasBounds.height) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);

            interactionPlane.normal.copy(camera.position).normalize();
            interactionPlane.constant = -interactionPlane.normal.dot(camera.position) + camera.position.length() * 0.5;

            if (raycaster.ray.intersectPlane(interactionPlane, interactionPoint)) {
                const palette = colorPalettes[config.activePaletteIndex];
                emitPulseAt(
                    interactionPoint,
                    Math.floor(Math.random() * palette.length),
                );
            }
        }

        function handleCanvasClick(e) {
            if (e.target.closest('.ui-panel, #control-buttons')) return;
            if (!config.paused) triggerPulse(e.clientX, e.clientY);
        }

        renderer.domElement.addEventListener('click', handleCanvasClick);

        const clock = new THREE.Clock();
        const phaseOrder = [
            "intro",
            "network-points",
            "network-connections",
            "observing",
            "portals",
            "interactive",
            "route-exit",
        ];
        let currentNodeOpacity = 0;
        let currentConnectionOpacity = 0;
        let currentGlobalDim = 1;
        let lastActivePortalId = null;
        let projectionFrame = 0;

        function phaseReaches(targetPhase) {
            return (
                phaseOrder.indexOf(phaseRef.current) >=
                phaseOrder.indexOf(targetPhase)
            );
        }

        function publishPortalPositions() {
            const publish = onPortalPositionsRef.current;
            if (!publish || !nodesMesh || !neuralNetwork) return;

            const bounds = renderer.domElement.getBoundingClientRect();
            const edgeX = isCoarsePointer ? 42 : 72;
            const topEdge = isCoarsePointer ? 92 : 88;
            const bottomEdge = isCoarsePointer ? 184 : 92;
            const positions = {};

            HERO_SOLUTIONS.forEach((solution) => {
                const worldPosition = getPortalWorldPosition(
                    solution.id,
                    portalWorldPosition,
                );
                if (!worldPosition) return;

                portalProjectedPosition.copy(worldPosition).project(camera);
                const isInFront =
                    portalProjectedPosition.z >= -1 &&
                    portalProjectedPosition.z <= 1;
                const rawX =
                    (portalProjectedPosition.x * 0.5 + 0.5) * bounds.width;
                const rawY =
                    (-portalProjectedPosition.y * 0.5 + 0.5) * bounds.height;
                const x = THREE.MathUtils.clamp(
                    rawX,
                    edgeX,
                    Math.max(edgeX, bounds.width - edgeX),
                );
                const y = THREE.MathUtils.clamp(
                    rawY,
                    topEdge,
                    Math.max(topEdge, bounds.height - bottomEdge),
                );
                const distance = camera.position.distanceTo(worldPosition);
                const scale = THREE.MathUtils.clamp(
                    1.22 - distance / 90,
                    0.82,
                    1.1,
                );

                positions[solution.id] = {
                    x,
                    y,
                    scale,
                    visible:
                        isInFront &&
                        rawX > -bounds.width * 0.15 &&
                        rawX < bounds.width * 1.15 &&
                        rawY > -bounds.height * 0.15 &&
                        rawY < bounds.height * 1.15,
                };
            });

            publish(positions);
        }

        let animationFrameId = 0;
        let isSceneVisible = true;
        const visibilityObserver = "IntersectionObserver" in window
            ? new IntersectionObserver(([entry]) => {
                isSceneVisible = entry?.isIntersecting ?? true;
            })
            : null;
        visibilityObserver?.observe(canvasElement);

        function animate() {
            animationFrameId = requestAnimationFrame(animate);

            if (!isSceneVisible || document.hidden) return;

            const delta = Math.min(clock.getDelta(), 0.05);
            const t = clock.elapsedTime;

            currentCameraProgress = THREE.MathUtils.damp(
                currentCameraProgress,
                targetCameraProgress,
                5.5,
                delta,
            );
            pointerX = THREE.MathUtils.damp(pointerX, pointerTargetX, 5, delta);
            pointerY = THREE.MathUtils.damp(pointerY, pointerTargetY, 5, delta);

            const immersion = THREE.MathUtils.smoothstep(
                currentCameraProgress,
                0,
                1,
            );
            const plunge = Math.pow(immersion, 1.18);
            const arc = Math.sin(immersion * Math.PI);
            const pointerWeight = 1 - immersion * 0.75;
            const activePortalId = activePortalIdRef.current;
            const selectedPortalId = selectedPortalIdRef.current;
            const focusedPortalId = selectedPortalId || activePortalId;
            const routeExiting = phaseRef.current === "route-exit";

            const nodeOpacityTarget = routeExiting
                ? 0.42
                : phaseReaches("network-points")
                  ? 1
                  : 0;
            const connectionOpacityTarget = routeExiting
                ? 0.08
                : phaseReaches("network-connections")
                  ? 1
                  : 0;
            const globalDimTarget = selectedPortalId
                ? 0.08
                : activePortalId
                  ? 0.3
                  : 1;

            currentNodeOpacity = THREE.MathUtils.damp(
                currentNodeOpacity,
                nodeOpacityTarget,
                3.4,
                delta,
            );
            currentConnectionOpacity = THREE.MathUtils.damp(
                currentConnectionOpacity,
                connectionOpacityTarget,
                2.8,
                delta,
            );
            currentGlobalDim = THREE.MathUtils.damp(
                currentGlobalDim,
                globalDimTarget,
                5.2,
                delta,
            );

            const focusedPortalIndex = focusedPortalId
                ? HERO_SOLUTIONS.findIndex(
                    (solution) => solution.id === focusedPortalId,
                )
                : -10;

            if (nodesMesh) {
                nodesMesh.material.uniforms.uLayerOpacity.value =
                    currentNodeOpacity;
                nodesMesh.material.uniforms.uGlobalDim.value = currentGlobalDim;
                nodesMesh.material.uniforms.uFocusedPortal.value =
                    focusedPortalIndex;
            }
            if (connectionsMesh) {
                connectionsMesh.material.uniforms.uLayerOpacity.value =
                    currentConnectionOpacity;
                connectionsMesh.material.uniforms.uGlobalDim.value =
                    currentGlobalDim;
            }

            if (
                activePortalId &&
                activePortalId !== lastActivePortalId &&
                getPortalWorldPosition(activePortalId, portalWorldPosition)
            ) {
                const colorIndex = Math.max(
                    0,
                    HERO_SOLUTIONS.findIndex(
                        (solution) => solution.id === activePortalId,
                    ),
                );
                emitPulseAt(portalWorldPosition, colorIndex);
            }
            lastActivePortalId = activePortalId;

            const selectedWorldPosition = selectedPortalId
                ? getPortalWorldPosition(
                    selectedPortalId,
                    portalWorldPosition,
                )
                : null;

            if (selectedWorldPosition) {
                desiredTarget.copy(selectedWorldPosition);
            } else {
                desiredTarget.set(
                    arc * 0.9 + pointerX * 0.65 * pointerWeight,
                    -immersion * 0.8 - pointerY * 0.35 * pointerWeight,
                    -immersion * 2.8,
                );
            }
            controls.target.lerp(
                desiredTarget,
                1 - Math.exp(-(selectedPortalId ? 7.5 : 4.8) * delta),
            );

            cameraDirection.copy(camera.position).sub(controls.target);
            if (cameraDirection.lengthSq() < 0.0001) {
                cameraDirection.set(0, 0, 1);
            }

            const targetDistance = selectedPortalId
                ? 2.9
                : THREE.MathUtils.lerp(
                    initialCameraDistance,
                    3.2,
                    plunge,
                );
            const cameraDistance = THREE.MathUtils.damp(
                cameraDirection.length(),
                targetDistance,
                selectedPortalId ? 7.8 : 6,
                delta,
            );
            camera.position
                .copy(controls.target)
                .addScaledVector(cameraDirection.normalize(), cameraDistance);

            controls.autoRotate =
                phaseReaches("observing") &&
                currentCameraProgress < 0.12 &&
                !activePortalId &&
                !selectedPortalId;
            controls.autoRotateSpeed = THREE.MathUtils.lerp(
                0.15,
                0.38,
                immersion,
            );

            if (!config.paused) {
                if (nodesMesh) {
                    nodesMesh.material.uniforms.uTime.value = t;
                    if (!selectedPortalId) {
                        nodesMesh.rotation.x =
                            -pointerY * 0.055 * pointerWeight;
                        nodesMesh.rotation.y =
                            Math.sin(t * 0.05) * 0.08
                            + pointerX * 0.085 * pointerWeight;
                    }
                }
                if (connectionsMesh) {
                    connectionsMesh.material.uniforms.uTime.value = t;
                    if (!selectedPortalId) {
                        connectionsMesh.rotation.x =
                            -pointerY * 0.055 * pointerWeight;
                        connectionsMesh.rotation.y =
                            Math.sin(t * 0.05) * 0.08
                            + pointerX * 0.085 * pointerWeight;
                    }
                }
            }

            const bloomRise = THREE.MathUtils.smoothstep(
                currentCameraProgress,
                0.08,
                0.72,
            );
            const whiteout = THREE.MathUtils.smoothstep(
                currentCameraProgress,
                0.76,
                1,
            );
            bloomPass.strength = 0.16 + bloomRise * 0.08 - whiteout * 0.04;
            bloomPass.radius = 0.2 + bloomRise * 0.06;
            bloomPass.threshold = 1.01;

            starField.rotation.y += delta * (0.018 + immersion * 0.08);
            starField.rotation.x = THREE.MathUtils.damp(
                starField.rotation.x,
                -pointerY * 0.025 * pointerWeight,
                4,
                delta,
            );
            starField.scale.setScalar(1 + immersion * 0.08);
            starField.material.size = 0.15 + immersion * 0.05;

            controls.update(delta);

            projectionFrame = (projectionFrame + 1) % 2;
            if (projectionFrame === 0 && phaseReaches("portals")) {
                publishPortalPositions();
            }

            composer.render();
        }

        function init() {
            createNetworkVisualization(config.currentFormation, config.densityFactor);
            updateTheme(config.activePaletteIndex);
            animate();
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);

             bloomPass.resolution.set(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', onWindowResize);

        function handleContextLost(event) {
            event.preventDefault();
            renderer.domElement.style.opacity = "0";
            rootRef.current?.setAttribute("data-webgl-fallback", "true");
        }
        renderer.domElement.addEventListener("webglcontextlost", handleContextLost);

        init();

        return () => {
            cancelAnimationFrame(animationFrameId);
            stopCameraProgress();
            visibilityObserver?.disconnect();
            window.removeEventListener('resize', onWindowResize);
            controls.dispose();
            renderer.domElement.removeEventListener('click', handleCanvasClick);
            renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
            if (!isCoarsePointer) {
                renderer.domElement.removeEventListener("pointermove", handlePointerMove);
                renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
            }

            if (nodesMesh) {
                nodesMesh.geometry.dispose();
                nodesMesh.material.dispose();
            }

            if (connectionsMesh) {
                connectionsMesh.geometry.dispose();
                connectionsMesh.material.dispose();
            }

            starField.geometry.dispose();
            starField.material.dispose();
            renderer.dispose();
            composer.dispose();
        };
  }, [cameraProgress]);

  return (
    <div ref={rootRef} className={styles.root} aria-hidden="true">
      <canvas ref={canvasRef} id="neural-network-canvas" className={styles.canvas} />
    </div>
  );
}

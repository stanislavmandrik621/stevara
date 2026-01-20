"use client";

import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import * as THREE from "three";

interface MegapackModelProps {
  scale?: number;
  autoRotate?: boolean;
  position?: [number, number, number];
}

export function MegapackModel({ 
  scale = 1, 
  autoRotate = false,
  position = [0, 0, 0]
}: MegapackModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the MTL materials with logo texture
  const materials = useLoader(MTLLoader, '/models/megapack.mtl');
  
  // Load the OBJ model with materials
  const obj = useLoader(OBJLoader, '/models/megapack.obj', (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });
  
  // Clone and process the object
  const clonedObj = useMemo(() => {
    const clone = obj.clone();
    
    // Calculate bounding box to center and scale the model
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    // Get the largest dimension to normalize scale
    const maxDim = Math.max(size.x, size.y, size.z);
    const normalizeScale = 5 / maxDim;
    
    // Center the model at origin
    clone.position.sub(center);
    clone.scale.setScalar(normalizeScale);
    
    // Enhanced materials - using FrontSide to avoid edge artifacts
    const whiteMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8f8f8'),
      metalness: 0.0,
      roughness: 0.2,
      clearcoat: 0.2,
      clearcoatRoughness: 0.5,
      side: THREE.FrontSide,
    });
    
    const grayMetalMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#909090'),
      metalness: 0.5,
      roughness: 0.4,
      side: THREE.FrontSide,
    });
    
    const ventMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#3a3a3a'),
      metalness: 0.2,
      roughness: 0.7,
      side: THREE.FrontSide,
    });
    
    const rubberMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#1a1a1a'),
      metalness: 0.0,
      roughness: 0.9,
      side: THREE.FrontSide,
    });
    
    const metalLockMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2a2a2a'),
      metalness: 0.4,
      roughness: 0.5,
      side: THREE.FrontSide,
    });

    // Process and enhance materials
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mat = child.material as THREE.MeshStandardMaterial;
        const matName = mat?.name || '';
        const meshName = child.name.toLowerCase();
        
        // Keep logo material with texture if it has one
        if (matName === 'logo' && mat.map) {
          // Keep the texture, just enhance the material
          mat.side = THREE.FrontSide;
          mat.metalness = 0.0;
          mat.roughness = 0.3;
        }
        // White body and doors
        else if (matName === 'white_' || meshName.includes('door') || meshName.includes('object006')) {
          child.material = whiteMaterial;
        }
        // Gray vents/fans
        else if (matName === 'gray' || meshName.includes('fan')) {
          child.material = ventMaterial;
        }
        // Gray metal parts
        else if (matName === 'gray_metal' || meshName.includes('fixer')) {
          child.material = grayMetalMaterial;
        }
        // Rubber parts
        else if (matName === 'rubber' || meshName.includes('screw')) {
          child.material = rubberMaterial;
        }
        // Metal locks
        else if (matName === 'metal_lock' || meshName.includes('lock')) {
          child.material = metalLockMaterial;
        }
        // Default
        else if (!mat.map) {
          child.material = whiteMaterial;
        }
        
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return clone;
  }, [obj, materials]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    if (autoRotate) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float
      speed={0.6}
      rotationIntensity={0.02}
      floatIntensity={0.05}
    >
      <group
        ref={groupRef}
        scale={scale}
        position={position}
      >
        {/* Stand upright, angled like Powerwall */}
        <group rotation={[-Math.PI / 2, 0, Math.PI * 2 + 0.8]}>
          <Center>
            <primitive object={clonedObj} />
          </Center>
        </group>
      </group>
    </Float>
  );
}

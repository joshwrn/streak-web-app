import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

const Material = () => {
  return (
    <meshPhongMaterial
      color="#cfcfcf"
      specular="#646464"
      shininess={3}
      attach="material"
      reflectivity={0.14}
    />
  );
};

const EyeMaterial = () => {
  return (
    <meshPhongMaterial
      color="#2c2c2c"
      specular="#ffffff"
      shininess={400}
      attach="material"
      reflectivity={0.14}
    />
  );
};

const FrillMaterial = () => {
  return (
    <meshPhysicalMaterial
      color="#ffa0c0"
      emissive={'#ff7aa6'}
      emissiveIntensity={0.2}
      transmission={1}
      roughness={0.5}
      thickness={500}
      attach="material"
      clearcoat={0.2}
      clearcoatRoughness={0.5}
    />
  );
};

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../3d-models/axolotl/scene.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh geometry={nodes.mesh_0.geometry}>
            <Material />
          </mesh>
          <group position={[0, -1.61, 0]} scale={0.72}>
            <mesh geometry={nodes.mesh_1.geometry}>
              <Material />
            </mesh>
          </group>
          <group
            position={[0.43, -0.97, 0.61]}
            rotation={[-0.23, -0.01, -0.01]}
            scale={[0.17, 0.17, 0.17]}
          >
            <mesh geometry={nodes.mesh_2.geometry}>
              <Material />
            </mesh>
          </group>
          <group
            position={[0.44, -1.65, 0.61]}
            rotation={[0.21, 0.01, 0]}
            scale={[0.17, 0.17, 0.17]}
          >
            <mesh geometry={nodes.mesh_3.geometry}>
              <Material />
            </mesh>
          </group>
          <group
            position={[0.3, -0.2, 1.14]}
            rotation={[-2.34, -0.13, 0.09]}
            scale={[-0.27, 0.27, 0.27]}
          >
            <mesh geometry={nodes.mesh_4.geometry}>
              {/* Frills */}
              <FrillMaterial />
            </mesh>
          </group>
          <group
            position={[0.78, 0.14, 0.56]}
            rotation={[0.07, -0.29, 0.11]}
            scale={[0.09, 0.15, 0.15]}
          >
            <mesh geometry={nodes.mesh_5.geometry}>
              <EyeMaterial />
            </mesh>
          </group>
          <group
            position={[0.32, 0.94, -0.57]}
            rotation={[-0.16, 0.47, 1.02]}
            scale={[0.07, 0.12, 0.12]}
          >
            <mesh
              geometry={nodes.mesh_6.geometry}
              material={nodes.mesh_6.material}
            >
              <FrillMaterial />
            </mesh>
          </group>
          <group
            position={[0.89, 0.05, 0]}
            rotation={[Math.PI / 2, 0, 0.03]}
            scale={[1, 0.88, 1]}
          >
            <mesh
              geometry={nodes.mesh_7.geometry}
              material={nodes.mesh_7.material}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('../3d-models/axolotl/scene.gltf');

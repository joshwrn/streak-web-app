import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../3d-models/axolotl/scene.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.mesh_0.geometry}
            material={nodes.mesh_0.material}
          ></mesh>
          <group position={[0, -1.61, 0]} scale={0.72}>
            <mesh
              geometry={nodes.mesh_1.geometry}
              material={nodes.mesh_1.material}
            />
          </group>
          <group
            position={[0.43, -0.97, 0.61]}
            rotation={[-0.23, -0.01, -0.01]}
            scale={[0.17, 0.17, 0.17]}
          >
            <mesh
              geometry={nodes.mesh_2.geometry}
              material={nodes.mesh_2.material}
            />
          </group>
          <group
            position={[0.44, -1.65, 0.61]}
            rotation={[0.21, 0.01, 0]}
            scale={[0.17, 0.17, 0.17]}
          >
            <mesh
              geometry={nodes.mesh_3.geometry}
              material={nodes.mesh_3.material}
            />
          </group>
          <group
            position={[0.3, -0.2, 1.14]}
            rotation={[-2.34, -0.13, 0.09]}
            scale={[-0.27, 0.27, 0.27]}
          >
            <mesh
              geometry={nodes.mesh_4.geometry}
              material={nodes.mesh_4.material}
            />
          </group>
          <group
            position={[0.78, 0.14, 0.56]}
            rotation={[0.07, -0.29, 0.11]}
            scale={[0.09, 0.15, 0.15]}
          >
            <mesh
              geometry={nodes.mesh_5.geometry}
              material={nodes.mesh_5.material}
            />
          </group>
          <group
            position={[0.32, 0.94, -0.57]}
            rotation={[-0.16, 0.47, 1.02]}
            scale={[0.07, 0.12, 0.12]}
          >
            <mesh
              geometry={nodes.mesh_6.geometry}
              material={nodes.mesh_6.material}
            />
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

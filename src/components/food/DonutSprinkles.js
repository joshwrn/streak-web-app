import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../3d-models/food/donutSprinkles.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Mesh_donutSprinkles.geometry}
        material={materials.brownLight}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_1.geometry}
        material={materials.purpleLight}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_2.geometry}
        material={materials.orange}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_3.geometry}
        material={materials.yellow}
      />
      <mesh
        geometry={nodes.Mesh_donutSprinkles_4.geometry}
        material={materials.green}
      />
    </group>
  );
}

useGLTF.preload('../3d-models/food/donutSprinkles.gltf');

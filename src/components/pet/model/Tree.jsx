import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('../3d-models/tree.glb');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Mesh_tree.geometry} material={materials.wood} />
      <mesh
        geometry={nodes.Mesh_tree_1.geometry}
        material={materials.foliage}
      />
    </group>
  );
}

useGLTF.preload('../3d-models/tree.glb');

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF, useAnimations } from '@react-three/drei';

export default function Model({ ...props }) {
  const group = useRef();
  const eyeRef = useRef();

  const { nodes, materials, animations } = useGLTF(
    '../3d-models/panda/scene.gltf'
  );
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    console.log('actions', actions, 'nodes:', nodes);
    console.log('animations', animations);
    if (!nodes) return;
    nodes.EyesOpen.scale.set(1, 1, 1);
    nodes['eyesopen_05'].scale.set(0.5, 0.5, 0.5);
    console.log('nodes.EyesOpen', nodes.EyesOpen);
  }, [actions]);

  useEffect(() => {
    console.log('eyeRef', eyeRef);
    if (!eyeRef.current) return;
    // eyeRef.current.material.color.set('#ff0000');
    // eyeRef.current.scale.set(0.5, 0.5, 0.5);
    // loop through all bones
    const boneArray = eyeRef.current.skeleton.bones;
    console.log('cur bone', boneArray[5]);
    // boneArray[5].position.set(0.5, 0.5, 0.5);
    // boneArray[9].position.set(0.5, 0.5, 0.5);
    // boneArray[10].position.set(0, 0.1, 0.45);
    boneArray[11].position.set(0, 0, 0.4);
    // boneArray[5].scale.set(0.5, 2, 1);
    // boneArray[12].position.set(0.5, 0.5, 0.5);
    //boneArray[13].position.set(0, -0.05, 0.4);
    // boneArray[14].position.set(0.5, 0.5, 0.5);
    // console.log('boneArray after', boneArray);
  }, [eyeRef, actions]);

  useEffect(() => {
    actions.Idle.play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.01}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
            <primitive object={nodes._rootJoint} ref={eyeRef} />
            {/* eyes 13 mad */}
            {/* <skinnedMesh
              geometry={nodes.Object_36.geometry}
              material={nodes.Object_36.material}
              skeleton={nodes.Object_36.skeleton}
            /> */}
            {/* <skinnedMesh
              geometry={nodes.Object_38.geometry}
              material={nodes.Object_38.material}
              skeleton={nodes.Object_38.skeleton}
            /> */}
            {/* <skinnedMesh
              geometry={nodes.Object_40.geometry}
              material={nodes.Object_40.material}
              skeleton={nodes.Object_40.skeleton}
            /> */}
            {/* bone 11 eyes confused */}
            <skinnedMesh
              geometry={nodes.Object_42.geometry}
              material={nodes.Object_42.material}
              skeleton={nodes.Object_42.skeleton}
            />
            {/* bone 10 eyes confused */}
            {/* <skinnedMesh
              geometry={nodes.Object_44.geometry}
              material={nodes.Object_44.material}
              skeleton={nodes.Object_44.skeleton}
            /> */}
            {/* body */}
            <skinnedMesh
              geometry={nodes.Object_46.geometry}
              material={nodes.Object_46.material}
              skeleton={nodes.Object_46.skeleton}
              ref={eyeRef}
            />
            {/* <skinnedMesh
              geometry={nodes.Object_48.geometry}
              material={nodes.Object_48.material}
              skeleton={nodes.Object_48.skeleton}
            /> */}
            {/* <skinnedMesh
              geometry={nodes.Object_50.geometry}
              material={nodes.Object_50.material}
              skeleton={nodes.Object_50.skeleton}
            /> */}
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('../3d-models/panda/scene.gltf');

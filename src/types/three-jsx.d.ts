import type { ThreeElements } from '@react-three/fiber'
import type { Object3DNode } from '@react-three/fiber'
import type { Group, Mesh, Points, Line, MeshStandardMaterial, PerspectiveCamera, AmbientLight, DirectionalLight } from 'three'

declare global {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            group: Object3DNode<Group, typeof Group>;
            mesh: Object3DNode<Mesh, typeof Mesh>;
            points: Object3DNode<Points, typeof Points>;
            line: Object3DNode<Line, typeof Line>;
            perspectiveCamera: Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>;
            ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
            directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>;
            meshStandardMaterial: Object3DNode<MeshStandardMaterial, typeof MeshStandardMaterial>;
        }
    }
}

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements extends ThreeElements {
            group: Object3DNode<Group, typeof Group>;
            mesh: Object3DNode<Mesh, typeof Mesh>;
            points: Object3DNode<Points, typeof Points>;
            line: Object3DNode<Line, typeof Line>;
            perspectiveCamera: Object3DNode<PerspectiveCamera, typeof PerspectiveCamera>;
            ambientLight: Object3DNode<AmbientLight, typeof AmbientLight>;
            directionalLight: Object3DNode<DirectionalLight, typeof DirectionalLight>;
            meshStandardMaterial: Object3DNode<MeshStandardMaterial, typeof MeshStandardMaterial>;
        }
    }
}

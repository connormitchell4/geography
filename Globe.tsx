import React, { useRef, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Feature, Polygon, MultiPolygon } from 'geojson';
import { calculateMainCentroid } from './Centroid';

interface GeoJsonGeometry {
  type: string;
  coordinates: number[][][] | number[][][][];
}

interface GeoJsonFeature {
  type: string;
  properties: {
    name: string;
    sovereignt: string;
    admin: string;
    type: string;
  };
  geometry: GeoJsonGeometry;
}

interface GeoJsonData {
  type: string;
  features: GeoJsonFeature[];
}

interface Centroid {
  position: [number, number, number];
  rotation: THREE.Euler;
  name: string;
}

interface GlobeProps {
  geoJsonData: GeoJsonData;
  guessedCountries: string[];
  gameOver: number;
}

const convertGeoJSONTo3D = (geoJsonData: GeoJsonData, guessedCountries: string[], radius: number) => {
  const features: GeoJsonFeature[] = geoJsonData.features;
  const lineSegments: THREE.Vector3[] = [];
  const fillSegments: THREE.Vector3[] = [];
  const centroids: Centroid[] = [];

  features.forEach((feature) => {
    const coordinates = feature.geometry.coordinates;
    const isGuessed = guessedCountries.includes(feature.properties.name.toLowerCase());

    const addLineSegment = (coords: number[][]) => {
      const vectors = coords.map(([lng, lat]) => {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);

        return new THREE.Vector3(
          -radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.cos(phi),
          radius * Math.sin(phi) * Math.sin(theta)
        );
      });

      for (let i = 0; i < vectors.length - 1; i++) {
        lineSegments.push(vectors[i], vectors[i + 1]);
      }
      // Close the polygon by connecting the last point to the first
      if (vectors.length > 1) {
        lineSegments.push(vectors[vectors.length - 1], vectors[0]);
      }

      if (isGuessed) {
        for (let i = 0; i < vectors.length - 1; i++) {
          fillSegments.push(vectors[i], vectors[i + 1]);
        }
        // Close the polygon by connecting the last point to the first
        if (vectors.length > 1) {
          fillSegments.push(vectors[vectors.length - 1], vectors[0]);
        }
      }
    };

    const addCentroid = () => {
      const centroid = calculateMainCentroid(feature as Feature<Polygon | MultiPolygon>);
      const [lng, lat] = centroid;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lng + 180) * (Math.PI / 180);
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);

      // Calculate the rotation to make the text perpendicular to the globe
      const rotation = new THREE.Euler(0, theta, phi - Math.PI / 2);

      centroids.push({ position: [x, y, z], rotation, name: feature.properties.name });
    };

    if (feature.geometry.type === 'Polygon') {
      (coordinates as number[][][]).forEach((polygon) => {
        addLineSegment(polygon);
      });
      addCentroid();
    }

    if (feature.geometry.type === 'MultiPolygon') {
      (coordinates as number[][][][]).forEach((polygon) => {
        polygon.forEach((ring) => {
          addLineSegment(ring);
        });
      });
      addCentroid();
    }
  });

  return { lineSegments, fillSegments, centroids };
};

const Globe: React.FC<GlobeProps> = React.memo(({ geoJsonData, guessedCountries, gameOver }) => {
  const texture = useLoader(THREE.TextureLoader, '/earthmap10k.jpg');
  const radius = 5;  // Ensure consistent radius
  
  const { lineSegments, fillSegments, centroids } = useMemo(() => convertGeoJSONTo3D(geoJsonData, guessedCountries, radius), [geoJsonData, guessedCountries]);

  const SphereWithWireframe = () => {
    
    const globeRef = useRef<THREE.Mesh>(null);
    const wireframeRef = useRef<THREE.LineSegments>(null);

    return (
      <>
        <mesh ref={globeRef}>
          <sphereGeometry args={[radius, 32, 32]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        {geoJsonData && (
          <>
            <lineSegments ref={wireframeRef}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array(lineSegments.flatMap((v) => [v.x, v.y, v.z]))}
                  itemSize={3}
                  count={lineSegments.length}
                />
              </bufferGeometry>
              <lineBasicMaterial color="yellow" />
            </lineSegments>
            <lineSegments ref={wireframeRef}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array(fillSegments.flatMap((v) => [v.x, v.y, v.z]))}
                  itemSize={3}
                  count={fillSegments.length}
                />
              </bufferGeometry>
              <lineBasicMaterial color="white" />
            </lineSegments>
          </>
        )}
      </>
    );
  };

  const QuestionMarkWithCountryName: React.FC<Centroid & { guessedCountries: string[], gameOver: number, onMouseEnter: () => void }> = ({ position, rotation, name, guessedCountries, gameOver, onMouseEnter }) => {
    const isGuessed = guessedCountries.includes(name.toLowerCase());
    
  
    return (
      <group position={position} rotation={rotation}>
        {(!isGuessed && gameOver !== 2) && (
          <Text
            fontSize={0.15}
            color="yellow"
            outlineColor={'black'}
            outlineWidth={0.01}
            anchorX="center"
            anchorY="middle"
            rotation={[0, -Math.PI / 2, 0]}
          >
            ?
          </Text>
        )}
        {(isGuessed && gameOver !== 2) && (
          <Text
            fontSize={0.035}
            color="white"
            outlineColor={'black'}
            outlineWidth={0.004}
            anchorX="center"
            anchorY="middle"
            rotation={[0, -Math.PI / 2, 0]}
          >
            {name}
          </Text>
        )} 
        {(gameOver === 2) && (
          <Text
            onPointerOver={onMouseEnter}
            fontSize={0.035}
            color={isGuessed ? "white" : "yellow"}
            outlineColor={'black'}
            outlineWidth={0.004}
            anchorX="center"
            anchorY="middle"
            rotation={[0, -Math.PI / 2, 0]}
          >
            {name}
          </Text>
        )} 
      </group>
    );
  };

  const Centroids: React.FC<{ centroids: Centroid[]; guessedCountries: string[] }> = ({ centroids, guessedCountries }) => {
    console.log('Centroids Called')

    const handleMouseEnter = () => {
      console.log('test');
    };

    return(
    <>
      {centroids.map((centroid, index) => (
        <QuestionMarkWithCountryName
          key={index}
          position={centroid.position}
          rotation={centroid.rotation}
          name={centroid.name}
          guessedCountries={guessedCountries}
          gameOver={gameOver}
          onMouseEnter={handleMouseEnter}
        />
      ))}
    </>
    );
  };

  return (
    <Canvas style={{ height: '100vh', width: '100vw', background: 'black' }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <SphereWithWireframe />
      <Centroids centroids={centroids} guessedCountries={guessedCountries} />
      <OrbitControls
        enableZoom={true}
        minDistance={5.25}
        maxDistance={10}
        enablePan={false}
      />
      <Stars />
    </Canvas>
  );
});

export default Globe;

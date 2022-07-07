import { Redirect, Route } from 'react-router-dom';

import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { albums, home, person } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

// @ts-ignore
import * as THREE from "three";
// @ts-ignore 
import * as TWEEN from "@tweenjs/tween.js";
import { InteractionManager } from "three.interactive";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

// Future https://github.com/asjadanis/react-three-boilerplate/blob/master/src/Scene.js 

// objects
let planetEarth: any;
let ambLight: any;
let spotLight: any;

const renderer = createRenderer();
const scene = createScene();
initSceneObjects();
createLight();
const camera = createCamera();
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement,
  false
);




animate((time: number) => {
  renderer.render(scene, camera);
  interactionManager.update();
  TWEEN.update(time);
});

function animate(callback:any){
  function loop(time:number) {
    callback(time);
    requestAnimationFrame(loop);
    planetEarth.rotation.y += 0.001;
  }
  requestAnimationFrame(loop);
}

function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.add(ambLight);  
  camera.add(spotLight); 
  camera.position.setZ(30);
  camera.position.setX(-2);
  camera.lookAt(planetEarth.position);
  //camera.lookAt(scene.position);  
  return camera;
}

function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;    
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function createLight(){
    //add some lighting
    ambLight = new THREE.AmbientLight(0x333333);
    ambLight.position.set(5, 3, 5);

    spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(40, 6, 4);
    spotLight.castShadow = true;
 
}

function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.TextureLoader().load("/assets/images/space.jpg");
  //scene.background = new THREE.Color(0xffffff);
  return scene;
}

function moveCamera(x:number,y:number,z:number){
    const coords = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    new TWEEN.Tween(coords)
      .to({ x,y,z })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
          camera.position.set(coords.x, coords.y, coords.z);
          let x1 = planetEarth.position.x;
          let y1 = planetEarth.position.y;
          let z1 = planetEarth.position.z;
          camera.lookAt(new THREE.Vector3(x1,y1,z1));          
        }
      )
      .start();   
}

function initSceneObjects() {

    //let scene = new THREE.Scene();
    //let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    //let renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.autoClear = false;
    //renderer.setPixelRatio(window.devicePixelRatio);
    //renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.gammaOutput = true;
    //renderer.gammaFactor = 2.2;    
    //renderer.shadowMap.type = THREE.PCFSoftShadowMap;    
    //renderer.setClearColor(0x000000, 0.0);
    //document.body.appendChild( renderer.domElement );

    // Load
    const loader = new THREE.TextureLoader();
    let earthTexture = new THREE.TextureLoader().load("/assets/images/earth.jpg");
    let normalTexture = new THREE.TextureLoader().load("/assets/images/normal.jpg");

    // Earth
    let geometryEarthSphere = new THREE.SphereGeometry( 3, 32, 32 );
    let materialEarthSphere = new THREE.MeshBasicMaterial( { map: earthTexture, normalMap: normalTexture, } );
    planetEarth = new THREE.Mesh( geometryEarthSphere, materialEarthSphere );
    scene.add(planetEarth);
    planetEarth.position.z = 2;
    planetEarth.position.setX(-3);  

    // STARS
    function addStars(){

      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
      for ( var z= -500; z < 500; z+=20 ) {
    
        // Make a sphere (exactly the same as before). 
        let geometry   = new THREE.SphereGeometry(0.5, 32, 32)
        let material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        let sphere = new THREE.Mesh(geometry, material)
    
        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 500 - 250;
        sphere.position.y = Math.random() * 500 - 250;
    
        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;
    
        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;
    
        //add the sphere to the scene
        scene.add( sphere );
    
      }
    }
    
    addStars();    


    //scene.add(spotLight);    

    // Camera
    //camera.position.setZ(30);
    //camera.position.setX(-2);
    //camera.lookAt(scene.position);

    //let animate = function () {
    //  requestAnimationFrame( animate );
    //  planetEarth.rotation.y += 0.001;

    //  renderer.render( scene, camera );
    //};
    //animate();
    //renderer.render( scene, camera );


 
}

function tab1(){
  //
  console.log('tab 1');
  moveCamera(6,12,7);
}

function tab2(){
  //
  console.log('tab 2');
  moveCamera(-5,-14,10);

}

function tab3(){
  //
  console.log('tab 3');
  moveCamera(1,-2, 1);  
   
}   



const App: React.FC = (props) => (
  <IonApp>     
    <IonReactRouter>     
      <IonTabs>
        <IonRouterOutlet>          
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton onClick={tab1} tab="tab1" href="/tab1">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={tab2} tab="tab2" href="/tab2">
            <IonIcon icon={albums} />
            <IonLabel>Lists</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={tab3} tab="tab3" href="/tab3">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

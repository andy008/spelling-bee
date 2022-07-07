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

// Load textures
//import earthTextureFile from './earth.jpg';
//import normalTextureFile from './normal.jpg';
//import spaceTextureFile from './space.jpg';

setupIonicReact();
renderThree();

function renderThree(){

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    //renderer.autoClear = false;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;    
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;    
    //renderer.setClearColor(0x000000, 0.0);
    document.body.appendChild( renderer.domElement );

    // Load
    const loader = new THREE.TextureLoader();

    // Cube 2
    let earthTexture = new THREE.TextureLoader().load("/assets/images/earth.jpg");
    let geometry1 = new THREE.BoxGeometry( 2, 2, 2 );
    //let material1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let material1 = new THREE.MeshBasicMaterial( { map: earthTexture } );
    let cube2 = new THREE.Mesh( geometry1, material1 );
    scene.add( cube2 );    
    
    // Background
    scene.background = new THREE.TextureLoader().load("/assets/images/space.jpg");
    
    // Earth
    let earth = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({ map: earthTexture}),
    );
    scene.add(earth);
    earth.position.z = 1;
    earth.position.setX(-5);  

    // STARS
    function addStars(){

      // The loop will move from z position of -1000 to z position 1000, adding a random particle at each position. 
      for ( var z= -500; z < 500; z+=20 ) {
    
        // Make a sphere (exactly the same as before). 
        var geometry   = new THREE.SphereGeometry(0.5, 32, 32)
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh(geometry, material)
    
        // This time we give the sphere random x and y positions between -500 and 500
        sphere.position.x = Math.random() * 1000 - 500;
        sphere.position.y = Math.random() * 1000 - 500;
    
        // Then set the z position to where it is in the loop (distance of camera)
        sphere.position.z = z;
    
        // scale it up a bit
        sphere.scale.x = sphere.scale.y = 2;
    
        //add the sphere to the scene
        scene.add( sphere );
    
      }
    }
    
    
    //addStars();    


    //add some lighting
    let ambLight = new THREE.AmbientLight(0x333333);
    ambLight.position.set(5, 3, 5);
    camera.add(ambLight);  

    let spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(40, 6, 4);
    spotLight.castShadow = true;
    camera.add(spotLight);
    //scene.add(spotLight);    

    // Camera
    camera.position.setZ(30);
    camera.position.setX(-2);
    camera.lookAt(scene.position);

    let animate = function () {
      requestAnimationFrame( animate );
      cube2.rotation.x += 0.01;
      cube2.rotation.y += 0.01;
      earth.rotation.y += 0.01;
      earth.rotation.x += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    //renderer.render( scene, camera );
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
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={albums} />
            <IonLabel>Lists</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={person} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

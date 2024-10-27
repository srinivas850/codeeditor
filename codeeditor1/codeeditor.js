require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } });

let editor;

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor-container'), {
    value: [
      '// Basic Three.js Setup',
      'const scene = new THREE.Scene();',
      'const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);',
      'const renderer = new THREE.WebGLRenderer();',
      'renderer.setSize(window.innerWidth, window.innerHeight);',
      'document.getElementById("threejs-output").appendChild(renderer.domElement);',
      'const geometry = new THREE.BoxGeometry();',
      'const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });',
      'const cube = new THREE.Mesh(geometry, material);',
      'scene.add(cube);',
      'camera.position.z = 5;',
      'function animate() {',
      '  requestAnimationFrame(animate);',
      '  cube.rotation.x += 0.01;',
      '  cube.rotation.y += 0.01;',
      '  renderer.render(scene, camera);',
      '}',
      'animate();'
    ].join('\n'),
    language: 'javascript',
    theme: 'vs-dark'
  });
});

function runCode() {
  const outputDiv = document.getElementById("threejs-output");
  outputDiv.innerHTML = ''; // Clear previous output

  const userCode = editor.getValue();
  
  // Create a script tag to execute user code
  const script = document.createElement("script");
  script.textContent = userCode;

  // Clear previous renderer (optional, can simplify)
  const existingCanvas = outputDiv.querySelector('canvas');
  if (existingCanvas) {
    existingCanvas.remove();
  }

  outputDiv.appendChild(script);
}
